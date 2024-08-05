/* eslint-disable no-unused-vars */
import React from 'react';
import { Hero, About, Sponser, Feedback, Contact } from "../../sections";
import { ChatBot, LiveEventPopup } from "../../features";

const Home = () => {

  window.scrollTo(0, 0);

  return (
    <>
      <LiveEventPopup />
      <Hero />
      <ChatBot />
      <About />
      <section id="Sponser">
        <Sponser />
      </section>
      <section id="Contact">
        <Contact />
      </section>
      <Feedback />
    </>
  );
};

export default Home;
