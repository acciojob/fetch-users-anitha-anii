import React, { Component } from "react";
import "../styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: false,
    };
  }

  display = () => {
    this.setState({ loading: true });
    fetch("https://randomuser.me/api/?results=10")
      .then((res) => res.json())
      .then((data) => {
        const users = data.results.map((user) => ({
          fname: user.name.first,
          lname: user.name.last,
          email: user.email,
          image: user.picture.thumbnail,
        }));
        this.setState({ list: users, loading: false });
      });
  };

  render() {
    const { list, loading } = this.state;

    return (
      <div>
        {/* Do not remove the main div */}
        <button className="btn" onClick={this.display}>
          Get User List
        </button>
        {loading ? (
          <p>Loading...</p>
        ) : list.length === 0 ? (
          <p>No data found to display.</p>
        ) : (
          <table>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Avatar</th>
            </tr>
            {list.map((person, index) => (
              <tr key={index}>
                <td>{person.fname}</td>
                <td>{person.lname}</td>
                <td>{person.email}</td>
                <td>
                  <img src={person.image} alt={`Avatar ${index + 1}`} />
                </td>
              </tr>
            ))}
          </table>
        )}
      </div>
    );
  }
}

export default App;

