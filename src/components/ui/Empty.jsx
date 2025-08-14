import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "No data found", 
  description = "Get started by adding some data", 
  actionLabel = "Get Started",
  onAction,
  icon = "Database"
}) => {
  return (
    <div className="glass-effect rounded-xl p-12 text-center">
      <div className="w-20 h-20 mx-auto mb-6 p-5 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full">
        <ApperIcon name={icon} size={40} className="text-primary-400" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-slate-400 mb-8 max-w-md mx-auto">{description}</p>
      {onAction && (
        <Button onClick={onAction}>
          <ApperIcon name="Plus" size={16} className="mr-2" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default Empty;