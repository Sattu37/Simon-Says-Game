let gameSeq = [];
let userSeq = [];
let buttons = ["red","yellow","green","purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("Game is started")
        started = true;
        levelUp();
    }
});

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let idx = Math.floor(Math.random() * 3);
    let color = buttons[idx];
    let randBtn = document.querySelector(`.${color}`);
    gameSeq.push(color);

    btnFlash(randBtn);
}

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250);
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkSeq(userSeq.length-1);
}

let allButtons = document.querySelectorAll(".btn");
for(btn of allButtons){
    btn.addEventListener("click",btnPress); 
}

function checkSeq(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        h2.innerHTML = `Game Over ! Your Score Was <b>${level}</b><br> Press Any Key To Restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },200);
        reset();
    }
}

function reset(){
    userSeq = [];
    gameSeq = [];
    level = 0;
    started = false;
}