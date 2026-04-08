// arrondissement.js

// Filtre par département (2 premiers chiffres du code postal)
export function filterByDepartement(stations, dept) {
  if (!dept) return stations; 
  return stations.filter((s) => String(s.codePostal).startsWith(String(dept))); 
}

// Filtre par recherche textuelle sur le nom
export function filterBySearch(stations, query) { // filtre par rapport au nom du departement
  if (!query) return stations;
  const q = query.toLowerCase(); // convertion e minuscule pour le recherche
  return stations.filter((s) => s.name?.toLowerCase().includes(q)); 
}
