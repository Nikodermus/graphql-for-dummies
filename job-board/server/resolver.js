const db = require("./db");

const Query = {
  job: (root, { id }) => db.jobs.get(id),
  jobs: () => db.jobs.list()
};

const Job = {
  company: ({ companyId }) => db.companies.get(companyId)
};

module.exports = { Query, Job };
