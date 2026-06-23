const fs = require('fs');
let code = fs.readFileSync('src/pages/HomePage.vue', 'utf-8');

const mapVisualMatch = /<div class="ge-map-visual">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

const newMapVisual = `<div class="ge-map-visual new-ge-map">
          <img src="/global-map.jpg" alt="Global presence map" class="new-world-img" />
        </div>
      </div>`;

if (code.includes('<div class="ge-map-visual">')) {
  // Find the exact end. 
  // It's safer to use string replacement by slicing.
  const startIdx = code.indexOf('<div class="ge-map-visual">');
  const endMarker = '</div>\n      </div>\n      \n      <div class="ge-carousel-wrapper">';
  const endIdx = code.indexOf(endMarker);
  
  if (startIdx !== -1 && endIdx !== -1) {
    code = code.substring(0, startIdx) + 
           `<div class="ge-map-visual new-ge-map">\n          <img src="/global-map.jpg" alt="Global presence map" class="new-world-img" />\n        </div>\n      ` +
           code.substring(endIdx + 7); // include </div>\n      </div>
  }
}

const cssTarget = "</style>";
const newCss = `
.new-ge-map {
  flex: 1.2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 40px;
}
.new-world-img {
  width: 100%;
  max-width: 850px;
  height: auto;
  border-radius: 24px;
  box-shadow: 0 24px 64px rgba(176, 149, 89, 0.15), 0 0 0 1px rgba(176, 149, 89, 0.1);
  transition: transform 0.5s ease;
  mix-blend-mode: multiply; /* Blends the cream background of the image with the section */
}
.new-world-img:hover {
  transform: translateY(-8px);
}
@media (max-width: 992px) {
  .new-ge-map {
    padding-left: 0;
    margin-top: 40px;
  }
}
</style>
`;

code = code.replace(cssTarget, newCss);

fs.writeFileSync('src/pages/HomePage.vue', code);
