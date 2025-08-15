import competitorsData from "@/services/mockData/competitors.json";

let competitorsList = [...competitorsData];

const competitorService = {
  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...competitorsList]);
      }, 500);
    });
  },

  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const competitor = competitorsList.find(c => c.Id === parseInt(id));
        if (competitor) {
          resolve({ ...competitor });
        } else {
          reject(new Error('Competitor not found'));
        }
      }, 300);
    });
  },

  async create(competitorData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Validate domain
        if (!competitorData.domain || typeof competitorData.domain !== 'string') {
          reject(new Error('Domain is required'));
          return;
        }

        // Check if domain already exists
        const existingCompetitor = competitorsList.find(c => 
          c.domain.toLowerCase() === competitorData.domain.toLowerCase()
        );
        if (existingCompetitor) {
          reject(new Error('Competitor domain already exists'));
          return;
        }

        // Generate new ID
        const maxId = competitorsList.length > 0 ? Math.max(...competitorsList.map(c => c.Id)) : 0;
        const newCompetitor = {
          Id: maxId + 1,
          domain: competitorData.domain.toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, ''),
          commonKeywords: Math.floor(Math.random() * 80) + 10, // Random between 10-90
          visibilityScore: Math.floor(Math.random() * 40) + 60 // Random between 60-100
        };

        competitorsList.push(newCompetitor);
        resolve({ ...newCompetitor });
      }, 800);
    });
  },

  async update(id, updateData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = competitorsList.findIndex(c => c.Id === parseInt(id));
        if (index === -1) {
          reject(new Error('Competitor not found'));
          return;
        }

        competitorsList[index] = { ...competitorsList[index], ...updateData };
        resolve({ ...competitorsList[index] });
      }, 600);
    });
  },

  async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = competitorsList.findIndex(c => c.Id === parseInt(id));
        if (index === -1) {
          reject(new Error('Competitor not found'));
          return;
        }

        const deleted = competitorsList.splice(index, 1)[0];
        resolve({ ...deleted });
      }, 400);
    });
  }
};

export default competitorService;