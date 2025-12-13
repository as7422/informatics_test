let map;
let mapInitialized = false;

function initMap() {
  if (mapInitialized) return;
  mapInitialized = true;

  console.log("🗺️ Initializing map");

  map = L.map('map', {
    zoomControl: false,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false
  });

  fetch('data/city_nta.geojson')
    .then(response => response.json())
    .then(data => {

      const ntaLayer = L.geoJSON(data, {
        onEachFeature: (feature, layer) => {
          const name = feature.properties.NTAName || 'NTA';
          const borough = feature.properties.BoroName || '';

          layer.bindPopup(
            `<strong>${name}</strong><br/>Borough: ${borough}`
          );
        },
        style: {
          fillColor: '#3182bd',
          weight: 0.5,
          color: '#333',
          fillOpacity: 0.6
        }
      }).addTo(map);

      map.fitBounds(ntaLayer.getBounds());
      map.setMaxBounds(ntaLayer.getBounds());

      // Force correct sizing after render
      setTimeout(() => {
        map.invalidateSize();
      }, 300);
    });
}

// Initialize map ONLY when scrollytelling section enters view
document.addEventListener("DOMContentLoaded", () => {
  const scrolly = document.querySelector(".scrolly");

  if (!scrolly) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          initMap();
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(scrolly);
});

// Resize handling
window.addEventListener("resize", () => {
  if (map) map.invalidateSize();
});

