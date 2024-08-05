import React, { createContext, useState, useEffect } from 'react';

export const RecoveryContext = createContext();

const initialContext = {
  email: '',
  otp: '',
  teamCode: '',
  teamName: ''
};

const RecoveryContextProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    const storedEmail = localStorage.getItem('recoveryEmail') || '';
    const storedOTP = localStorage.getItem('recoveryOTP') || '';
    return {
      ...initialContext,
      email: storedEmail,
      otp: storedOTP,
      teamCode: '',
      teamName: ''
    };
  });

  const setEmail = (newEmail) => {
    localStorage.setItem('recoveryEmail', newEmail);
    setState(prevState => ({ ...prevState, email: newEmail }));
  };

  const setOTP = (newOTP) => {
    localStorage.setItem('recoveryOTP', newOTP);
    setState(prevState => ({ ...prevState, otp: newOTP }));
  };

  const setTeamCode = (newTeamCode) => {
    setState(prevState => ({ ...prevState, teamCode: newTeamCode }));
  };

  const setTeamName = (newTeamName) => {
    setState(prevState => ({ ...prevState, teamName: newTeamName }));
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem('recoveryEmail');
      localStorage.removeItem('recoveryOTP');
    };
  }, []);

  return (
    <RecoveryContext.Provider value={{ ...state, setEmail, setOTP, setTeamCode, setTeamName }}>
      {children}
    </RecoveryContext.Provider>
  );
};

export default RecoveryContextProvider;
