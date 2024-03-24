const hero=document.getElementById("hero")
const trash=document.getElementById("trash")
var w=false;
var a=false;
var s=false;
var d=false;
var width = window.innerWidth;
var height = window.innerHeight;
var hero_y=100;
var hero_x=300;
var trash_posn_x=width/2-10;
var trash_posn_y=height/2-10;
var trash_dir_x=1;
var trash_dir_y=1;
var trash_speed=0;


var trash_holded=true;
//console.log(width,height)
document.addEventListener('keydown', (event) => {
    if(event.key=='w'){
        w=true;
    }
    else if(event.key=='a'){
        a=true;
    }
    else if(event.key=='s'){
        s=true;
    }
    else if(event.key=='d'){
        d=true;
    }
   
});
document.addEventListener('keyup', (event) => {
    if(event.key=='w'){
        w=false;
    }
    else if(event.key=='a'){
        a=false;
    }
    else if(event.key=='s'){
        s=false;
    }
    else if(event.key=='d'){
        d=false;
    }
    
});
window.addEventListener("click", (event) => {
    if(trash_holded){
        mousePos = { x: event.clientX, y: event.clientY };
        let dx=mousePos.x-trash_posn_x;
        let dy=mousePos.y-trash_posn_y;
        trash_dir_x=(dx/Math.sqrt(dx*dx+dy*dy));
        trash_dir_y=(dy/Math.sqrt(dx*dx+dy*dy));
        trash_speed=(Math.sqrt(dx*dx+dy*dy)/440)*10;;
        trash_holded=false;
    }
});

