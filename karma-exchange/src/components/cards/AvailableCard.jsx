import React, { useState, useEffect } from "react";
import { Ban, Edit, Trash2, X } from "lucide-react";
import { tradeAPI } from "../../services/api";

const statusStyles = {
  active: "bg-green-50 text-green-600",
  "in-progress": "bg-blue-50 text-blue-600",
  cancelled: "bg-red-50 text-red-600",
  completed: "bg-gray-100 text-gray-600",
};

const CancelConfirmModal = ({ onConfirm, onCancel, loading }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-800 text-sm">
          Cancel Trade?
        </h3>
        <button
          onClick={onCancel}
          className="text-slate-400 hover:text-slate-600"
        >
          <X size={16} />
        </button>
      </div>

      <p className="text-slate-700 text-xs leading-relaxed mb-5">
        This will cancel the trade permanently. This action cannot be undone.
      </p>

      <div className="flex gap-2">
        <button
          onClick={onCancel}
          className="flex-1 text-xs px-4 py-2 rounded-full border bg-slate-700 border-slate-200 text-white hover:text-slate-700 hover:border-slate-700 hover:bg-slate-50"
        >
          Keep Trade
        </button>

        <button
          onClick={onConfirm}
          disabled={loading}
          className="flex-1 text-xs px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 font-medium"
        >
          {loading ? "Cancelling..." : "Yes, Cancel"}
        </button>
      </div>
    </div>
  </div>
);
const DeleteConfirmModal = ({ onConfirmDelete, onDelete, loading }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-sm">
      
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-800 text-sm">
          Delete Trade?
        </h3>
        <button
          onClick={onDelete}
          className="text-slate-400 hover:text-slate-600"
        >
          <X size={16} />
        </button>
      </div>
      <p className="text-slate-700 text-xs leading-relaxed mb-5">
        This will delete the trade. This action cannot be undone.
      </p>

      <div className="flex gap-2">
        <button
          onClick={onDelete}
          className="flex-1 text-xs px-4 py-2 rounded-full border bg-slate-700 border-slate-200 text-white hover:text-slate-700 hover:border-slate-700 hover:bg-slate-50"
        >
          Keep Trade
        </button>

        <button
          onClick={onConfirmDelete}
          disabled={loading}
          className="flex-1 text-xs px-4 py-2 rounded-full bg-red-400 text-white hover:bg-red-600 font-medium"
        >
          {loading ? "Deleting..." : "Yes, Delete"}
        </button>
      </div>
    </div>
  </div>
);


const AvailableCard = ({
  trade,onClick,onEdit,onDelete,onCancel}) => { 
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [localTrade, setLocalTrade] = useState(trade);

  useEffect(() => {
    setLocalTrade(trade);
  }, [trade]);

  const handleCancelConfirm = async () => {
    setShowCancelModal(false);
    setCancelling(true);

    try {
      await onCancel?.(localTrade._id); 
    } catch (err) {
      console.error(err);
    } finally {
      setCancelling(false);
    }
  };
  const handleDeleteConfirm = async () => {
    setShowDeleteModal(false);
    setDeleting(true);

    try {
      await onDelete?.(localTrade._id);  
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };
  
  return (
    <>
      {showCancelModal && (
        <CancelConfirmModal
          onConfirm={handleCancelConfirm}
          onCancel={() => setShowCancelModal(false)}
          loading={cancelling}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmModal
          onConfirmDelete={handleDeleteConfirm}
          onDelete={() => setShowDeleteModal(false)}
          loading={deleting}
        />
      )}

      <div
        onClick={() => onClick?.(localTrade)}
        className="w-[270px] bg-white rounded-xl border border-gray-100 p-5 cursor-pointer hover:border-blue-200 hover:shadow-lg transition-all duration-200 shadow-md mx-auto sm:mx-auto
      ">
        <div className="flex items-start justify-between gap-3 mb-4">
          <h3 className="font-medium text-gray-900 line-clamp-2">
            {localTrade.title}
          </h3>
          <span
            className={`
              shrink-0 px-2.5 py-1 text-xs font-medium rounded-full
              ${statusStyles[localTrade.status] || "bg-gray-100 text-gray-600"}
            `}
          >
            {localTrade.status}
          </span>
        </div>

        <div className="space-y-2 text-sm mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-gray-400 min-w-[65px]">You give:</span>
            <span className="text-gray-700">{localTrade.offer}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-gray-400 min-w-[65px]">You get:</span>
            <span className="text-gray-700">{localTrade.lookingFor}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          
          {localTrade.status === "active" && (
            <>
              {/* <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(localTrade);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-purple-600 bg-purple-50 rounded-md hover:bg-purple-100"
              >
                <Edit size={14} />
                Edit
              </button> */}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteModal(true);   
                }}
              >
                <Trash2
                  size={16}
                  className="text-gray-500 hover:text-red-500"
                />
              </button>
            </>
          )}

          {localTrade.status === "in-progress" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowCancelModal(true);
              }}
              disabled={cancelling}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 disabled:opacity-50"
            >
              <Ban size={14} />
              {cancelling ? "Cancelling..." : "Cancel Trade"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default AvailableCard;