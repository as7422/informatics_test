// ---------- MAP ----------
let map;
let mapInitialized = false;

function initMap() {
  if (mapInitialized) return;
  mapInitialized = true;

  map = L.map('map', {
    zoomControl: false,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false
  });

  fetch('data/city_nta.geojson')
    .then(res => res.json())
    .then(data => {
      const layer = L.geoJSON(data).addTo(map);
      map.fitBounds(layer.getBounds());
    });

  setTimeout(() => map.invalidateSize(), 300);
}

// ---------- PANEL FADE LOGIC ----------
const panels = document.querySelectorAll(".panel");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");

        // initialize map when scrollytelling starts
        if (entry.target.closest(".scrolly")) {
          initMap();
        }
      } else {
        entry.target.classList.remove("active");
      }
    });
  },
  { threshold: 0.6 }
);

panels.forEach(panel => observer.observe(panel));
