

const SkeletonCard:React.FC  = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-2 sm:p-4 animate-pulse w-72 mx-auto">
      <div className="w-full  h-20 sm:h-48 bg-gray-300 rounded-lg mb-4"></div>
      <div className=" h-3 sm:h-6 bg-gray-300 rounded w-full sm:w-3/5 mb-2"></div>
      <div className="h-2 sm:h-4 bg-gray-300 rounded  w-1/2 sm:w-1/2"></div>
    </div>
  );
};

export default SkeletonCard;
