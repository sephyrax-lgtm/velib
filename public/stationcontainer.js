// stationcontainer.js

export function displayStations(stations, onSelect) {
  const container = document.getElementById("stationList");
  const counter = document.getElementById("headerCount");
  container.innerHTML = "";

  if (counter) {
    counter.textContent = `${stations.length} station${stations.length > 1 ? "s" : ""}`;
  }

  if (stations.length === 0) {
    container.innerHTML = '<div class="empty">Aucune station trouvée</div>';
    return;
  }

  stations.forEach((station) => {
    const div = document.createElement("div");
    div.className = "station-item";

    const isOpen = station.status === "OUVERT"; // pour visualiser le statu de la station (ouvert ou fermé)
    const pct = // pourcentation de vélo dispos par rapport a la capacite total
      station.capacity > 0
        ? Math.round((station.bikesAvailable / station.capacity) * 100)
        : 0;

    div.innerHTML = `
      <div class="st-name">${station.name}</div>
      <div class="st-meta">🚲 ${station.bikesAvailable} vélos · 🅿️ ${station.docksAvailable} places · ${pct}% dispo</div>
      <span class="st-badge ${isOpen ? "badge-open" : "badge-closed"}">${isOpen ? "Ouvert" : "Fermé"}</span>
    `;

    div.addEventListener("click", () => {
      document.querySelectorAll(".station-item").forEach((el) => el.classList.remove("active"));
      div.classList.add("active");
      if (onSelect) onSelect(station);
    });

    container.appendChild(div);
  });
}

export function displayDetail(station) {
  const main = document.getElementById("main");
  if (!station) {
    main.innerHTML = '<div class="loading">Sélectionnez une station</div>';
    return;
  }

  const isOpen = station.status === "OUVERT"; //
  const pct =
    station.capacity > 0
      ? Math.round((station.bikesAvailable / station.capacity) * 100)
      : 0;
  const valueClass = pct > 50 ? "" : pct > 20 ? "warn" : "danger"; 

  main.innerHTML = `
    <div class="detail-title">${station.name}</div>
    <div class="detail-sub">
      📍 ${station.arrondissement || "—"} &nbsp;·&nbsp;
      <span class="st-badge ${isOpen ? "badge-open" : "badge-closed"}">${station.status}</span>
    </div>
    <div class="grid">
      <div class="card">
        <div class="card-label">Vélos disponibles</div>
        <div class="value ${valueClass}">${station.bikesAvailable}</div> 
      </div>
      <div class="card">
        <div class="card-label">Places libres</div>
        <div class="value">${station.docksAvailable}</div>
      </div>
      <div class="card">
        <div class="card-label">Vélos mécaniques</div>
        <div class="value">${station.mechBikesAvailable ?? "—"}</div>
      </div>
      <div class="card">
        <div class="card-label">Vélos électriques</div>
        <div class="value">${station.ebikesAvailable ?? "—"}</div>
      </div>
      <div class="card">
        <div class="card-label">Capacité totale</div>
        <div class="value">${station.capacity}</div>
      </div>
      <div class="card">
        <div class="card-label">Taux de remplissage</div>
        <div class="value ${valueClass}">${pct}%</div>
      </div>
    </div>
  `;
}
