import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Functional component to add a new weighing record (Fiche2)
const AddFiche1 = ({IDuser}) => {
    // State variables to manage form inputs
    const [Responsable, setResponsable] = useState('');
    const [Ref, setRef] = useState('');
    const [Produit, setProduit] = useState('');
    const [Mp, setMp] = useState('');
    const [Datepese, setDatepese] = useState('');
    const [Equipement, setEquipement] = useState('');
    const [Poids, setPoids] = useState('');
    const navigate = useNavigate(); // Hook to navigate programmatically

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        // Send a POST request to the backend to add a new record
        axios.post('http://localhost:3001/fiche2/add', { 
            Responsable,
            Ref,
            Produit,
            Mp,
            Datepese,
            Equipement,
            Poids,
            createdBy: IDuser // Include the ID of the user who created the record
        })
        .then(res => {
            if(res.data.added) {
                // If the record is successfully added, navigate to the list of records
                navigate('/fiches2');
            } else {
                // Log the response if the addition was not successful
                console.log(res);
            }
        })
        .catch(err => console.log(err)); // Log any errors during the request
    }

    // JSX for rendering the form
    return (
      <div className="hero">
        <div className="appc">
          <div className="work">
            <div className="employe-form-container">
              <form className="employe-form" onSubmit={handleSubmit}>
                <h2 className="title">Fiche de pesé</h2>
                <div className="form-group">
                  <label htmlFor="Responsable">Responsable de Pesé :</label>
                  <input 
                    type="text" 
                    id="Responsable" 
                    name="Responsable" 
                    onChange={(e) => setResponsable(e.target.value)} // Update state on change
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Ref">Référence :</label>
                  <input 
                    type="text" 
                    id="Ref" 
                    name="Ref" 
                    onChange={(e) => setRef(e.target.value)} // Update state on change
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Produit">Produit :</label>
                  <input 
                    type="text" 
                    id="Produit" 
                    name="Produit" 
                    onChange={(e) => setProduit(e.target.value)} // Update state on change
                  />
                </div>
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
                  <label htmlFor="Datepese">Date de Pesé :</label>
                  <input 
                    type="date" 
                    id="Datepese" 
                    name="Datepese" 
                    onChange={(e) => setDatepese(e.target.value)} // Update state on change
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Equipement">Équipement utilisé :</label>
                  <input 
                    type="text" 
                    id="Equipement" 
                    name="Equipement" 
                    onChange={(e) => setEquipement(e.target.value)} // Update state on change
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Poids">Poids :</label>
                  <input 
                    type="text" 
                    id="Poids" 
                    name="Poids" 
                    onChange={(e) => setPoids(e.target.value)} // Update state on change
                  />
                </div>
                <button type="submit" className='btn-addst'>Ajouter</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}

export default AddFiche1;
