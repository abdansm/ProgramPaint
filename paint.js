const canvasEle = document.getElementById('drawContainer');
const context = canvasEle.getContext('2d');
const btnEle1 = document.getElementById('option1');
const btnEle2 = document.getElementById('option2');
const btnEle3 = document.getElementById('option3');
const btnEle4 = document.getElementById('option4');
const btnEle5 = document.getElementById('option5');
const divTrans = document.getElementById('divTransform');
const btnTrans1 = document.getElementById('trans1');
const btnTrans2 = document.getElementById('trans2');
const btnTrans3 = document.getElementById('trans3');
const btnTrans4 = document.getElementById('trans4');
const btnTrans5 = document.getElementById('trans5');
divTrans.style.display = "none";
var nilaix,nilaiy;
var segix=[];
segix[0]=-4000;
var segiy=[];
const cos90= Math.cos(-90*Math.PI/180) ;
const sin90= Math.sin(-90*Math.PI/180) ;

var mode = 0;
let startPosition = {x: 0, y: 0};
let lineCoordinates = {x: 0, y: 0};
let isDrawStart = false;

const getClientOffset = (event) => {
    const {pageX, pageY} = event.touches ? event.touches[0] : event;
    const x = pageX - canvasEle.offsetLeft;
    const y = pageY - canvasEle.offsetTop;

    return {
       x,
       y
    } 
}


const mouseDownListener = (event) => {
   startPosition = getClientOffset(event);
   isDrawStart = true;
}


const mouseMoveListener = (event) => {
  if(!isDrawStart) return;
  
  lineCoordinates = getClientOffset(event);
  clearCanvas();
  gambar();
  //buatGaris(startPosition.x,startPosition.y,lineCoordinates.x,lineCoordinates.y);
  //drawLine();
}

const mouseupListener = (event) => {
  isDrawStart = false;
}

const clearCanvas = () => {
   context.clearRect(0, 0, canvasEle.width, canvasEle.height);
}

const modeGarisBresenham = () =>{
    segix[0]=-4000;
    mode = 0;
    divTrans.style.display = "none";
}

const modeGarisDDA = () =>{
    segix[0]=-4000;
    mode = 1;
    divTrans.style.display = "none";
}

const modeLingkaran = () =>{
    segix[0]=-4000;
    mode = 2;
    divTrans.style.display = "none";
}

const modeElips = () =>{
    segix[0]=-4000;
    mode = 3;
    divTrans.style.display = "none";
}

const modeTransformasi = () =>{
    mode = 4;
    clearCanvas();
    divTrans.style.display = "block";
}

const translasi = () =>{
    var xbaru,ybaru;
    if(segix[0]!=-4000){
        nilaix = document.getElementById("input1").value;
        nilaiy = document.getElementById("input2").value;
        nilaix = Math.floor(nilaix)
        nilaiy = Math.floor(nilaiy)
        if(Number.isInteger(nilaix)&&Number.isInteger(nilaix)){
        for (let i = 0; i < 3; i++) {
       xbaru = segix[i]+nilaix;
       ybaru = segiy[i]+nilaiy;
       segix[i] = Math.round(xbaru);
       segiy[i] = Math.round(ybaru);
        }
        clearCanvas();
        transformSegitiga(segix[0],segiy[0],segix[1],segiy[1],segix[2],segiy[2]);
       }}
}

const skala = () =>{
    if(segix[0]!=-4000){
        nilaix = document.getElementById("input1").value;
        nilaiy = document.getElementById("input2").value;
        nilaix = Number(nilaix)
        nilaiy = Number(nilaiy)
    let px = (segix[0]+segix[1]+segix[2])/3;
     let py = (segiy[0]+segiy[1]+segiy[2])/3;
        for (let i = 0; i < 3; i++) {
            xbaru = px+ (segix[i]-px)*nilaix;
            ybaru = py+ (segiy[i]-py)*nilaiy;
            segix[i] = Math.round(xbaru);
            segiy[i] = Math.round(ybaru);
             }
        clearCanvas();
        transformSegitiga(segix[0],segiy[0],segix[1],segiy[1],segix[2],segiy[2]);
   
       }
}
const rotasi = () =>{
    if(segix[0]!=-4000){
     nilaix = document.getElementById("input1").value;
     nilaiy = document.getElementById("input2").value;
     if (nilaiy==0){
        nilaix = Math.abs(nilaix);
     }else {nilaix = -nilaix;}

     let x1,y1;
     let cossegi = Math.cos(nilaix*Math.PI/180);
     let sinsegi = Math.sin(nilaix*Math.PI/180);
     let px = (segix[0]+segix[1]+segix[2])/3;
     let py = (segiy[0]+segiy[1]+segiy[2])/3;
     for (let i = 0; i < 3; i++) {
    x1 = px + (segix[i]-px)* cossegi - (segiy[i]-py)*sinsegi;
    y1 = py + (segix[i]-px)* sinsegi + (segiy[i]-py)*cossegi;
    segix[i] = Math.round(x1);
    segiy[i] = Math.round(y1);
     }
     clearCanvas();
     transformSegitiga(segix[0],segiy[0],segix[1],segiy[1],segix[2],segiy[2]);

    }

}

