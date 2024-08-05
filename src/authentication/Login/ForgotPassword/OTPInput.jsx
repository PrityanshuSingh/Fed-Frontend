import React, { useState, useRef, useContext, useEffect } from "react";
import style from "./styles/OTPInput.module.scss"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import OtpInput from "../../../components/OtpInput/OtpInput";

export default function OTPInput() {
  const navigate = useNavigate();
  return (
    <div className={style.outerBox}>
      <div className={style.circle}>
        <div></div>
      </div>
      <div className={style.circle1}></div>
      <div onClick={()=>navigate('/ForgotPassword')} className={style.ArrowBackIcon}>
            <ArrowBackIcon />
          </div>
       <OtpInput/>

    </div>
  );
}
