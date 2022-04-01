import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const BreedsList = () => {
    const [breeds, setBreeds] = useState();
    const [requestedBreed, setRequestedBreed] = useState();
    const [breedImg, setBreedImg] = useState();

    useEffect(() => {
        axios.get(`https://api.thedogapi.com/v1/breeds?api_key=a1ab8e99-fcbb-4e06-ba32-e0b4b899ca00`)
            .then(res => setBreeds(res.data))
            .catch(err => console.log(err));
    }, [])

    const getBreedInfo = id => {
        axios.get(`https://api.thedogapi.com/v1/images/search?breed_id=${id}&api_key=a1ab8e99-fcbb-4e06-ba32-e0b4b899ca00`)
            .then(res => {
                console.log(res.data[0]); setRequestedBreed(res.data[0].breeds[0]); setBreedImg(res.data[0])})
            .catch(err => console.log(err));
    }

    return (
        <div className="container text-center">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Pup Haven</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Adopt</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/breeds" className="nav-link active">Breeds Info</Link>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
            <h1>Select Breed:</h1>
            <select name="breed" onChange={(e) =>getBreedInfo(e.target.value)} className="form-select text-center" style={{maxWidth: "60rem", margin: "auto"}}>
                <option hidden></option>
                {
                    breeds &&
                        breeds.map((breed, i) => (
                            <option key={i} value={breed.id}>{breed.name}</option>
                        ))
                }
            </select>
            {
                    breedImg &&
                        <div className="card bg-primary text-white mt-4" style={{maxWidth: "60rem", margin: "auto"}}>
                            <img src={breedImg.url} alt={requestedBreed.name} className="card-img-top" style={{maxHeight: "50rem"}} />
                            <div className="card-body">
                                <p className="card-text"><strong>Temperament: </strong>{requestedBreed.temperament}</p>
                                { requestedBreed.bred_for && 
                                    <p className="card-text"><strong>Bred For: </strong>{requestedBreed.bred_for}</p>
                                }
                                { requestedBreed.breed_group &&
                                    <p className="card-text"><strong>Breed Group: </strong>{requestedBreed.breed_group}</p>
                                }
                                <p className="card-text"><strong>Weight: </strong>{requestedBreed.weight.imperial}lbs</p>
                                <p className="card-text"><strong>Height: </strong>{requestedBreed.height.imperial} inches</p>
                                <p className="card-text"><strong>Average Life Span: </strong>{requestedBreed.life_span}</p>
                                { requestedBreed.origin &&
                                    <p className="card-text"><strong>Origin: </strong>{requestedBreed.origin}</p>
                                }
                            </div>
                        </div>
                }
        </div>
    )
}

export default BreedsList