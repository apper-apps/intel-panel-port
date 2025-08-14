import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = ({ isOpen, onClose }) => {
  const navigation = [
    { name: "Dashboard", href: "/", icon: "BarChart3" },
    { name: "Keywords", href: "/keywords", icon: "Target" },
    { name: "Competitors", href: "/competitors", icon: "Users" }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:z-50">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-slate-800/50 backdrop-blur-xl border-r border-slate-700">
          <div className="flex items-center flex-shrink-0 px-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500">
                <ApperIcon name="Search" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">SEO Intel</h1>
                <p className="text-xs text-slate-400">Intelligence Platform</p>
              </div>
            </div>
          </div>
          
          <nav className="flex-1 px-3 space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `sidebar-nav-item group flex items-center px-3 py-3 text-sm font-medium rounded-lg ${
                    isActive ? "active" : "text-slate-300 hover:text-white"
                  }`
                }
              >
                <ApperIcon
                  name={item.icon}
                  size={20}
                  className="mr-3 flex-shrink-0"
                />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="relative flex flex-col w-64 bg-slate-800/90 backdrop-blur-xl border-r border-slate-700 transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500">
                  <ApperIcon name="Search" size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white">SEO Intel</h1>
                  <p className="text-xs text-slate-400">Intelligence Platform</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <ApperIcon name="X" size={20} />
              </button>
            </div>
            
            <nav className="flex-1 px-3 py-4 space-y-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `sidebar-nav-item group flex items-center px-3 py-3 text-sm font-medium rounded-lg ${
                      isActive ? "active" : "text-slate-300 hover:text-white"
                    }`
                  }
                >
                  <ApperIcon
                    name={item.icon}
                    size={20}
                    className="mr-3 flex-shrink-0"
                  />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;