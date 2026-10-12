// 1. Each step: which light is on, how long (ms), and the message
const steps = [
  { color: "red", time: 4000, message: "STOP" },
  { color: "green", time: 4000, message: "GO" },
  { color: "yellow", time: 1500, message: "SLOW DOWN" }
];

const lights = {
  red: document.querySelector(".red"),
  yellow: document.querySelector(".yellow"),
  green: document.querySelector(".green")
};

const status = document.getElementById("status");
const toggleBtn = document.getElementById("toggleBtn");

let currentStep = 0;
let timer = null;
let running = true;

// 2. Turn off all lights, then turn on the current one
function showStep() {
  Object.values(lights).forEach((light) => light.classList.remove("on"));

  const step = steps[currentStep];
  lights[step.color].classList.add("on");
  status.textContent = step.message;
}

// 3. Show a step, wait, then move to the next one (loops forever)
function runCycle() {
  showStep();
  timer = setTimeout(() => {
    currentStep = (currentStep + 1) % steps.length;
    runCycle();
  }, steps[currentStep].time);
}

// 4. Pause / Resume button
toggleBtn.addEventListener("click", () => {
  if (running) {
    clearTimeout(timer);
    toggleBtn.textContent = "Resume";
  } else {
    runCycle();
    toggleBtn.textContent = "Pause";
  }

  running = !running;
});

runCycle();
