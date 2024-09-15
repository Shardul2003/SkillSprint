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
//           className="w-72 h-80 sm:w-80 sm:h-96 lg:w-80 lg:h-96 p-4 transition-transform transform hover:scale-105"
//         >
//           <div
//             className="bg-cyan-800 shadow-lg rounded-lg p-6 text-white cursor-pointer hover:shadow-2xl h-full"
//             onClick={() => handleCardClick(key)}
//             style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
//           >
//             <h2 className="text-2xl font-semibold mb-2">{value.title}</h2>
//             {openCards[key] && (
//               <div className="mt-4 flex-grow overflow-auto">
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



// WORKING CODE WITH CLICK ISSUE
// import { useState } from 'react';

// const TechCards = ({ response }) => {
//   const [openCards, setOpenCards] = useState({});
//   const [openTechnologies, setOpenTechnologies] = useState({});

//   const handleCardClick = (key) => {
//     setOpenCards((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   const handleTechClick = (cardKey, techIndex) => {
//     setOpenTechnologies((prev) => ({
//       ...prev,
//       [`${cardKey}-${techIndex}`]: !prev[`${cardKey}-${techIndex}`],
//     }));
//   };

//   // Extract YouTube video ID from URL
//   const extractVideoId = (url) => {
//     const regExp = /^.*(youtu.be\/|v\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
//     const match = url.match(regExp);
//     return match && match[2].length === 11 ? match[2] : null;
//   };

//   return (
//     <div className="flex flex-wrap justify-center gap-4">
//       {Object.entries(response).map(([key, value]) => (
//         <div
//           key={key}
//           className="w-72 h-80 sm:w-80 sm:h-96 lg:w-80 lg:h-96 p-4 transition-transform transform hover:scale-105"
//         >
//           <div
//             className="bg-cyan-800 shadow-lg rounded-lg p-6 text-white cursor-pointer hover:shadow-2xl h-full"
//             onClick={() => handleCardClick(key)}
//             style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
//           >
//             <h2 className="text-2xl font-semibold mb-2">{value.title}</h2>
//             {openCards[key] && (
//               <div className="mt-4 flex-grow overflow-auto">
//                 {value.technologies.map((tech, index) => (
//                   <div key={index}>
//                     {/* Technology always visible */}
//                     <div
//                       className="bg-gray-200 p-3 mb-2 rounded-lg text-gray-800 font-medium shadow-inner cursor-pointer"
//                       onClick={() => handleTechClick(key, index)}
//                     >
//                       {tech.technology}
//                     </div>

//                     {/* Show Supplementary Material (embedded videos) */}
//                     {openTechnologies[`${key}-${index}`] && (
//                       <div className="pl-4 mt-2">
//                         {tech.supplementary.map((supplementaryItem, suppIndex) => {
//                           const videoId = extractVideoId(supplementaryItem.url);
//                           return (
//                             <div key={suppIndex} className="mb-4">
//                               <div className="text-sm font-semibold mb-2">
//                                 {supplementaryItem.name}
//                               </div>
//                               {videoId ? (
//                                 <iframe
//                                   width="100%"
//                                   height="200"
//                                   src={`https://www.youtube.com/embed/${videoId}`}
//                                   frameBorder="0"
//                                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                   allowFullScreen
//                                   title={supplementaryItem.name}
//                                 ></iframe>
//                               ) : (
//                                 <a
//                                   href={supplementaryItem.url}
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                   className="text-blue-500 underline"
//                                 >
//                                   Watch here
//                                 </a>
//                               )}
//                             </div>
//                           );
//                         })}
//                       </div>
//                     )}
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



import { useState } from 'react';

const TechCards = ({ response }) => {
  const [openCards, setOpenCards] = useState({});
  const [openTechnologies, setOpenTechnologies] = useState({});

  const handleCardClick = (key) => {
    setOpenCards((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleTechClick = (cardKey, techIndex) => {
    setOpenTechnologies((prev) => ({
      ...prev,
      [`${cardKey}-${techIndex}`]: !prev[`${cardKey}-${techIndex}`],
    }));
  };

  // Extract YouTube video ID from URL
  const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {Object.entries(response).map(([key, value]) => (
        <div
          key={key}
          className="w-72 sm:w-80 lg:w-80 p-4 transition-transform transform hover:scale-105"
        >
          <div
            className="bg-cyan-800 shadow-lg rounded-lg p-6 text-white cursor-pointer hover:shadow-2xl h-96 flex flex-col justify-between"
            onClick={() => handleCardClick(key)}
          >
            <h2 className="text-2xl font-semibold mb-2">{value.title}</h2>

            {openCards[key] && (
              <div className="mt-4 flex-grow overflow-y-scroll h-60">
                {value.technologies.map((tech, index) => (
                  <div key={index}>
                    {/* Technology always visible */}
                    <div
                      className="bg-gray-200 p-3 mb-2 rounded-lg text-gray-800 font-medium shadow-inner cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents closing the entire card
                        handleTechClick(key, index);
                      }}
                    >
                      {tech.technology}
                    </div>

                    {/* Show Supplementary Material (embedded videos) */}
                    {openTechnologies[`${key}-${index}`] && (
                      <div className="pl-4 mt-2">
                        {tech.supplementary.map((supplementaryItem, suppIndex) => {
                          const videoId = extractVideoId(supplementaryItem.url);
                          return (
                            <div key={suppIndex} className="mb-4">
                              <div className="text-sm font-semibold mb-2">
                                {supplementaryItem.name}
                              </div>
                              {videoId ? (
                                <iframe
                                  className="w-full h-40"
                                  src={`https://www.youtube.com/embed/${videoId}`}
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  title={supplementaryItem.name}
                                ></iframe>
                              ) : (
                                <a
                                  href={supplementaryItem.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 underline"
                                >
                                  Watch here
                                </a>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
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


