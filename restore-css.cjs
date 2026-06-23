const fs = require('fs');
let code = fs.readFileSync('src/pages/HomePage.vue', 'utf-8');

const missingCss = `
/* =======================================
   Restored Map Visual CSS
   ======================================= */
.ge-map-visual {
  position: relative;
  height: 480px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ge-map-svg-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  background: transparent;
}

.ge-world-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  mix-blend-mode: multiply;
  opacity: 0.9;
}

/* Stats Bar */
.ge-map-stats {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 32px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  padding: 16px 32px;
  border-radius: 99px;
  border: 1px solid rgba(176, 149, 89, 0.2);
  box-shadow: 0 10px 40px rgba(176, 149, 89, 0.1);
  z-index: 10;
  white-space: nowrap;
}

.ge-map-stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ge-map-stat strong {
  font-size: 20px;
  font-weight: 700;
  color: var(--ink);
  line-height: 1;
}

.ge-map-stat span {
  font-size: 13px;
  color: var(--ink-soft);
  font-weight: 500;
}

.ge-map-stat-divider {
  width: 1px;
  height: 32px;
  background: rgba(176, 149, 89, 0.2);
}

/* Floating Cards */
.ge-float-card {
  position: absolute;
  background: white;
  padding: 12px 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 8px 24px rgba(176, 149, 89, 0.15);
  border: 1px solid rgba(176, 149, 89, 0.1);
  z-index: 5;
  transition: transform 0.3s;
}

.ge-float-card:hover {
  transform: translateY(-4px);
}

.ge-fc-img {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
}

.ge-float-card div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ge-float-card strong {
  font-size: 14px;
  font-weight: 600;
  color: var(--ink);
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--green);
}

.ge-float-card span:last-child {
  font-size: 12px;
  color: var(--ink-soft);
}

.card-eu { top: 20%; right: 15%; }
.card-na { top: 40%; left: 10%; }
.card-ap { bottom: 30%; right: 5%; }

/* Popular Destinations Dropdown/List styling if needed */
.ge-popular-dest {
  position: absolute;
  top: 24px;
  right: 24px;
  background: white;
  border-radius: 16px;
  padding: 24px;
  width: 240px;
  box-shadow: 0 16px 40px rgba(0,0,0,0.08);
  z-index: 10;
}

.ge-popular-dest h5 {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--ink);
}

.ge-popular-dest ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ge-popular-dest li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: var(--ink-soft);
}

.ge-popular-dest .flag {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ge-popular-dest .flag img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ge-link {
  display: inline-block;
  font-size: 13px;
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
}

.ge-link:hover {
  text-decoration: underline;
}

@media (max-width: 900px) {
  .ge-map-visual {
    display: none;
  }
}
</style>`;

code = code.replace('</style>', missingCss);

fs.writeFileSync('src/pages/HomePage.vue', code);
