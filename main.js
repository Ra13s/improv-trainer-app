/************************************************
 * Global References to Data
 ************************************************/
// After the scripts `emotions.js`, `roles.js`, and `sentences.js` load,
// these variables become available in the global scope:
let emotionsData = window.emotionsData || [];
let rolesData = window.rolesData || [];
let sentencesDataEn = window.sentencesDataEn || [];
let sentencesDataEt = window.sentencesDataEt || [];

/************************************************
 * Default Settings
 ************************************************/
const defaultSettings = {
  emotionInterval: 60,
  roleInterval: 60,
  sentenceInterval: 60
};

/************************************************
 * UI Translations
 ************************************************/
const uiTranslations = {
  en: {
    title: "Improv Trainer",
    emotionTitle: "Emotion",
    roleTitle: "Role",
    sentenceTitle: "Sentence",
    lockEmotion: "Lock Emotion",
    lockRole: "Lock Role",
    lockSentence: "Lock Sentence",
    languageEnglish: "English",
    languageEstonian: "Estonian",
    nextEmotion: "Next Emotion",
    nextRole: "Next Role",
    nextSentence: "Next Sentence",
    shuffleAll: "Shuffle All",
    showSettings: "Show Settings",
    hideSettings: "Hide Settings",
    settingsHeader: "Settings",
    emotionInterval: "Emotion Interval (s)",
    roleInterval: "Role Interval (s)",
    sentenceInterval: "Sentence Interval (s)",
    saveSettings: "Save Settings",
    settingsSavedAlert: "Settings Saved & Timers Updated!",
    displayEmotionDesc: "Display Emotion Description",
    displayTitles: "Display Section Titles"
  },
  et: {
    title: "Impro Treener",
    emotionTitle: "Emotsioon",
    roleTitle: "Roll",
    sentenceTitle: "Lause",
    lockEmotion: "Lukusta emotsioon",
    lockRole: "Lukusta roll",
    lockSentence: "Lukusta lause",
    languageEnglish: "Inglise",
    languageEstonian: "Eesti",
    nextEmotion: "Järgmine emotsioon",
    nextRole: "Järgmine roll",
    nextSentence: "Järgmine lause",
    shuffleAll: "Sega kõik",
    showSettings: "Näita seadeid",
    hideSettings: "Peida seaded",
    settingsHeader: "Seaded",
    emotionInterval: "Emotsiooni intervall (s)",
    roleInterval: "Rolli intervall (s)",
    sentenceInterval: "Lause intervall (s)",
    saveSettings: "Salvesta seaded",
    settingsSavedAlert: "Seaded salvestatud ja taimerid uuendatud!",
    displayEmotionDesc: "Kuva emotsiooni kirjeldus",
    displayTitles: "Kuva sektsioonide pealkirjad"
  }
};

/************************************************
 * Helper / Utility
 ************************************************/
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getSelectedLanguage() {
  const radios = document.getElementsByName("lang");
  for (let r of radios) {
    if (r.checked) return r.value;
  }
  return "en"; // fallback default if none is checked
}

/************************************************
 * UI Translation Update Function
 ************************************************/
