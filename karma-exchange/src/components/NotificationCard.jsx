import React, { useRef, useState, useEffect } from "react";
import moment from "moment";
import { ArrowRight, Bell, User } from "lucide-react";
import { useNotification } from "../context/NotificationContext";

const NotificationCard = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { notifications, unreadCount } = useNotification();

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative p-2 rounded-lg hover:bg-slate-100 transition"
      >
        <Bell className="w-6 h-6 text-slate-700" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute -right-3 mt-3 w-86 bg-white shadow-xl rounded-xl  z-50">
          <h3 className="text-lg font-semibold px-4 py-3  border border-gray-200">
            Notifications
          </h3>

          {notifications.length === 0 ? (
            <p className="text-slate-500 p-6 text-center">
              No notifications
            </p>
          ) : (
            <div className="max-h-90 overflow-y-auto">
              {notifications.map((n) => (
                <div
                  key={n._id}
                  className="flex flex-col  items-start px-4 py-3 border-b border-gray-200 last:border-none hover:bg-slate-50 transition"
                >
                  <div className="flex gap-3">
                    
                    <span className="text-sm capitalize">
                            {n.sender?.username} has accepted your offer.
                    </span>
                    
                  </div>
                  <div className="flex-1">
                    {n.tradeId && (
                      <div className="text-xs text-slate-600 mt-1">
                        <span className="text-indigo-800 font-semibold capitalize">
                          <span className="text-slate-600">For</span> {n.tradeId.offer}
                        </span>
                        <span className="text-indigo-800 font-semibold capitalize">
                           <span className="text-slate-600"> , trade </span>{n.tradeId.lookingFor}
                        </span>
                      </div>
                    )}

                    <p className="text-xs text-slate-500 mt-1">
                      {moment(n.createdAt).fromNow()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCard;
