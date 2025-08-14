import competitorsData from "@/services/mockData/competitors.json";

const competitorService = {
  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...competitorsData]);
      }, 500);
    });
  }
};

export default competitorService;