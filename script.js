const images = {
  "Back-position": "img/Back-position.png",
  "Bottom-position": "img/Bottom-position.png",
  "Front-position": "img/Front-position.png",
  "Left-position": "img/Left-position.png",
  "Right-position": "img/Right-position.png",
  "Top-position": "img/Top-position.png",
};

const sounds = {
  "Back-position": "voice/Back-position.mp3",
  "Bottom-position": "voice/Bottom-position.mp3",
  "Front-position": "voice/Front-position.mp3",
  "Left-position": "voice/Left-position.mp3",
  "Right-position": "voice/Right-position.mp3",
  "Top-position": "voice/Top-position.mp3",
  right: "voice/right.mp3",
  left: "voice/left.mp3",
  up: "voice/up.mp3",
  down: "voice/down.mp3",
};

const transitions = {
  "Back-position": {
    right: "Right-position",
    left: "Left-position",
    up: "Bottom-position",
    down: "Bottom-position",
  },
  "Bottom-position": {
    right: "Bottom-position",
    left: "Bottom-position",
    up: "Front-position",
    down: "Back-position",
  },
  "Front-position": {
    right: "Left-position",
    left: "Right-position",
    up: "Top-position",
    down: "Bottom-position",
  },
  "Top-position": {
    right: "Top-position",
    left: "Top-position",
    up: "Back-position",
    down: "Bottom-position",
  },
  "Left-position": {
    right: "Back-position",
    left: "Front-position",
    up: "Left-position",
    down: "Left-position",
  },
  "Right-position": {
    right: "Front-position",
    left: "Back-position",
    up: "Right-position",
    down: "Right-position",
  },
};

let positions = [
  "Right-position",
  "Left-position",
  "Bottom-position",
  "Top-position",
  "Front-position",
  "Back-position",
];

let currentPosition = "";
let isGameOver = false;

// A gombok létrehozása a pozíciókhoz
function createPositionButtons() {
  const buttonContainer = document.getElementById("position-buttons");
  buttonContainer.innerHTML = ""; // Előző gombok törlése

  positions.forEach((position) => {
    const button = document.createElement("button");
    button.innerText = position.replace("-position", ""); // Gomb szövegébe csak a pozíció neve kerül
    button.addEventListener("click", () => checkPosition(position));
    buttonContainer.appendChild(button);
  });
}

// Új játék gomb eseménye
document.getElementById("new-game").addEventListener("click", () => {
  currentPosition = positions[Math.floor(Math.random() * positions.length)];
  playSound(currentPosition);
  document.getElementById("current-image").src = images[currentPosition];
  isGameOver = false;
  resetButtonColors();

  setTimeout(() => {
    let moves = generateMoves();
    playMoves(moves);
  }, 2000);
});

// Hang lejátszása
function playSound(position) {
  let audio = new Audio(sounds[position]);
  audio.play();
}

// Mozgás generálása
function generateMoves() {
  const directions = ["right", "left", "up", "down"];
  let moves = [];
  for (let i = 0; i < 6; i++) {
    moves.push(directions[Math.floor(Math.random() * directions.length)]);
  }
  return moves;
}

// Mozgások lejátszása
function playMoves(moves) {
  let delay = 0;

  moves.forEach((move) => {
    setTimeout(() => {
      playSound(move);
      currentPosition = transitions[currentPosition][move];
      document.getElementById("current-image").src = images[currentPosition];
    }, delay);
    delay += 800;
  });

  // Várakozás a mozgások végéig
  setTimeout(() => {
    isGameOver = true;
  }, delay);
}

// Pozíció ellenőrzése a felhasználó választása alapján
function checkPosition(selectedPosition) {
  if (!isGameOver) {
    alert("A játék még nem ért véget.");
    return;
  }

  const buttons = document.querySelectorAll("#position-buttons button");
  buttons.forEach((button) => {
    if (button.innerText === selectedPosition.replace("-position", "")) {
      if (selectedPosition === currentPosition) {
        button.style.backgroundColor = "#4caf50"; // Helyes válasz
      } else {
        button.style.backgroundColor = "#f44336"; // Helytelen válasz
      }
    }
  });
}

// Gombok színének visszaállítása az új játék indításakor
function resetButtonColors() {
  const buttons = document.querySelectorAll("#position-buttons button");
  buttons.forEach((button) => {
    button.style.backgroundColor = "#e0e0e0"; // Alapértelmezett szín
  });
}

// Toggle switch esemény kezelése
document.getElementById("toggle-switch").addEventListener("change", (event) => {
  const imgElement = document.getElementById("rules-image");
  if (event.target.checked) {
    imgElement.style.opacity = "0"; // Kép elrejtése
  } else {
    imgElement.style.opacity = "1"; // Kép megjelenítése
  }
});

// Kép elrejtése alapértelmezetten
document.getElementById("current-image").style.opacity = "1";
createPositionButtons(); // Gombok létrehozása

// Információs ikon esemény kezelése
document.getElementById("info-icon").addEventListener("click", () => {
  const rulesContainer = document.getElementById("rules-container");
  // Ellenőrizzük, hogy a szabálykönyv látható-e
  if (rulesContainer.style.display === "none") {
    rulesContainer.style.display = "block"; // Megjelenítjük
  } else {
    rulesContainer.style.display = "none"; // Elrejtjük
  }
});

// Bezáró gomb esemény kezelése
document.getElementById("close-rules").addEventListener("click", () => {
  document.getElementById("rules-container").style.display = "none"; // Bezárjuk a szabálykönyvet
});
