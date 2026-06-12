const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');
const slider = document.getElementById('slider');
const selectAlgorithm = document.getElementById('select-algorithm');
const button = document.getElementById('execute');
let agorithm = '';
let array =[];
let temp =[];

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

async function bubbles(array){
    for(let i=0;i<array.length;i++){
        for(let j=0;j<array.length-i;i++){
            if(array[j]>array[j+1]){
                let x = array[j+1];
                array[j+1]=array[j];
                arrray[j]=x;
            }
            await sleep(1);
            drawArray(array,j);
        }
    }
}
async function quicky(array,start,end){
    if(start<end){
        let pivot = array[end];
        let i=start;
        let j=i-1;
        while(i<end){
            if(array[i]<pivot){
                j++;
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            await sleep(11);
            draw(array,array[end]);
            i++;
        }
        j++;
        let temp = array[end];
        array[end] = array[j];
        array[j] = temp;
        await sleep(12);
        drawArray(array, array[j]);
        await quicky(array,start, j-1);
        await quicky(array, j+1, end);
       }
       await sleep(11);
       drawArray(array, -1);
}
function merge(array, start,end){
let mid = parseInt((start+end)/2);
let iLeft = start;
let iRight = mid+1;
let endLeft = mid;
let endRight = end;
let iMain = start;

while(iLeft<endLeft && iRight<endRigth){
    if(array[iLeft]<array[iRight]){
        temp[iMain++]=array[iRight++];
    }
}
while(iLeft<endLeft){
    temp[iMain++]=array[iLeft++];
}
while(iRight<=endRight){
    temp[iMain++] = array[iRight++];
}

iMain = start;
while(iMain<=end){
    array[iMain]=temp[iMain++];
    await sleep(22);
    drawArray(array, iMain);
}
}
async function elmerge_el_gededa(array, start, end) {
    if(start<end){
        let mid = parseInt((start+end)/2);
        await elmerge_el_gededa(array,start,mid);
        await elmerge_el_gededa(array,mid+1,end);
        await elmerge_el_gededa(array,start,end);
    }
}


(()=>{
    array = createArray(100);
    slider.addEventListener('input',(event)=>{
        array = createArray(event.target.value);
    });
    selectAlgorithm.addEventListener('change',(event)=>{
        algo = event.target.value;
    });
    button.addEventListener('click',async ()=>{
        switch(algo){

        }
    });

})();

