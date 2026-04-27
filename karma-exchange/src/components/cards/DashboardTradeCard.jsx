const DashboardTradeCard = ({ trade, onClick, onAccept, accepting }) => {
  return (
    <div
      className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4 md:px-6 py-5 md:py-7 
      bg-white shadow-md rounded-xl hover:shadow-lg transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      
      <div className="flex-1 w-full">
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h3 className="font-semibold text-gray-900 truncate">
            {trade.title}
          </h3>
          <span className="text-xs font-medium text-gray-500">
            {trade.karmaValue} Karma pts.
          </span>
        </div>

        <p className="text-sm mt-2 flex flex-wrap gap-2">
          <span className="font-medium text-gray-400">Offer:</span>
          <span className="text-gray-700 capitalize break-words">
            {trade.offer}
          </span>
        </p>

        <p className="text-sm mt-1 flex flex-wrap gap-2">
          <span className="font-medium text-gray-400">Looking for:</span>
          <span className="text-gray-700 capitalize break-words">
            {trade.lookingFor}
          </span>
        </p>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-3">
          
          <span className="text-xs bg-blue-100 text-blue-950 px-2 py-1 rounded-full w-fit">
            {trade.category}
          </span>

          <div onClick={(e) => e.stopPropagation()}>
            <button
              disabled={accepting}
              onClick={() => onAccept(trade._id)}
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-lg
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