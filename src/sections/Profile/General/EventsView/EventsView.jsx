import { useContext, useEffect, useState } from "react";
import styles from "./styles/EventsView.module.scss";
import AuthContext from "../../../../context/AuthContext";
import eventsData from "../../../../data/FormData.json";
import { Link } from "react-router-dom";
import { api } from "../../../../services";
import { ComponentLoading } from "../../../../microInteraction";

const Events = () => {
  const authCtx = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const viewPath = "/profile/Events";
  const analyticsPath = "/profile/Events/Analytics";

  const analyticsAccessRoles = [
    "PRESIDENT",
    "VICEPRESIDENT",
    "DIRECTOR_CREATIVE",
    "DIRECTOR_TECHNICAL",
    "DIRECTOR_MARKETING",
    "DIRECTOR_OPERATIONS",
    "DIRECTOR_SPONSORSHIP",
    "ADMIN",
    "GUEST"
  ];

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const response = await api.get("/api/form/getAllForms");
        const userEvents = authCtx.user.regForm;

        if (response.status === 200) {
          let fetchedEvents = response.data.events;
          if (authCtx.user.access !== "USER") {
            // Set events for non-users
            setEvents(sortEventsByDate(fetchedEvents));
          } else {
            // Filter and then sort events for users
            const filteredEvents = fetchedEvents.filter((event) =>
              userEvents.includes(event._id)
            );
            setEvents(sortEventsByDate(filteredEvents));
          }
        } else {
          console.error("Error fetching event data:", response.data.message);
          setError({
            message:
              "Sorry for the inconvenience, we are having issues fetching your Events",
          });
        }
      } catch (error) {
        setError({
          message:
            "Sorry for the inconvenience, we are having issues fetching your Events",
        });
        console.error("Error fetching team members:", error);

        const userEvents = authCtx.user.regForm;
        // using local JSON data
        let localEvents = eventsData.events;
        if (authCtx.user.access !== "USER") {
          setEvents(sortEventsByDate(localEvents));
        } else {
          const filteredEvents = localEvents.filter((event) =>
            userEvents.includes(event._id)
          );
          setEvents(sortEventsByDate(filteredEvents));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventsData();
  }, [authCtx.user.email]);

  const sortEventsByDate = (events) => {
    return events.sort((a, b) => new Date(b.info.eventDate) - new Date(a.info.eventDate));
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString)
      .toLocaleDateString("en-GB", options)
      .replace(/\//g, "-");
  };

  return (
    <div className={styles.participatedEvents}>
      {authCtx.user.access !== "USER" ? (
        <div className={styles.proHeading}>
          <h3 className={styles.headInnerText}>
            <span>Events</span> Timeline
          </h3>
        </div>
      ) : (
        <div className={styles.proHeading}>
          <h3 className={styles.headInnerText}>
            <span>Participated</span> Events
          </h3>
        </div>
      )}

      {isLoading ? (
        <ComponentLoading />
      ) : (
        <>
          {error && <div className={styles.error}>{error.message}</div>}

          <div className={styles.tables}>
            {events.length > 0 ? (
              <table className={styles.eventsTable}>
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Event Date</th>
                    <th className={styles.mobilewidth}>Details</th>
                    {analyticsAccessRoles.includes(authCtx.user.access) && (
                      <th className={styles.mobilewidth}>Registrations</th>
                    )}
                    {/* Add more headers */}
                  </tr>
                </thead>

                <tbody>
                  {events.map((event) => (
                    <tr key={event._id}>
                      <td style={{ fontWeight: "500" }}>
                        {event.info.eventTitle}
                      </td>
                      <td style={{ fontWeight: "500" }}>
                        {formatDate(event.info.eventDate)}
                      </td>

                      <td className={styles.mobilewidthtd}>
                        <Link to={`${viewPath}/${event._id}`}>
                          <button
                            className={styles.viewButton}
                            style={{
                              marginLeft: "auto",
                              whiteSpace: "nowrap",
                              height: "fit-content",
                              color: "orange",
                            }}
                          >
                            View
                          </button>
                        </Link>
                      </td>
                      {analyticsAccessRoles.includes(authCtx.user.access) && (
                        <td className={styles.mobilewidthtd}>
                          <Link to={`${analyticsPath}/${event._id}`}>
                            <button
                              className={styles.viewButton}
                              style={{
                                marginLeft: "auto",
                                whiteSpace: "nowrap",
                                height: "fit-content",
                                color: "orange",
                              }}
                            >
                              View
                            </button>
                          </Link>
                        </td>
                      )}
                      {/* Add more table cells */}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className={styles.noEvents}>Not participated in any Events</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Events;
