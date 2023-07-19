import React, { useState } from "react";
import "../styles/App.css";

const App = () => {
  const [list, setList] = useState([]);

  const display = () => {
    fetch("https://randomuser.me/api/?results=10")
      .then((res) => res.json())
      .then((data) => {
        const users = data.results.map((user) => ({
          fname: user.name.first,
          lname: user.name.last,
          email: user.email,
          image: user.picture.thumbnail,
        }));
        setList(users);
      });
  };

  return (
    <div>
      {/* Do not remove the main div */}
      <button className="btn" onClick={display}>
        Get User List
      </button>
      {list.length === 0 ? (
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
};

export default App;


