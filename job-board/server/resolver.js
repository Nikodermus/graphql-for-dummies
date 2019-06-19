const db = require("./db");

const Query = {
  job: (root, { id }) => db.jobs.get(id),
  company: (root, { id }) => db.companies.get(id),
  jobs: () => db.jobs.list()
};

const Mutation = {
  createJob: (root, { input }, { user }) => {
    if (!user) throw new Error("Unauth");

    const id = db.jobs.create({ companyId: user.companyId, ...input });
    return db.jobs.get(id);
  }
};

const Company = {
  jobs: ({ id }) => db.jobs.list().filter(({ companyId }) => companyId === id)
};

const Job = {
  company: ({ companyId }) => db.companies.get(companyId)
};

module.exports = { Query, Job, Company, Mutation };
