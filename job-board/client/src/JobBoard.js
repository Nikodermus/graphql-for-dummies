import React, { Component } from "react";
import { JobList } from "./JobList";
import { loadJobs } from "./requests";

export class JobBoard extends Component {
  state = {
    jobs: []
  };

  async componentDidMount() {
    this.setState({ jobs: await loadJobs() });
  }

  render() {
    const { jobs } = this.state;

    return (
      <div>
        <h1 className="title">Job Board</h1>
        <JobList jobs={jobs} />
      </div>
    );
  }
}
