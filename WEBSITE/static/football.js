
let name
const player1=document.getElementById("player1");

document.getElementById("start").addEventListener("click",()=>{
    start_noise.play();
    playBackground_Music()
    timerplayer2=setInterval(move_player2,10);
    timerball=setInterval(move_ball,10);
    timerplayer1=setInterval(move_player1,10);
    document.getElementById("start").style.visibility="hidden";
    document.getElementById("INSTRUCTION").style.visibility="hidden";
    document.getElementById("ball").style.visibility="visible";
})

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
document.getElementById("ballImg").src="../static/football_images/trash/can"+(Math.floor(Math.random()*10+1))+"-removebg-preview.png";
const ball=document.getElementById("ball");
var ball_posn_x=39;
var ball_posn_y=38;
var ball_dir_x=0;
var ball_dir_y=0;
var ball_speed=0;
var timerball=null;
var points2=0;
var points1=0;
var current_rotation=0;
let game_settings=document.getElementById("game_settings")
let play_audio=document.getElementById("play_audio")
let stop_audio=document.getElementById("stop_audio")
let quit=document.getElementById("quit")
let reset2=document.getElementById("reset2")
game_settings.style.visibility="hidden"

const Background_Music = new Audio('../static/football_audio/crowd.mp3');
const Hit1 = new Audio('../static/football_audio/hit1.mp3');
const Hit2 = new Audio('../static/football_audio/hit2.mp3');
const Hit3 = new Audio('../static/football_audio/hit3.mp3');
const start_noise = new Audio('../static/football_audio/start.mp3');
const colide = new Audio("../static/football_audio/colide.mp3");
const run1 = new Audio("../static/football_audio/run.mp3");
const run2= new Audio("../static/football_audio/run.mp3");
const cheer= new Audio("../static/football_audio/cheer.m4a");
settings.addEventListener("click",()=>{
    if(game_settings.style.visibility=="hidden"){
        game_settings.style.visibility="visible"

    }
    else{
        game_settings.style.visibility="hidden";
    }
    
})
play_audio.addEventListener("click",()=>{
    colide.volume=1;
    Hit1.volume=1;
    Hit2.volume=1;
    Hit3.volume=1;
    Background_Music.volume=0.7;
    start_noise.volume=1;
    run1.volume=1;
    run2.volume=1;
    cheer.volume=1;
    

})
stop_audio.addEventListener("click",()=>{
    colide.volume=0;
    Hit1.volume=0;
    Hit2.volume=0;
    Hit3.volume=0;
    Background_Music.volume=0;
    start_noise.volume=0;
    run1.volume=0;
    run2.volume=0;
    cheer.volume=0;
})
reset2.addEventListener("click",()=>{
    window.location.reload();
})
quit.addEventListener("click",()=>{
    window.location.href = "/home";
})
function playBackground_Music() {
    Background_Music.play();
    Background_Music.volume=0.7
    Background_Music.loop = true;

}
function new_match(){
    clearInterval(timerplayer2);
    clearInterval(timerplayer1);
    clearInterval(timerball);
    cheer.play();
    cheer.volume=0.5;
    Background_Music.volume=1
    setTimeout(update_match,5000);

}
function update_match(){
    Background_Music.volume=0.7
    document.getElementById("ballImg").src="../static/football_images/trash/can"+(Math.floor(Math.random()*10+1))+"-removebg-preview.png";
    current_rotation=0
    document.getElementById("ballImg").style.rotate=(current_rotation)+"deg";
    start_noise.play();
    timerplayer2=setInterval(move_player2,10);
    timerball=setInterval(move_ball,10);
    timerplayer1=setInterval(move_player1,10);
    rotation_player1=0;
    ball.style.visibility="visible";
    x1=32;
    y1=38;
    speed1=0;
    move1=false;
    rotation_player2=180;
    x2=46.2;
    y2=38;
    speed2=0;
    move2=false;
    ball_posn_x=39;
    ball_posn_y=38;
    ball_dir_x=0;
    ball_dir_y=0;
    ball_speed=0;
    player1.style.top=y1+"vh";
    player1.style.left=x1+"vw";
    player2.style.top=y2+"vh";
    player2.style.left=x2+"vw";

}


document.addEventListener("keydown",(value)=>{
    console.log(value.key)
    if(value.key=="a"){
        run1.play();
        move1=true;

    }
    if(value.key=="l"){
        run2.play();
        move2=true;

    }
    
})
document.addEventListener("keyup",(value)=>{
    if(value.key=="a"){
        run1.pause();
        move1=false;

    }
    if(value.key=="l"){
        run2.pause();
        move2=false;

    }
    
})

