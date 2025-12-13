const map = L.map('map').setView([40.7128, -74.0060], 11);


fetch('data/city_nta.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      onEachFeature: (feature, layer) => {
        const name = feature.properties.NTAName || 'NTA';
        const borough = feature.properties.BoroName || '';

        layer.bindPopup(`
          <strong>${name}</strong><br/>
          Borough: ${borough}
        `);
      },
      style: {
        fillColor: '#3182bd',
        weight: 0.5,
        color: '#333',
        fillOpacity: 0.6
      }
    }).addTo(map);
  });
