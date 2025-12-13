const map = L.map('map').setView([40.7128, -74.0060], 11);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

fetch('data/city_nta.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      onEachFeature: (feature, layer) => {
        const name = feature.properties.NTA2020 || 'NTA';
        layer.bindPopup(`<strong>${name}</strong>`);
      },
      style: {
        fillColor: '#3182bd',
        weight: 0.5,
        color: '#333',
        fillOpacity: 0.6
      }
    }).addTo(map);
  });
