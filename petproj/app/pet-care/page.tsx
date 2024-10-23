<<<<<<< HEAD
"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVets } from "../store/slices/vetSlice";
import Navbar from "@/components/navbar";
import VetFilterSection from "@/components/vetfilterSelection";
import { RootState, AppDispatch } from "../store/store";
=======
// PetCare Component
"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import VetFilterSection from "../../components/VetFilterSection";
import VetGrid from "@/components/VetGrid";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchVets } from "../store/slices/vetSlice";
>>>>>>> 9b28c9786fa58d8af49246511fefa235802fde42

export default function PetCare() {
  const dispatch = useDispatch<AppDispatch>();
  const { vets, loading, error } = useSelector((state: RootState) => state.vets);

<<<<<<< HEAD
  // State for filter inputs
  const [filters, setFilters] = useState({
    degree: "",
    city: ""
=======
  const [filters, setFilters] = useState({
    selectedCity: "",
    selectedCategory: "", // Combined filter for specialization
    selectedQualification: "",
>>>>>>> 9b28c9786fa58d8af49246511fefa235802fde42
  });

  useEffect(() => {
    // Dispatch fetchVets when component mounts
    dispatch(fetchVets());
  }, [dispatch]);

<<<<<<< HEAD
  // Reset filters to their initial state
  const handleReset = () => {
    setFilters({
      degree: "",
      city: ""
    });
  };

  // Handle search operation
=======
  const handleReset = () => {
    console.log("Resetting filters");
    setFilters({
      selectedCity: "",
      selectedCategory: "",
      selectedQualification: "",
    });
  };

>>>>>>> 9b28c9786fa58d8af49246511fefa235802fde42
  const handleSearch = () => {
    console.log("Searching with filters:", filters);
  };

  // Filter vets based on the current filters
  const filteredVets = vets.filter((vet) => {
<<<<<<< HEAD
    const matchesQualification = filters.degree ? vet.degree.includes(filters.degree) : true;
    const matchesCity = filters.city ? vet.city.includes(filters.city) : true;

    return matchesQualification && matchesCity;
  });

  return (
    <>
      <Navbar />
      <div className="fullBody">
        <VetFilterSection
          onSearch={(filters) =>
            setFilters((prev) => ({ ...prev, ...filters }))
          }
        />
        <main className="flex min-h-screen flex-col items-center p-8 bg-gray-100">
          <h1 className="text-2xl font-bold mt-0"
              style={{ margin: "2px auto"}}  >Meet Our Vets</h1>

          {loading ? (
          <p>Loading vets...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : vets.length > 0 ? (
          <div className="flex flex-col items-center gap-8 mt-8">
          {vets.map((vet) => (
            <div
              key={vet.vet_id}
              className="border rounded-lg shadow p-10 bg-white w-full max-w-5xl mb-8 relative"
              style={{ margin: "10px auto" }} // Adding a little space on left and right
            >
              <h2 className="text-2xl font-bold">{vet.clinic_name}</h2>
              <p className="text-gray-500">Location: {vet.location}</p>
              <p className="text-gray-500">Minimum Fee: PKR {vet.minimum_fee}</p>
              <p className="text-gray-500">Contact: {vet.contact_details}</p>
              <p className="text-gray-500">Bio: {vet.bio}</p>
              <p
                className={`text-sm ${
                  vet.profile_verified ? "text-green-500" : "text-red-500"
                }`}
              >
                {vet.profile_verified ? "Verified" : "Not Verified"}
              </p>

              {/* Book Now button in the bottom-right corner */}
              <button
                className="absolute bottom-4 right-4 text-white p-2 rounded-2xl w-32"
                style={{ backgroundColor: "#A03048" }}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
        ) : (
          <p>No vets available at the moment.</p>
        )}
=======
    // Log the current vet being checked
    console.log(`Checking vet: ${vet.name}`);
    console.log("Current filters:", filters);

    const matchesCity = filters.selectedCity ? vet.city_id === parseInt(filters.selectedCity) : true;
    console.log(`Vet ${vet.name} matches city (${vet.city_id}):`, matchesCity);

    const matchesSpecialization = filters.selectedCategory
      ? vet.specializations.some((spec) => {
          const match = spec.category_id === parseInt(filters.selectedCategory);
          console.log(`  - Specialization: ${spec.category_id} matches:`, match);
          return match;
        })
      : true;
    console.log(`Vet ${vet.name} matches specialization:`, matchesSpecialization);

    const matchesQualification = filters.selectedQualification
      ? vet.qualifications.some((qual) => {
          const match = qual.qualification_id === parseInt(filters.selectedQualification);
          console.log(`  - Qualification ID: ${qual.qualification_id} matches:`, match);
          return match;
        })
      : true;
    console.log(`Vet ${vet.name} matches qualification:`, matchesQualification);

    // Final filter result for each vet
    const matchesAll = matchesCity && matchesSpecialization && matchesQualification;
    console.log(`Vet ${vet.name} matches all filters:`, matchesAll);
    return matchesAll;
  });

  console.log("Filtered Vets:", filteredVets); // Log the final filtered vets

  return (
    <>
      <Navbar />
      <div className="fullBody" style={{maxWidth: '90%', margin: '0 auto'}}>
        <VetFilterSection
          onSearch={(newFilters) => {
            console.log("Updating filters:", newFilters);
            setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
          }}
          onReset={handleReset}
          onSearchAction={handleSearch}
        />
        <main className="flex min-h-screen flex-col items-center p-8 bg-gray-100">
          <div className="w-full">
            <VetGrid vets={filteredVets} />
          </div>
>>>>>>> 9b28c9786fa58d8af49246511fefa235802fde42
        </main>
      </div>
    </>
  );
}