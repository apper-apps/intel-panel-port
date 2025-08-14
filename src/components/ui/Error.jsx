import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="glass-effect rounded-xl p-8 text-center">
      <div className="w-16 h-16 mx-auto mb-4 p-4 bg-red-500/20 rounded-full">
        <ApperIcon name="AlertTriangle" size={32} className="text-red-400" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">Error</h3>
      <p className="text-slate-400 mb-6">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <ApperIcon name="RefreshCw" size={16} className="mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default Error;