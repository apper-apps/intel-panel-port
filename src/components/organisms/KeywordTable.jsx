import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const KeywordTable = ({ keywords, onDeleteKeyword }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedKeywords = [...keywords].sort((a, b) => {
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

  const getPositionChange = (current, previous) => {
    if (!previous) return { change: 0, type: "neutral" };
    const change = previous - current; // Positive means improvement
    return {
      change: Math.abs(change),
      type: change > 0 ? "positive" : change < 0 ? "negative" : "neutral"
    };
  };

  const getPositionChangeIcon = (type) => {
    switch (type) {
      case "positive": return "ArrowUp";
      case "negative": return "ArrowDown";
      default: return "Minus";
    }
  };

  const getPositionChangeColor = (type) => {
    switch (type) {
      case "positive": return "text-success-500";
      case "negative": return "text-red-400";
      default: return "text-slate-400";
    }
  };

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
              <SortHeader label="Keyword" sortKey="phrase" />
              <SortHeader label="Position" sortKey="currentPosition" />
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                Change
              </th>
              <SortHeader label="Search Volume" sortKey="searchVolume" />
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {sortedKeywords.map((keyword) => {
              const positionChange = getPositionChange(keyword.currentPosition, keyword.previousPosition);
              return (
                <tr key={keyword.Id} className="table-row hover:bg-slate-800/30">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {keyword.phrase}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        keyword.currentPosition <= 3 
                          ? "bg-success-500/20 text-success-400" 
                          : keyword.currentPosition <= 10 
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-slate-600/50 text-slate-300"
                      }`}>
                        #{keyword.currentPosition}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {positionChange.change > 0 ? (
                      <div className={`flex items-center gap-1 ${getPositionChangeColor(positionChange.type)}`}>
                        <ApperIcon name={getPositionChangeIcon(positionChange.type)} size={14} />
                        <span className="text-sm font-medium">{positionChange.change}</span>
                      </div>
                    ) : (
                      <span className="text-slate-500 text-sm">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-300">
                      {keyword.searchVolume.toLocaleString()}/mo
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-400 truncate max-w-xs block" title={keyword.url}>
                      {keyword.url}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteKeyword(keyword.Id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <ApperIcon name="Trash2" size={16} />
                    </Button>
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

export default KeywordTable;