// Smooth scroll to target frame
function scrollToFrame(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}

// Topbar buttons
const tabs = Array.from(document.querySelectorAll('.topbar .tab'));
tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');
    if (target) scrollToFrame(target);
  });
});

// In-page CTA buttons
document.body.addEventListener('click', (e) => {
  const t = e.target.closest('[data-target]');
  if (!t) return;
  const id = t.getAttribute('data-target');
  if (id) scrollToFrame(id);
});

// Active tab highlight
const frames = Array.from(document.querySelectorAll('[data-frame]'));
const byId = Object.fromEntries(tabs.map(b => [b.getAttribute('data-target'), b]));
const io = new IntersectionObserver((entries) => {
  const visible = entries.filter(en => en.isIntersecting)
    .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (visible) {
    const id = visible.target.id;
    tabs.forEach(b => b.classList.remove('is-active'));
    if (byId[id]) byId[id].classList.add('is-active');
  }
}, { root: document.getElementById('scroller'), threshold: [0.5, 0.75, 0.9] });
frames.forEach(sec => io.observe(sec));

// ----- STEP 3 → STEP 4: merkselectie -----
const brandButtons = Array.from(document.querySelectorAll('.brand'));
const brandSelect = document.getElementById('brandSelect');
brandButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const brand = btn.getAttribute('data-brand');
    if (brandSelect) {
      // update dropdown waarde indien aanwezig
      for (const opt of brandSelect.options) {
        if (opt.text.toLowerCase() === brand.toLowerCase()) {
          opt.selected = true;
          break;
        }
      }
    }
    scrollToFrame('step4');
  });
});

// ----- STEP 4: live preview binding -----
const coasterImg = document.getElementById('coasterImg');
const coasterLabel = document.getElementById('coasterLabel');
const coasterText = document.getElementById('coasterText');
const colorPick = document.getElementById('colorPick');

if (coasterText) {
  coasterText.addEventListener('input', () => {
    coasterLabel.textContent = coasterText.value || 'Groeten uit de Jordaan!';
  });
}

if (colorPick) {
  colorPick.addEventListener('input', () => {
    // kleur hint: rand en labeltint
    document.querySelector('.coaster-wrap').style.borderColor = colorPick.value;
  });
}

// QR placeholder toevoegen
const addQR = document.getElementById('addQR');
if (addQR) {
  addQR.addEventListener('click', () => {
    if (!document.querySelector('.coaster-wrap .qr')) {
      const qr = document.createElement('div');
      qr.className = 'qr';
      Object.assign(qr.style, {
        position: 'absolute', width: '56px', height: '56px',
        right: '16px', bottom: '16px', borderRadius: '6px',
        background: 'linear-gradient(90deg,#000 50%,#fff 50%), linear-gradient(#000 50%,#fff 50%)',
        backgroundSize: '10px 10px', boxShadow: 'inset 0 0 0 2px #000'
      });
      document.querySelector('.coaster-wrap').appendChild(qr);
    }
  });
}
