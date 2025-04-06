import React, { useRef, useEffect } from "react";

import "./Modal.css";

const Modal = ({
  children,
  open,
  setShowModal,
  heading,
  buttonText,
  buttonIcon,
  buttonClassName,
}) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && dialog && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog?.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        type="button"
        data-modal="true"
        className={`btn ${buttonClassName}`}
      >
        {buttonIcon && (
          <i aria-hidden="true" className={`fa-solid ${buttonIcon}`}></i>
        )}
        {buttonText}
      </button>

      {open && (
        <dialog
          className="modal-wrapper"
          ref={dialogRef}
          onClose={() => setShowModal(false)}
        >
          <div className="modal-container">
            <div className="modal-inner">
              <div className="modal-header">
                <h3 className="modal-heading">{heading}</h3>
                <button
                  aria-label="Close modal"
                  aria-expanded={open}
                  className="modal-close-btn"
                  onClick={() => setShowModal(false)}
                >
                  <i className="fa-regular fa-xmark"></i>
                </button>
              </div>
              <div className="modal-content">{children}</div>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default Modal;
