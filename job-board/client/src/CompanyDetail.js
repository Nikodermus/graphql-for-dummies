import React, { Component } from "react";
import { searchCompany } from "./requests";
import { JobList } from "./JobList";

export class CompanyDetail extends Component {
  state = { company: null };

  async componentDidMount() {
    const { companyId } = this.props.match.params;
    this.setState({ company: await searchCompany(companyId) });
  }

  render() {
    const { company } = this.state;
    if (!company) return null;

    return (
      <div>
        <h1 className="title">{company.name}</h1>
        <div className="box">{company.description}</div>

        <h5 className="title is-5">{`Jobs at ${company.name}`}</h5>
        <JobList jobs={company.jobs} />
      </div>
    );
  }
}
