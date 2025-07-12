const animals = [
  { name_en: "lion", name_bn: "সিংহ", image: "assets/animals/lion.jpg" },
  { name_en: "elephant", name_bn: "হাতি", image: "assets/animals/elephant.jpg" },
  { name_en: "tiger", name_bn: "বাঘ", image: "assets/animals/tiger.jpg" },
  { name_en: "monkey", name_bn: "বানর", image: "assets/animals/monkey.jpg" },
];

let currentLang = "en";
let score = 0;
let currentAnimal = {};

const img = document.getElementById("animalImage");
const input = document.getElementById("guessInput");
const message = document.getElementById("message");
const nextBtn = document.getElementById("nextBtn");
const checkBtn = document.getElementById("checkBtn");
const langBtn = document.getElementById("langBtn");
const speakBtn = document.getElementById("speakBtn");
const title = document.getElementById("title");
const scoreDisplay = document.getElementById("scoreDisplay");

function pickRandomAnimal() {
  currentAnimal = animals[Math.floor(Math.random() * animals.length)];
  img.src = currentAnimal.image;
  input.value = "";
  message.textContent = "";
}

function checkGuess() {
  const userInput = input.value.trim().toLowerCase();
  const correctAnswer = currentLang === "en" ? currentAnimal.name_en : currentAnimal.name_bn;
  if (userInput === correctAnswer) {
    message.textContent = currentLang === "en" ? "✅ Correct!" : "✅ সঠিক!";
    message.style.color = "green";
    score++;
  } else {
    message.textContent = currentLang === "en" ? "❌ Try Again!" : "❌ আবার চেষ্টা করো!";
    message.style.color = "red";
  }
  scoreDisplay.textContent = `Score: ${score}`;
}

function toggleLanguage() {
  currentLang = currentLang === "en" ? "bn" : "en";
  langBtn.textContent = currentLang === "en" ? "🌐 বাংলা" : "🌐 English";
  title.textContent = currentLang === "en" ? "🐾 Guess the Animal" : "🐾 প্রাণী চিনো";
  input.placeholder = currentLang === "en" ? "Type animal name..." : "প্রাণীর নাম লিখো...";
}

function speakAnimalName() {
  const name = currentLang === "en" ? currentAnimal.name_en : currentAnimal.name_bn;
  const utterance = new SpeechSynthesisUtterance(name);
  utterance.lang = currentLang === "en" ? "en-US" : "bn-BD";
  speechSynthesis.speak(utterance);
}

checkBtn.addEventListener("click", checkGuess);
nextBtn.addEventListener("click", pickRandomAnimal);
langBtn.addEventListener("click", toggleLanguage);
speakBtn.addEventListener("click", speakAnimalName);

// init
toggleLanguage();
pickRandomAnimal();
