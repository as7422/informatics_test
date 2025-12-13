// Create the map
const map = L.map('map', {
  zoomControl: false,
  dragging: false,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  boxZoom: false,
  keyboard: false
});

// Load GeoJSON
fetch('data/city_nta.geojson')
  .then(response => response.json())
  .then(data => {

    const ntaLayer = L.geoJSON(data, {
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

    // Fit map to NYC and prevent panning away
    map.fitBounds(ntaLayer.getBounds());
    map.setMaxBounds(ntaLayer.getBounds());

    // Force initial resize AFTER layout settles
    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  });

// Handle browser resize (MUST be outside fetch)
window.addEventListener('resize', () => {
  map.invalidateSize();
});
