import React, { Component } from "react";
import { Link } from "react-router-dom";
import { searchJob } from "./requests";

export class JobDetail extends Component {
  state = { job: null };

  async componentDidMount() {
    this.setState({ job: await searchJob(this.props.match.params.jobId) });
  }

  render() {
    const { job } = this.state;

    if (!job) return null;

    return (
      <div>
        <h1 className="title">{job.title}</h1>
        <h2 className="subtitle">
          <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
        </h2>
        <div className="box">{job.description}</div>
      </div>
    );
  }
}
