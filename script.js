var canvas=document.getElementById("playground");
var ctx=canvas.getContext("2d");

function drawGrid(){
    for(let i=0;i<=40;i++){
        ctx.moveTo(i*10,0);
        ctx.lineTo(i*10,400);
        ctx.stroke();
        ctx.moveTo(0,i*10);
        ctx.lineTo(400,i*10);
        ctx.stroke();
    }
}
drawGrid();

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}



var grid=new Array(40);

for (var i=0;i<grid.length;i++){
    grid[i]=new Array(40);
}

for(let i=0;i<40;i++){
    for(let j=0;j<40;j++){
        grid[i][j]=0;
    }
}

for(let i=0;i<200;i++){
    var x=getRandomInt(40);
    var y=getRandomInt(40);
    grid[x][y]=1;
}

function neighCount(x,y){
    var nbNeigh=0;
    if(x-1>0 && y-1>0 && grid[x-1][y-1]==1){
        nbNeigh++;
    }
    if(y-1>0 && grid[x][y-1]==1){
        nbNeigh++;
    }
    if(x+1<40 && y-1>0 && grid[x+1][y-1]==1){
        nbNeigh++;
    }
    if(x-1>0 && grid[x-1][y]==1){
        nbNeigh++;
    }
    if(x+1<40 && grid[x+1][y]==1){
        nbNeigh++;
    }
    if(x-1>0 && y+1<40 && grid[x-1][y+1]==1){
        nbNeigh++;
    }
    if(y+1<40 && grid[x][y+1]==1){
        nbNeigh++;
    }
    if(x+1<40 && y+1<40 && grid[x+1][y+1]==1){
        nbNeigh++;
    }
    return nbNeigh;
}

for(let i=0;i<40;i++){
    for(let j=0;j<40;j++){
        if(grid[i][j]==1){
            ctx.fillStyle="black";
            ctx.fillRect(i*10,j*10,10,10);
        }
    }
}
let iter=0;
function play(){
    iter+=1;
    console.log(iter);
    for(let i=0;i<40;i++){
        for(let j=0;j<40;j++){
                neighCount(i,j);
                if(grid[i][j]==1 && (neighCount(i,j)==2 || neighCount(i,j)==3) ){
                    grid[i][j]=1;
                }
                else if(grid[i][j]==0 && neighCount(i,j)==3){
                    grid[i][j]=1;
                }
                else{
                    grid[i][j]=0;
                }
            }
        }
    for(let i=0;i<40;i++){
        for(let j=0;j<40;j++){
            if(grid[i][j]==1){
                ctx.fillStyle="black";
                ctx.fillRect(i*10,j*10,10,10);
            }
            else{                
                ctx.fillStyle="white";
                ctx.fillRect(i*10,j*10,10,10);}
        }
    }
    drawGrid();
}


setInterval(play,10);