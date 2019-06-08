const endpoint = "http://localhost:9000/graphql";

const graphqlRequest = async query => {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(query)
  });

  const { data, errors } = await response.json();
  if (errors) {
    throw new Error(errors.map(({ message }) => message).join("\n"));
  }
  return data;
};

export const loadJobs = async () => {
  const { jobs } = await graphqlRequest({
    query: `{
        jobs{
          title
          company{
            name
          }
          id
        }
      }`
  });

  return jobs;
};

export const searchJob = async id => {
  const { job } = await graphqlRequest({
    query: `query JobQuery($id: ID!){
    job(id: $id ) {
      id
      title
      description
      company{
        id
        name
      }
    }
  }`,
    variables: { id }
  });

  return job;
};

export const searchCompany = async id => {
  const { company } = await graphqlRequest({
    query: `query CompanyQuery($id:ID!){
      company(id: $id){
        name
        id
        description
        jobs {
          id
          title
          description
        }
      }
    }`,
    variables: { id }
  });
  return company;
};

export const createJob = async input => {
  const { job } = await graphqlRequest({
    query: `
    mutation CreateJob($input: CreateJobInput){
      job: createJob(input: $input){
        title
        id
        company{
          id
          name
        }
      }
    }`,
    variables: { input }
  });
  return job;
};
