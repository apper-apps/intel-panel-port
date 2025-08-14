import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Header = ({ title, onMenuClick }) => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden p-2"
          >
            <ApperIcon name="Menu" size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            <p className="text-sm text-slate-400">Monitor and optimize your search rankings</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-slate-700/50 rounded-lg">
            <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-300">Live data</span>
          </div>
          
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <ApperIcon name="RefreshCw" size={16} className="mr-2" />
            Sync
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;