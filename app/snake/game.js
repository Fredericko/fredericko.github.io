import snake from "./snake.js";     
import apple from "./apple.js";

let screen = document.getElementById("screen");
let ctx = screen.getContext("2d");

let scale = 20;
let appl;
let snk = new snake();
let score = 0;
let isDefeated = false;
let fps = 15;
let now = 30;
let then = Date.now();
let delta;
const interval = 1000/fps;
let isAllowedMove;

initGame();
renderScreen();
addFruit();


function initGame(){
    scale = 20;
    appl = new apple();
    snk = new snake();
    score = 0;
    isDefeated = false;
    isAllowedMove = false;
    fps = 15;
    now = 30;
    then = Date.now();
}


function renderScreen(){
    now = Date.now();
    delta = now - then;
    if (delta > interval) {
        if(checkCollision()){
            ctx.fillStyle = "black";
            ctx.font = "20px Verdana";
            ctx.fillText("Pontuação: "+score, screen.width/4, screen.height/3);  
            ctx.fillText("Aperte qualquer tecla", screen.width/4, screen.height/2);  
            ctx.fillText("para jogar novamente", screen.width/4, (screen.height/2) +30);
            isDefeated = true;
            snk.resetTail();
            cancelAnimationFrame(renderScreen);
        }else{
            then = now - (delta % interval);
            ctx.fillStyle = "gray";
            ctx.fillRect(0, 0, screen.width, screen.height);
            
            for(let i = snk.getTail().length - 1; i > 0; i--){
                if(snk.getTail()[i-1] != undefined){
                    snk.getTail()[i] = {x: snk.getTail()[i-1].x, y: snk.getTail()[i-1].y};
                }
            }

            switch(snk.direction){
                case "Up":
                    if(snk.getHead().y > 0){
                        snk.getHead().y -= scale;
                        isAllowedMove = !isAllowedMove;
                    }else{
                        snk.getHead().y = screen.height - scale;
                    }
                    isAllowedMove = !isAllowedMove;
                break;
                case "Down":
                    if(snk.getHead().y + scale < screen.height){
                        snk.getHead().y += scale;
                        isAllowedMove = !isAllowedMove;
                    }else{
                        snk.getHead().y = 0;
                        isAllowedMove = !isAllowedMove;
                    }
                break;
                case "Right":
                    if(snk.getHead().x + scale < screen.width){
                        snk.getHead().x += scale;
                    }else{
                        snk.getHead().x = 0;
                    }
                break;
                case "Left":
                    if(snk.getHead().x > 0){
                        snk.getHead().x -= scale;
                    }else{
                        snk.getHead().x = screen.width - scale;
                    }
                break;
            }

            
            if(snk.getHead().x == appl.x && snk.getHead().y == appl.y){
                while(snk.searchTail(appl)){
                    addFruit();
                }
                snk.addTail();
                score += 10;
            }

            for(let i = 0; i <= snk.getTail().length-1; i++){
                let segment = snk.getTail()[i];
                ctx.fillStyle = "red";
                ctx.fillRect(appl.x, appl.y, scale, scale);
                ctx.fillStyle = "black";
                ctx.font = "20px Verdana";
                ctx.fillText(score, 350, 30);
                ctx.fillStyle = "#264736";
                if(i == 0){
                    ctx.fillStyle = "#0E3320";  
                }
                ctx.fillRect(segment.x, segment.y, scale, scale);
            }
        }
    }
    if(!isDefeated){
        requestAnimationFrame(renderScreen);
    }
}

document.addEventListener("keydown", keyHandler);

function keyHandler(e){
    if(e.key === "ArrowUp" && snk.direction != "Down"){
        snk.direction = e.key.replace("Arrow","");
    }
    if(e.key === "ArrowDown" && snk.direction != "Up"){
        snk.direction = e.key.replace("Arrow","");
    }
    if(e.key === "ArrowRight" && snk.direction != "Left"){
        snk.direction = e.key.replace("Arrow","");
    }
    if(e.key === "ArrowLeft" && snk.direction != "Right"){
        snk.direction = e.key.replace("Arrow","");
    }
    if(isDefeated){
        initGame();
        renderScreen();
    }
}

function addFruit(){
    appl.x = getRndInteger(0, screen.width-scale) 
    appl.y = getRndInteger(0, screen.height-scale);
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (((max - min)/scale)+1)) * scale + min;
}

function checkCollision(){
    for(let i = 1; i < snk.getTail().length-1; i++){
        if((snk.getHead().x == snk.getTail()[i].x) && (snk.getHead().y == snk.getTail()[i].y)){
            return true;
        }
    }
    return false;
}