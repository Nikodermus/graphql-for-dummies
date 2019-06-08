import React, { Component } from "react";
import { createJob } from "./requests";

export class JobForm extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", description: "" };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleClick = event => {
    event.preventDefault();
    const companyId = "SJV0-wdOM";

    const { title, description } = this.state;
    createJob({
      title,
      description,
      companyId
    }).then(({ id }) => {
      // this.props.history.push(`/jobs/${id}`);
    });
  };

  render() {
    const { handleChange, handleClick } = this;
    const { title, description } = this.state;

    return (
      <div>
        <h1 className="title">New Job</h1>
        <div className="box">
          <form onSubmit={handleClick}>
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  className="input"
                  style={{ height: "10em" }}
                  name="description"
                  value={description}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button type="submit" className="button is-link">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
