import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      userInfo: { username: "", password: "" },
      userData: {},
    };
  }

  fetchUsers = () => {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => this.setState({ users: data }));
  };

  componentDidMount() {
    this.fetchUsers();
  }

  handleChange = (e) => {
    this.setState({
      userInfo: { ...this.state.userInfo, [e.target.name]: e.target.value },
    });
  };

  handleClick = () => {
    this.setState({
      userData: this.state.userInfo,
      userInfo: { username: "", password: "" },
    });
  };

  sendUsers = () => {
    fetch("/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(this.state.userData),
    })
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          users: [...this.state.users, data],
        })
      );
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.userData !== this.state.userData) {
      this.sendUsers();
    }
  }

  render() {
    return (
      <div className='App'>
        <input
          type='text'
          placeholder='username'
          name='username'
          value={this.state.userInfo.username}
          onChange={this.handleChange}
        />
        <input
          type='text'
          placeholder='password'
          name='password'
          value={this.state.userInfo.password}
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>Send to backend!</button>
      </div>
    );
  }
}

export default App;
