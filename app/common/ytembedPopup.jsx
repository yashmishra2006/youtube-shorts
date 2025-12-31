import React from 'react';
import YouTube from 'react-youtube';

const Modal = ({ isOpen, onClose, youtubeID, playlist }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-5 w-full max-w-3xl relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        {/* YouTube Player */}
        <YouTube
          videoId={youtubeID}
          opts={{
            playerVars: {
              playlist: playlist,
            },
          }}
          className="w-full h-96" // Tailwind classes to make the player responsive
        />
      </div>
    </div>
  );
};

export default Modal;
