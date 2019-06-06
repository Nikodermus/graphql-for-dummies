import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

const loadGreeting = async () => {
  const response = await fetch("http://localhost:9000/graphql", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ query: "{ greeting }" })
  });

  const { data } = await response.json();
  return data.greeting;
};

class App extends Component {
  state = {
    greeting: ""
  };

  async componentDidMount() {
    this.setState({ greeting: await loadGreeting() });
  }

  render() {
    const { greeting } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{greeting}</p>
        </header>
      </div>
    );
  }
}

export default App;
