import keywordsData from "@/services/mockData/keywords.json";

let keywords = [...keywordsData];

const keywordService = {
  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...keywords]);
      }, 400);
    });
  },

  async create(keywordData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newKeyword = {
          Id: Math.max(...keywords.map(k => k.Id)) + 1,
          phrase: keywordData.phrase,
          currentPosition: Math.floor(Math.random() * 50) + 1,
          previousPosition: null,
          searchVolume: Math.floor(Math.random() * 10000) + 500,
          url: keywordData.url,
          lastUpdated: new Date().toISOString().split("T")[0]
        };
        keywords.push(newKeyword);
        resolve({ ...newKeyword });
      }, 500);
    });
  },

  async delete(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        keywords = keywords.filter(keyword => keyword.Id !== id);
        resolve({ success: true });
      }, 300);
    });
  }
};

export default keywordService;