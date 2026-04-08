// station.js
const API_URL =
  "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/velib-disponibilite-en-temps-reel/records?limit=100";

export async function getStations() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    // ✅ Les données sont directement dans chaque record (pas record.record)
    const stations = data.results.map((record) => ({
      id: record.stationcode,
      name: record.name,
      capacity: record.capacity,
      lat: record.coordonnees_geo?.lat,
      lon: record.coordonnees_geo?.lon, 
      bikesAvailable: record.numbikesavailable,
      docksAvailable: record.numdocksavailable, // ajput de fonction pour des velo mecanique et eléctrique
      ebikesAvailable: record.ebike ?? 0,
      mechBikesAvailable: record.mechanical ?? 0,
      status: record.is_installed === "OUI" ? "OUVERT" : "FERME",
      arrondissement: record.nom_arrondissement_communes ?? "",
      codePostal: String(record.code_insee_commune ?? record.nom_arrondissement_communes ?? ""),
    }));

    return stations;
  } catch (error) {
    console.error("Erreur API :", error);
    return [];
  }
}
