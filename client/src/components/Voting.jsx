import React, { useContext, useState, useEffect } from "react";
import API from "../api/axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import Swal

// Logo images for each party
const partyLogos = {
  BJP: "https://i.pinimg.com/736x/e7/5d/84/e75d84ae6a4544aed7a219969d6ce8eb.jpg", // Example logo URL for BJP
  INC: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Indian_National_Congress_hand_logo.svg", // Example logo URL for INC
  AAP: "https://images.hindustantimes.com/rf/image_size_640x362/HT/p1/2014/02/27/Incoming/Pictures/1188878_Wallpaper2.jpg", // Example logo URL for AAP
  BSP: "https://allpngfree.com/apf-prod-storage-api/storage/thumbnails/bsp-elephant-logo-png-images--thumbnail-1673714518.jpg" // Example logo URL for BSP
};

const Voting = () => {
  const { user } = useContext(AuthContext);
  const [party, setParty] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
  const [hasVoted, setHasVoted] = useState(false); // State to check if the user has voted
  const navigate = useNavigate();

  // Check if the user has voted on component mount
  useEffect(() => {
    const votedStatus = localStorage.getItem(`${user.username}_hasVoted`);
    if (votedStatus === "true") {
      setHasVoted(true);
    }
  }, [user.username]);

  const handleVote = async () => {
    try {
      await API.post(
        "/vote",
        { party, voter: user.username },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      // Save vote status to localStorage using the unique key for the user
      localStorage.setItem(`${user.username}_hasVoted`, "true");
      setHasVoted(true);

      // Show success notification using Swal
      Swal.fire({
        title: 'Vote Cast Successfully!',
        text: 'Your vote has been successfully recorded.',
        icon: 'success',
        confirmButtonText: 'Okay'
      });

      // Navigate to the results page after the vote is cast
      navigate("/results");

    } catch (err) {
      console.error(err.response.data.message);

      // Show error notification using Swal
      Swal.fire({
        title: 'Failed to Cast Vote!',
        text: 'There was an issue with your vote submission. Please try again.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-blue-600 min-h-screen flex items-center justify-center px-2">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Cast Your Vote</h1>

        <div className="mb-4 relative">
          <label htmlFor="party" className="block text-gray-700 text-lg mb-2">Select Party</label>

          {/* Custom Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full p-3 border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {party ? (
                <div className="flex items-center">
                  <img src={partyLogos[party]} alt={party} className="w-6 h-6 mr-2" />
                  <span>{party}</span>
                </div>
              ) : (
                "Select Party"
              )}
            </button>

            {isDropdownOpen && (
              <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {Object.keys(partyLogos).map((partyName) => (
                  <li
                    key={partyName}
                    onClick={() => {
                      setParty(partyName);
                      setIsDropdownOpen(false); // Close dropdown after selection
                    }}
                    className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
                  >
                    <img src={partyLogos[partyName]} alt={partyName} className="w-6 h-6 mr-2" />
                    <span>{partyName}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <button
          onClick={handleVote}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-300"
          disabled={hasVoted} // Disable button if the user has already voted
        >
          {hasVoted ? "You Have Voted" : "Vote"}
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-600">You are voting as: <span className="font-semibold text-gray-800">{user.username}</span></p>
        </div>
      </div>
    </div>
  );
};

export default Voting;
