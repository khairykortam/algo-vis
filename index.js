const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");
document.body.style.overflow = 'hidden';
const slider = document.getElementById("slider");
const randBtn = document.getElementById('rand');
const timer = document.getElementById('timer');
// const halt = document.getElementById('halt');
let startTime = null;
let interval = null;
const selectAlgorithm = document.getElementById("select-algorithm");
const button = document.getElementById("execute");
let algo = "";
let array = [];
let temp = [];

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawArray(array, -1);
});

function drawBar(x, y, width, height, color) {
  context.fillStyle = color;
  context.fillRect(
    Math.floor(x),
    Math.floor(y - height),
    Math.ceil(width),
    Math.ceil(height),
  );
  context.strokeStyle = "black";
  context.strokeRect(
    Math.floor(x),
    Math.floor(y - height),
    Math.ceil(width),
    Math.ceil(height),
  );
}

function drawArray(arr, highlightIndex = -1) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  const barWidth = canvas.width / arr.length;
  let xPos = (canvas.width - arr.length * barWidth) / 2;
  const yPos = canvas.height;
  arr.forEach((element, index) => {
    const color = index === highlightIndex ? "purple" : "blue";
    const height = (element / Math.max(...arr, 1)) * canvas.height;
    drawBar(xPos, yPos, barWidth, height, color);
    xPos += barWidth;
  });
}
function createArray(size) {
  const mainArray = Array.from({ length: size }, () =>
    Math.floor(Math.random() * size),
  );
  drawArray(mainArray, -1);
  return mainArray;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbles(array) {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        const tmp = array[j + 1];
        array[j + 1] = array[j];
        array[j] = tmp;
      }
      await sleep(10);
      drawArray(array, j);
    }
  }
}
async function quicky(array, start, end) {
  if (start < end) {
    const pivot = array[end];
    let i = start - 1;
    for (let j = start; j < end; j++) {
      if (array[j] < pivot) {
        i++;
        const tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
      }
      await sleep(10);
      drawArray(array, j);
    }
    const tmp = array[i + 1];
    array[i + 1] = array[end];
    array[end] = tmp;
    await sleep(12);
    drawArray(array, i + 1);
    await quicky(array, start, i);
    await quicky(array, i + 2, end);
  }
  await sleep(6);
  drawArray(array, -1);
}
function startTimer(){
  startTime = performance.now();
  timer.textContent = '0.00ms';
  interval = setInterval(()=> {
    const passed = performance.now()-startTime;
    timer.innerHTML = passed.toFixed(2) + 'ms';
  }, 10);
}
function endTimer(){
  if(interval) clearInterval(interval);interval =0;
  const passed = performance.now() - startTime;
  if(startTime==null){
    timer.textContent = '--';return;
  }
  startTime = null
}
function DisableMalFunction(disabled){
  if(slider) slider.disabled = disabled;
  if(randBtn) randBtn.disabled = disabled;
  if(selectAlgorithm) selectAlgorithm.disabled = disabled;
  if(button) button.disabled = disabled; 

}
async function merge(array, start, mid, end) {
  let left = start;
  let right = mid + 1;
  let k = start;
  while (left <= mid && right <= end) {
    if (array[left] <= array[right]) {
      temp[k++] = array[left++];
    } else {
      temp[k++] = array[right++];
    }
  }
  while (left <= mid) temp[k++] = array[left++];
  while (right <= end) temp[k++] = array[right++];
  for (let i = start; i <= end; i++) {
    array[i] = temp[i];
    await sleep(8);
    drawArray(array, i);
  }
}

async function el_merge_el_gededa(array, start, end) {
  if (start >= end) return;
  const mid = Math.floor((start + end) / 2);
  await el_merge_el_gededa(array, start, mid);
  await el_merge_el_gededa(array, mid + 1, end);
  await merge(array, start, mid, end);
}

(() => {
  
  array = createArray(100);
  slider.addEventListener("input", (event) => {
    array = createArray(parseInt(event.target.value));
  });
  selectAlgorithm.addEventListener("change", (event) => {
    algo = event.target.value;
  });
  randBtn.addEventListener("click", ()=> {
    array = createArray(parseInt(slider.value,10));
  })
  button.addEventListener("click", async () => {
    if(!selectAlgorithm.value) return;
    temp = new Array(array.length);

    DisableMalFunction(true);
    startTimer();
    try {
    switch (algo) {
      case "BubbleSort":
        await bubbles(array);
        break;

      case 'QuickSort':
        await quicky(array, 0, array.length - 1);
        break;

      case "MergeSort":
        await el_merge_el_gededa(array, 0, array.length - 1);
        break;
    }
  }
  finally {
    DisableMalFunction(false);
    endTimer();
    drawArray(array, -1);
  }
  });
})();
