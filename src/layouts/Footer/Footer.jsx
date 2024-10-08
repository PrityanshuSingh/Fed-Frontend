import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import {
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaMediumM,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import styles from "./styles/Footer.module.scss";

export default function Footer() {
  const location = useLocation();
  const isOmega = location.pathname.includes("/Omega");

  return (
    <section id={styles.footer}>
      <footer className={styles.f1}>
        <div className={styles.logodiv}>
          <img
            className={styles.fedlogo}
            src="https://uploads-ssl.webflow.com/629d87f593841156e4e0d9a4/62eeaa9927e6aea4ff13590e_FedLogo.png"
            alt="fedlogo"
          />
          <p className={styles.fed}>FED</p>
        </div>
        <div className={styles.flexdiv}>
          <div className={styles.footerleft}>
            <div className={styles.footerright}>
              <div className={styles.row2}>
                <h4>Explore</h4>
                <Link
                  to="/"
                  className={`${styles.footerleftlink} ${
                    isOmega ? styles.omegaLink : ""
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/Events"
                  className={`${styles.footerleftlink} ${
                    isOmega ? styles.omegaLink : ""
                  }`}
                >
                  Events
                </Link>
                <Link
                  to="/Team"
                  className={`${styles.footerleftlink} ${
                    isOmega ? styles.omegaLink : ""
                  }`}
                >
                  Team
                </Link>
              </div>
            </div>

            <div className={styles.row1}>
              <h4>Community</h4>
              <HashLink
                smooth
                to="/#Contact"
                className={`${styles.footerleftlink} ${
                  isOmega ? styles.omegaLink : ""
                }`}
              >
                Contact
              </HashLink>
              <Link
                to="/Alumni"
                className={`${styles.footerleftlink} ${
                  isOmega ? styles.omegaLink : ""
                }`}
              >
                Alumni
              </Link>
              <a
                href="http://medium.com/@fedkiit"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.footerleftlink} ${
                  isOmega ? styles.omegaLink : ""
                }`}
              >
                Blog
              </a>
            </div>

            <div className={styles.row2}>
              <h4>About Us</h4>
              <HashLink
                smooth
                to="/Manifesto"
                className={`${styles.footerleftlink} ${
                  isOmega ? styles.omegaLink : ""
                }`}
              >
                Manifesto
              </HashLink>
              <HashLink
                smooth
                to="/#Sponser"
                className={`${styles.footerleftlink} ${
                  isOmega ? styles.omegaLink : ""
                }`}
              >
                Partners
              </HashLink>
            </div>

            <div className={styles.footerright}>
              <h4 className={styles.socialh4}>Social</h4>
              <div className={styles.icondiv2}>
                <a
                  href="https://www.linkedin.com/company/fedkiit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.link1} ${
                    isOmega ? styles.omegaSocialLink : ""
                  }`}
                >
                  <FaLinkedin
                    className={`${styles.icon} ${
                      isOmega ? styles.omegaSocialLink : ""
                    }`}
                  />
                </a>
                <a
                  href="https://www.instagram.com/fedkiit?igsh=amNpM3UxMjE1d3Iy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.link1} ${
                    isOmega ? styles.omegaSocialLink : ""
                  }`}
                >
                  <FaInstagram
                    className={`${styles.icon} ${
                      isOmega ? styles.omegaSocialLink : ""
                    }`}
                  />
                </a>
                <a
                  href="http://twitter.com/federation_kiit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.link1} ${
                    isOmega ? styles.omegaSocialLink : ""
                  }`}
                >
                  <FaXTwitter
                    className={`${styles.icon} ${
                      isOmega ? styles.omegaSocialLink : ""
                    }`}
                  />
                </a>
                <a
                  href="https://youtube.com/@federationkiit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.link1} ${
                    isOmega ? styles.omegaSocialLink : ""
                  }`}
                >
                  <FaYoutube
                    className={`${styles.icon} ${
                      isOmega ? styles.omegaSocialLink : ""
                    }`}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottomleft}>
          <p>Made with ❤️ from Federation of Entrepreneurship Development</p>
        </div>

        <div className={styles.bottomdiv}>
          <div className={styles.terms_and_policies}>
            <div className={styles.tap1Div}>
              <Link
                to="/TermsAndConditions"
                className={`${styles.Linkstyles} ${
                  isOmega ? styles.omegaLink : ""
                }`}
              >
                Terms and conditions
              </Link>
              <p>&</p>
              <Link
                to="/PrivacyPolicy"
                className={`${styles.Linkstyles} ${
                  isOmega ? styles.omegaLink : ""
                }`}
              >
                Privacy policy
              </Link>
            </div>
            <div className={styles.tnpMDiv}>
              <p className={styles.copyrightPTag}>© 2024, fedkiit</p>
            </div>
            {/* <div className={styles.dotDiv}></div> */}
          </div>
        </div>
      </footer>
    </section>
  );
}
