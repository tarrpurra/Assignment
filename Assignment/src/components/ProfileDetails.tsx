import { useState } from "react";

export default function ProfileDetails() {
  const [rating, setRating] = useState(0);

  return (
    <div className="w-full h-full bg-white p-8">
      
      <h2 className="text-xl font-semibold text-black mb-6">User Profile</h2>

      
      <div className="bg-[#91E0DC] p-10 rounded-md">
        <div className="flex gap-10 justify-start">
          {/* Profile Card */}
          <div className="bg-white shadow-md rounded-lg p-6 w-[300px] text-center relative">
            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              alt="Profile Icon"
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <div className="text-sm text-left space-y-1">
              <p>
                <strong>Username:</strong> johndoe
              </p>
              <p>
                <strong>Contact Number:</strong> +91-1234567890
              </p>
              <p>
                <strong>Email:</strong> john@example.com
              </p>
              <p>
                <strong>Department:</strong> IT Support
              </p>
            </div>
            <span className="absolute top-4 right-4 cursor-pointer text-xl">
              📋
            </span>
          </div>

          {/* Feedback Box */}
          <div className="bg-white shadow-md rounded-lg p-6 w-[300px] text-center">
            <h3 className="text-sm font-semibold mb-2">Give Your Feedback</h3>
            <textarea
              placeholder="[Lorem Ipsum]"
              className="w-full p-2 border border-gray-300 rounded mb-4 h-20 resize-none text-sm"
            />
            {/* Star Rating */}
            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={`cursor-pointer text-xl ${
                    rating >= star ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <button className="bg-[#55D6C2] text-white px-4 py-2 rounded hover:bg-[#3fcab1]">
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