const cerminX = () =>{
    if(segix[0]!=-4000){
     let py = (segiy[0]+segiy[1]+segiy[2])/3;
        for (let i = 0; i < 3; i++) {
            if(segiy[i]>py){
                segiy[i] = segiy[i]-2*(segiy[i]-py);
            }else if(segiy[i]<py){
                segiy[i] = segiy[i]+2*(py-segiy[i]);
            }
             }
        clearCanvas();
        transformSegitiga(segix[0],segiy[0],segix[1],segiy[1],segix[2],segiy[2]);
   
       }
}

const cerminY = () =>{
    if(segix[0]!=-4000){
        let px = (segix[0]+segix[1]+segix[2])/3;
           for (let i = 0; i < 3; i++) {
               if(segix[i]>px){
                   segix[i] = segix[i]-2*(segix[i]-px);
               }else if(segix[i]<px){
                   segix[i] = segix[i]+2*(px-segix[i]);
               }
                }
           clearCanvas();
           transformSegitiga(segix[0],segiy[0],segix[1],segiy[1],segix[2],segiy[2]);
      
          }


}

btnEle1.addEventListener('click', modeGarisBresenham);
btnEle2.addEventListener('click', modeGarisDDA);
btnEle3.addEventListener('click', modeLingkaran);
btnEle4.addEventListener('click', modeElips);
btnEle5.addEventListener('click', modeTransformasi);
btnTrans1.addEventListener('click', translasi);
btnTrans2.addEventListener('click', skala);
btnTrans3.addEventListener('click', rotasi);
btnTrans4.addEventListener('click', cerminX);
btnTrans5.addEventListener('click', cerminY);


canvasEle.addEventListener('mousedown', mouseDownListener);
canvasEle.addEventListener('mousemove', mouseMoveListener);
canvasEle.addEventListener('mouseup', mouseupListener);

canvasEle.addEventListener('touchstart', mouseDownListener);
canvasEle.addEventListener('touchmove', mouseMoveListener);
canvasEle.addEventListener('touchend', mouseupListener);


gambar = () => {
switch (mode) {
    case 0:
        buatGarisBresenham(startPosition.x, startPosition.y, lineCoordinates.x,lineCoordinates.y);
        break;
    case 1:
        buatGarisDDA(startPosition.x, startPosition.y, lineCoordinates.x,lineCoordinates.y);
        break;
    case 2:
        buatLingkaran(startPosition.x, startPosition.y, lineCoordinates.x - startPosition.x, lineCoordinates.y - startPosition.y);
        break;
    case 3:
        buatElips(startPosition.x, startPosition.y, Math.abs(lineCoordinates.x - startPosition.x), Math.abs(lineCoordinates.y - startPosition.y));
        break;
    case 4:
        buatSegitiga(startPosition.x, startPosition.y, lineCoordinates.x,lineCoordinates.y);
        break;
    default:buatGarisBresenham(startPosition.x, startPosition.y, lineCoordinates.x,lineCoordinates.y);
        break;
}
}
 
  buatGarisBresenham = (x1,y1,x2,y2) =>{
     const dx = Math.abs(x2 - x1);
     const sx = x1 < x2 ? 1 : -1;
     const dy = -Math.abs(y2 - y1);
     const sy = y1 < y2 ? 1 : -1;
     var e2, er = dx + dy, end = false;
     context.beginPath();
     while (!end) {
         context.rect(x1, y1, 1, 1);
         if (x1 === x2 && y1 === y2) {
             end = true;
         } else {
             e2 = 2 * er;
             if (e2 > dy) {
                 er += dy;
                 x1 += sx;
             }
             if (e2 < dx) {
                 er += dx;
                 y1 += sy;
             }
         }
     }
     context.fill();
 
 
 }

 buatGarisDDA = (x1,y1,x2,y2) =>{
    var step,x_inc,y_inc,k;
    let dx = x2-x1;
    let dy = y2-y1;

    if(Math.abs(dx)>Math.abs(dy)){
        step = Math.abs(dx)
    }else {step = Math.abs(dy)}
    x_inc = dx/step;
    y_inc = dy/step;
    context.beginPath();
    context.rect(x1, y1, 1, 1);
    for (k = 0; k < step; k++) {
        x1 = x1 + x_inc;
        y1 = y1 + y_inc;
        context.rect(Math.round(x1), Math.round(y1), 1, 1);
    }
    context.fill();


}

