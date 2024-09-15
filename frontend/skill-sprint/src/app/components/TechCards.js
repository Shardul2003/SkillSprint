// components/TechCards.jsx

import { useState } from 'react';

const TechCards = ({ response }) => {
  const [openCards, setOpenCards] = useState({});

  const handleCardClick = (key) => {
    setOpenCards((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex flex-wrap -mx-2">
      {Object.entries(response).map(([key, value]) => (
        <div key={key} className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
          <div
            className="bg-black shadow-md rounded-md p-4 cursor-pointer"
            onClick={() => handleCardClick(key)}
          >
            <h2 className="text-xl font-bold">{value.title}</h2>
            {openCards[key] && (
              <div className="mt-4">
                {value.technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-2 mb-2 rounded-md shadow-sm"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TechCards;
