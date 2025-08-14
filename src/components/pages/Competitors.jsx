import { useState, useEffect } from "react";
import CompetitorTable from "@/components/organisms/CompetitorTable";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import competitorService from "@/services/api/competitorService";

const Competitors = () => {
  const [competitors, setCompetitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      <div>
        <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
          Competitor Analysis
        </h1>
        <p className="text-slate-400 mt-2">
          Analyze your competitors' SEO performance and identify shared keyword opportunities
        </p>
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
    </div>
  );
};

export default Competitors;