function updateUITranslations() {
  const lang = getSelectedLanguage();

  // Update document title and main header (if an element with id "appTitle" exists)
  document.title = uiTranslations[lang].title;
  const appTitle = document.getElementById("appTitle");
  if (appTitle) {
    appTitle.textContent = uiTranslations[lang].title;
  }

  // Update display area titles
  document.getElementById("emotionTitle").textContent = uiTranslations[lang].emotionTitle;
  document.getElementById("roleTitle").textContent = uiTranslations[lang].roleTitle;
  document.getElementById("sentenceTitle").textContent = uiTranslations[lang].sentenceTitle;

  // Update lock checkbox labels
  document.getElementById("lockEmotionLabel").textContent = uiTranslations[lang].lockEmotion;
  document.getElementById("lockRoleLabel").textContent = uiTranslations[lang].lockRole;
  document.getElementById("lockSentenceLabel").textContent = uiTranslations[lang].lockSentence;

  // Update language toggle labels
  document.getElementById("langEnglishLabel").textContent = uiTranslations[lang].languageEnglish;
  document.getElementById("langEstonianLabel").textContent = uiTranslations[lang].languageEstonian;

  // Update button texts in the main control area
  document.getElementById("nextEmotionBtn").textContent = uiTranslations[lang].nextEmotion;
  document.getElementById("nextRoleBtn").textContent = uiTranslations[lang].nextRole;
  document.getElementById("nextSentenceBtn").textContent = uiTranslations[lang].nextSentence;
  document.getElementById("shuffleBtn").textContent = uiTranslations[lang].shuffleAll;

  // Update settings toggle button text based on current panel state
  const toggleBtn = document.getElementById("toggle-settings-btn");
  const settingsPanel = document.getElementById("settings-panel");
  if (settingsPanel.style.display === "block") {
    toggleBtn.textContent = uiTranslations[lang].hideSettings;
  } else {
    toggleBtn.textContent = uiTranslations[lang].showSettings;
  }

  // Update settings panel texts
  document.getElementById("settingsHeader").textContent = uiTranslations[lang].settingsHeader;
  document.getElementById("emotionIntervalLabel").textContent = uiTranslations[lang].emotionInterval;
  document.getElementById("roleIntervalLabel").textContent = uiTranslations[lang].roleInterval;
  document.getElementById("sentenceIntervalLabel").textContent = uiTranslations[lang].sentenceInterval;
  document.getElementById("saveSettingsBtn").textContent = uiTranslations[lang].saveSettings;

  // Update display options labels
  document.getElementById("displayEmotionDescLabel").textContent = uiTranslations[lang].displayEmotionDesc;
  document.getElementById("displayTitlesLabel").textContent = uiTranslations[lang].displayTitles;
}

/************************************************
 * DOM Elements for Data Display
 ************************************************/
const emotionDisplay = document.getElementById("emotionDisplay");
const emotionDesc = document.getElementById("emotionDesc");
const roleDisplay = document.getElementById("roleDisplay");
const sentenceDisplay = document.getElementById("sentenceDisplay");

// Checkboxes for locking generated items
const lockEmotion = document.getElementById("lockEmotion");
const lockRole = document.getElementById("lockRole");
const lockSentence = document.getElementById("lockSentence");

/************************************************
 * Timer Variables and Intervals
 ************************************************/
let emotionInterval = defaultSettings.emotionInterval;
let roleInterval = defaultSettings.roleInterval;
let sentenceInterval = defaultSettings.sentenceInterval;
let emotionTimer, roleTimer, sentenceTimer;

// Current objects for generated data
let currentEmotion = null; // Expected structure: { en, et, desc_en, desc_et }
let currentRole = null;    // Expected structure: { en, et }
let currentSentence = "";  // A string

/************************************************
 * Generate Data Functions
 ************************************************/
function generateEmotion() {
  if (!lockEmotion.checked && emotionsData.length > 0) {
    currentEmotion = getRandomItem(emotionsData);
    displayEmotion();
  }
}

function displayEmotion() {
  if (!currentEmotion) return;
  const lang = getSelectedLanguage();
  if (lang === "en") {
    emotionDisplay.textContent = currentEmotion.en;
    emotionDesc.textContent = currentEmotion.desc_en || "";
  } else {
    emotionDisplay.textContent = currentEmotion.et;
    emotionDesc.textContent = currentEmotion.desc_et || "";
  }
}

function generateRole() {
  if (!lockRole.checked && rolesData.length > 0) {
    currentRole = getRandomItem(rolesData);
    displayRole();
  }
}

function displayRole() {
  if (!currentRole) return;
  const lang = getSelectedLanguage();
  roleDisplay.textContent = (lang === "en") ? currentRole.en : currentRole.et;
}

function generateSentence() {
  if (!lockSentence.checked) {
    const lang = getSelectedLanguage();
    if (lang === "en" && sentencesDataEn.length > 0) {
      currentSentence = getRandomItem(sentencesDataEn);
    } else if (lang === "et" && sentencesDataEt.length > 0) {
      currentSentence = getRandomItem(sentencesDataEt);
    } else {
      currentSentence = "No sentences found.";
    }
    displaySentence();
  }
}

function displaySentence() {
  sentenceDisplay.textContent = currentSentence;
}

function shuffleAll() {
  generateEmotion();
  generateRole();
  generateSentence();
}

/************************************************
 * Display Options Update Function
 ************************************************/
function updateDisplayOptions() {
  // Update the visibility of the emotion description
  const showDesc = document.getElementById("displayEmotionDesc").checked;
  emotionDesc.style.display = showDesc ? "block" : "none";

  // Update the visibility of section titles
  const showTitles = document.getElementById("displayTitles").checked;
  document.getElementById("emotionTitle").style.display = showTitles ? "block" : "none";
  document.getElementById("roleTitle").style.display = showTitles ? "block" : "none";
  document.getElementById("sentenceTitle").style.display = showTitles ? "block" : "none";
}

/************************************************
 * Timers Functions
 ************************************************/
function startTimers() {
  clearTimers();

  emotionTimer = setInterval(() => {
    generateEmotion();
  }, emotionInterval * 1000);

  roleTimer = setInterval(() => {
    generateRole();
  }, roleInterval * 1000);

  sentenceTimer = setInterval(() => {
    generateSentence();
  }, sentenceInterval * 1000);
}

function clearTimers() {
  if (emotionTimer) clearInterval(emotionTimer);
  if (roleTimer) clearInterval(roleTimer);
  if (sentenceTimer) clearInterval(sentenceTimer);
}

/************************************************
 * Settings Handling
 ************************************************/
function initSettingsPanel() {
  const toggleBtn = document.getElementById("toggle-settings-btn");
  const settingsPanel = document.getElementById("settings-panel");
  let isOpen = false;

  toggleBtn.addEventListener("click", () => {
    isOpen = !isOpen;
    settingsPanel.style.display = isOpen ? "block" : "none";
    updateUITranslations();
  });

  // Save Settings button event listener
  const saveBtn = document.getElementById("saveSettingsBtn");
  const eIntervalInput = document.getElementById("emotionInterval");
  const rIntervalInput = document.getElementById("roleInterval");
  const sIntervalInput = document.getElementById("sentenceInterval");

  saveBtn.addEventListener("click", () => {
    // Update intervals from the input fields (or fallback to defaults)
    emotionInterval = parseInt(eIntervalInput.value, 10) || defaultSettings.emotionInterval;
    roleInterval = parseInt(rIntervalInput.value, 10) || defaultSettings.roleInterval;
    sentenceInterval = parseInt(sIntervalInput.value, 10) || defaultSettings.sentenceInterval;

    startTimers();
    alert(uiTranslations[getSelectedLanguage()].settingsSavedAlert);
  });
}

/************************************************
 * Initialize
 ************************************************/
function init() {
  // Buttons for generating new content
  document.getElementById("nextEmotionBtn").addEventListener("click", generateEmotion);
  document.getElementById("nextRoleBtn").addEventListener("click", generateRole);
  document.getElementById("nextSentenceBtn").addEventListener("click", generateSentence);
  document.getElementById("shuffleBtn").addEventListener("click", shuffleAll);

  // Language radio buttons event: change displayed data and UI translations
  const langRadios = document.getElementsByName("lang");
  for (let radio of langRadios) {
    radio.addEventListener("change", () => {
      displayEmotion();
      displayRole();
      generateSentence();
      updateUITranslations();
    });
  }

  // Initialize settings panel
  initSettingsPanel();

  // Event listeners for display options (emotion description and section titles)
  document.getElementById("displayEmotionDesc").addEventListener("change", updateDisplayOptions);
  document.getElementById("displayTitles").addEventListener("change", updateDisplayOptions);

  // Set UI translations and display options initially
  updateUITranslations();
  updateDisplayOptions();

  // Set the HTML input fields to reflect the default intervals
  document.getElementById("emotionInterval").value = emotionInterval;
  document.getElementById("roleInterval").value = roleInterval;
  document.getElementById("sentenceInterval").value = sentenceInterval;

  // First shuffle and start timers
  shuffleAll();
  startTimers();
}

window.addEventListener("DOMContentLoaded", init);
