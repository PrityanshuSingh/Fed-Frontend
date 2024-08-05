import React, { useContext, useState } from "react";
import axios from "axios";
import { RecoveryContext } from "../../../context/RecoveryContext";
import Input from "../../../components/Core/Input";
import Button from "../../../components/Core/Button";
import style from "./styles/forgotPassword.module.scss";
import styles from "../../SignUp/style/Signup.module.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import 'react-toastify/dist/ReactToastify.css';
import resetStyle from "./styles/reset.module.scss"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { setEmail, email, setOTP, setPage } = useContext(RecoveryContext);
  const [loading, setLoading] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate=useNavigate();

  function navigateToOtp(e) {
    e.preventDefault(); // Prevent default form submission behavior
    if (email) {

      if (!emailRegex.test(email)) {
      toast.error("please enter a valid email address");
        return;
      }
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      console.log(OTP);
      setOTP(OTP); // Set OTP in context and local storage

      setLoading(true);
      navigate('/otp')
      setLoading(false);

      // axios
      //   .post("http://localhost:5000/send_recovery_email", { OTP, recipient_email: email })
      //   .then(() => {
      //     setPage("otp");
      //     toast.success("otp is sent to your email")
      //     setLoading(false);
      //   })
      //   .catch(error => {
      //     console.error("Error sending recovery email:", error);
      //     alert("Failed to send recovery email. Please try again later.");
      //     setLoading(false);
      //   });
    } else {
      alert("Please enter your email");
    }
  }

  return (
    <div>
      <section>
        <div>
          <div className={style.fullScreen}>

         
          <div onClick={()=>navigate("/Login")} className={styles.ArrowBackIcon}>
            <ArrowBackIcon />
          </div>
  
            <div className={style.circle}><div></div></div>
            <div className={style.circle1}></div>
            <div  className={style.primaryBox}>
              <form>
                <div className={style.boxTitle}>
                  <p className={style.emailTitle}>Reset Password</p>
                </div>
                <div style={{
                  marginbottom:"1.5rem"
                }}>
                  <Input
                    type="text"
                    placeholder="eg:something@gmail.com"
                    label="Enter email to reset password"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ width: "98%" }}
                  />
                </div>
                {/* Change <a> tag to <button> for better accessibility */}
                <Button
                  onClick={navigateToOtp}
                  disabled={loading}
                  style={{
                    width: "100%",
                    background: "var(--primary)",
                    color: "#fff",
                    height: "40px",
                    marginTop: "20px",
                    fontSize: "1rem",
                    cursor: "pointer",
                  }}
                >
                  {loading ? "Sending..." : "Send OTP"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
