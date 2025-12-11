// Add your 50 names here:
const names = [
  "Alice", "Bob", "Charlie", "Diana", "Eli", "Fiona", "George", "Hannah",
  "Ian", "Jack", "Kate", "Leo", "Mia", "Noah", "Olivia", "Paul", "Quinn",
  "Rachel", "Sam", "Tina", "Uma", "Vince", "Will", "Xander", "Yara", "Zoe",
  "Aaron", "Bella", "Cody", "Daisy", "Evan", "Faith", "Gabe", "Holly",
  "Isaac", "Jade", "Kirk", "Luna", "Max", "Nina", "Oscar", "Penny", "Ruth",
  "Steve", "Toby", "Ursula", "Vera", "Wade", "Xena"
];

const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spin');
const result = document.getElementById('result');
let isSpinning = false;
let arc = Math.PI * 2 / names.length;
let startAngle = 0;

function drawWheel() {
  for (let i = 0; i < names.length; i++) {
    const angle = startAngle + i * arc;
    ctx.beginPath();
    ctx.fillStyle = i % 2 === 0 ? "#ffb347" : "#ffcc33";
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 250, angle, angle + arc);
    ctx.fill();
    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(angle + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#333";
    ctx.font = "bold 14px Poppins";
    ctx.fillText(names[i], 230, 10);
    ctx.restore();
  }
}

drawWheel();

spinBtn.addEventListener('click', () => {
  if (isSpinning) return;
  isSpinning = true;
  result.textContent = "";

  let spinAngle = Math.floor(Math.random() * 360) + 1800; // 5+ full spins
  let spinTime = 0;
  let spinTimeTotal = 4000;

  const spin = () => {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
      stopRotateWheel();
      return;
    }
    const spinAngleDelta = easeOut(spinTime, 0, spinAngle, spinTimeTotal);
    startAngle += (spinAngleDelta * Math.PI / 180);
    drawWheel();
    requestAnimationFrame(spin);
  };
  spin();
});

function stopRotateWheel() {
  const degrees = startAngle * 180 / Math.PI + 90;
  const arcd = arc * 180 / Math.PI;
  const index = Math.floor((360 - (degrees % 360)) / arcd) % names.length;
  result.textContent = `🎉 The winner is: ${names[index]}! 🎊`;
  isSpinning = false;
}

function easeOut(t, b, c, d) {
  const ts = (t/=d)*t;
  const tc = ts*t;
  return b + c*(tc + -3*ts + 3*t);
}