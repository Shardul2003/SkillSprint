// // components/TechCards.jsx

// import { useState } from 'react';

// const TechCards = ({ response }) => {
//   const [openCards, setOpenCards] = useState({});

//   const handleCardClick = (key) => {
//     setOpenCards((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   return (
//     <div className="flex flex-wrap justify-center gap-4">
//       {Object.entries(response).map(([key, value]) => (
//         <div
//           key={key}
//           className="w-full sm:w-1/2 lg:w-1/3 p-4 transition-transform transform hover:scale-105"
//         >
//           <div
//             className="bg-cyan-800 shadow-lg rounded-lg p-6 text-white cursor-pointer hover:shadow-2xl"
//             onClick={() => handleCardClick(key)}
//           >
//             <h2 className="text-2xl font-semibold mb-2">{value.title}</h2>
//             {openCards[key] && (
//               <div className="mt-4">
//                 {value.technologies.map((tech, index) => (
//                   <div
//                     key={index}
//                     className="bg-gray-200 p-3 mb-2 rounded-lg text-gray-800 font-medium shadow-inner"
//                   >
//                     {tech}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TechCards;

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
    <div className="flex flex-wrap justify-center gap-4">
      {Object.entries(response).map(([key, value]) => (
        <div
          key={key}
          className="w-72 h-80 sm:w-80 sm:h-96 lg:w-80 lg:h-96 p-4 transition-transform transform hover:scale-105"
        >
          <div
            className="bg-cyan-800 shadow-lg rounded-lg p-6 text-white cursor-pointer hover:shadow-2xl h-full"
            onClick={() => handleCardClick(key)}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <h2 className="text-2xl font-semibold mb-2">{value.title}</h2>
            {openCards[key] && (
              <div className="mt-4 flex-grow overflow-auto">
                {value.technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 p-3 mb-2 rounded-lg text-gray-800 font-medium shadow-inner"
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

