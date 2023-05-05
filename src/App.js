import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.css";

function PhoneVerificationPopup() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handlePopupOpen = () => {
    setIsPopupVisible(true);
  };

  // useEffect(() => {
  //   inputRefs.current[0].focus();
  // }, []);

  const handleInput = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const newOtp = [...otp];
    for (let i = 0; i < pastedText.length; i++) {
      if (/^[0-9]*$/.test(pastedText[i])) {
        newOtp[i] = pastedText[i];
      }
    }
    setOtp(newOtp);
    inputRefs.current[0].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.keyCode === 8 && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.keyCode === 37 && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.keyCode === 39 && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };
  return (
    <div>
      {!isPopupVisible && (
        <div>
          <h1>Welcome to my website!</h1>
          <button onClick={handlePopupOpen}>Verify your phone number</button>
        </div>
      )}
      {isPopupVisible && (
        <div className="phone-verification-popup">
          <div className="popup-container">
            <h2>Phone Verification</h2>
            <p>Enter the OTP you recieved on 89****90*</p>
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  onChange={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={(e) => handlePaste(e)}
                />
              ))}
            </div>
            <button>Verify</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhoneVerificationPopup;
