import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Component to edit a specific "fiche1" record
const EditFiche1 = () => {
  // State variables to hold the form inputs
  const [Mp, setMp] = useState("");
  const [Lot, setLot] = useState("");
  const [DLC, setDLC] = useState("");
  const [Quantite, setQuantite] = useState("");
  const [Etanchite, setEtanchite] = useState("");
  const [Etiquette, setEtiquette] = useState("");

  // useNavigate hook for navigation
  const navigate = useNavigate();
  // useParams hook to get the id from the URL
  const { id } = useParams();

  // useEffect hook to fetch the existing data for the specified "fiche1" record when the component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:3001/fiche1/fiche1/${id}`) // Fetch the data for the specific "fiche1" record
      .then((res) => {
        // Populate the state variables with the fetched data
        setMp(res.data.Mp);
        setLot(res.data.Lot);
        setDLC(res.data.DLC);
        setQuantite(res.data.Quantite);
        setEtanchite(res.data.Etanchite);
        setEtiquette(res.data.Etiquette);
      })
      .catch((err) => console.log(err)); // Log any errors during the fetch
  }, [id]); // Dependency array ensures this effect runs when the id changes

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/fiche1/fiche1/${id}`, { // Send a PUT request to update the "fiche1" record
        Mp,
        Lot,
        DLC,
        Quantite,
        Etanchite,
        Etiquette,
      })
      .then((res) => {
        if (res.data.updated) { // Check if the update was successful
          navigate("/fiches1"); // Navigate to the "fiches1" page
        } else {
          console.log(res); // Log the response if the update was not successful
        }
      })
      .catch((err) => console.log(err)); // Log any errors during the update
  };

  // JSX for rendering the form
  return (
    <div className="hero">
      <div className="appc">
        <div className="work">
          <div className="employe-form-container">
            <form className="employe-form" onSubmit={handleSubmit}>
              <h2 className="title">Modifier Fiche</h2>
              <div className="form-group">
                <label htmlFor="Mp">Mp:</label>
                <input
                  type="text"
                  id="Mp"
                  name="Mp"
                  value={Mp}
                  onChange={(e) => setMp(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Lot">Lot:</label>
                <input
                  type="text"
                  id="Lot"
                  name="Lot"
                  value={Lot}
                  onChange={(e) => setLot(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="DLC">DLC:</label>
                <input
                  type="text"
                  id="DLC"
                  name="DLC"
                  value={DLC}
                  onChange={(e) => setDLC(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Quantite">Quantite:</label>
                <input
                  type="text"
                  id="Quantite"
                  name="Quantite"
                  value={Quantite}
                  onChange={(e) => setQuantite(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Etanchite">Etanchite:</label>
                <input
                  type="text"
                  id="Etanchite"
                  name="Etanchite"
                  value={Etanchite}
                  onChange={(e) => setEtanchite(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Etiquette">Etiquette:</label>
                <input
                  type="text"
                  id="Etiquette"
                  name="Etiquette"
                  value={Etiquette}
                  onChange={(e) => setEtiquette(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-addst">
                Modifier{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFiche1;
