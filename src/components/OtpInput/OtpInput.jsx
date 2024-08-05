import React, { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";
import { RecoveryContext } from "../../context/RecoveryContext";
import Button from "../Core/Button";
import Input from "../Core/Input";
import style from "./style/otpinput.module.scss";
import { useNavigate } from "react-router-dom";
import { X } from 'lucide-react';

const OtpInput = (props) => {

  const { email, otp } = useContext(RecoveryContext);
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState(["", "", "", ""]);
  const [disable, setDisable] = useState(true);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [error, setError] = useState("");

  const{isSignUp,onHandleVerfiy,handleClose}=props;

  useEffect(() => {
    console.log("OtpInputPage", otp);
  }, [otp]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        if (lastTimerCount <= 1) {
          clearInterval(interval);
          setDisable(false);
        }
        return lastTimerCount <= 0 ? lastTimerCount : lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [disable]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value) || value === "") {
      const newOTPinput = [...OTPinput];
      newOTPinput[index] = value;
      setOTPinput(newOTPinput);
      if (value !== "" && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !OTPinput[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const resendOTP = () => {
    if (disable) return;
    axios
      .post("http://localhost:5000/send_recovery_email", { OTP: otp, recipient_email: email })
      .then(() => {
        setDisable(true);
        alert("A new OTP has been sent to your email.");
        setTimer(60);
      })
      .catch(console.error);
  };

  const verifyOTP = () => {
    const enteredOTP = OTPinput.join("");
    if (enteredOTP === String(otp)) {
      navigate('/reset');
    } else {
      alert("Incorrect OTP, please try again or resend.");
    }
  };

  const changePassword = (e) => {
    e.preventDefault();
    if (password !== cnfPassword) {
      setError("Passwords do not match");
      return;
    }
    // axios
    //   .post("http://localhost:5000/reset_password", { email, password })
    //   .then(() => {
    //     navigate('/Login');
    //     alert("Password reset successfully");
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     setError("Failed to reset password");
    //   });
    navigate('/Login');
    alert("Password reset successfully");
  };


  const handleVerifySignUp=()=>{
    // console.log("hello");
    const enteredOTP = OTPinput.join("");
    // console.log(enteredOTP);
    // console.log(password);
    onHandleVerfiy(enteredOTP);

    }

  return (
    <div className={style.innerBox1} style={{background: isSignUp? '#1c1c1c':''}}>
    { isSignUp &&  <div onClick={handleClose} style={{
                  position:"absolute",
                  top:"1rem",
                  right:"1rem",
                  color: "#fff",
                  cursor:"pointer",
               }}>
          <X/>
          </div>   
}
      <div className={style.innerBox2}>
        <div className={style.innerTitle}>
          <div className={style.innerTitlediv}>
            <p className={style.verifyTitle}>Email Verification</p>
          </div>
          <div className={style.innerTitle2}>
            <p>We have sent a code to your email {email}</p>
          </div>
        </div>
        <div>
          <form>
            <div className={style.formdiv1}>
              <div className={style.otpcontainer}>
                {OTPinput.map((_, index) => (
                  <div className={style.otpBox} key={index}>
                    <input
                      ref={(el) => (inputRefs.current[index] = el)}
                      maxLength="1"
                      className={style.singleInput}
                      type="text"
                      value={OTPinput[index]}
                      onChange={(e) => handleChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className={style.innerdiv3}>
              <span className={style.emailTitle}>Didn't receive code?</span>
              <button
                type="button"
                className={style.button}
                style={{
                  color: disable ? "gray" : "white",
                  cursor: disable ? "none" : "pointer",
                  textDecorationLine: disable ? "none" : "underline",
                }}
                onClick={resendOTP}
                disabled={disable}
              >
                {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {isSignUp ? (
        <>

 
        {error && <p style={{ color: "red" }}>{error}</p>}
          <div className={style.buttondiv}>
            <div>
              <Button
                onClick={handleVerifySignUp}
                style={{
                  width: "100%",
                  background: "var(--primary)",
                  color: "#fff",
                  height: "45px",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                Verify Email
              </Button>
            </div>
            </div>
            </>
      ) : (
        <form className={style.formdiv} onSubmit={changePassword}>
          <div style={{ width: "97%", marginLeft: "auto", marginRight: "auto" }}>
            <Input
              type="password"
              placeholder="Enter your password"
              label="New Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ width: '97%', marginLeft: "auto", marginRight: "auto" }}>
            <Input
              type="password"
              placeholder="Confirm your password"
              label="Confirm Password"
              name="cnfPassword"
              value={cnfPassword}
              onChange={(e) => setCnfPassword(e.target.value)}
              required
              style={{ width: "100%" }}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className={style.buttondiv}>
            <div>
              <Button
                onClick={verifyOTP}
                style={{
                  width: "100%",
                  background: "var(--primary)",
                  color: "#fff",
                  height: "45px",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                Verify Email
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default OtpInput;
