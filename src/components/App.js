import React, { Component } from 'react';

class App extends Component {
  state = {
    userList: [],
    isLoading: false,
  };

  fetchUserList = () => {
    this.setState({ isLoading: true });
    fetch('https://randomuser.me/api/?results=10')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ userList: data.results, isLoading: false });
      })
      .catch((error) => {
        console.error('Error fetching user list:', error);
        this.setState({ isLoading: false });
      });
  };

  renderTable() {
    const { userList } = this.state;
    if (userList.length === 0) {
      return <div>No data found to display.</div>;
    }

    return (
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => (
            <tr key={index}>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.email}</td>
              <td>
                <img src={user.picture.thumbnail} alt="User Thumbnail" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    const { isLoading } = this.state;

    return (
      <div>
        <button className="btn" onClick={this.fetchUserList}>
          Get User List
        </button>
        {isLoading ? <div>Loading...</div> : this.renderTable()}
      </div>
    );
  }
}

export default App;


