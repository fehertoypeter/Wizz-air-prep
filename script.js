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
    down: "Top-position",
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
    down: "Front-position",
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
  resetCubeFaces(); // Előző játékból megmaradt színek visszaállítása
  currentPosition = positions[Math.floor(Math.random() * positions.length)];
  playSound(currentPosition);
  document.getElementById("current-image").src = images[currentPosition];
  isGameOver = false;
  resetButtonColors();

  console.log("Kezdő pozicio:" + currentPosition);
  resetCube();
  // Az aktuális pozíció alapján színezzük a kocka megfelelő oldalát
  colorCubeFace(currentPosition);

  setTimeout(() => {
    let moves = generateMoves();
    playMoves(moves);
  }, 2000);
});

// A kocka oldalak színezésének alaphelyzetbe állítása
function resetCubeFaces() {
  const faces = document.querySelectorAll(".cube .face");
  faces.forEach((face) => {
    face.style.backgroundColor = "#ffffff36"; // Visszaállítás fehér átlátszóra
  });
}

// A kocka megfelelő oldalának zöldre színezése
function colorCubeFace(position) {
  let faceClass = ""; // Eltároljuk az oldal osztályát

  switch (position) {
    case "Front-position":
      faceClass = "front";
      break;
    case "Back-position":
      faceClass = "back";
      break;
    case "Left-position":
      faceClass = "left";
      break;
    case "Right-position":
      faceClass = "right";
      break;
    case "Top-position":
      faceClass = "top";
      break;
    case "Bottom-position":
      faceClass = "bottom";
      break;
  }

  updateGreenSide();
}

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

  moves.forEach((move, index) => {
    setTimeout(() => {
      playSound(move); // Jelenlegi hang lejátszása

      // Forgatás az irány alapján
      if (move === "right") {
        rotateY -= 90; // Right mozgás (Y tengely visszafelé forgatás)
      } else if (move === "left") {
        rotateY += 90; // Left mozgás (Y tengely előrefelé forgatás)
      } else if (move === "up") {
        rotateZ += 90; // Up mozgás (Z tengely előrefelé forgatás)
      } else if (move === "down") {
        rotateZ -= 90; // Down mozgás (Z tengely visszafelé forgatás)
      }

      updateCubeTransform(); // Kocka frissítése az új forgatási értékek alapján

      // Új pozíció beállítása a mozgás alapján
      currentPosition = transitions[currentPosition][move];
      console.log(move);
      console.log(currentPosition);
      // Ha ez nem az utolsó mozgás, resetelés
      if (index < moves.length - 1) {
        setTimeout(() => {
          resetCube(); // Kocka visszaállítása alaphelyzetbe
        }, 400); // Rövid késleltetés a reset előtt, hogy a mozgás befejeződjön
      }
    }, delay);
    delay += 800; // Késleltetés minden mozgás között
  });

  // Az utolsó mozgás után nincs reset, a kocka marad az új állapotban
  setTimeout(() => {
    isGameOver = true;
  }, delay);
}

// Kocka visszaállítása alaphelyzetbe (reset)
function resetCube() {
  rotateX = -20;
  rotateY = 70;
  rotateZ = 0;
  document.querySelector(".cube").style.transition = "none"; // Animáció kikapcsolása a reset során
  updateCubeTransform(); // Kocka visszaállítása az alaphelyzetbe

  setTimeout(() => {
    document.querySelector(".cube").style.transition = ""; // Animáció visszaállítása
  }, 50); // Rövid idő múlva visszakapcsoljuk az animációt
  console.log("reset Cube");
  updateGreenSide();
}

// Zöld szín visszaállítása a jelenlegi oldalra a currentPosition alapján
function updateGreenSide() {
  // Az oldalakhoz rendeljük a zöld színt a currentPosition értéke alapján
  const sides = document.querySelectorAll(".face");

  // Először eltávolítjuk a zöld színt minden oldalról
  sides.forEach((side) => side.classList.remove("green-side"));

  // A currentPosition-nek megfelelő oldalra tesszük a zöld színt
  if (currentPosition === "Front-position") {
    document.getElementById("face-front").classList.add("green-side");
  } else if (currentPosition === "Back-position") {
    document.getElementById("face-back").classList.add("green-side");
  } else if (currentPosition === "Right-position") {
    document.getElementById("face-right").classList.add("green-side");
  } else if (currentPosition === "Left-position") {
    document.getElementById("face-left").classList.add("green-side");
  } else if (currentPosition === "Top-position") {
    document.getElementById("face-top").classList.add("green-side");
  } else if (currentPosition === "Bottom-position") {
    document.getElementById("face-bottom").classList.add("green-side");
  }
}

// Kocka frissítése a forgatási értékek alapján
function updateCubeTransform() {
  document.querySelector(
    ".cube"
  ).style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
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
        button.style.backgroundColor = "#CDDA32"; // Helyes válasz
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
    button.style.backgroundColor = "white"; // Alapértelmezett szín
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

let rotateX = -20; // Kezdő X tengely forgatás
let rotateY = 70; // Kezdő Y tengely forgatás
let rotateZ = 0; // Kezdő Z tengely forgatás (0 fokból indul)
/*
document.getElementById("rotateY").addEventListener("click", () => {
  rotateY += 90; // Y tengelyen forgatás 90 fokkal
  updateCubeTransform();
});

document.getElementById("rotateY-back").addEventListener("click", () => {
  rotateY -= 90; // Y tengelyen forgatás visszafelé 90 fokkal
  updateCubeTransform();
});

document.getElementById("rotateZ").addEventListener("click", () => {
  rotateZ += 90; // Z tengelyen forgatás 90 fokkal
  updateCubeTransform();
});

document.getElementById("rotateZ-back").addEventListener("click", () => {
  rotateZ -= 90; // Z tengelyen forgatás visszafelé 90 fokkal
  updateCubeTransform();
});
*/

function updateCubeTransform() {
  // Kocka transformációjának frissítése
  const cube = document.querySelector(".cube");

  // Kocka elforgatása
  cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
}
