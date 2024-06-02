import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Functional component to add a new storage record (Fiche1)
const AddFiche1 = ({ IDuser }) => {
  // State variables to manage form inputs
  const [Mp, setMp] = useState("");
  const [Lot, setLot] = useState("");
  const [DLC, setDLC] = useState("");
  const [Quantite, setQuantite] = useState("");
  const [Etanchite, setEtanchite] = useState("");
  const [Etiquette, setEtiquette] = useState("");
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Send a POST request to the backend to add a new record
    axios
      .post("http://localhost:3001/fiche1/add", {
        Mp,
        Lot,
        DLC,
        Quantite,
        Etanchite,
        Etiquette,
        createdBy: IDuser, // Include the ID of the user who created the record
      })
      .then((res) => {
        if (res.data.added) {
          // If the record is successfully added, navigate to the list of records
          navigate("/fiches1");
        } else {
          // Log the response if the addition was not successful
          console.log(res);
        }
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
              <h2 className="title">Fiche de stockage</h2>
              <div className="form-group">
                <label htmlFor="Mp">Matière Première :</label>
                <input
                  type="text"
                  id="Mp"
                  name="Mp"
                  onChange={(e) => setMp(e.target.value)} // Update state on change
                />
              </div>
              <div className="form-group">
                <label htmlFor="Lot">Lot :</label>
                <input
                  type="text"
                  id="Lot"
                  name="Lot"
                  onChange={(e) => setLot(e.target.value)} // Update state on change
                />
              </div>
              <div className="form-group">
                <label htmlFor="DLC">Date Limite Consommation :</label>
                <input
                  type="date"
                  id="DLC"
                  name="DLC"
                  onChange={(e) => setDLC(e.target.value)} // Update state on change
                />
              </div>
              <div className="form-group">
                <label htmlFor="Quantite">Quantite :</label>
                <input
                  type="text"
                  id="Quantite"
                  name="Quantite"
                  onChange={(e) => setQuantite(e.target.value)} // Update state on change
                />
              </div>
              <div className="form-group">
                <label htmlFor="Etanchite">Étanchéité et Sécurité des Bouchons :</label>
                <input
                  type="text"
                  id="Etanchite"
                  name="Etanchite"
                  onChange={(e) => setEtanchite(e.target.value)} // Update state on change
                />
              </div>
              <div className="form-group">
                <label htmlFor="Etiquette">Étiquette Fournisseur :</label>
                <input
                  type="text"
                  id="Etiquette"
                  name="Etiquette"
                  onChange={(e) => setEtiquette(e.target.value)} // Update state on change
                />
              </div>
              <button type="submit" className="btn-addst">
                Ajouter
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFiche1;
