import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import style from "./styles/PastEvent.module.scss";
import { ChatBot } from "../../features";
import { EventCard } from "../../components";
import { api } from "../../services";
// import EventData from '../../data/eventData.json';
import FormData from "../../data/FormData.json";
import { ComponentLoading } from "../../microInteraction";

const PastEvent = () => {
  const [pastEvents, setPastEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { events } = FormData;

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchPastEvents = async () => {
      try {
        const response = await api.get("/api/form/getAllForms");

        if (response.status === 200) {
          const pastEventData = response.data.filter(
            (event) => event.info.isEventPast
          );
          setPastEvents(pastEventData);
        } else {
          setError({
            message:
              "Sorry for the inconvenience, we are having issues fetching our Events",
          });
          console.error("Error fetching events:", response.data.message);
          // using local JSON data
          const pastEventData = events.filter(
            (event) => event.info.isEventPast
          );
          setPastEvents(pastEventData);
        }
      } catch (error) {
        setError({
          message:
            "Sorry for the inconvenience, we are having issues fetching our Events",
        });
        console.error("Error fetching events:", error);
        // using local JSON data
        const pastEventData = events.filter((event) => event.info.isEventPast);
        setPastEvents(pastEventData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPastEvents();
  }, [events]);

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

  return (
    <>
      <ChatBot />
      <div className={style.main}>
        <Link to={"/Events"}>
          <div className={style.ArrowBackIcon}>
            <ArrowBackIcon />
          </div>
        </Link>
        <div className={style.whole}>
          <div className={style.eventwhole}>
            {isLoading ? (
              <ComponentLoading />
            ) : !error ? (
              <div className={style.error}>{error.message}</div>
            ) : (
              <div className={style.pasteventCard}>
                <div className={style.name}>
                  <span className={style.w1}>Past</span>
                  <span className={style.w2}>Events</span>
                </div>
                <div className={style.Outcard}>
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
                          modalpath="/pastEvents/"
                          aosDisable={false}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={style.circle}></div>
          <div className={style.circleone}></div>
          <div className={style.circletwo}></div>
          <div className={style.circlethree}></div>
        </div>
      </div>
    </>
  );
};

export default PastEvent;
