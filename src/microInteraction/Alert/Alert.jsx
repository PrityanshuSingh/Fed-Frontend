import React from 'react';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

const Alert = ({ type, message, position, duration, style }) => {
  const notify = () => {
    const options = {
      position: position || 'top-right',
      autoClose: duration || 5000,
      style: style || {},
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };

    const toastId = "custom-id";
    
    // setTimeout(() => toast.dismiss(toastId), options.autoClose);
   

    if (!toast.isActive(toastId)) {
      switch (type) {
        case 'success':
          toast.success(message, { 
            ...options, 
            style : { 
              border: '1.5px solid green',
              backgroundColor: '#d3f9d3', 
              color: '#198754' 
            },  
            toastId });
          break;
        case 'error':
          toast.error(message, { 
            ...options, 
            style: { 
              border: '1.5px solid red',
              backgroundColor: '#FADADD', 
              color: 'red' 
            },
            toastId });
          break;
        case 'info':
          toast.info(message, { ...options, toastId });
          break;
        case 'warning':
          toast.warning(message, { ...options, toastId });
          break;
        default:
          toast(message, { ...options, toastId });
          break;
      }
    }
  };

  if (message) {
    notify();
  }

  return <ToastContainer transition={Slide}/>;
};

Alert.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
  position: PropTypes.string,
  duration: PropTypes.number,
  style: PropTypes.object,
};

export default Alert;
