const playboard = document.getElementById('play-board');
const controle = document.querySelectorAll('.controle i')

let score = 0, recorde = 0
let foodX, foodY;
let snakeX = 5, snakeY= 10;
let snakeBody = []
let velocityX = 0, velocityY= 0;

const foodPosition = () =>{
foodX = Math.floor(Math.random() * 30) + 1;
foodY = Math.floor(Math.random() * 30) + 1;
}
const changeDirection = (e) =>{
switch(e.key){
    case "ArrowUp":
        velocityX = 0
        velocityY = -1
    break;
    case "ArrowDown":
        velocityX = 0
        velocityY = 1
    break;
    case "ArrowRight":
        velocityX = 1
        velocityY = 0
    break;
    case "ArrowLeft":
        velocityX = -1
        velocityY = 0
    break;
}
}

controle.forEach(key => {
    key.addEventListener('click', () => changeDirection({key: key.dataset.key}))
})
const initGame = ()=>{
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
   
pontuacao();
    
  
    snakeX +=velocityX;
    snakeY += velocityY;
   for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i-1]
    
   }
   snakeBody[0] = [snakeX, snakeY]
  
   
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30 ){
        snakeDead();
    }
    
    document.getElementById('high-score').innerHTML = `Recorde: ${recorde}`
    document.getElementById('score').innerHTML = `Pontuação: ${score}`

for(let i = 0; i < snakeBody.length; i++){
    //aumentando o tamanho da cobra
    htmlMarkup += `<div class="snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

    if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
     snakeDead();
    }
}
playboard.innerHTML = htmlMarkup;
}
function pontuacao(){
    if(snakeX === foodX && snakeY === foodY){
        foodPosition()
        snakeBody.push([foodX, foodY])
        score++;
    }
    bateuRecorde();
}
function bateuRecorde(){
    if(score > recorde){
        recorde = score
    }
}
function snakeDead(){
    snakeX = 5, snakeY= 10;
    snakeBody.length=1;
    snakeBody[0] = [snakeX, snakeY]
     velocityX = 0, velocityY= 0;
    
alert("você morreu")
    score = 0;
    initGame()
    foodPosition();
    
}
foodPosition();
setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);
