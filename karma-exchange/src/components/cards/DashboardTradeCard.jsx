const DashboardTradeCard = ({ trade, onClick, onAccept, accepting }) => {
  return (
    <div
      className="flex items-center justify-between gap-4 pl-9 pr-6 py-7 bg-white shadow-md rounded-xl hover:shadow-sm transition cursor-pointer hover:border-blue-200 hover:shadow-lg
    transition-all duration-200"
      onClick={onClick}
    >
      
      <div className="flex-1">
        <div className="flex justify-between items-center mt-2">
          <h3 className="font-semibold text-gray-900 truncate mb-2">
            {trade.title}
          </h3>
          <span className="text-xs font-medium text-gray-500">
               {trade.karmaValue} Karma pts.
            </span>
        </div>
        <p className="text-sm  truncate mt-1 flex gap-3">
          <span className="font-medium text-gray-400">Offer:</span> 
          <span className="text-gray-700 capitalize">{trade.offer}</span>
        </p>
        <p className="text-sm  truncate mb-3 flex gap-3">
          <span className="font-medium text-gray-400">Looking for:</span> 
          <span className="text-gray-700 capitalize">{trade.lookingFor}</span>
        </p>

        <div className="flex justify-between items-center mt-2">
          <span className="text-xs bg-blue-100 text-blue-950 px-2 py-1 rounded-full">
            {trade.category}
          </span>
          
          <div
        className="flex flex-col gap-2"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          disabled={accepting}
          onClick={() => onAccept(trade._id)}
          className="px-4 py-2 text-sm font-medium rounded-lg
            bg-green-100 text-green-700 hover:bg-green-200
            disabled:opacity-50"
        >
          {accepting ? "Accepting..." : "Accept"}
        </button>
      </div>
        </div>
      </div>

     
      
    </div>
  );
};

export default DashboardTradeCard;
