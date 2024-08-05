import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Alert, ComponentLoading } from "../../../../microInteraction";
import { X } from "lucide-react";
import Text from "../../../../components/Core/Text";
import defaultImg from "../../../../assets/images/defaultImg.jpg";
import { api } from "../../../../services";
import styles from "../EventModal/styles/EventModal.module.scss";
import FormData from "../../../../data/FormData.json";

const EventStats = ({ onClosePath }) => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [info, setInfo] = useState({});
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/api/form/getEvent/${eventId}`);
        if (response.status === 200) {
          setData(response.data);
          setInfo(response.data.info);
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

        const { events } = FormData;
        const data = events.find((event) => event._id === parseInt(eventId));
        setData(data);
        setInfo(data.info);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  useEffect(() => {
    if (alert) {
      const { type, message, position, duration } = alert;
      Alert({ type, message, position, duration });
      setAlert(null); // Reset alert after displaying it
    }
  }, [alert]);

  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
    }
  }, [searchQuery]);

  const handleModalClose = () => {
    navigate(onClosePath);
  };

  const filteredUsers = info.registeredUsers?.filter((user) =>
    user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: "10",
        left: 0,
        top: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
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
                style={{
                  overflowY: "auto",
                }}
                className={styles.card}
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
                      className={styles.closeModal}
                      onClick={handleModalClose}
                      style={{ paddingTop: "30px", paddingRight: "10px" }}
                    >
                      <X />
                    </button>

                    <div className={styles.backbtn}>
                      <div
                        className={styles.eventname}
                        style={{ paddingTop: "15px" }}
                      >
                        {info.eventTitle}
                      </div>
                    </div>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: "1rem",
                        fontWeight: "500",
                        textAlign: "left",
                        marginBottom: "1rem",
                        marginLeft: "2rem",
                      }}
                    >
                      Total Registered Users :{" "}
                      <span
                        style={{
                          color: "#FF8A00",
                        }}
                      >
                        {info.registeredUsers?.length || 0}
                      </span>
                    </Text>
                    <input
                      type="text"
                      placeholder="Search by email"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={styles.searchInput}
                    />
                    <div className={styles.eventEmails}>
                      {isSearching ? (
                        <ComponentLoading
                          customStyles={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "-0.4rem",
                          }}
                        />
                      ) : filteredUsers.length > 0 ? (
                        filteredUsers.map((email, index) => (
                          <div key={index} className={styles.userCard}>
                            <img
                              src={defaultImg}
                              alt="User"
                              className={styles.userImg}
                            />
                            <div className={styles.userEmail}>{email}</div>
                          </div>
                        ))
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            width: "100%",
                            color: "#fff",
                            fontSize: "1rem",
                          }}
                        >
                          No users found.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <Alert />
    </div>
  );
};

export default EventStats;
