let start;

let Botx1, Boty1, largbot1, altbot1;
let tela = 0;

let hasClicked = false;
let isInutil = false;

let dateStart, dateEnd;

let posX, posY;

const VELOCITY = 1;

let xmod = 1, ymod = 1;

function now(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const leftoverSeconds = seconds % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(leftoverSeconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function preload() {
  start = loadImage("start.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  dateStart = Date.now();

  posX = Math.floor(windowWidth * 0.1);
  posY = Math.floor(windowHeight * 0.02);

  Botx1 = Math.floor(windowWidth * 0.34);
  Boty1 = Math.floor(windowHeight * 0.46);
  largbot1 = Math.floor(windowWidth * 0.328);
  altbot1 = Math.floor(windowHeight * 0.08);
  textSize(36); // Aumentar o tamanho do texto
  textFont("Arial");
  textAlign(CENTER, TOP);
}

function mousePressed() {
  if (!hasClicked && mouseX >= Botx1 && mouseY >= Boty1 && mouseX <= Botx1 + largbot1 && mouseY <= Boty1 + altbot1) {
    dateStart = Date.now();
    hasClicked = true;
  }

  if (hasClicked && mouseX >= windowWidth - 30 && mouseY <= 30) {
    dateEnd = Date.now();
    isInutil = true;
  }
}

function draw() {
  clear();
  background(0);
  fill(255);

  if (!hasClicked) {
    image(start, Botx1, Boty1, largbot1, altbot1);
  }

  if (isInutil) {
    textSize(36); // Aumentar o tamanho do texto
    const lineHeight = 36 * 1.5; // Aumentar o espaçamento entre linhas
    const startY = windowHeight - Math.floor(windowHeight * 0.5);
    text(`Parabéns!`, windowWidth - Math.floor(windowWidth * 0.54), startY);
    text(`Você passou ${now(Math.abs(dateEnd - dateStart))}`, windowWidth - Math.floor(windowWidth * 0.54), startY + lineHeight);
    text(`sendo inútil`, windowWidth - Math.floor(windowWidth * 0.54), startY + 2 * lineHeight);
  }

  if (hasClicked && !isInutil) {
    strokeWeight(2);
    stroke(255, 0, 0);
    rect(windowWidth - 30, -1, windowWidth, 30);
    textAlign(CENTER, CENTER); // Centralizar o texto "x"
    text("x", windowWidth - 15, 15);

    noStroke();
    fill(255);

    if (posX + Math.floor(windowWidth * 0.1) >= windowWidth || posX <= 0) {
      xmod *= -1;
      if (Math.ceil(random(-5, 1)) >= 1) {
        ymod *= -1;
      }
    }
    if (posY + Math.floor(windowHeight * 0.02) >= windowHeight || posY <= 0) {
      ymod *= -1;
      if (Math.ceil(random(-5, 1)) >= 1) {
        xmod *= -1;
      }
    }

    posX += xmod * VELOCITY;
    posY += ymod * VELOCITY;

    const textX = windowWidth - posX;
    const textY = posY;
    text(now(Math.abs(Date.now() - dateStart)), textX, textY);
  }

  push();
  fill(255);
  circle(mouseX, mouseY, 10);
  pop();

  if (!hasClicked && mouseX >= Botx1 && mouseY >= Boty1 && mouseX <= Botx1 + largbot1 && mouseY <= Boty1 + altbot1) {
    noFill();
    stroke(255, 255, 255);
    rect(Botx1, Boty1, largbot1, altbot1);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  posX = Math.floor(windowWidth * 0.1);
  posY = Math.floor(windowHeight * 0.02);
}
