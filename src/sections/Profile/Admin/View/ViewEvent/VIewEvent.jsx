import { useState, useEffect } from "react";
import styles from "./styles/ViewEvent.module.scss";
import { EventCard } from "../../../../../components";
import { ComponentLoading } from "../../../../../microInteraction";
import FormData from "../../../../../data/FormData.json";
import { api } from "../../../../../services";

function ViewEvent({ handleChangePage }) {
  const [activePage, setActivePage] = useState("View Events");
  const [pastEvents, setPastEvents] = useState([]);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSection, setSelectedSection] = useState("ongoing");

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await api.get("/api/form/getAllForms");
        if (response.status === 200) {
          const fetchedEvents = response.data.events;
          console.log("incoming response",response.data)
          console.log("fetched events",fetchedEvents);
          const sortedEvents = fetchedEvents.sort(
            (a, b) => new Date(b.info.eventDate) - new Date(a.info.eventDate)
          );
          const ongoing = sortedEvents.filter(
            (event) => !event.info.isEventPast
          );
          const past = sortedEvents.filter((event) => event.info.isEventPast);
          setOngoingEvents(ongoing);
          setPastEvents(past);
        } else {
          throw new Error(response.data.message || "Error fetching events");
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
        // setError({
        //   message:
        //     "Sorry for the inconvenience, we are having issues fetching our Events",
        // });
        const testEvents = FormData.events || [];
        const sortedTestEvents = testEvents.sort(
          (a, b) => new Date(b.info.eventDate) - new Date(a.info.eventDate)
        );
        const ongoing = sortedTestEvents.filter(
          (event) => !event.info.isEventPast
        );
        const past = sortedTestEvents.filter((event) => event.info.isEventPast);
        setOngoingEvents(ongoing);
        setPastEvents(past);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventData();
  }, []);

  const customStyles = {
    eventname: {
      fontSize: "0.9rem",
    },
    date: {
      fontSize: "0.9rem",
    },
    registerbtn: {
      width: "auto",
    },
    eventnamep: {
      fontSize: "0.5rem",
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <h3 className={styles.headInnerText}>
          <span>View</span> Event
        </h3>
      </div>

      <form className={styles.form}>
        {activePage === "View Events" && (
          <div className={styles.eventListContainer}>
            {error ? (
              <div className={styles.error}>{error.message}</div>
            ) : (
              <>
                <div className={styles.tabContainer}>
                  <h4
                    className={`${styles.tabHeading} ${
                      selectedSection === "ongoing" ? styles.activeTab : ""
                    }`}
                    onClick={() => setSelectedSection("ongoing")}
                  >
                    Ongoing Events
                  </h4>
                  <h4
                    className={`${styles.tabHeading} ${
                      selectedSection === "past" ? styles.activeTab : ""
                    }`}
                    onClick={() => setSelectedSection("past")}
                  >
                    Past Events
                  </h4>
                </div>
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
                  <div className={styles.eventSectionContainer}>
                    {selectedSection === "ongoing" && (
                      <div className={styles.eventSection}>
                        {ongoingEvents.length === 0 ? (
                          <p>No ongoing events at the moment.</p>
                        ) : (
                          <div className={styles.eventGrid}>
                            {ongoingEvents.map((event, index) => (
                              <div
                                key={index}
                                className={styles.eventCardContainer}
                              >
                                <EventCard
                                  data={event}
                                  customStyles={customStyles}
                                  type="ongoing"
                                  modalpath="/profile/Events/"
                                  isPastpage={true}
                                  aosDisable={true}
                                  onEdit={() => handleChangePage("Form")}
                                  enableEdit={true}
                                  onHover={() =>
                                    console.log("Ongoing Event Hovered")
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {selectedSection === "past" && (
                      <div className={styles.eventSection}>
                        {pastEvents.length === 0 ? (
                          <p>No past events available.</p>
                        ) : (
                          <div className={styles.eventGrid}>
                            {pastEvents.map((event, index) => (
                              <div
                                key={index}
                                className={styles.eventCardContainer}
                              >
                                <EventCard
                                  data={event}
                                  customStyles={customStyles}
                                  type="past"
                                  modalpath="/profile/Events/"
                                  isPastpage={true}
                                  aosDisable={true}
                                  onEdit={() => handleChangePage("Form")}
                                  enableEdit={true}
                                  onHover={() =>
                                    console.log("Past Event Hovered")
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

export default ViewEvent;
