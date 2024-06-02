import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Import the search icon from react-icons

// Functional component to display users (either employees or validators)
const DisplayUsers = ({ userType }) => {
  const [users, setUsers] = useState([]); // State to store the list of users
  const [searchTerm, setSearchTerm] = useState(""); // State to manage the search term

  // useEffect hook to fetch users from the backend when the component mounts or userType changes
  useEffect(() => {
    axios
      .get(`http://localhost:3001/${userType}/all`) // Fetch all users of the given userType
      .then((res) => {
        setUsers(res.data); // Update the users state with the fetched data
      })
      .catch((err) => console.error("Error fetching users:", err)); // Log any errors during the request
  }, [userType]); // Dependency array ensures this effect runs when userType changes

  // Function to handle deletion of a user
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/${userType}/${id}`) // Send a delete request for the user with the given ID
      .then((res) => {
        console.log(res.data); // Log the response for debugging
        setUsers(users.filter((user) => user._id !== id)); // Remove the deleted user from the state
      })
      .catch((err) => console.error("Error deleting user:", err)); // Log any errors during the request
  };

  // Filter the users based on the search term
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // JSX for rendering the user table
  return (
    <div className="hero">
      <div className="appc">
        <div className="work">
          <div className="cadre">
            <h2 className="titre1">
              {userType === "employe" ? "Employees" : "Validateurs"} {/* Conditional rendering of the title */}
            </h2>
            <div className="search-container1">
              <input
                type="text"
                placeholder="Chercher par Nom d'utilisateur" // Placeholder text for the search input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update the search term state on input change
              />
              <button className="search-btn">
                <FaSearch /> {/* Search button with a search icon */}
              </button>
            </div>
            <table className="tableP">
              <thead>
                <tr>
                  <th className="header-cell">Nom d'utilisateur</th>
                  <th className="header-cell">IDentifiant</th>
                  <th className="header-cell">Zone</th>
                  <th className="header-cell">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="data-cell">{user.username}</td>
                    <td className="data-cell">{user.IDuser}</td>
                    <td className="data-cell">{user.zone}</td>
                    <td className="data-cell">
                      <Link to={`/edit/${userType}/${user._id}`}>
                        <button className="edituser">Modifier</button> {/* Button to edit the user */}
                      </Link>
                      <button
                        className="deleteuser"
                        onClick={() => handleDelete(user._id)} // Handle user deletion on button click
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayUsers;
