import { useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";

const AddDomainModal = ({ isOpen, onClose, onAddDomain }) => {
  const [formData, setFormData] = useState({
    domain: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.domain.trim()) {
      newErrors.domain = "Domain is required";
    } else if (!/^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.([a-zA-Z]{2,})$/.test(formData.domain.replace(/^https?:\/\//, ''))) {
      newErrors.domain = "Please enter a valid domain (e.g., example.com)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setLoading(true);
    try {
      // Clean domain by removing protocol if present
      const cleanDomain = formData.domain.replace(/^https?:\/\//, '');
      await onAddDomain(cleanDomain);
      toast.success(`Domain ${cleanDomain} added successfully!`);
      setFormData({ domain: "" });
      setErrors({});
      onClose();
    } catch (error) {
      toast.error("Failed to add domain. Please try again.");
      console.error("Error adding domain:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({ domain: "" });
      setErrors({});
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-effect rounded-xl w-full max-w-md p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Add Domain</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            disabled={loading}
            className="text-slate-400 hover:text-white"
          >
            <ApperIcon name="X" size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Website Domain"
            id="domain"
            type="text"
            value={formData.domain}
            onChange={(e) => handleInputChange("domain", e.target.value)}
            error={errors.domain}
            placeholder="example.com"
            disabled={loading}
            required
          />

          <div className="text-sm text-slate-400">
            <p className="mb-2">Enter your website's domain to start tracking SEO metrics.</p>
            <p>You can enter with or without "https://" - we'll handle it automatically.</p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1"
            >
              {loading ? (
                <>
                  <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <ApperIcon name="Plus" size={16} className="mr-2" />
                  Add Domain
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDomainModal;