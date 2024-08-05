import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services";
import style from "./styles/Event.module.scss";
import { EventCard } from "../../components";
import { ChatBot } from "../../features";
import FormData from "../../data/FormData.json";
import ring from "../../assets/images/ring.svg";
import { MdKeyboardArrowRight } from "react-icons/md";
import { ComponentLoading } from "../../microInteraction";
import { RecoveryContext } from "../../context/RecoveryContext";
import Share from "../../features/Modals/Event/ShareModal/ShareModal";

const Event = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  const [eventData, setEventData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { events } = FormData;
  const [isOpen ,setOpenModal]=useState(false);
  const recoveryCtx=useContext(RecoveryContext);

  useEffect(()=>{
    if(recoveryCtx.teamCode && recoveryCtx.teamName){
      if(!isOpen){
        setOpenModal(true)
      }
    }
  },[recoveryCtx.teamCode]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/api/form/getAllForms");
        console.log(response.data);
        if (response.status === 200) {
          console.log(response.data.events);
          setEventData(response.data.events);
        } else {
          setError({
            message: "Sorry for the inconvenience, we are having issues fetching our Events",
          });
          console.error("Error fetching events:", response.data.message);
          setEventData(events);
        }
      } catch (error) {
        setError({
          message: "Sorry for the inconvenience, we are having issues fetching our Events",
        });
        console.error("Error fetching events:", error);
        setEventData(events);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [events]);

  // Ensure `eventData` is correctly filtered
  const ongoingEvents = eventData.filter((event) => !event.info.isEventPast);
  const pastEvents = eventData.filter((event) => event.info.isEventPast);
  console.log(eventData)


  const handleShare=()=>{
    if(recoveryCtx.teamCode && recoveryCtx.teamName){
     const{setTeamCode,setTeamName}=recoveryCtx;
     setTeamCode(null);
     setTeamName(null);
     setOpenModal(false);
    }
  }

  const customStyles = {
    eventname: {
      fontSize: "1.2rem",
    },
    registerbtn: {
      width: "8rem",
      fontSize: ".721rem",
    },
    eventnamep: {
      fontSize: "0.7rem",
    },
  };

  const teamCodeAndName ={
    teamCode:recoveryCtx.teamCode,
    teamName:recoveryCtx.teamName
  };

  return (
    <>
      <ChatBot />
      {isOpen && <Share onClose={handleShare} teamData={teamCodeAndName} />}
      <div className={style.main}>
        <div style={{ display: "flex" }}>
          <div className={style.line}></div>
          <div className={style.eventwhole}>
            {isLoading ? (
              <>
                <div className={style.eventcard}>
                  <div className={style.name}>
                    <img className={style.ringLoad} src={ring} alt="ring" />
                  </div>
                </div>
                <ComponentLoading
                  customStyles={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    marginTop: "5rem",
                    marginLeft: "-3rem",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </>
            ) : error ? (
              <div className={style.error}>{error.message}</div>
            ) : (
              <>
                {ongoingEvents.length > 0 && (
                  <div className={style.eventcard}>
                    <div className={style.name}>
                      <img className={style.ring1} src={ring} alt="ring" />
                      <span className={style.w1}>Ongoing</span>
                      <span className={style.w2}>Events</span>
                    </div>
                    <div className={style.cardsin}>
                      {ongoingEvents.map((event, index) => (
                        <div
                          style={{ height: "auto", width: "22rem" }}
                          key={index}
                        >
                          <EventCard
                            data={event}
                            onOpen={() => console.log("Event opened")}
                            type="ongoing"
                            customStyles={customStyles}
                            modalpath="/Events/"
                            aosDisable={false}
                            isLoading={isLoading} // Pass the loading state to each EventCard
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div
                  className={style.pasteventcard}
                  style={{
                    marginTop: ongoingEvents.length > 0 ? "6rem" : "1rem",
                  }}
                >
                  <div className={style.name}>
                    <img className={style.ring2} src={ring} alt="ring" />
                    <span className={style.w1}>Past</span>
                    <span className={style.w2}>Events</span>
                  </div>
                  <div className={style.cardone}>
                    {pastEvents.map((event, index) => (
                      <div
                        style={{ height: "auto", width: "22rem" }}
                        key={index}
                      >
                        <EventCard
                          data={event}
                          type="past"
                          customStyles={customStyles}
                          modalpath="/Events/pastEvents/"
                          isLoading={isLoading} // Pass the loading state to each EventCard
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className={style.bottom}>
          <Link to="/Events/pastEvents">
            <button className={style.seeall}>
              See all <MdKeyboardArrowRight />
            </button>
          </Link>
        </div>

        <div className={style.circle}></div>
        <div className={style.circleleft}></div>
        <div className={style.circleone}></div>
        <div className={style.circletwo}></div>
        <div className={style.circlethree}></div>
      </div>
    </>
  );
};

export default Event;