buatLingkaran = (centerx,centery,diffx,diffy) =>{

    let radius = Math.sqrt(Math.pow(diffx,2)+Math.pow(diffy,2));
    x1 = 0;
    y1 = radius;
    p = 5/4-radius;
    context.beginPath();
    while(x1<y1)
        { 
          if(p<0)
             p += 2*x1 + 1;
          else
             { y1--;
               p += 2*x1 - 2*y1 + 1; }
          plotCirclePoints(centerx,centery,x1,y1);
          x1++;
        }
        context.fill();
}

plotCirclePoints = (centerx,centery,x1,y1) =>{
    context.rect(centerx+x1, centery+y1, 1, 1);
    context.rect(centerx-x1, centery+y1, 1, 1);
    context.rect(centerx+x1, centery-y1, 1, 1);
    context.rect(centerx-x1, centery-y1, 1, 1);

    context.rect(centerx+y1, centery+x1, 1, 1);
    context.rect(centerx-y1, centery+x1, 1, 1);
    context.rect(centerx+y1, centery-x1, 1, 1);
    context.rect(centerx-y1, centery-x1, 1, 1);
}

buatElips= (xs1,ys1,rx,ry) =>{
    var x1,y1,d1,d2,dx,dy;
    x1 = 0; y1 = ry;               // take start position as (0,ry)
    d1 = Math.pow(ry,2) - (Math.pow(rx,2) * ry) + (0.25 * Math.pow(rx,2));
    dx = 2 * Math.pow(ry,2) * x1;
    dy = 2 * Math.pow(rx,2) * y1;
    context.beginPath();
    do                         // region one
    {  plotElipsPoints(xs1,ys1,x1,y1);
       if(d1<0)
       {  x1++;
          dx = dx + (2 * (Math.pow(ry,2)));
          d1 = d1 + dx +(Math.pow(ry,2));
       } else
       {   x1++;  y1--;
        dx = dx + (2 * (Math.pow(ry,2)));
        dy = dy - (2 * (Math.pow(rx,2)));
        d1 = d1 + dx - dy + (Math.pow(ry,2));
    }
} while(dx<dy);  
d2 = Math.pow(ry,2)*Math.pow((x1+1/2),2)+Math.pow(rx,2)*Math.pow((y1-1),2)-Math.pow(rx,2)*Math.pow(ry,2);
    // change over condition for region-2
do                   // region two
{   plotElipsPoints(xs1,ys1,x1,y1);
    if(d2>0)
    {   x1 = x1;  y1--;
        dy = dy - (2 * (Math.pow(rx,2)));
        d2 = d2 - dy + Math.pow(rx,2);
    } else {
        x1++; y1--;
        dy = dy - (2 * (Math.pow(rx,2)));
        dx = dx + (2 * (Math.pow(ry,2)));
        d2 = d2 +dx - dy + Math.pow(rx,2);
    }
} while(y1>=0);
context.fill();
}

plotElipsPoints = (centerx,centery,x1,y1) =>{
    context.rect(centerx+x1, centery+y1, 1, 1);
    context.rect(centerx-x1, centery-y1, 1, 1);
    context.rect(centerx+x1, centery-y1, 1, 1);
    context.rect(centerx-x1, centery+y1, 1, 1);
}

buatSegitiga = (x1,y1,x2,y2) =>{
    buatGarisBresenham(x1,y1,x2,y2);
    let xbaru = x1 + (x2-x1)* cos90 - (y2-y1)*sin90;
    let ybaru = y1 + (x2-x1)* sin90 + (y2-y1)*cos90;
    xbaru = Math.round(xbaru);
    ybaru = Math.round(ybaru);
    buatGarisBresenham(x1, y1, xbaru, ybaru);
    buatGarisBresenham(xbaru,ybaru, x2,y2);
        segix[0] = x1;
        segix[1] = x2;
        segix[2] = xbaru;
        segiy[0] = y1;
        segiy[1] = y2;
        segiy[2] = ybaru;
}

transformSegitiga = (x1,y1,x2,y2,x3,y3) =>{
    buatGarisBresenham(x1,y1,x2,y2);
    buatGarisBresenham(x1, y1, x3, y3);
    buatGarisBresenham(x3,y3, x2,y2);
}