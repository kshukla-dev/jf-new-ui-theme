const fs = require('fs');
let code = fs.readFileSync('src/pages/AboutPage.vue', 'utf-8');

// 1. Add script imports and refs
if (!code.includes('const activeMilestone = ref(0)')) {
  // Update vue import to include onMounted and onUnmounted
  code = code.replace("import { ref } from 'vue'", "import { ref, onMounted, onUnmounted } from 'vue'");
  
  const scriptAddition = `
const activeMilestone = ref(0)
let milestoneInterval

function nextMilestone() {
  activeMilestone.value = (activeMilestone.value + 1) % milestones.length
}

function prevMilestone() {
  activeMilestone.value = (activeMilestone.value - 1 + milestones.length) % milestones.length
}

function setMilestone(index) {
  activeMilestone.value = index
}

onMounted(() => {
  milestoneInterval = setInterval(nextMilestone, 5000)
})

onUnmounted(() => {
  if (milestoneInterval) clearInterval(milestoneInterval)
})
`;
  // Add it before </script>
  code = code.replace('</script>', scriptAddition + '\n</script>');
}

// 2. Replace the timeline HTML
const oldTimeline = `<div class="timeline">
      <div v-for="m in milestones" :key="m.year" class="timeline-item">
        <span class="timeline-year">{{ m.year }}</span>
        <p>{{ m.description }}</p>
      </div>
    </div>`;

const newTimeline = `<div class="milestone-carousel">
      <div class="mc-bg" style="background-image: url('/world-map-dark.png');"></div>
      
      <div class="mc-progress">
        <button 
          v-for="(m, i) in milestones" 
          :key="'dot-'+i" 
          class="mc-dot"
          :class="{ active: i === activeMilestone }"
          @click="setMilestone(i)"
          :aria-label="'Go to milestone ' + m.year"
        ></button>
      </div>
      
      <div class="mc-content-wrapper">
        <button class="mc-nav-btn prev" @click="prevMilestone" aria-label="Previous milestone">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        
        <div class="mc-content">
          <transition name="fade-slide" mode="out-in">
            <div :key="activeMilestone" class="mc-slide">
              <div class="mc-badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><circle cx="12" cy="12" r="3"/></svg>
                {{ milestones[activeMilestone].year }}
              </div>
              <p class="mc-desc">{{ milestones[activeMilestone].description }}</p>
            </div>
          </transition>
        </div>
        
        <button class="mc-nav-btn next" @click="nextMilestone" aria-label="Next milestone">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </div>`;

code = code.replace(oldTimeline, newTimeline);

// 3. Add CSS
const newCss = `
/* Milestone Carousel */
.milestone-carousel {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  background: #0B1120;
  padding: 60px 40px;
  color: white;
  min-height: 520px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 40px;
  box-shadow: 0 24px 48px rgba(0,0,0,0.2);
}

.mc-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.15;
  z-index: 1;
}

.milestone-carousel::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, transparent 0%, #0B1120 100%);
  z-index: 2;
  pointer-events: none;
}

.mc-progress {
  position: absolute;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 5;
  width: 90%;
  max-width: 600px;
}

.mc-dot {
  flex: 1;
  height: 4px;
  background: rgba(255,255,255,0.2);
  border: none;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.3s;
  padding: 0;
}

.mc-dot:hover {
  background: rgba(255,255,255,0.4);
}

.mc-dot.active {
  background: white;
  box-shadow: 0 0 8px rgba(255,255,255,0.5);
}

.mc-content-wrapper {
  position: relative;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.mc-nav-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.2);
  background: transparent;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.mc-nav-btn:hover {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.4);
}

.mc-content {
  flex: 1;
  text-align: center;
  padding: 0 40px;
  max-width: 800px;
  margin: 0 auto;
}

.mc-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mc-badge {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 12px 32px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.8);
  background: #2563EB;
  font-size: 24px;
  font-weight: 800;
  color: white;
  margin-bottom: 32px;
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.4);
}

.mc-desc {
  font-size: clamp(20px, 3vw, 28px);
  line-height: 1.4;
  font-weight: 600;
  color: white;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

@media (max-width: 640px) {
  .mc-content-wrapper {
    flex-direction: column;
    gap: 32px;
  }
  .mc-nav-btn {
    display: none;
  }
  .mc-content {
    padding: 0;
  }
}
</style>`;

if (!code.includes('Milestone Carousel')) {
  code = code.replace('</style>', newCss);
}

fs.writeFileSync('src/pages/AboutPage.vue', code);
