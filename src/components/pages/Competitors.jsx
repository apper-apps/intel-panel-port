import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import CompetitorTable from "@/components/organisms/CompetitorTable";
import AddDomainModal from "@/components/organisms/AddDomainModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Button from "@/components/atoms/Button";
import competitorService from "@/services/api/competitorService";

const Competitors = () => {
const [competitors, setCompetitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const loadCompetitors = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await competitorService.getAll();
      setCompetitors(data);
    } catch (err) {
      setError("Failed to load competitor data. Please try again.");
    } finally {
      setLoading(false);
    }
  };
async function handleAddCompetitor(domain) {
    try {
      const newCompetitor = await competitorService.create({ domain });
      await loadCompetitors(); // Reload to get fresh data
      toast.success(`Successfully added ${domain} as competitor`);
      setIsAddModalOpen(false);
    } catch (error) {
      toast.error("Failed to add competitor. Please try again.");
    }
  }

  useEffect(() => {
    loadCompetitors();
  }, []);
  if (loading) {
    return <Loading message="Loading competitor analysis..." />;
  }

  if (error) {
    return <Error message={error} onRetry={loadCompetitors} />;
  }

  if (competitors.length === 0) {
    return (
      <Empty
        title="No competitor data available"
        description="Competitor analysis helps you understand your market position and identify opportunities to improve your rankings."
        actionLabel="Refresh Data"
        onAction={loadCompetitors}
        icon="Users"
      />
    );
  }

  const totalCommonKeywords = competitors.reduce((sum, comp) => sum + comp.commonKeywords, 0);
  const avgVisibilityScore = Math.round(competitors.reduce((sum, comp) => sum + comp.visibilityScore, 0) / competitors.length);

  return (
    <div className="space-y-6">
{/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            Competitor Analysis
          </h1>
          <p className="text-slate-400 mt-2">
            Analyze your competitors' SEO performance and identify shared keyword opportunities
          </p>
        </div>
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2"
        >
          <ApperIcon name="Plus" size={16} />
          Add Competitor
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="metric-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
              <div className="w-6 h-6 bg-primary-400 rounded-full"></div>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Competitors Analyzed</p>
              <p className="text-2xl font-bold text-white">{competitors.length}</p>
            </div>
          </div>
        </div>

        <div className="metric-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-success-500/20 to-primary-500/20">
              <div className="w-6 h-6 bg-success-400 rounded-full"></div>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Total Common Keywords</p>
              <p className="text-2xl font-bold text-white">{totalCommonKeywords}</p>
            </div>
          </div>
        </div>

        <div className="metric-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-secondary-500/20 to-primary-500/20">
              <div className="w-6 h-6 bg-secondary-400 rounded-full"></div>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Avg. Visibility Score</p>
              <p className="text-2xl font-bold text-white">{avgVisibilityScore}%</p>
            </div>
          </div>
        </div>
</div>

      {/* Competitor Cards - Display up to 5 */}
      {competitors.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Top Competitors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {competitors.slice(0, 5).map((competitor) => (
              <div key={competitor.Id} className="metric-card rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-lg flex items-center justify-center">
                    <ApperIcon name="Globe" size={20} className="text-primary-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-white truncate">
                      {competitor.domain}
                    </h3>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-slate-400">Visibility</span>
                      <span className="text-sm font-semibold text-white">
                        {competitor.visibilityScore}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${competitor.visibilityScore}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">Keywords</span>
                    <span className="text-sm font-medium text-white">
                      {competitor.commonKeywords}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">Competition</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      competitor.commonKeywords > 50 
                        ? "bg-red-500/20 text-red-400" 
                        : competitor.commonKeywords > 20 
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-success-500/20 text-success-400"
                    }`}>
                      {competitor.commonKeywords > 50 ? "High" : competitor.commonKeywords > 20 ? "Medium" : "Low"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Competitor Table */}
      <CompetitorTable competitors={competitors} />

      {/* Insights */}
      <div className="glass-effect rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Competitive Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-white font-medium mb-3">Top Performing Competitors</h4>
            <div className="space-y-2">
              {competitors
                .sort((a, b) => b.visibilityScore - a.visibilityScore)
                .slice(0, 3)
                .map((competitor, index) => (
                  <div key={competitor.Id} className="flex items-center justify-between p-2 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0 ? 'bg-yellow-500 text-black' : 
                        index === 1 ? 'bg-slate-400 text-black' : 
                        'bg-orange-500 text-white'
                      }`}>
                        {index + 1}
                      </span>
                      <span className="text-slate-300">{competitor.domain}</span>
                    </div>
                    <span className="text-white font-medium">{competitor.visibilityScore}%</span>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3">Keyword Opportunities</h4>
            <div className="space-y-2">
              {competitors
                .sort((a, b) => b.commonKeywords - a.commonKeywords)
                .slice(0, 3)
                .map((competitor) => (
                  <div key={competitor.Id} className="flex items-center justify-between p-2 bg-slate-800/50 rounded-lg">
                    <span className="text-slate-300">{competitor.domain}</span>
                    <span className="text-primary-400 font-medium">{competitor.commonKeywords} shared</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
</div>

      <AddDomainModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddDomain={handleAddCompetitor}
      />
    </div>
  );
};

export default Competitors;