// StarRating.jsx
import React from 'react';

const StarRating = ({ rating }) => {
  // Generate an array of star elements based on the rating value
  const stars = Array.from({ length: 5 }, (_, index) => (
    <svg
      key={index}
      className={`w-5 h-5 ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 15l-5.878 3.09 1.122-6.55L0 6.545l6.657-.975L10 0l3.343 5.57 6.657.975-4.244 4.995 1.122 6.55L10 15z"
      />
    </svg>
  ));

  return <div className="flex">{stars}</div>;
};

export default StarRating;
