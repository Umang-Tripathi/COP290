const player1=document.getElementById("player1");

timerplayer2=setInterval(move_player2,10);

timerplayer1=setInterval(move_player1,10);
  
var rotation_player1=0;
var x1=32;
var y1=38;
var speed1=0;
var move1=false;
var timerplayer1=null;
const player2=document.getElementById("player2");
var rotation_player2=180;
var x2=46.2;
var y2=38;
var speed2=0;
var move2=false;
var timerplayer2=null;



document.addEventListener("keydown",(value)=>{
    if(value.key=="a"){

        move1=true;

    }
    if(value.key=="l"){

        move2=true;

    }
    
})
document.addEventListener("keyup",(value)=>{
    if(value.key=="a"){

        move1=false;

    }
    if(value.key=="l"){

        move2=false;

    }
    
})

function move_player1(){
    if(move1){
        speed1+=0.005;
        if(speed1>4){
            speed1=4
        }

        x1+=speed1*Math.cos(rotation_player1*Math.PI/180);
        y1+=speed1*Math.sin(rotation_player1*Math.PI/180);
        if(x1<0){
            speed1=-Math.min(0.3,speed1);
            x1=0;
            rotation_player1+=10;
            player1.style.transform="rotate("+rotation_player1+"deg)";

        }
        else if(x1>78){
            speed1=-Math.min(0.3,speed1);
            x1=78;
            rotation_player1+=10;
            player1.style.transform="rotate("+rotation_player1+"deg)";
        }
        if(y1<0){
            speed1=-Math.min(0.3,speed1);
            y1=0;
            rotation_player1+=10;
            player1.style.transform="rotate("+rotation_player1+"deg)";

        }
        else if(y1>76){
            speed1=-Math.min(0.3,speed1)
            y1=76;
            rotation_player1+=10;
            player1.style.transform="rotate("+rotation_player1+"deg)";
        }
        player1.style.top=y1+"vh";
        player1.style.left=x1+"vw";





    }
    else{
        speed1=0
        rotation_player1+=1;

        player1.style.transform="rotate("+rotation_player1+"deg)";

    }
}
function move_player2(){
    if(move2){
        speed2+=0.005;
        if(speed2>4){
            speed2=4
        }

        x2+=speed2*Math.cos(rotation_player2*Math.PI/180);
        y2+=speed2*Math.sin(rotation_player2*Math.PI/180);
        if(x2<0){
            speed2=-Math.min(0.3,speed2);
            x2=0;
            rotation_player2+=10;
            player2.style.transform="rotate("+rotation_player2+"deg)";

        }
        else if(x2>78){
            speed2=-Math.min(0.3,speed2);
            x2=78;
            rotation_player2+=10;
            player2.style.transform="rotate("+rotation_player2+"deg)";
        }
        if(y2<0){
            speed2=-Math.min(0.3,speed2);
            y2=0;
            rotation_player2+=10;
            player2.style.transform="rotate("+rotation_player2+"deg)";

        }
        else if(y2>76){
            speed2=-Math.min(0.3,speed2)
            y2=76;
            rotation_player2+=10;
            player2.style.transform="rotate("+rotation_player2+"deg)";
        }
        player2.style.top=y2+"vh";
        player2.style.left=x2+"vw";





    }
    else{
        speed2=0
        rotation_player2+=1;

        player2.style.transform="rotate("+rotation_player2+"deg)";

    }
}
