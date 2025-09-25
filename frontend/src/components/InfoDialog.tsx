// src/components/InfoDialog.tsx

import React from 'react';

interface InfoDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

const InfoDialog: React.FC<InfoDialogProps> = ({ isOpen, title, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl z-50 text-center">
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <p className="mb-6">{message}</p>
        <button onClick={onClose} className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700">
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default InfoDialog;