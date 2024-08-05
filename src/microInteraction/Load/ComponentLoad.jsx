import React, { useEffect, useState } from "react";
import { Riple } from "react-loading-indicators";
import PropTypes from "prop-types";

const ComponentLoading = ({ customStyles = {} }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const baseStyles = {
    height: "50%",
    padding: "3rem",
    marginTop: "3rem",
    marginBottom: "3rem",
    display: "flex",
    justifyContent: "center",
    ...customStyles, // Merge custom styles with base styles
    marginLeft: isMobile ? "0rem" :  customStyles.marginLeft,
  };

  return (
    <div style={baseStyles}>
      <Riple color="#FF5C00" size="large" text="" textColor="" />
    </div>
  );
};

ComponentLoading.propTypes = {
  customStyles: PropTypes.object,
};

export default ComponentLoading;
