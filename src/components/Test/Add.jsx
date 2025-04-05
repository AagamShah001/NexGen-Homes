import axios from "axios";
import React, { useState, useEffect } from "react";

export const Add = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await axios.get("http://localhost:3000/state/getallstates");
        setStates(res.data.data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching states:", error);
        setLoading(false);
      }
    };

    const fetchCities = async () => {
      try {
        const res = await axios.get("http://localhost:3000/city/getallcities"); 
        setCities(res.data.data); // Assuming API returns { data: [{_id, name, stateId}] }
        setLoad(false);
      } catch (error) {
        console.error("Error fetching cities:", error);
        setLoad(false);
      }
    };

    fetchCities();
    fetchStates();
  }, []); 


  const statesOfIndia = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];
  
  
  const citiesOfIndia = [
    ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore"], // Andhra Pradesh
    ["Itanagar", "Tawang", "Naharlagun", "Ziro"], // Arunachal Pradesh
    ["Guwahati", "Dibrugarh", "Silchar", "Jorhat"], // Assam
    ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"], // Bihar
    ["Raipur", "Bhilai", "Bilaspur", "Korba"], // Chhattisgarh
    ["Panaji", "Margao", "Vasco da Gama", "Mapusa"], // Goa
    ["Ahmedabad", "Surat", "Vadodara", "Rajkot"], // Gujarat
    ["Gurgaon", "Faridabad", "Panipat", "Ambala"], // Haryana
    ["Shimla", "Manali", "Dharamshala", "Solan"], // Himachal Pradesh
    ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"], // Jharkhand
    ["Bengaluru", "Mysuru", "Hubli", "Mangalore"], // Karnataka
    ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"], // Kerala
    ["Bhopal", "Indore", "Gwalior", "Jabalpur"], // Madhya Pradesh
    ["Mumbai", "Pune", "Nagpur", "Nashik"], // Maharashtra
    ["Imphal", "Thoubal", "Bishnupur", "Churachandpur"], // Manipur
    ["Shillong", "Tura", "Jowai", "Baghmara"], // Meghalaya
    ["Aizawl", "Lunglei", "Champhai", "Serchhip"], // Mizoram
    ["Kohima", "Dimapur", "Mokokchung", "Tuensang"], // Nagaland
    ["Bhubaneswar", "Cuttack", "Rourkela", "Puri"], // Odisha
    ["Ludhiana", "Amritsar", "Jalandhar", "Patiala"], // Punjab
    ["Jaipur", "Jodhpur", "Udaipur", "Kota"], // Rajasthan
    ["Gangtok", "Namchi", "Gyalshing", "Mangan"], // Sikkim
    ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"], // Tamil Nadu
    ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"], // Telangana
    ["Agartala", "udaipur", "Dharmanagar", "Kailashahar"], // Tripura
    ["Lucknow", "Kanpur", "Varanasi", "Agra"], // Uttar Pradesh
    ["Dehradun", "Haridwar", "Nainital", "Haldwani"], // Uttarakhand
    ["Kolkata", "Howrah", "Durgapur", "Siliguri"] // West Bengal
  ];

  const areasOfIndia = [
    "MVP Colony", "Dwaraka Nagar", "Gajuwaka",  // Visakhapatnam
    "Benz Circle", "Patamata", "Gandhi Nagar",  // Vijayawada
    "Brodipet", "Arundelpet", "Lakshmipuram",   // Guntur
    "Magunta Layout", "Dargamitta", "Ramakrishna Puram",  // Nellore
  
    "Bank Tinali", "Itanagar Market", "E-Sector",  // Itanagar
    "Old Market", "New Market", "Jaswantgarh",  // Tawang
    "Naharlagun Main Road", "Legi Complex", "Ganga Market",  // Naharlagun
    "Hapoli", "Pine Ridge", "Subansiri",  // Ziro
  
    "Paltan Bazaar", "Dispur", "G.S. Road",  // Guwahati
    "Mancotta", "Chowkidinghee", "Dibrugarh Town",  // Dibrugarh
    "Ambicapatty", "Rongpur", "Tarapur",  // Silchar
    "Jorhat Town", "Gar-Ali", "Babupatty",  // Jorhat
  
    "Kankarbagh", "Boring Road", "Rajendra Nagar",  // Patna
    "AP Colony", "Rampur", "Delha",  // Gaya
    "Barari", "Tilka Manjhi", "Sultanpur",  // Bhagalpur
    "Aghoria Bazaar", "Juran Chapra", "Mithanpura",  // Muzaffarpur
  
    "Shankar Nagar", "Civil Lines", "Pandri",  // Raipur
    "Durg Bypass", "Smriti Nagar", "Supela",  // Bhilai
    "Bilasa Colony", "Vyapar Vihar", "Rajkishore Nagar",  // Bilaspur
    "Darri", "TP Nagar", "Jamnipali",  // Korba
  
    "Campal", "Miramar", "Panjim Market",  // Panaji
    "Margao Market", "Fatorda", "Navelim",  // Margao
    "Vasco City", "Baina", "Dabolim",  // Vasco da Gama
    "Mapusa Market", "Karaswada", "Ansabhat",  // Mapusa
  
    "Navrangpura", "Satellite", "Bopal",  // Ahmedabad
    "City Light", "Adajan", "Varachha",  // Surat
    "Alkapuri", "Gotri", "Fatehgunj",  // Vadodara
    "Kalawad Road", "150 Feet Ring Road", "Mavdi",  // Rajkot
  
    "DLF Phase 1", "Sector 29", "Sushant Lok",  // Gurgaon
    "Sector 16", "Sector 21C", "NIT Faridabad",  // Faridabad
    "Sector 11", "Sector 25", "Panipat Refinery Township",  // Panipat
    "Ambala Cantt", "Sector 7", "Prem Nagar",  // Ambala
  
    "Mall Road", "Chhota Shimla", "Summer Hill",  // Shimla
    "Old Manali", "Mall Road", "Log Huts",  // Manali
    "Dharamkot", "Bhagsunag", "Kotwali Bazaar",  // Dharamshala
    "Mall Road", "The Ridge", "Solan Market",  // Solan
  
    "Lalpur", "Hinoo", "Kanke",  // Ranchi
    "Bistupur", "Sakchi", "Sonari",  // Jamshedpur
    "Hirapur", "Jharia", "Katras",  // Dhanbad
    "Bokaro Steel City", "Chas", "Sector 4",  // Bokaro
  
    "Indiranagar", "Whitefield", "Koramangala",  // Bengaluru
    "Vijayanagar", "Jayaprakash Nagar", "Mysore South",  // Mysuru
    "Gokul Road", "Keshwapur", "Vidyanagar",  // Hubli
    "Kadri", "Hampankatta", "Bejai",  // Mangalore

    // Kerala
  "Palayam", "Kowdiar", "Pettah",  // Thiruvananthapuram
  "Edapally", "Fort Kochi", "Kaloor",  // Kochi
  "Kunduparamba", "West Hill", "Meenchanda",  // Kozhikode
  "Swaraj Round", "Punkunnam", "Ayyanthole",  // Thrissur

  // Madhya Pradesh
  "MP Nagar", "Kolar Road", "Arera Colony",  // Bhopal
  "Vijay Nagar", "Rajwada", "Sudama Nagar",  // Indore
  "Lashkar", "Morar", "Thatipur",  // Gwalior
  "Wright Town", "Napier Town", "Adhartal",  // Jabalpur

  // Maharashtra
  "Andheri", "Bandra", "Dadar",  // Mumbai
  "Kothrud", "Shivajinagar", "Wakad",  // Pune
  "Dharampeth", "Sitabuldi", "Manewada",  // Nagpur
  "Panchavati", "Indira Nagar", "Cidco",  // Nashik

  // Manipur
  "Singjamei", "Uripok", "Keisampat",  // Imphal
  "Athokpam", "Thoubal Bazar", "Khekman",  // Thoubal
  "Ningthoukhong", "Kumbi", "Kwakta",  // Bishnupur
  "Lailam", "Tuibong", "Lamka",  // Churachandpur

  // Meghalaya
  "Police Bazaar", "Laitumkhrah", "Mawlai",  // Shillong
  "Chandmari", "Nakham Bazar", "Dalu",  // Tura
  "Jowai Town", "Dawki", "Raliang",  // Jowai
  "Baghmara Market", "Dalu Road", "Karukol",  // Baghmara

  // Mizoram
  "Dawrpui", "Bawngkawn", "Zarkawt",  // Aizawl
  "Ramthar", "Venglai", "Theiriat",  // Lunglei
  "Khuangphah", "Zote", "Saichal",  // Champhai
  "Serchhip Bazar", "New Serchhip", "Hnahthial",  // Serchhip

  // Nagaland
  "Main Town", "High School Colony", "P.R. Hill",  // Kohima
  "Dimapur Railway Area", "Purana Bazaar", "Chumukedima",  // Dimapur
  "Mokokchung Town", "Sewak Colony", "Aongza",  // Mokokchung
  "Tuensang Village", "Hakchang", "Sangsangnyu",  // Tuensang

  // Odisha
  "Sahid Nagar", "Jayadev Vihar", "Patia",  // Bhubaneswar
  "Buxi Bazar", "College Square", "Choudhury Bazar",  // Cuttack
  "Sector-19", "Civil Township", "Koel Nagar",  // Rourkela
  "Baliapanda", "Dola Mandap Sahi", "Chakratirtha Road",  // Puri

  // Punjab
  "Sarabha Nagar", "BRS Nagar", "Civil Lines",  // Ludhiana
  "Ranjit Avenue", "Hall Bazaar", "GT Road",  // Amritsar
  "Model Town", "Shastri Nagar", "Jyoti Chowk",  // Jalandhar
  "Tripuri", "Leela Bhawan", "Baradari",  // Patiala

  // Rajasthan
  "Malviya Nagar", "Vaishali Nagar", "Mansarovar",  // Jaipur
  "Shastri Nagar", "Ratanada", "Paota",  // Jodhpur
  "Hiran Magri", "Bapu Bazaar", "Fatehpura",  // Udaipur
  "Rajeev Gandhi Nagar", "Gumanpura", "Anantpura",  // Kota

  // Sikkim
  "MG Marg", "Development Area", "Tadong",  // Gangtok
  "Namchi Bazar", "Jorethang", "Tingmoo",  // Namchi
  "Gyalshing Market", "Dentam", "Yangtey",  // Gyalshing
  "Mangan Market", "Singhik", "Lachen",  // Mangan

  // Tamil Nadu
  "T. Nagar", "Velachery", "Anna Nagar",  // Chennai
  "Gandhipuram", "RS Puram", "Peelamedu",  // Coimbatore
  "Anna Nagar", "K.K. Nagar", "Goripalayam",  // Madurai
  "Srirangam", "Thillai Nagar", "Cantonment",  // Tiruchirappalli

  // Telangana
  "Banjara Hills", "Gachibowli", "Kukatpally",  // Hyderabad
  "Hanamkonda", "Kazipet", "Mulugu Road",  // Warangal
  "Subhash Nagar", "Vinayak Nagar", "Bodhan Road",  // Nizamabad
  "Court Chowrasta", "Jyothinagar", "Christian Colony",  // Karimnagar

  // Tripura
  "Krishna Nagar", "Ramnagar", "Amtali",  // Agartala
  "Udaipur Town", "Matabari", "Rajnagar",  // Udaipur
  "Dharmanagar Market", "Jubilee Road", "Subhash Road",  // Dharmanagar
  "Kailashahar Town", "Bishnupur", "Subhas Palli",  // Kailashahar

  // Uttar Pradesh
  "Hazratganj", "Gomti Nagar", "Aliganj",  // Lucknow
  "Swaroop Nagar", "Kakadeo", "Shastri Nagar",  // Kanpur
  "Lahurabir", "Godowlia", "Sigra",  // Varanasi
  "Sadar Bazaar", "Tajganj", "Civil Lines",  // Agra

  // Uttarakhand
  "Rajpur Road", "Balliwala", "Race Course",  // Dehradun
  "Jwalapur", "BHEL", "Shivalik Nagar",  // Haridwar
  "Tallital", "Mallital", "Bhowali",  // Nainital
  "Kusumkhera", "Mukhani", "Transport Nagar",  // Haldwani

  // West Bengal
  "Salt Lake City", "Park Street", "Garia",  // Kolkata
  "Shibpur", "Salkia", "Belur",  // Howrah
  "City Centre", "Benachity", "Bidhan Nagar",  // Durgapur
  "Sevoke Road", "Pradhan Nagar", "Hakimpara"  // Siliguri
  ];
  

  const addStates = async () => {
    for (const state of statesOfIndia) {
      try {
        const res = await axios.post("http://localhost:3000/state/addstate", { name: state }, {
          headers: { "Content-Type": "application/json" },
        });
        //console.log(`Added: ${state}`, res.data);
      } catch (error) {
        console.error(`Error adding state: ${state}`, error.response?.data || error);
      }
    }
  };

  
  const addCities = async () => {
    for (const state of states) {
      const stateIndex = states.findIndex((s) => s.name === state.name); // Get index of state
      if (stateIndex === -1) {
        console.error(`No cities found for state: ${state.name}`);
        continue;
      }

      const cities = citiesOfIndia[stateIndex] || [];
      for (const city of cities) {
        try {
          const res = await axios.post("http://localhost:3000/city/addcity", {
            name: city,
            stateId: state._id
          });

          //console.log(`Added city: ${city} (State: ${state.name})`, res.data);
        } catch (error) {
          console.error(`Error adding city: ${city} (State: ${state.name})`, error.response?.data || error);
        }
      }
    }
  };

  const addAreas = async () => {
    // Flatten cities array for proper indexing
    const flattenedCities = citiesOfIndia.flat();  

    for (const city of cities) {
        // Find the correct index of the city
        const cityIndex = flattenedCities.findIndex(
            (c) => typeof c === "string" && typeof city.name === "string" && c.toLowerCase() === city.name.toLowerCase()
        );

        if (cityIndex === -1) {
            console.error(`⚠ No areas found for city: ${city.name}`);
            continue;
        }

        const areas = areasOfIndia.slice(cityIndex * 3, cityIndex * 3 + 3); // 3 areas per city

        for (const area of areas) {
            try {
                const res = await axios.post("/area/addarea", {
                    name: area,
                    cityId: city._id, 
                    stateId: city.stateId._id
                }, { headers: { "Content-Type": "application/json" } });

                // Check if the response is successful
                if (res.status === 200 || res.status === 201) {
                    console.log(`✅ Added area: ${area} for city: ${city.name}`);
                    
                    // Wait for 500ms before making the next request
                    await new Promise(resolve => setTimeout(resolve, 500));
                } else {
                    console.error(`⚠ Failed to add area: ${area} for city: ${city.name}. Skipping to the next.`);
                    break; // Stop further requests if one fails
                }
            } catch (error) {
                console.error(`❌ Error adding area: ${area} for city: ${city.name}`, error.response?.data || error.message);
                break; // Stop further requests if an error occurs
            }
        }
    }
};

  

  return (
    <>
    <div>
      <h2>Add States </h2>
      {loading ? (
        <p>Loading states...</p>
      ) : (
        <button onClick={addStates}>Add States to Database</button>
      
      )}
    </div>

     <div>
     <h2>Add Cities</h2>
     {loading ? (
       <p>Loading states...</p>
     ) : (
     
       <button onClick={addCities}>Add Cities to Database</button>
     )}
   </div>

   <div>
     <h2>Add areas</h2>
     {loading ? (
       <p>Loading states...</p>
     ) : (
     
       <button onClick={addAreas}>Add areas to Database</button>
     )}
   </div>
   </>
  );
};
