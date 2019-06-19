import { getAccessToken, isLoggedIn } from "./auth";
import {
  ApolloLink,
  ApolloClient,
  HttpLink,
  InMemoryCache
} from "apollo-boost";
import gql from "graphql-tag";

const endpoint = "http://localhost:9000/graphql";

const authLink = new ApolloLink((operation, forward) => {
  if (isLoggedIn()) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${getAccessToken()}`
      }
    });
  }
  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, new HttpLink({ uri: endpoint })]),
  cache: new InMemoryCache()
});

const jobDetailFragment = gql`
  fragment JobDetail on Job {
    id
    title
    description
    company {
      id
      name
    }
  }
`;

const loadJobsQuery = gql`
  query LoadJobs {
    jobs {
      title
      company {
        name
      }
      id
    }
  }
`;

export const loadJobs = async () => {
  const { data } = await client.query({
    query: loadJobsQuery,
    fetchPolicy: "no-cache"
  });
  return data.jobs;
};

const searchJobQuery = gql`
  query JobQuery($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

export const searchJob = async id => {
  const request = {
    query: searchJobQuery,
    variables: { id }
  };

  const { data } = await client.query(request);
  return data.job;
};

const searchCompanyQuery = gql`
  query CompanyQuery($id: ID!) {
    company(id: $id) {
      name
      id
      description
      jobs {
        id
        title
        description
      }
    }
  }
`;

export const searchCompany = async id => {
  const request = {
    query: searchCompanyQuery,
    variables: { id }
  };

  const { data } = await client.query(request);
  return data.company;
};

const createJobMutation = gql`
  mutation CreateJob($input: CreateJobInput) {
    job: createJob(input: $input) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

export const createJob = async input => {
  const request = {
    mutation: createJobMutation,
    variables: { input },
    update: (cache, { data }) => {
      cache.writeQuery({
        query: searchJobQuery,
        variables: { id: data.job.id },
        data
      });
    }
  };

  const { data } = await client.mutate(request);
  return data.job;
};
