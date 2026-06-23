const fs = require('fs');
let code = fs.readFileSync('src/pages/HomePage.vue', 'utf-8');

const mapVisualHtml = `
          <!-- World Map Image -->
          <div class="ge-map-svg-wrap">
            <!-- Premium light world map image -->
            <img src="/global-map.jpg" alt="Global presence map" class="ge-world-img" />
            
            <!-- Animated ping dots (absolute positioned over image) -->
            <div class="map-dot-wrap" style="left:18%; top:33%">
              <div class="map-ping-ring blue"></div><div class="map-dot"></div>
              <span class="map-dot-label">USA</span>
            </div>
            <div class="map-dot-wrap" style="left:45.5%; top:17%">
              <div class="map-ping-ring purple"></div><div class="map-dot purple"></div>
              <span class="map-dot-label">UK</span>
            </div>
            <div class="map-dot-wrap" style="left:49%; top:16%">
              <div class="map-ping-ring blue" style="animation-delay:0.8s"></div><div class="map-dot" style="animation-delay:0.8s"></div>
              <span class="map-dot-label">DE</span>
            </div>
            <div class="map-dot-wrap" style="left:64%; top:47%">
              <div class="map-ping-ring green" style="animation-delay:1.2s"></div><div class="map-dot green" style="animation-delay:1.2s"></div>
              <span class="map-dot-label">India</span>
            </div>
            <div class="map-dot-wrap" style="left:58%; top:39%">
              <div class="map-ping-ring amber" style="animation-delay:1.6s"></div><div class="map-dot amber" style="animation-delay:1.6s"></div>
              <span class="map-dot-label">UAE</span>
            </div>
            <div class="map-dot-wrap" style="left:75%; top:50%">
              <div class="map-ping-ring green" style="animation-delay:2s"></div><div class="map-dot green" style="animation-delay:2s"></div>
              <span class="map-dot-label">SG</span>
            </div>
            <div class="map-dot-wrap" style="left:81%; top:72%">
              <div class="map-ping-ring blue" style="animation-delay:2.8s"></div><div class="map-dot" style="animation-delay:2.8s"></div>
              <span class="map-dot-label">AU</span>
            </div>
            <div class="map-dot-wrap" style="left:47.2%; top:15.5%">
              <div class="map-ping-ring amber" style="animation-delay:2.4s"></div><div class="map-dot amber" style="animation-delay:2.4s"></div>
              <span class="map-dot-label">NL</span>
            </div>
            <!-- Stats bar at bottom of map -->
            <div class="ge-map-stats">
              <div class="ge-map-stat">
                <strong>160+</strong>
                <span>Countries</span>
              </div>
              <div class="ge-map-stat-divider"></div>
              <div class="ge-map-stat">
                <strong>700+</strong>
                <span>Businesses</span>
              </div>
              <div class="ge-map-stat-divider"></div>
              <div class="ge-map-stat">
                <strong>48h</strong>
                <span>Avg. onboarding</span>
              </div>
              <div class="ge-map-stat-divider"></div>
              <div class="ge-map-stat">
                <strong>98%</strong>
                <span>Client retention</span>
              </div>
            </div>
`;

if (code.includes('<div class="ge-map-visual">')) {
  // Insert inside ge-map-visual, right before the first ge-float-card
  const insertTarget = '<div class="ge-float-card card-eu">';
  code = code.replace(insertTarget, mapVisualHtml + '\n            ' + insertTarget);
  
  // also make sure to close the ge-map-svg-wrap at the end of the float cards
  const closeTarget = '<div class="ge-popular-dest">';
  code = code.replace(closeTarget, '</div>\n\n          ' + closeTarget);
}

fs.writeFileSync('src/pages/HomePage.vue', code);
