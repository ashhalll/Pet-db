'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVets } from '../store/slices/vetSlice';
import Navbar from '@/components/navbar';
import { RootState, AppDispatch } from '../store/store';

export default function PetCare() {
  const dispatch = useDispatch<AppDispatch>();
  const { vets, loading, error } = useSelector((state: RootState) => state.vets);

  // State for search filters
  const [age, setAge] = useState('');
  const [degree, setDegree] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    dispatch(fetchVets());
  }, [dispatch]);

  // Handler for resetting the filters
  const handleReset = () => {
    setAge('');
    setDegree('');
    setCity('');
  };

  // Handler for search action
  const handleSearch = () => {
    // Implement the search logic here based on age, degree, and city
    console.log('Search triggered with:', { age, degree, city });
  };

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center p-24" style={{ backgroundColor: 'rgb(var(--background-color))' }}>
        <h1 className="text-2xl font-bold mt-0">Meet Our Vets</h1>

        {/* Search Bar */}
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Search Vets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Age Filter */}
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              className="border p-2 rounded"
            />
            {/* Degree Filter */}
            <input
              type="text"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              placeholder="Degree"
              className="border p-2 rounded"
            />
            {/* City Filter */}
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="border p-2 rounded"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-4">
            <button onClick={handleReset} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-4">
              Reset
            </button>
            <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Search
            </button>
          </div>
        </div>

        {loading ? (
          <p>Loading vets...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : vets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            {vets.map((vet) => (
              <div key={vet.vet_id} className="border rounded-lg shadow p-4 bg-white max-w-xs">
                <h2 className="text-xl font-bold">{vet.clinic_name}</h2>
                <p className="text-gray-500">Location: {vet.location}</p>
                <p className="text-gray-500">Minimum Fee: PKR {vet.minimum_fee}</p>
                <p className="text-gray-500">Contact: {vet.contact_details}</p>
                <p className="text-gray-500">Bio: {vet.bio}</p>
                <p className={`text-sm ${vet.profile_verified ? 'text-green-500' : 'text-red-500'}`}>
                  {vet.profile_verified ? 'Verified' : 'Not Verified'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No vets available at the moment.</p>
        )}
      </main>
    </>
  );
}