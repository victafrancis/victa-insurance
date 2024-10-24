// src/components/InsuranceInfo.js
import React from 'react';
import imgIvari from '../assets/ivari.png';

const InsuranceInfo = () => {
  return (
    <div className="p-6 bg-gray-100 rounded shadow-md">
      {/* Image Section */}
      <img
        src={imgIvari}
        alt="Insurance Illustration"
        className="w-full h-48 object-cover rounded mb-4"
      />

      {/* Text Section */}
      <h2 className="text-4xl font-semibold mb-2 text-gray-800">Why Choose Us?</h2> {/* Increased text size */}
      <p className="text-lg text-gray-600 mb-4"> {/* Increased text size */}
        At Victa Insurance, we prioritize your peace of mind. Our comprehensive plans are tailored to meet your unique needs, ensuring you and your family are protected.
      </p>

      {/* Additional Information */}
      <div className="space-y-4"> {/* Increased spacing */}
        <div className="flex items-center text-lg"> {/* Increased text size */}
          <span className="text-gray-800 font-bold">✔️</span>
          <span className="ml-2 text-gray-700">Compare Personalized Plans</span>
        </div>
        <div className="flex items-center text-lg"> {/* Increased text size */}
          <span className="text-gray-800 font-bold">✔️</span>
          <span className="ml-2 text-gray-700">Competitive Pricing</span>
        </div>
        <div className="flex items-center text-lg"> {/* Increased text size */}
          <span className="text-gray-800 font-bold">✔️</span>
          <span className="ml-2 text-gray-700">Free Quotes</span>
        </div>
      </div>

      {/* Call to Action */}
      <button className="mt-6 w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-4 px-4 rounded text-lg transition-colors duration-200"> {/* Increased button size */}
        Learn More
      </button>
    </div>
  );
};

export default InsuranceInfo;