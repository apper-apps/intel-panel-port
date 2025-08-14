import { useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";

const AddKeywordModal = ({ isOpen, onClose, onAddKeyword }) => {
  const [formData, setFormData] = useState({
    phrase: "",
    url: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.phrase.trim()) {
      toast.error("Please enter a keyword phrase");
      return;
    }
    if (!formData.url.trim()) {
      toast.error("Please enter a target URL");
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddKeyword(formData);
      setFormData({ phrase: "", url: "" });
      onClose();
      toast.success("Keyword added successfully!");
    } catch (error) {
      toast.error("Failed to add keyword");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-slate-800 rounded-xl border border-slate-700 p-6 w-full max-w-md mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Add New Keyword</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
          >
            <ApperIcon name="X" size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Keyword Phrase"
            id="phrase"
            type="text"
            placeholder="e.g., react tutorials"
            value={formData.phrase}
            onChange={(e) => handleInputChange("phrase", e.target.value)}
          />

          <FormField
            label="Target URL"
            id="url"
            type="url"
            placeholder="https://example.com/page"
            value={formData.url}
            onChange={(e) => handleInputChange("url", e.target.value)}
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <ApperIcon name="Loader2" size={16} className="animate-spin" />
                  Adding...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <ApperIcon name="Plus" size={16} />
                  Add Keyword
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddKeywordModal;