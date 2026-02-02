<script>
/**
 * Enforces language selection, provides translations, and updates UI.
 * Usage:
 * 1) Add data-i18n="key" to any element.
 * 2) Call initWeddingSite() on every page.
 */

const I18N = {
  en: {
    nav_home: "Home",
    nav_story: "Our Story",
    nav_dress: "Dress Code",
    nav_qa: "Q+A",
    nav_travel: "Travel",
    nav_registry: "Registry",
    nav_rsvp: "RSVP",

    home_title: "Gabriel J. Cincotta & Michelle Wong",
    home_date: "November 13, 2026",
    home_location_label: "Location",
    home_countdown_label: "Countdown",
    home_cta_rsvp: "RSVP",

    story_title: "Our Story",
    story_sub: "A few moments from the beginning… to forever.",

    dress_title: "Dress Code",
    dress_sub: "We want everyone to feel comfortable and look great.",
    dress_ok: "What’s OK",
    dress_no: "Please avoid",

    qa_title: "Q+A",
    qa_sub: "Answers to common questions (we can add more anytime).",

    travel_title: "Travel",
    travel_sub: "Nearby hotels (tap to book).",

    registry_title: "Registry",
    registry_sub: "Tap an item to view it. Purchased items will show as purchased.",
    registry_note: "Note: This 'purchased' view is device-based unless we connect it to a shared list (Google Sheet).",

    rsvp_title: "RSVP",
    rsvp_sub: "Please complete the RSVP below."
  },

  es: {
    nav_home: "Inicio",
    nav_story: "Nuestra Historia",
    nav_dress: "Código de Vestimenta",
    nav_qa: "Preguntas",
    nav_travel: "Viaje",
    nav_registry: "Mesa de Regalos",
    nav_rsvp: "Confirmar Asistencia",

    home_title: "Gabriel J. Cincotta & Michelle Wong",
    home_date: "13 de Noviembre, 2026",
    home_location_label: "Lugar",
    home_countdown_label: "Cuenta regresiva",
    home_cta_rsvp: "Confirmar Asistencia",

    story_title: "Nuestra Historia",
    story_sub: "Algunos momentos desde el inicio… hasta siempre.",

    dress_title: "Código de Vestimenta",
    dress_sub: "Queremos que todos se sientan cómodos y se vean increíbles.",
    dress_ok: "Sí se permite",
    dress_no: "Por favor evitar",

    qa_title: "Preguntas",
    qa_sub: "Respuestas a preguntas comunes (podemos agregar más cuando quieran).",

    travel_title: "Viaje",
    travel_sub: "Hoteles cercanos (toque para reservar).",

    registry_title: "Mesa de Regalos",
    registry_sub: "Toque un artículo para verlo. Los comprados se mostrarán como comprados.",
    registry_note: "Nota: Esta vista de 'comprado' es por dispositivo a menos que lo conectemos a una lista compartida (Google Sheet).",

    rsvp_title: "Confirmar Asistencia",
    rsvp_sub: "Por favor complete el RSVP abajo."
  }
};

function getLang(){
  const lang = localStorage.getItem("wedding_lang");
  return (lang === "en" || lang === "es") ? lang : null;
}

function setLang(lang){
  localStorage.setItem("wedding_lang", lang);
  applyI18n();
}

function enforceLanguageGate(){
  const lang = getLang();
  const path = window.location.pathname.split("/").pop();
  const isGate = (path === "lang.html" || path === "" );

  if (!lang && !isGate){
    window.location.replace("lang.html");
  }
}

function applyI18n(){
  const lang = getLang() || "en";
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    const value = I18N[lang][key];
    if (value) el.textContent = value;
  });

  // Toggle UI state
  const enBtn = document.querySelector("#langEN");
  const esBtn = document.querySelector("#langES");
  if (enBtn && esBtn){
    if (lang === "en"){
      enBtn.classList.add("primary"); esBtn.classList.remove("primary");
    } else {
      esBtn.classList.add("primary"); enBtn.classList.remove("primary");
    }
  }
}

function initCountdown(targetISO){
  const elDays = document.querySelector("#cdDays");
  const elHours = document.querySelector("#cdHours");
  const elMins = document.querySelector("#cdMins");
  const elSecs = document.querySelector("#cdSecs");
  if (!elDays || !elHours || !elMins || !elSecs) return;

  const target = new Date(targetISO).getTime();

  function tick(){
    const now = Date.now();
    let diff = Math.max(0, target - now);

    const days = Math.floor(diff / (1000*60*60*24));
    diff -= days*(1000*60*60*24);

    const hours = Math.floor(diff / (1000*60*60));
    diff -= hours*(1000*60*60);

    const mins = Math.floor(diff / (1000*60));
    diff -= mins*(1000*60);

    const secs = Math.floor(diff / 1000);

    elDays.textContent = days;
    elHours.textContent = hours;
    elMins.textContent = mins;
    elSecs.textContent = secs;
  }

  tick();
  setInterval(tick, 1000);
}

function initWeddingSite(){
  enforceLanguageGate();
  applyI18n();
}
</script>
