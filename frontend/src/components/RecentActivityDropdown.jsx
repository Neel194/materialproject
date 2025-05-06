import { Clock, FileText, CheckCircle, X } from "lucide-react";
import { useState } from "react";

const RecentActivityDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: "upload",
      title: "Material Analysis Report",
      status: "completed",
      time: "2 minutes ago",
      icon: <FileText className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      id: 2,
      type: "process",
      title: "Data Processing",
      status: "completed",
      time: "1 hour ago",
      icon: <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      id: 3,
      type: "upload",
      title: "Research Paper",
      status: "processing",
      time: "3 hours ago",
      icon: <FileText className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
  ]);

  return (
    <div className="activity-container relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:px-4 sm:py-2 p-2 rounded-full font-bold tracking-wide text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md hover:scale-105 hover:shadow-indigo-500/40 transition-all duration-200 flex items-center gap-1 sm:gap-2"
      >
        <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">Recent</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[280px] sm:w-80 bg-black/90 backdrop-blur-lg rounded-xl border border-indigo-500/20 shadow-2xl overflow-hidden">
          <div className="p-3 sm:p-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-white font-bold">Recent Activity</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="max-h-[60vh] overflow-y-auto">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="p-3 sm:p-4 border-b border-white/10 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="mt-1 text-indigo-400">{activity.icon}</div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm sm:text-base">
                      {activity.title}
                    </p>
                    <div className="flex items-center gap-1 sm:gap-2 mt-1">
                      <span
                        className={`text-xs sm:text-sm ${
                          activity.status === "completed"
                            ? "text-green-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {activity.status === "completed"
                          ? "Completed"
                          : "Processing"}
                      </span>
                      <span className="text-white/50 text-xs sm:text-sm">
                        •
                      </span>
                      <span className="text-white/50 text-xs sm:text-sm">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentActivityDropdown;
