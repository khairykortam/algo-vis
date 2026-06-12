const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");
document.body.style.overflow = 'hidden';
const slider = document.getElementById("slider");
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
  const maxVal = Math.max(...arr, 1);
  const barWidth = canvas.width / arr.length;
  let xPos = (canvas.width - arr.length * barWidth) / 2;
  const yPos = canvas.height;
  arr.forEach((element, index) => {
    const color = index === highlightIndex ? "purple" : "blue";
    const height = (element / maxVal) * canvas.height;
    drawBar(xPos, yPos, barWidth, height, color);
    xPos += barWidth;
  });
}
function createArray(size) {
  const s = parseInt(size) || 0;
  const mainArray = Array.from({ length: s }, () =>
    Math.floor(Math.random() * s),
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
    // place pivot
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
    array = createArray(event.target.value);
  });
  selectAlgorithm.addEventListener("change", (event) => {
    algo = event.target.value;
  });
  button.addEventListener("click", async () => {
    temp = new Array(array.length);
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
    drawArray(array, -1);
  });
})();
