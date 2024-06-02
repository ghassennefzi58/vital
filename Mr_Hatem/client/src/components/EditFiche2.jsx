import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Component to edit a specific "fiche2" record
const EditFiche2 = () => {
    // State variables to hold the form inputs
    const [Responsable, setResponsable] = useState('');
    const [Ref, setRef] = useState('');
    const [Produit, setProduit] = useState('');
    const [Mp, setMp] = useState('');
    const [Datepese, setDatepese] = useState('');
    const [Equipement, setEquipement] = useState('');
    const [Poids, setPoids] = useState('');

    // useNavigate hook for navigation
    const navigate = useNavigate();
    // useParams hook to get the id from the URL
    const { id } = useParams();

    // useEffect hook to fetch the existing data for the specified "fiche2" record when the component mounts
    useEffect(() => {
        axios.get(`http://localhost:3001/fiche2/fiche2/${id}`) // Fetch the data for the specific "fiche2" record
        .then(res => {
            // Populate the state variables with the fetched data
            setResponsable(res.data.Responsable);
            setRef(res.data.Ref);
            setProduit(res.data.Produit);
            setMp(res.data.Mp);
            setDatepese(res.data.Datepese);
            setEquipement(res.data.Equipement);
            setPoids(res.data.Poids);
        })
        .catch(err => console.log(err)); // Log any errors during the fetch
    }, [id]); // Dependency array ensures this effect runs when the id changes

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/fiche2/fiche2/${id}`, { // Send a PUT request to update the "fiche2" record
            Responsable,
            Ref,
            Produit,
            Mp,
            Datepese,
            Equipement,
            Poids,
        })
        .then(res => {
            if(res.data.updated) { // Check if the update was successful
                navigate('/fiches2'); // Navigate to the "fiches2" page
            } else {
                console.log(res); // Log the response if the update was not successful
            }
        })
        .catch(err => console.log(err)); // Log any errors during the update
    }

    // JSX for rendering the form
    return (
       <div className="hero">
        <div className="appc">
            <div className="work">
                <div className="employe-form-container">
                    <form className="employe-form" onSubmit={handleSubmit}>
                        <h2>Edit Fiche2</h2>
                        <div className="form-group">
                            <label htmlFor="Responsable">Responsable de Pesé:</label>
                            <input type="text" id="Responsable" name="Responsable" value={Responsable}
                            onChange={(e) => setResponsable(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Ref">Référence:</label>
                            <input type="text" id="Ref" name="Ref" value={Ref}
                            onChange={(e) => setRef(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Produit">Produit:</label>
                            <input type="text" id="Produit" name="Produit" value={Produit}
                            onChange={(e) => setProduit(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Mp">Matière Première:</label>
                            <input type="text" id="Mp" name="Mp" value={Mp}
                            onChange={(e) => setMp(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Datepese">Date de Pesé:</label>
                            <input type="text" id="Datepese" name="Datepese" value={Datepese}
                            onChange={(e) => setDatepese(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Equipement">Equipement-utilisé:</label>
                            <input type="text" id="Equipement" name="Equipement" value={Equipement}
                            onChange={(e) => setEquipement(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Poids">Poids:</label>
                            <input type="text" id="Poids" name="Poids" value={Poids}
                            onChange={(e) => setPoids(e.target.value)} />
                        </div>
                        <button type="submit" className='btn-addst'>Modifier</button>
                    </form>
                </div>
            </div>
        </div>
       </div>
    );
}

export default EditFiche2;
