const canvas=document.getElementById("playground");
const ctx=canvas.getContext("2d");

canvas.width=1000;
canvas.height=1000;
const size=5;
const col=canvas.width/size;
const row=canvas.height/size;


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  

function initializeGrid(col,row){
    var grid=new Array(col).fill(null);
    for(let i=0;i<col;i++){
        grid[i]=new Array(row).fill(0);
        for(let j=0;j<row;j++){
            grid[i][j]=getRandomInt(2);
        }
    }
    return grid;
}

let grid=initializeGrid(col,row);

requestAnimationFrame(redraw);

function redraw(){
    grid=update(grid);
    draw(grid);
    setTimeout(() => {
    requestAnimationFrame(redraw);
    },1000/10);
}

function update(grid){
    const nextGen=grid.map(arr=>[...arr]);
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[i].length;j++){
            const curCell=grid[i][j];
            var nbNeigh=0;
            for(let k=-1;k<2;k++){
                for(let l=-1;l<2;l++){
                    if(k==0 && l==0){
                        continue;
                    }
                    if(!(i+k<0 || j+l<0) && !(i+k>=grid.length || j+l>=grid[i].length)){
                        nbNeigh+=grid[i+k][j+l];
                    }
                }
            }
            if(grid[i][j]==1 && (nbNeigh==2 || nbNeigh==3)){
                nextGen[i][j]=1;
            }
            else if(grid[i][i]==0 && nbNeigh==3){
                nextGen[i][j]=1;
            }
            else{
                nextGen[i][j]=0;
            }
        }
    }
    return nextGen;
}

function draw(grid){
    for(let i=0;i<col;i++){
        for(let j=0;j<row;j++){
            var cell=grid[i][j];
            ctx.fillStyle=cell ? "black" : "white";
            ctx.fillRect(i*size,j*size,size,size);
            ctx.beginPath();
            ctx.rect(i*size,j*size,size,size);
            ctx.strokeStyle="black";
            ctx.stroke();
        }
    }
}


