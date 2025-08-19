// src/components/ConfirmationModal.jsx
import React from "react";
import { AlertTriangle } from "lucide-react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null; // don't render if modal is closed

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[19rem] md:w-full max-w-sm rounded-xl bg-black/40 border border-gray-500 backdrop-blur-md p-6 shadow-lg">
        {/* Title */}
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-200">
          <AlertTriangle className="text-red-500" size={20} />
          {title}
        </div>

        {/* Body */}
        <div className="mt-3 text-sm text-gray-100">{children}</div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-200 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
