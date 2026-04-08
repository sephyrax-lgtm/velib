// app.js
import { getStations } from "./station.js";
import { filterByDepartement, filterBySearch } from "./arrondissement.js";
import { displayStations, displayDetail } from "./stationcontainer.js";

let allStations = []; // stocakage pour eviter de faire chaque fois l'appele de l'api un sorte de token
let activeDept = ""; // = =
let activeSearch = ""; 

function applyFilters() {
  let result = filterByDepartement(allStations, activeDept); // filtre le departement
  result = filterBySearch(result, activeSearch); // filtre de recherche
  displayStations(result, displayDetail); //affichage de station et de detail
}

// Chips département
document.querySelectorAll("#deptChips .chip").forEach((chip) => {
  chip.addEventListener("click", () => { 
    document.querySelectorAll("#deptChips .chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    activeDept = chip.dataset.dept ?? ""; //
    applyFilters(); 
  });
});

// Barre de recherche
document.getElementById("searchInput").addEventListener("input", (e) => {
  activeSearch = e.target.value.trim();
  applyFilters();
});

// Init
async function init() {
  allStations = await getStations(); //appel de l'api pour recuperer les station et les stocker dans allstations (tout les stations)
  applyFilters();
}

init();
