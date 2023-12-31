import { useEffect } from "react";
import "./SuccessPopup.css"; // Import your CSS file for styling

const Modal = ({ show, message }) => {
  useEffect(() => {
    let timeout;

    if (show) {
      timeout = setTimeout(() => {
        // Optionally, you can perform any cleanup or further actions here
      }, 3000); // Display for 3 seconds
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [show]);

  return (
    <>
      {show && (
        <div className="modal-popup">
          <div className="modal-content">
            <p>{message}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
