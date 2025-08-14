import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import KeywordTable from "@/components/organisms/KeywordTable";
import AddKeywordModal from "@/components/organisms/AddKeywordModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import keywordService from "@/services/api/keywordService";

const Keywords = () => {
  const [keywords, setKeywords] = useState([]);
  const [filteredKeywords, setFilteredKeywords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const loadKeywords = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await keywordService.getAll();
      setKeywords(data);
      setFilteredKeywords(data);
    } catch (err) {
      setError("Failed to load keywords. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddKeyword = async (keywordData) => {
    const newKeyword = await keywordService.create(keywordData);
    setKeywords(prev => [newKeyword, ...prev]);
    setFilteredKeywords(prev => [newKeyword, ...prev]);
  };

  const handleDeleteKeyword = async (id) => {
    if (!window.confirm("Are you sure you want to delete this keyword?")) {
      return;
    }
    
    try {
      await keywordService.delete(id);
      setKeywords(prev => prev.filter(k => k.Id !== id));
      setFilteredKeywords(prev => prev.filter(k => k.Id !== id));
      toast.success("Keyword deleted successfully");
    } catch (err) {
      toast.error("Failed to delete keyword");
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredKeywords(keywords);
    } else {
      const filtered = keywords.filter(keyword =>
        keyword.phrase.toLowerCase().includes(term.toLowerCase()) ||
        keyword.url.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredKeywords(filtered);
    }
  };

  useEffect(() => {
    loadKeywords();
  }, []);

  if (loading) {
    return <Loading message="Loading keywords..." />;
  }

  if (error) {
    return <Error message={error} onRetry={loadKeywords} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            Keyword Tracking
          </h1>
          <p className="text-slate-400 mt-2">
            Monitor your keyword rankings and track performance over time
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <ApperIcon name="Plus" size={16} className="mr-2" />
          Add Keyword
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <SearchBar
            placeholder="Search keywords or URLs..."
            onSearch={handleSearch}
            className="w-full"
          />
        </div>
        <div className="flex gap-4">
          <div className="glass-effect rounded-lg px-4 py-2">
            <span className="text-sm text-slate-400">Total Keywords</span>
            <p className="text-xl font-bold text-white">{keywords.length}</p>
          </div>
          <div className="glass-effect rounded-lg px-4 py-2">
            <span className="text-sm text-slate-400">Top 10</span>
            <p className="text-xl font-bold text-success-400">
              {keywords.filter(k => k.currentPosition <= 10).length}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      {filteredKeywords.length === 0 ? (
        keywords.length === 0 ? (
          <Empty
            title="No keywords tracked yet"
            description="Start tracking your website's keyword rankings to monitor SEO performance and identify opportunities."
            actionLabel="Add First Keyword"
            onAction={() => setShowAddModal(true)}
            icon="Target"
          />
        ) : (
          <Empty
            title="No keywords found"
            description={`No keywords match your search for "${searchTerm}". Try adjusting your search terms.`}
            actionLabel="Clear Search"
            onAction={() => handleSearch("")}
            icon="Search"
          />
        )
      ) : (
        <KeywordTable 
          keywords={filteredKeywords}
          onDeleteKeyword={handleDeleteKeyword}
        />
      )}

      {/* Add Keyword Modal */}
      <AddKeywordModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddKeyword={handleAddKeyword}
      />
    </div>
  );
};

export default Keywords;