const endpoint = "http://localhost:9000/graphql";
const fetchSettings = query => ({
  method: "POST",
  headers: {
    "content-type": "application/json"
  },
  body: JSON.stringify(query)
});

export const loadJobs = async () => {
  const res = await fetch(
    endpoint,
    fetchSettings({
      query: `{
    jobs{
      title
      company{
        name
      }
      id
    }
  }`
    })
  );

  const { data } = await res.json();
  return data.jobs;
};

export const searchJob = async id => {
  const res = await fetch(
    endpoint,
    fetchSettings({
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
    })
  );

  const { data } = await res.json();
  return data.job;
};
