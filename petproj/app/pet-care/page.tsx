"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVets } from "../store/slices/vetSlice";
import Navbar from "@/components/navbar";
import FilterSection from "../../components/FilterSection";
import PetGrid from "../../components/petGrid";
import { RootState, AppDispatch } from "../store/store";

export default function PetCare() {
  const dispatch = useDispatch<AppDispatch>();
  const { vets, loading, error } = useSelector((state: RootState) => state.vets);

  // State for filter inputs
  const [filters, setFilters] = useState({
    age: "",
    degree: "",
    city: ""
  });

  useEffect(() => {
    dispatch(fetchVets());
  }, [dispatch]);

  // Reset filters to their initial state
  const handleReset = () => {
    setFilters({
      age: "",
      degree: "",
      city: ""
    });
  };

  // Handle search operation
  const handleSearch = () => {
    console.log("Searching with filters:", filters);
  };

  // Filter vets based on the current filters
  // const filteredVets = vets.filter((vet) => {
  //   const matchesAge = filters.age ? vet.age === Number(filters.age) : true;
  //   const matchesDegree = filters.degree ? vet.degree.includes(filters.degree) : true;
  //   const matchesCity = filters.city ? vet.city.includes(filters.city) : true;

  //   return matchesAge && matchesDegree && matchesCity;
  // });

  return (
    <>
      <Navbar />
      <div className="fullBody">
        <FilterSection
          onSearch={(filters) =>
            setFilters((prev) => ({ ...prev, ...filters }))
          }
        />
        <main className="flex min-h-screen flex-col items-center p-8 bg-gray-100">
          <h1 className="text-2xl font-bold mt-0">Meet Our Vets</h1>



          {/* {loading ? ( */}
            {/* <p>Loading vets...</p> */}
          {/* ) : error ? ( */}
            {/* <p>Error: {error}</p> */}
          {/* ) : ( */}
            {/* // <PetGrid pets={filteredVets} />  Can be renamed to VetGrid later */}
          {/* )} */}
        </main>
      </div>
    </>
  );
}