import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const AdoptionsList = () => {
    const [accessToken, setAccessToken] = useState(null);
    const [results, setResults] = useState(null);
    const petFinderKey = process.env.REACT_APP_PET_FINDER_KEY;
    const petFinderSecret = process.env.REACT_APP_PET_FINDER_SECRET; //dwd

    useEffect(() => {
        const fetchAccessToken = async () => {
            const params = new URLSearchParams();
            params.append("grant_type", "client_credentials");
            params.append("client_id", petFinderKey); //dw
            params.append("client_secret", petFinderSecret); //ds
            const petfinderRes = await fetch(
                "https://api.petfinder.com/v2/oauth2/token",
                {
                    method: "POST",
                    body: params
                }
            );
            const json = (await petfinderRes.json());
            setAccessToken(json.access_token);
        };
        const fetchPets = async () => {
                const petResults = await fetch("https://api.petfinder.com/v2/animals?type=dog", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                const json = await petResults.json();
                setResults(json.animals);
                console.log(results);
        }
        fetchAccessToken();
        fetchPets();
    }, []);

    return (
        <div className="container text-center">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Pup Haven</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active" aria-current="page">Adopt</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/breeds" className="nav-link">Breeds Info</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="p-5 my-4 bg-primary text-white rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">Find Your New Best Friend</h1>
                </div>
            </div>
            {
                results ?
                    <div className="row m-auto">
                        {
                            results.map((dog, i) => (
                                <>
                                    {
                                        i % 2 === 0 ?
                                            <div key={i} className="card mb-5 me-4 text-white bg-dark border-primary border-3" style={{width: "25rem"}}>
                                                {
                                                    dog.primary_photo_cropped ?
                                                            <img src={dog.primary_photo_cropped.full} alt="dog" className="card-img-top rounded mt-2" /> :
                                                            <img src="https://web.mo.gov/doc/PuppiesForParolePublic/images/noPhoto.png" alt="unavailable placeholder" className="card-img-top rounded mt-2" />
                                                }
                                                <div className="card-body">
                                                    <h5 className="card-title"><strong>{dog.name}</strong></h5>
                                                    <p className="card-text">{dog.age} {dog.colors.primary} {dog.gender} {dog.breeds.primary}</p>
                                                    <p className="card-text">{dog.contact.address.city}, {dog.contact.address.state}</p>
                                                    <p className="card-text">{dog.description}</p>
                                                    <a href={dog.url} className="card-text btn btn-outline-light btn-lg">See more here!</a>
                                                </div>
                                            </div> :
                                            <div key={i} className="card mb-5 me-4 text-white bg-dark border-primary border-3" style={{width: "25rem"}}>
                                            {
                                                dog.primary_photo_cropped ?
                                                        <img src={dog.primary_photo_cropped.full} alt="dog" className="card-img-top rounded mt-2" /> :
                                                        <img src="https://web.mo.gov/doc/PuppiesForParolePublic/images/noPhoto.png" alt="unavailable placeholder" className="card-img-top rounded mt-2" />
                                            }
                                            <div className="card-body">
                                                <h5 className="card-title"><strong>{dog.name}</strong></h5>
                                                <p className="card-text">{dog.age} {dog.colors.primary} {dog.gender} {dog.breeds.primary}</p>
                                                <p className="card-text">{dog.contact.address.city}, {dog.contact.address.state}</p>
                                                <p className="card-text">{dog.description}</p>
                                                <a href={dog.url} className="card-text text-white btn btn-outline-light btn-lg">See more here!</a>
                                            </div>
                                        </div>
                                    }
                                </>
                            ))
                        }
                    </div> :
                    null
            }
        </div>
    )
}

export default AdoptionsList