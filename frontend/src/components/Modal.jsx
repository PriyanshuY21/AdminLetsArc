import React from "react";
import { X } from "lucide-react";

const Modal = ({ open, onClose, children }) => {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-10 flex items-center justify-center transition-colors ${open ? "visible bg-black1/80" : "invisible"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`rounded-xl bg-white1 p-6 shadow transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
      >
        <button
          className="absolute right-2 top-2 rounded-lg bg-white1 p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-700"
          onClick={onClose}
        >
          <X />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