function move_player1(){
    if(move1){
        
        speed1+=0.007;
        speed1=Math.min(2.6,speed1);

        x1+=speed1*Math.cos(rotation_player1*Math.PI/180);
        y1+=speed1*Math.sin(rotation_player1*Math.PI/180);
        if(Math.abs(x1-x2)<2 && Math.abs(y1-y2)<2){
            speed1=-0.3
            colide.play();
        }
        if(x1<0){
            speed1=-Math.max(Math.min(0.3,speed1),0.1);
            x1=0;
            //colide.play();
            /* rotation_player1+=10;
            player1.style.transform="rotate("+rotation_player1+"deg)"; */

        }
        else if(x1>78){
            speed1=-Math.max(Math.min(0.3,speed1),0.1);
            x1=78;
            colide.play();
            /* rotation_player1+=10;
            player1.style.transform="rotate("+rotation_player1+"deg)"; */
        }
        if(y1<0){
            speed1=-Math.max(Math.min(0.3,speed1),0.1);
            y1=0;
            colide.play();
            /* rotation_player1+=10;
            player1.style.transform="rotate("+rotation_player1+"deg)"; */

        }
        else if(y1>76){
            speed1=-Math.max(Math.min(0.3,speed1),0.1);
            y1=76;
            colide.play();
            /* rotation_player1+=10;
            player1.style.transform="rotate("+rotation_player1+"deg)"; */
        }
        player1.style.top=y1+"vh";
        player1.style.left=x1+"vw";





    }
    else{
        speed1=0
        rotation_player1+=1.5;

        player1.style.transform="rotate("+rotation_player1+"deg)";

    }
}
function move_player2(){
    if(move2){
        speed2+=0.007;
        speed2=Math.min(2.6,speed2);

        x2+=speed2*Math.cos(rotation_player2*Math.PI/180);
        y2+=speed2*Math.sin(rotation_player2*Math.PI/180);
        if(Math.abs(x1-x2)<2 && Math.abs(y1-y2)<2){
            speed2=-0.3;
            colide.play();
        }
        if(x2<0){
            speed2=-Math.max(Math.min(0.3,speed2),0.1);
            x2=0;
            //rotation_player2+=10;
            colide.play();
            /* player2.style.transform="rotate("+rotation_player2+"deg)"; */

        }
        else if(x2>78){
            speed2=-Math.max(Math.min(0.3,speed2),0.1);
            x2=78;
            //rotation_player2+=10;
            colide.play();
            //player2.style.transform="rotate("+rotation_player2+"deg)";
        }
        if(y2<0){
            speed2=-Math.max(Math.min(0.3,speed2),0.1);
            y2=0;
            //rotation_player2+=10;
            colide.play();
            //player2.style.transform="rotate("+rotation_player2+"deg)";

        }
        else if(y2>76){
            speed2=-Math.max(Math.min(0.3,speed2),0.1);
            y2=76;
            //rotation_player2+=10;
            colide.play();
            //player2.style.transform="rotate("+rotation_player2+"deg)";
        }
        player2.style.top=y2+"vh";
        player2.style.left=x2+"vw";





    }
    else{
        speed2=0
        rotation_player2+=1.5;

        player2.style.transform="rotate("+rotation_player2+"deg)";

    }
}
function move_ball(){
    collision();
    ball_speed-=0.007;
    ball_speed=Math.max(ball_speed,0);
    let temp_ball_posn_x=ball_posn_x;
    let temp_ball_posn_y=ball_posn_y;
    ball_posn_x+=(ball_dir_x)*ball_speed;
    ball_posn_y+=(ball_dir_y)*ball_speed;
    if(ball_posn_x<-4){
        points1+=1;
        ball_speed=0;
        document.getElementById("points1").innerHTML=points1;
        new_match();
        colide.play();
        //ball_posn_x=-5;
        ball_dir_x=-ball_dir_x;
    }
    else if(ball_posn_x<=0){
        if(ball_posn_y<25){
            ball_posn_x=0;
            ball_speed-=0.01;
            ball_dir_x=-ball_dir_x;
            colide.play();
        }
        else if(ball_posn_y>55){
            ball_posn_x=0;
            ball_speed-=0.01;
            ball_dir_x=-ball_dir_x;
            colide.play();
        }
        else{
            points1+=1;
            ball_speed=0;
            document.getElementById("points1").innerHTML=points1;
            ball_posn_x=39;
            ball_posn_y=38;
            ball.style.visibility="hidden";
            new_match();

        }
        
    }
    else if(ball_posn_x>=76){
        if(ball_posn_y<25){
            ball_posn_x=76;
            ball_speed-=0.01;
            

            ball_dir_x=-ball_dir_x;
            colide.play();
        }
        else if(ball_posn_y>51){
            ball_posn_x=76;
            ball_speed-=0.01;

            ball_dir_x=-ball_dir_x;
            colide.play();
        }
        else{
            points1+=1;
            ball_speed=0;
            document.getElementById("points2").innerHTML=points2;
            new_match();
            ball_posn_x=39;
            ball_posn_y=38;
            ball.style.visibility="hidden";
        }
        
    }
    else{
        if(ball_posn_y<=0){
            ball_posn_y=0;
            ball_speed-=0.01;
    
            ball_dir_y=-ball_dir_y;
            colide.play();
        }
        else if(ball_posn_y>=76){
            ball_posn_y=76;
            ball_speed-=0.01;
    
            ball_dir_y=-ball_dir_y;
            colide.play();
        }
    }
    
    



    /* if(ball_posn_y<=0){
        ball_posn_y=0;
        ball_speed-=0.01;

        ball_dir_y=-ball_dir_y;
        colide.play();
    }
    else if(ball_posn_y<=25){
        if(ball_posn_x<0){
            ball_posn_y=25;
            ball_speed-=0.01;

            ball_dir_y=-ball_dir_y;
            colide.play();
        }
        if(ball_posn_x>=80){
            ball_posn_y=25;
            ball_speed-=0.01;

            ball_dir_y=-ball_dir_y;
            colide.play();
        }
        
        

    }
    
    else if(ball_posn_y>=55){
        if(ball_posn_x<=0){
            ball_posn_y=55;
            ball_speed-=0.01;

            ball_dir_y=-ball_dir_y;
            colide.play();
        }
        if(ball_posn_x>=80){
            ball_posn_y=55;
            ball_speed-=0.01;

            ball_dir_y=-ball_dir_y;
            colide.play();
        }
    }  */
    if(ball_posn_x!=temp_ball_posn_x || ball_posn_y!=temp_ball_posn_y){
        current_rotation+=10*ball_speed;
        document.getElementById("ballImg").style.rotate=(current_rotation)+"deg";
    }
    ball.style.top=ball_posn_y+"vh";
    ball.style.left=ball_posn_x+"vw";

}
function collision(){
    if(ball_speed<1){
        if(Math.abs(x1-ball_posn_x)<2 && Math.abs(y1-ball_posn_y)<2){
            ball_speed=2*speed1;
            
            speed1=-Math.min(0.1,1);
            ball_speed=Math.max(1,ball_speed)
            let p=Math.floor(Math.random()*3)
            if(p==0){
                Hit1.play();
            }
            else if(p==1){
                Hit2.play();
            }
            else{
                Hit3.play();
            }
            ball_dir_x=Math.cos(rotation_player1*Math.PI/180);
            ball_dir_y=Math.sin(rotation_player1*Math.PI/180);
        }
        else if(Math.abs(x2-ball_posn_x)<2 && Math.abs(y2-ball_posn_y)<2){
            ball_speed=2*speed2;
            speed2=-Math.min(0.1,1);
            ball_speed=Math.max(1,ball_speed)
            ball_dir_x=Math.cos(rotation_player2*Math.PI/180);
            ball_dir_y=Math.sin(rotation_player2*Math.PI/180);
            let p=Math.floor(Math.random()*3)
            if(p==0){
                Hit1.play();
            }
            else if(p==1){
                Hit2.play();
            }
            else{
                Hit3.play();
            }
        }
    }
    else{
        if(Math.abs(x1-ball_posn_x)<2 && Math.abs(y1-ball_posn_y)<2){
            ball_speed=max(2,ball_speed);
            
            speed1=-Math.min(0.1,1);
            
            ball_dir_x=Math.cos(rotation_player1*Math.PI/180);
            ball_dir_y=Math.sin(rotation_player1*Math.PI/180);
            let p=Math.floor(Math.random()*3)
            if(p==0){
                Hit1.play();
            }
            else if(p==1){
                Hit2.play();
            }
            else{
                Hit3.play();
            }
        }
        else if(Math.abs(x2-ball_posn_x)<2 && Math.abs(y2-ball_posn_y)<2){
            ball_speed=max(2,ball_speed);
            speed2=-Math.min(0.1,1);
            ball_dir_x=(Math.cos(rotation_player2*Math.PI/180)-ball_dir_x)/2;
            ball_dir_y=(Math.sin(rotation_player2*Math.PI/180)-ball_dir_y)/2;
            let p=Math.floor(Math.random()*3)
            if(p==0){
                Hit1.play();
            }
            else if(p==1){
                Hit2.play();
            }
            else{
                Hit3.play();
            }
        }
    }
}



