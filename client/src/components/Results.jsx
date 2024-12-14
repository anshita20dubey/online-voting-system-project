import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const Results = () => {
  const [voteSuccess, setVoteSuccess] = useState(false);

  useEffect(() => {
    const socket = io("http://localhost:7777");

    socket.on("vote-update", (data) => {
      console.log(data); // Check the data format
      // Assuming that receiving vote update indicates success
      setVoteSuccess(true);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-blue-600 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Vote Results</h1>

        <div className="text-center p-6">
          {voteSuccess ? (
            <p className="text-green-500 font-semibold text-xl">Vote successfully recorded!</p>
          ) : (
            <p className="text-gray-500 font-medium text-lg">Waiting for a vote update...</p>
          )}
        </div>

        <div className="text-center">

          <a className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 px-3 py-1" href="/">
            Return Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Results;
