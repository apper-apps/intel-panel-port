import ApperIcon from "@/components/ApperIcon";

const MetricCard = ({ title, value, change, changeType, icon }) => {
  const getChangeColor = () => {
    if (changeType === "positive") return "text-success-500";
    if (changeType === "negative") return "text-red-400";
    return "text-slate-400";
  };

  const getChangeIcon = () => {
    if (changeType === "positive") return "TrendingUp";
    if (changeType === "negative") return "TrendingDown";
    return "Minus";
  };

  return (
    <div className="metric-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
          <ApperIcon name={icon} size={24} className="text-primary-400" />
        </div>
        {change && (
          <div className={`flex items-center gap-1 ${getChangeColor()}`}>
            <ApperIcon name={getChangeIcon()} size={16} />
            <span className="text-sm font-medium">{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-slate-400 text-sm">{title}</p>
        <p className="text-3xl font-bold text-white animate-count">
          {typeof value === "number" && value > 1000 
            ? value.toLocaleString() 
            : value
          }
        </p>
      </div>
    </div>
  );
};

export default MetricCard;