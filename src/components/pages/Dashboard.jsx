import { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import AddDomainModal from "@/components/organisms/AddDomainModal";
import MetricCard from "@/components/molecules/MetricCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import domainService from "@/services/api/domainService";

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentDomain, setCurrentDomain] = useState(null);
  const [showAddDomainModal, setShowAddDomainModal] = useState(false);
  const loadMetrics = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await domainService.getMetrics();
      setMetrics(data);
    } catch (err) {
      setError("Failed to load domain metrics. Please try again.");
    } finally {
      setLoading(false);
    }
  };

const handleAddDomain = async (domain) => {
    await domainService.setCurrentDomain(domain);
    setCurrentDomain(domain);
    loadMetrics(); // Reload metrics for new domain
  };

  useEffect(() => {
    const domain = domainService.getCurrentDomain();
    setCurrentDomain(domain);
    loadMetrics();
  }, []);

  if (loading) {
    return <Loading message="Loading dashboard metrics..." />;
  }

  if (error) {
    return <Error message={error} onRetry={loadMetrics} />;
  }

  if (!metrics) {
    return <Error message="No metrics data available" onRetry={loadMetrics} />;
  }

  const getChangeType = (current, previous) => {
    if (!previous) return "neutral";
    if (current > previous) return "positive";
    if (current < previous) return "negative";
    return "neutral";
  };

  const getChangePercentage = (current, previous) => {
    if (!previous) return 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  const visibilityChange = getChangePercentage(metrics.visibilityScore, metrics.previousVisibilityScore);
  const keywordsChange = getChangePercentage(metrics.totalKeywords, metrics.previousTotalKeywords);
  const positionChange = getChangePercentage(metrics.previousAveragePosition, metrics.averagePosition); // Inverted for position
  const topTenChange = getChangePercentage(metrics.topTenKeywords, metrics.previousTopTenKeywords);

return (
    <div className="space-y-8">
      {/* Domain Setup Section */}
      {!currentDomain && (
        <div className="glass-effect rounded-xl p-8 text-center space-y-6">
          <div className="w-16 h-16 mx-auto p-4 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-xl">
            <ApperIcon name="Globe" size={32} className="text-primary-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Add Your Domain</h2>
            <p className="text-slate-400 max-w-md mx-auto">
              Get started by adding your website domain to begin tracking SEO performance and keyword rankings.
            </p>
          </div>
          <Button
            onClick={() => setShowAddDomainModal(true)}
            size="lg"
            className="px-8 py-3 text-base font-medium"
          >
            <ApperIcon name="Plus" size={20} className="mr-2" />
            Add Domain
          </Button>
        </div>
      )}

      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-4">
          <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            {currentDomain ? `${currentDomain} Overview` : 'Domain Overview'}
          </h1>
          {currentDomain && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAddDomainModal(true)}
              className="text-slate-400 hover:text-white"
            >
              <ApperIcon name="Settings" size={16} />
            </Button>
          )}
        </div>
        <p className="text-slate-400 max-w-2xl mx-auto">
          {currentDomain 
            ? "Monitor your website's search engine performance with real-time rankings and comprehensive SEO metrics."
            : "Add your domain to start monitoring search engine performance and keyword rankings."
          }
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Visibility Score"
          value={`${metrics.visibilityScore}%`}
          change={Math.abs(visibilityChange)}
          changeType={getChangeType(metrics.visibilityScore, metrics.previousVisibilityScore)}
          icon="Eye"
        />
        
        <MetricCard
          title="Total Keywords"
          value={metrics.totalKeywords}
          change={Math.abs(keywordsChange)}
          changeType={getChangeType(metrics.totalKeywords, metrics.previousTotalKeywords)}
          icon="Target"
        />
        
        <MetricCard
          title="Average Position"
          value={metrics.averagePosition.toFixed(1)}
          change={Math.abs(positionChange)}
          changeType={getChangeType(metrics.previousAveragePosition, metrics.averagePosition)}
          icon="TrendingUp"
        />
        
        <MetricCard
          title="Top 10 Rankings"
          value={metrics.topTenKeywords}
          change={Math.abs(topTenChange)}
          changeType={getChangeType(metrics.topTenKeywords, metrics.previousTopTenKeywords)}
          icon="Award"
        />
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Search Volume Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Total Monthly Volume</span>
              <span className="text-2xl font-bold text-white">
                {metrics.totalSearchVolume.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-success-500 to-primary-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: "72%" }}
              ></div>
            </div>
            <p className="text-sm text-slate-400">
              Your keywords have strong search demand potential
            </p>
          </div>
        </div>

        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Ranking Distribution</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                <span className="text-slate-400">Top 10 (1-10)</span>
              </div>
              <span className="text-white font-medium">{metrics.topTenKeywords} keywords</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-slate-400">Page 2 (11-20)</span>
              </div>
              <span className="text-white font-medium">{Math.floor((metrics.totalKeywords - metrics.topTenKeywords) * 0.4)} keywords</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
                <span className="text-slate-400">Beyond (21+)</span>
              </div>
              <span className="text-white font-medium">{metrics.totalKeywords - metrics.topTenKeywords - Math.floor((metrics.totalKeywords - metrics.topTenKeywords) * 0.4)} keywords</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-effect rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 border border-slate-700 rounded-lg hover:border-primary-500 transition-colors cursor-pointer group">
            <div className="w-12 h-12 mx-auto mb-3 p-3 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-lg group-hover:scale-110 transition-transform">
              <div className="w-6 h-6 bg-primary-400 rounded-full"></div>
            </div>
            <h4 className="text-white font-medium mb-2">Track New Keywords</h4>
            <p className="text-sm text-slate-400">Add keywords to monitor their rankings</p>
          </div>
          
          <div className="text-center p-4 border border-slate-700 rounded-lg hover:border-primary-500 transition-colors cursor-pointer group">
            <div className="w-12 h-12 mx-auto mb-3 p-3 bg-gradient-to-br from-success-500/20 to-primary-500/20 rounded-lg group-hover:scale-110 transition-transform">
              <div className="w-6 h-6 bg-success-400 rounded-full"></div>
            </div>
            <h4 className="text-white font-medium mb-2">Analyze Competitors</h4>
            <p className="text-sm text-slate-400">See how you compare to competitors</p>
          </div>
          
          <div className="text-center p-4 border border-slate-700 rounded-lg hover:border-primary-500 transition-colors cursor-pointer group">
            <div className="w-12 h-12 mx-auto mb-3 p-3 bg-gradient-to-br from-secondary-500/20 to-primary-500/20 rounded-lg group-hover:scale-110 transition-transform">
              <div className="w-6 h-6 bg-secondary-400 rounded-full"></div>
            </div>
            <h4 className="text-white font-medium mb-2">View Reports</h4>
            <p className="text-sm text-slate-400">Generate detailed performance reports</p>
          </div>
        </div>
</div>

      {/* Add Domain Modal */}
      <AddDomainModal
        isOpen={showAddDomainModal}
        onClose={() => setShowAddDomainModal(false)}
        onAddDomain={handleAddDomain}
      />
    </div>
  );
};

export default Dashboard;