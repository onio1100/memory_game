const main = document.getElementById("all");
const letters = ["👩","👨","🧑","👧","👳‍♂️","🎅","👼","👲","🤴","👴","👵","🧔","👨‍🍳","🧛‍♂️","👰","👨‍💻"];
let x = false;
let y = false;
let score,target;
let runing = true;
let comperd = false;
function showCard (e) {
    if(!runing){
        const element = e.target;
    if(element.className.includes('card') && !element.className.includes("card-on")){
        runing = true;
        element.classList.add("card-on");
        element.firstChild.classList.add("letter-on");
        x == false? x = element : y = element;
    }
    }
};

function comperCards() {
    if(y != false && comperd == false){
        if(x.firstChild.innerHTML == y.firstChild.innerHTML){
                x.parentElement.classList.add("disapear");
                y.parentElement.classList.add("disapear");  
                score += 2;
                comperd = true;
        } else {
            setTimeout(() => {
                x.classList.remove("card-on");
                x.firstChild.classList.remove("letter-on");
                y.classList.remove("card-on");
                y.firstChild.classList.remove("letter-on");
                comperd = true;
            }, 300);
        }
    }else {
        if(target == score){
            main.className = "all end-screen";
            main.innerHTML = `<p class="win-p">You win</p><div id="again-button" class="again-button"><i class="fa-solid fa-arrow-rotate-left"></i></div>`;
            document.getElementById("again-button").addEventListener("click",() => location.reload(false))
        }else {
            if(comperd){
                comperd = false;
                x = false;
                y = false;
                runing = false;
            }else {
                runing = false;
            }
        }
    }
};


function addEvents () {
    document.addEventListener("click",(event) => showCard(event),true);
    document.addEventListener("transitionend",() => comperCards(),false);
};

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function makeBord(size) {
    target = size;
    score = 0;
    let newArr = [];
    switch (size) {
        case 4:
            main.classList.add("small");
            newArr = letters.slice(0,2);
            newArr.push(...newArr);
            break;
        case 8:
            main.classList.add("medium");
            newArr = letters.slice(0,4);
            newArr.push(...newArr);
            break;
        case 16:
            main.classList.add("big");
            newArr = letters.slice(0,8);
            newArr.push(...newArr);
            break;
        case 32:
            main.classList.add("huge");
            newArr = letters.slice(0,16);
            newArr.push(...newArr);
            break;
        default:
            break;
    }
    let board = "";
    let x;
    for(let i = 0;i < size;i++){
        x = random(0,newArr.length - 1);
        board += `<div class="holder" id="holder${i}">
        <div class="card" id="card${i}"><p class="letter" id="letter${i}">${newArr[x]}</p></div>
    </div>`;
    newArr.splice(x,1);
    }
    main.innerHTML = board;
    addEvents();
    setTimeout(() => runing = false, 1);
};

document.getElementById("small").addEventListener("click",() => {makeBord(4)},false);
document.getElementById("medium").addEventListener("click",() => {makeBord(8)},false);
document.getElementById("big").addEventListener("click",() => {makeBord(16)},false);
document.getElementById("huge").addEventListener("click",() => {makeBord(32)},false);
