const fs = require('fs');
let code = fs.readFileSync('src/pages/HomePage.vue', 'utf-8');

// 1. Replace the image source
code = code.replace('<img src="/world-map-dark.png"', '<img src="/global-map.jpg"');

// 2. Remove the dark gradients from HTML or just hide them in CSS
// Actually, it's easier to just modify the CSS to hide the dark overlays and blend the image!

const cssTarget = "</style>";
const newCss = `
/* Light Map UI Adjustments */
.ge-map-svg-wrap {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: none !important; /* Remove dark box shadow */
  border: none !important;
  background: transparent;
}

.ge-world-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  mix-blend-mode: multiply; /* Blends the cream background of the map with the page */
  opacity: 0.9; /* Softens the image slightly */
}

/* Hide the dark overlays since we now use a light map */
.ge-map-overlay-left, .ge-map-overlay-bottom {
  display: none !important;
}

/* Make stats bar sleek and light for the new map */
.ge-map-stats {
  background: rgba(255, 255, 255, 0.8) !important;
  border: 1px solid rgba(176, 149, 89, 0.2) !important;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}

.ge-map-stat strong {
  color: var(--ink) !important;
}

.ge-map-stat span {
  color: var(--ink-soft) !important;
  font-weight: 600;
}

.ge-map-stat-divider {
  background: rgba(176, 149, 89, 0.2) !important;
}

/* Improve floating cards to match new map */
.ge-float-card {
  box-shadow: 0 8px 24px rgba(176, 149, 89, 0.15) !important;
  border: 1px solid rgba(176, 149, 89, 0.1) !important;
}

/* Refine dots */
.map-dot-label {
  background: rgba(255, 255, 255, 0.9) !important;
  color: var(--ink) !important;
  border: 1px solid rgba(176, 149, 89, 0.2);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
</style>
`;

code = code.replace(cssTarget, newCss);

fs.writeFileSync('src/pages/HomePage.vue', code);
