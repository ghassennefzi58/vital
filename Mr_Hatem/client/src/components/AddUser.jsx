import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AddUser.css"; // Import custom CSS for styling

// Functional component to add a new user
const AddForm = () => {
  // State variables to manage form inputs and errors
  const [option, setOption] = useState("employe"); // Default role option
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [zone, setZone] = useState("zone v20"); // Default zone option
  const [IDuser, setIDuser] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validation for IDuser: must be a 4-digit number
    const idRegex = /^\d{4}$/;
    if (!idRegex.test(IDuser)) {
      setError("Code doit etre 4 chiffres"); // Set error message
      return;
    }

    setError(""); // Clear error message if validation passes

    // List of valid zones for further validation
    const validZones = ["zone v20", "zone Gélule", "zone3", "zone4", "zone5", "zone6"];
    if (!validZones.includes(zone)) {
      setError("Invalid zone selection"); // Set error message for invalid zone
      return;
    }

    // Determine the URL based on the selected role (option)
    const url =
      option === "employe"
        ? "http://localhost:3001/employe/register"
        : "http://localhost:3001/validator/register";

    // Send a POST request to the backend to register a new user
    axios
      .post(url, { username, password, zone, IDuser })
      .then((res) => {
        if (res.data.registered) {
          // Navigate to the appropriate page based on the role if registration is successful
          if (option === "employe") {
            navigate("/display-employees");
          } else if (option === "validateur") {
            navigate("/display-validators");
          }
        }
        console.log(res); // Log the response for debugging
      })
      .catch((err) => console.log(err)); // Log any errors during the request
  };

  // JSX for rendering the form
  return (
   <div className="hero">
    <div className="appc">
      <div className="work">
        <div className="employe-form-container">
          <form className="employe-form" onSubmit={handleSubmit}>
            <h2>Ajouter Utilisateur</h2>
            <div className="form-group">
              <label htmlFor="username">Nom d'utilisateur :</label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={(e) => setUsername(e.target.value)} // Update state on change
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe :</label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)} // Update state on change
              />
            </div>
            <div className="form-group">
              <label htmlFor="IDuser">Identifiant :</label>
              <input
                type="text"
                id="IDuser"
                name="IDuser"
                onChange={(e) => setIDuser(e.target.value)} // Update state on change
              />
              <div
                className="alert alert-danger"
                style={{ color: "red", fontSize: "small", marginTop: "5px" }}
              >
                {error} {/* Display error message if any */}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="zone">Zone :</label>
              <select
                id="zone"
                name="zone"
                value={zone}
                onChange={(e) => setZone(e.target.value)} // Update state on change
              >
                <option value="zone v20">Zone v20</option>
                <option value="zone Gélule">Zone Gélule</option>
                <option value="zone3">Zone 3</option>
                <option value="zone4">Zone 4</option>
                <option value="zone5">Zone 5</option>
                <option value="zone6">Zone 6</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="option">Role :</label>
              <select
                id="option"
                name="option"
                value={option}
                onChange={(e) => setOption(e.target.value)} // Update state on change
              >
                <option value="employe">Employee</option>
                <option value="validateur">Validateur</option>
              </select>
            </div>
            <button type="submit" className="btn-addst">
              Enregistrer
            </button>
          </form>
        </div>
      </div>
    </div>
   </div>
  );
};

export default AddForm;
