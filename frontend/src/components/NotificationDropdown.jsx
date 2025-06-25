import { Bell, X } from "lucide-react";
import { useState, useEffect } from "react";
import config from "../config/config";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch notifications for 'Anonymous' when dropdown is opened
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetch(`${config.api.baseURL}/materials/notifications/Anonymous`)
        .then((res) => res.json())
        .then((data) => {
          setNotifications(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [isOpen]);

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <div className="notifications-container relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:px-4 sm:py-2 p-2 rounded-full font-bold tracking-wide text-white bg-gradient-to-r from-purple-500 to-indigo-600 shadow-md hover:scale-105 hover:shadow-purple-500/40 transition-all duration-200 flex items-center gap-1 sm:gap-2 relative"
      >
        <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">Notifications</span>
        {unreadNotifications > 0 && (
          <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
            {unreadNotifications}
          </span>
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[280px] sm:w-80 bg-black/90 backdrop-blur-lg rounded-xl border border-indigo-500/20 shadow-2xl overflow-hidden">
          <div className="p-3 sm:p-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-white font-bold">Notifications</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="max-h-[60vh] overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-white/60">Loading...</div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-center text-white/60">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`p-3 sm:p-4 border-b border-white/10 hover:bg-white/5 transition-colors ${
                    !notification.read ? "bg-indigo-500/10" : ""
                  }`}
                >
                  <p className="text-white text-sm sm:text-base">
                    {notification.message}
                  </p>
                  <p className="text-white/50 text-xs sm:text-sm mt-1">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
