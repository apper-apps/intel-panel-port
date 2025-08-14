import domainMetricsData from "@/services/mockData/domainMetrics.json";

const domainService = {
  async getMetrics() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...domainMetricsData });
      }, 300);
    });
  }
};

export default domainService;