timerID=setInterval(update_game,10);
function update_game(){
    update_position_of_hero()
    update_trash_posn()
}
function update_trash_posn(){
    if(trash_holded){
        move_trash_with_player()
        return;
    }
    else{
        move_trash();
    }
}
function move_trash(){
    
    trash_speed-=0.1;
    trash_speed=Math.max(trash_speed,0);
    trash_posn_x+=(trash_dir_x)*trash_speed;
    trash_posn_y+=(trash_dir_y)*trash_speed;
    if(trash_posn_x<0){
        trash_posn_x=0;
        trash_dir_x=-trash_dir_x;
    }
    if(trash_posn_x>width){
        trash_posn_x=width;
        trash_dir_x=-trash_dir_x;
    }
    if(trash_posn_y<0){
        trash_posn_y=0;
        trash_dir_y=-trash_dir_y;
    }
    if(trash_posn_y>height){
        trash_posn_y=height;
        trash_dir_y=-trash_dir_y;
    }
    
    
    
    trash.style.top=trash_posn_y+"px";
    trash.style.left=trash_posn_x+"px";

}
function update_position_of_hero(){
    //console.log(w,a,s,d)
    if( w && a ){

        document.getElementById("hero_wd").style.visibility="hidden";
        document.getElementById("hero_as").style.visibility="hidden";
        document.getElementById("hero_sd").style.visibility="hidden";
        document.getElementById("hero_aw").style.visibility="visible";
        document.getElementById("hero_w").style.visibility="hidden";
        document.getElementById("hero_a").style.visibility="hidden";
        document.getElementById("hero_s").style.visibility="hidden";
        document.getElementById("hero_d").style.visibility="hidden";
        hero_y-=2;
        hero_x-=2;
    }
    else if( s && a ){
        document.getElementById("hero_wd").style.visibility="hidden";
        document.getElementById("hero_as").style.visibility="visible";
        document.getElementById("hero_sd").style.visibility="hidden";
        document.getElementById("hero_aw").style.visibility="hidden";
        document.getElementById("hero_w").style.visibility="hidden";
        document.getElementById("hero_a").style.visibility="hidden";
        document.getElementById("hero_s").style.visibility="hidden";
        document.getElementById("hero_d").style.visibility="hidden";
        hero_y+=2;
        hero_x-=2;
    }
    else if( w && d ){
        document.getElementById("hero_wd").style.visibility="visible";
        document.getElementById("hero_as").style.visibility="hidden";
        document.getElementById("hero_sd").style.visibility="hidden";
        document.getElementById("hero_aw").style.visibility="hidden";
        document.getElementById("hero_w").style.visibility="hidden";
        document.getElementById("hero_a").style.visibility="hidden";
        document.getElementById("hero_s").style.visibility="hidden";
        document.getElementById("hero_d").style.visibility="hidden";
        hero_y-=2;
        hero_x+=2;


    }
    else if( s && d){
        document.getElementById("hero_wd").style.visibility="hidden";
        document.getElementById("hero_as").style.visibility="hidden";
        document.getElementById("hero_sd").style.visibility="visible";
        document.getElementById("hero_aw").style.visibility="hidden";
        document.getElementById("hero_w").style.visibility="hidden";
        document.getElementById("hero_a").style.visibility="hidden";
        document.getElementById("hero_s").style.visibility="hidden";
        document.getElementById("hero_d").style.visibility="hidden";
        hero_y+=2;
        hero_x+=2;
    }

    else if(w && !a && !s && !d ){
        document.getElementById("hero_wd").style.visibility="hidden";
        document.getElementById("hero_as").style.visibility="hidden";
        document.getElementById("hero_sd").style.visibility="hidden";
        document.getElementById("hero_aw").style.visibility="hidden";
        document.getElementById("hero_w").style.visibility="visible";
        document.getElementById("hero_a").style.visibility="hidden";
        document.getElementById("hero_s").style.visibility="hidden";
        document.getElementById("hero_d").style.visibility="hidden";
        hero_y-=2;
         
    }
    else if(!w && a && !s && !d){
        document.getElementById("hero_wd").style.visibility="hidden";
        document.getElementById("hero_as").style.visibility="hidden";
        document.getElementById("hero_sd").style.visibility="hidden";
        document.getElementById("hero_aw").style.visibility="hidden";
        document.getElementById("hero_w").style.visibility="hidden";
        document.getElementById("hero_a").style.visibility="visible";
        document.getElementById("hero_s").style.visibility="hidden";
        document.getElementById("hero_d").style.visibility="hidden";
        hero_x-=2;

    }
    else if(!w && !a && !s && d){
        document.getElementById("hero_wd").style.visibility="hidden";
        document.getElementById("hero_as").style.visibility="hidden";
        document.getElementById("hero_sd").style.visibility="hidden";
        document.getElementById("hero_aw").style.visibility="hidden";
        document.getElementById("hero_w").style.visibility="hidden";
        document.getElementById("hero_a").style.visibility="hidden";
        document.getElementById("hero_s").style.visibility="hidden";
        document.getElementById("hero_d").style.visibility="visible";
        hero_x+=2;
        
    }
    else if(!w && !a && s && !d){
        document.getElementById("hero_wd").style.visibility="hidden";
        document.getElementById("hero_as").style.visibility="hidden";
        document.getElementById("hero_sd").style.visibility="hidden";
        document.getElementById("hero_aw").style.visibility="hidden";
        document.getElementById("hero_w").style.visibility="hidden";
        document.getElementById("hero_a").style.visibility="hidden";
        document.getElementById("hero_s").style.visibility="visible";
        document.getElementById("hero_d").style.visibility="hidden";
        hero_y+=2;

    }

    if(Math.abs(trash_posn_x-hero_x)<20 && Math.abs(trash_posn_y-hero_y)<20 && trash_speed<1){
        trash_holded=true;
    }
    hero.style.top=hero_y+'px';
    hero.style.left=hero_x+'px';
    
}
function move_trash_with_player(){
    trash_posn_y=hero_y-50;
    trash_posn_x=hero_x;
    trash.style.top=trash_posn_y+"px";
    trash.style.left=trash_posn_x+"px";
}