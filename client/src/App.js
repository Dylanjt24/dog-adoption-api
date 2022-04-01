import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AdoptionsList from './views/AdoptionsList';
import BreedsList from './views/BreedsList';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdoptionsList />} />
        <Route path="/breeds" element={<BreedsList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;