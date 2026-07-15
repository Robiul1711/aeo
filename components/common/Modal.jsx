"use client";
import React, { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

const Modal = ({ open, onClose, children, containerClassName = "" }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Cleanup overflow styling on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 transition-all duration-300">
      {/* Backdrop area click handler to close modal */}
      <div className="absolute inset-0 bg-transparent" onClick={onClose}></div>
      
      {/* Modal Container */}
      <div className={`relative z-10 w-full max-h-[calc(100vh-40px)] overflow-y-auto ${containerClassName}`}>
        {children}

        {/* Close button with premium micro-interactions */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer z-50 grid place-items-center p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all duration-300 text-white hover:text-primary active:scale-95"
          aria-label="Close modal"
        >
          <RxCross2 className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Modal;
