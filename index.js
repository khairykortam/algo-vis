const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');
const slider = document.getElementById('slider');
const selectAlgorithm = document.getElementById('select-algorithm');
const button = document.getElementById('execute');
let agorithm = '';
let array =[];

window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawArray(array,-1);
})

function drawBar(x,y,width,heigth,element,color){
    context.beginPath();
    context.moveTo(x,y);
    context.lineTo(x,yStart-(height*element));
    context.lineTo(x+width,y);
    context.lineTo(x,y);
    context.fillstyle = color;
    context.fill();
    context.strokeStyle = 'black';
    context.stroke();
}

function drawArray(array,x){
    context.clearRect(0,0,canvas.width,canvas.height);
    let barWidth = canvas.width / array.length;
    let heightPerOne = canvas.height / array.length;
    let xPos = (canvas.width - array.length*barWidth)/2;
    let yPos = canvas.height;
    array.forEach(element,index => {
        let color = 'blue';
        if(index === x){
            color = 'purple';
        }
        drawBar(xPos,yPos,barWidth,heightPerOne,element,color);
        xPos += barWidth;
})
}
function createArray(size){
    const mainArray= Array.from({length:size},()=>Math.floor(Math.random()*size));
    drawArray(mainArray,-1);
    return mainArray;
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

(()=>{

})

