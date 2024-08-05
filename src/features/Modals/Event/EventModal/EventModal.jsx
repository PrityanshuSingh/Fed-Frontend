import React, { useState, useEffect, useContext } from "react";
import EventCardModal from "./styles/EventModal.module.scss";
import groupIcon from "../../../../assets/images/groups.svg";
import rupeeIcon from "../../../../assets/images/rupeeIcon.svg";
import { X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
// import eventData from "../../../../data/eventData.json";
import FormData from "../../../../data/FormData.json";
import shareOutline from "../../../../assets/images/shareOutline.svg";
import Share from "../../../../features/Modals/Event/ShareModal/ShareModal";
// import AOS from "aos";
// import "aos/dist/aos.css";
import { CiLock } from "react-icons/ci";
import { PiClockCountdownDuotone } from "react-icons/pi";
import AuthContext from "../../../../context/AuthContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import { IoIosLock } from "react-icons/io";
import {
  MicroLoading,
  Alert,
  ComponentLoading,
} from "../../../../microInteraction";
import { api } from "../../../../services";

const EventModal = (props) => {
  const { onClosePath } = props;
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState("");
  const [btnTxt, setBtnTxt] = useState("Register Now");
  const authCtx = useContext(AuthContext);
  const [isMicroLoading, setIsMicroLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const { eventId } = useParams();
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [navigatePath, setNavigatePath] = useState("/");
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState({});
  const [data, setData] = useState({});
  const [eventData,setEventData]=useState({});

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get("/api/form/getAllForms");
        if (response.status === 200) {
          const eventData = response.data.events.find((e)=>e.id===eventId);
          console.log("fetched event modal:",eventData);
          setData(eventData);
          setInfo(eventData.info);
        } else {
          setAlert({
            type: "error",
            message:
              "There was an error fetching event details. Please try again.",
            position: "bottom-right",
            duration: 3000,
          });
          throw new Error(response.data.message || "Error fetching event");
        }
      } catch (error) {
        console.error("Error fetching event:", error);

        // setAlert({
        //   type: "error",
        //   message: "There was an error fetching event form. Please try again.",
        //   position: "bottom-right",
        //   duration: 3000,
        // });
        // Fallback to local data
        const { events } = FormData;
        const data = events.find((event) => event._id === parseInt(eventId));
        console.log(data);
        const info = data.info;
        setData(data);
        setInfo(info);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  useEffect(() => {
    if (shouldNavigate) {
      navigate(navigatePath);
      setShouldNavigate(false); // Reset state after navigation
    }
  }, [shouldNavigate, navigatePath, navigate]);

  useEffect(() => {
    if (alert) {
      const { type, message, position, duration } = alert;
      Alert({ type, message, position, duration });
      setAlert(null); // Reset alert after displaying it
    }
  }, [alert]);

  useEffect(() => {
    if (info.regDateAndTime) {
      calculateRemainingTime();
      const intervalId = setInterval(calculateRemainingTime, 1000);
      return () => clearInterval(intervalId);
    }
  }, [info.regDateAndTime]);

  //Calculating data of event
  const dateStr = info.eventDate;
  const date = new Date(dateStr);

  const day = date.getDate();

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th"; // Handles 4-20
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const dayWithSuffix = day + getOrdinalSuffix(day);
  const month = date.toLocaleDateString("en-GB", { month: "long" });

  const formattedDate = `${dayWithSuffix} ${month}`;

  const calculateRemainingTime = () => {
    const regStartDate = new Date(info.regDateAndTime);
    const now = new Date();
    const timeDifference = regStartDate - now;

    if (timeDifference <= 0) {
      setRemainingTime(null);
      return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);

    const remaining = [
      days > 0 ? `${days}d ` : "",
      hours > 0 ? `${hours}h ` : "",
      minutes > 0 ? `${minutes}m ` : "",
      seconds > 0 ? `${seconds}s` : "",
    ].join("");

    setRemainingTime(remaining.trim());
  };

  // Update button text based on registration status and remaining time
  useEffect(() => {
    if (info.isRegistrationClosed) {
      setBtnTxt("Closed");
    } else if (!remainingTime) {
      setBtnTxt("Register Now");
    } else {
      setBtnTxt(remainingTime);
    }
  }, [info.isRegistrationClosed, remainingTime]);

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      const isRegistered = authCtx.user.regForm.includes(data._id);
      if (isRegistered) {
        setBtnTxt("Already Registered");
      }
    }
  }, [authCtx.isLoggedIn, authCtx.user.regForm, btnTxt, navigate, data._id]);

  const handleModalClose = () => {
    navigate(onClosePath);
  };

  const [isOpen, setOpen] = useState(false);

  const handleShare = () => {
    setOpen(!isOpen);
  };

  const handleForm = () => {
    if (authCtx.isLoggedIn) {
      setIsMicroLoading(true);
      if (authCtx.user.access !== "USER") {
        setTimeout(() => {
          setIsMicroLoading(false);
          setBtnTxt("Already Member");
        }, 1500);

        // setAlert({
        //   type: "info",
        //   message: "Team Members are not allowed to register for the Event",
        //   position: "bottom-right",
        //   duration: 3000,
        // });
      } else {
        setNavigatePath("/Events/" + data._id + "/Form");
        setTimeout(() => {
          setShouldNavigate(true);
        }, 3000);

        setTimeout(() => {
          setIsMicroLoading(false);
        }, 3000);

        setAlert({
          type: "info",
          message: "Opening Event Registration Form",
          position: "bottom-right",
          duration: 3000,
        });
      }
    } else {
      setIsMicroLoading(true);
      sessionStorage.setItem("prevPage", window.location.pathname);
      setNavigatePath("/login");

      setTimeout(() => {
        setShouldNavigate(true);
      }, 3000);

      setTimeout(() => {
        setIsMicroLoading(false);
      }, 3000);
    }
  };

  const url = window.location.href;

  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",

        zIndex: "10",

        left: "0",
        top: "0",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(4px)",
          zIndex: "5",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            zIndex: "10",
            borderRadius: "10px",
            padding: "2rem",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: ".3rem",
          }}
        >
          {data && (
            <>
              <SkeletonTheme baseColor="#313131" highlightColor="#525252">
                <Skeleton height={180} style={{ marginBottom: "1rem" }} />
                <Skeleton
                  count={3}
                  height={20}
                  width="100%"
                  style={{ marginBottom: "0.5rem" }}
                />
              </SkeletonTheme>
              <div
                className={EventCardModal.card}
              >
                {isLoading ? (
                  <ComponentLoading
                    customStyles={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <button
                      className={EventCardModal.closeModal}
                      onClick={handleModalClose}
                    >
                      <X />
                    </button>
                    <div className={EventCardModal.backimg}>
                      <img
                        src=  "https://www.politics.ox.ac.uk/themes/custom/olamalu_dpir_emulsify/images/fb_event_image.png"
                        className={EventCardModal.img}
                        alt="Event"
                      />
                      <div className={EventCardModal.date}>{formattedDate}</div>
                      {info.ongoingEvent && (
                        <div
                          className={EventCardModal.share}
                          onClick={handleShare}
                        >
                          <img
                            className={EventCardModal.shareIcon}
                            src={shareOutline}
                            alt="Share"
                          />
                        </div>
                      )}
                    </div>
                    <div className={EventCardModal.backbtn}>
                      <div className={EventCardModal.eventname}>
                        {info.eventTitle}
                        <p>
                          <img src={groupIcon} alt="Group" />
                          Team size: {info.minTeamSize}
                          {" - "}
                          {info.maxTeamSize}
                        </p>
                        <div className={EventCardModal.price}>
                          {info.eventAmount ? (
                            <p>
                              <img src={rupeeIcon} alt="Rupee" />
                              {info.eventAmount}
                            </p>
                          ) : (
                            <p style={{ color: "inherit" }}>Free</p>
                          )}
                        </div>
                      </div>
                      <div className={EventCardModal.registerbtn}>
                        <button
                          className={EventCardModal.registerbtn}
                          style={{
                            cursor:
                              btnTxt === "Register Now"
                                ? "pointer"
                                : "not-allowed",
                          }}
                          onClick={handleForm}
                          disabled={
                            btnTxt === "Closed" ||
                            btnTxt === "Already Registered" ||
                            btnTxt === "Already Member"
                          }
                        >
                          {btnTxt === "Closed" ? (
                            <>
                              <div style={{ fontSize: "0.85rem" }}>
                                Registration Closed
                              </div>{" "}
                              <IoIosLock
                                alt=""
                                style={{
                                  marginLeft: "0px",
                                  fontSize: "1.2rem",
                                }}
                              />
                            </>
                          ) : btnTxt === "Already Registered" ? (
                            <>
                              <div style={{ fontSize: "0.85rem" }}>
                                Already Registered
                              </div>{" "}
                            </>
                          ) : isMicroLoading ? (
                            <div style={{ fontSize: "0.9rem" }}>
                              <MicroLoading />
                            </div>
                          ) : (
                            <>
                              {remainingTime ? (
                                <>
                                  <PiClockCountdownDuotone /> {btnTxt}
                                </>
                              ) : btnTxt === "Already Member" ? (
                                <>
                                  <div style={{ fontSize: "0.9rem" }}>
                                    Already Member
                                  </div>{" "}
                                </>
                              ) : (
                                "Register Now"
                              )}
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className={EventCardModal.backtxt}>
                      {info.eventdescription}
                    </div>
                  </div>
                )}
              </div>
              {isOpen && <Share onClose={handleShare} urlpath={url} />}
            </>
          )}
        </div>
        {/* </div> */}
      </div>
      <Alert />
    </div>
  );
};

export default EventModal;
