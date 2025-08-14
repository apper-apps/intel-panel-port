import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";

const CompetitorTable = ({ competitors }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedCompetitors = [...competitors].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (typeof aValue === "string") {
      return sortConfig.direction === "asc" 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return sortConfig.direction === "asc" 
      ? aValue - bValue 
      : bValue - aValue;
  });

  const SortHeader = ({ label, sortKey }) => (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider cursor-pointer hover:text-white transition-colors group"
      onClick={() => handleSort(sortKey)}
    >
      <div className="flex items-center gap-2">
        {label}
        <div className="flex flex-col">
          <ApperIcon 
            name="ChevronUp" 
            size={12} 
            className={`${sortConfig.key === sortKey && sortConfig.direction === "asc" ? "text-primary-400" : "text-slate-500 group-hover:text-slate-400"}`} 
          />
          <ApperIcon 
            name="ChevronDown" 
            size={12} 
            className={`${sortConfig.key === sortKey && sortConfig.direction === "desc" ? "text-primary-400" : "text-slate-500 group-hover:text-slate-400"}`} 
          />
        </div>
      </div>
    </th>
  );

  return (
    <div className="glass-effect rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="bg-slate-800/50">
            <tr>
              <SortHeader label="Domain" sortKey="domain" />
              <SortHeader label="Visibility Score" sortKey="visibilityScore" />
              <SortHeader label="Common Keywords" sortKey="commonKeywords" />
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                Competition Level
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {sortedCompetitors.map((competitor) => {
              const competitionLevel = competitor.commonKeywords > 50 ? "high" : competitor.commonKeywords > 20 ? "medium" : "low";
              return (
                <tr key={competitor.Id} className="table-row hover:bg-slate-800/30">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-lg flex items-center justify-center">
                        <ApperIcon name="Globe" size={16} className="text-primary-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">
                          {competitor.domain}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-white">
                        {competitor.visibilityScore}%
                      </span>
                      <div className="w-16 bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${competitor.visibilityScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-white">
                      {competitor.commonKeywords}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      competitionLevel === "high" 
                        ? "bg-red-500/20 text-red-400" 
                        : competitionLevel === "medium" 
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-success-500/20 text-success-400"
                    }`}>
                      {competitionLevel.charAt(0).toUpperCase() + competitionLevel.slice(1)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompetitorTable;