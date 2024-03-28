let boxes= document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");

let count=0;

let winPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

let turnO=true;

boxes.forEach(function(box){
      box.addEventListener("click",function(){
        const tap= new Audio("sounds/tap.mp3");
        if(turnO)
        {
            box.innerText="O";
            tap.play();
            turnO=false;
            box.style.color="#780000";
        }
        else
        {
            box.innerText="X";
            box.style.color="black";
            tap.play();
            turnO=true;
        }
        count++;
        box.disabled=true;
        let isWinner = checkWinner();
        if(count===9 && !isWinner)
        {
            gameDraw();
        }
      })
});

function checkWinner()
{
    for(let pattern of winPattern)
    {
        let position1=boxes[pattern[0]].innerText;
        let position2=boxes[pattern[1]].innerText;
        let position3=boxes[pattern[2]].innerText;

       if(position1!==""&& position2 !== "" && position3 !== "")
       {
        if((position1===position2)&&(position2===position3))
        {
          
             showWinner(position1);
             return true;
        }
       }
    }
}

function showWinner(win)
{
    const winner = new Audio("sounds/winner.mp3");
    document.getElementById("display").innerText=`${win} is winner!!!`;
    
    winner.play();
    disableBoxes();
    
}

function disableBoxes()
{
    for(var box of boxes)
    {
        box.disabled=true;
        
    }
    
}

function enableBoxes()
{
    for(var box of boxes)
    {
        box.disabled=false;
        box.innerText="";
        
    }
    
}

function gameDraw()
{
    let draw = new Audio("sounds/draw.mp3");
    document.getElementById("display").innerText="It's a draw!!!";
    draw.play();
    disableBoxes();
}

function gameReset()
{
    turnO=true;
    count=0;
    enableBoxes();
}

resetBtn.addEventListener("click",gameReset);

