const hero=document.getElementById("hero");
const trash_container=document.getElementById("trash");
var w=false;
var a=false;
var s=false;
var d=false;
var trash=[];
var width = window.innerWidth;
var height = window.innerHeight;
var hero_y=100;
var hero_x=300;
var is_hero_holding=false;
/* var trash_number=0;
var trash_posn_x=width/2-10;
var trash_posn_y=height/2-10;
var trash_dir_x=1;
var trash_dir_y=1;
var trash_speed=0; */


//var trash_holded=true;
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
    for(let i=0;i<trash.length;i++){
        if(trash[i].holded){
            mousePos = { x: event.clientX, y: event.clientY };
            let dx=mousePos.x-trash[i].posn_x;
            let dy=mousePos.y-trash[i].posn_y;
            trash[i].dir_x=(dx/Math.sqrt(dx*dx+dy*dy));
            trash[i].dir_y=(dy/Math.sqrt(dx*dx+dy*dy));
            trash[i].speed=(Math.sqrt(dx*dx+dy*dy)/500)*10+10;;
            if(trash[i].speed>20){
                trash[i].speed=20
            }
            trash[i].holded=false;
            is_hero_holding=false;
        }
    }
    
});

timerID=setInterval(update_game,10);
var time_left_for_new_trash=500;
var number_of_trashes=0;
function update_game(){
    time_left_for_new_trash-=1;
    if(time_left_for_new_trash==0 && number_of_trashes<10){
        number_of_trashes+=1;
        var new_trash_id=number_of_trashes+"trash";
        
        
        let m=document.createElement("div");
        m.style.position="absolute";
        m.style.height="20px";
        m.style.width="20px";
        let xx=Math.floor(Math.random()*width);
        let yy=Math.floor(Math.random()*height);
        console.log(xx,yy);
        while(xx>hero_x-80 && xx<hero_x+80 && yy>hero_y-80 && yy<hero_y+80){
            //console.log(xx,yy)
            xx=Math.floor(Math.random()*width);
            yy=Math.floor(Math.random()*height);
        }

        m.style.top=yy+"px";
        m.style.left=xx+"px";
        m.style.border="1px solid";
        m.style.borderColor="red";
        m.style.userSelect="none";
        m.id=new_trash_id;

        var temp_trash= {posn_x : xx , posn_y : yy,trash_id :new_trash_id,dir_x:1,dir_y:1,speed:0,type:1,holded:false}
        
        trash.push(temp_trash);
        trash_container.appendChild(m);
        time_left_for_new_trash=Math.floor((Math.random()*100)+500)

    }
    else if(time_left_for_new_trash==0){
        time_left_for_new_trash=Math.floor((Math.random()*100)+500)w
    }
    
    update_position_of_hero()
    update_trash_posn()
}
function update_trash_posn(){
    for(let i=0;i<trash.length;i++){
        if(trash[i].holded){
            move_trash_with_player(i)
            return;
        }
        else{
            move_trash(i);
        }
    }
}
function move_trash(i){
    
    trash[i].speed-=0.1;
    trash[i].speed=Math.max(trash[i].speed,0);
    trash[i].posn_x+=(trash[i].dir_x)*trash[i].speed;
    trash[i].posn_y+=(trash[i].dir_y)*trash[i].speed;
    if(trash[i].posn_x<0){
        trash[i].posn_x=0;
        trash[i].dir_x=-trash[i].dir_x;
    }
    if(trash[i].posn_x>width){
        trash[i].posn_x=width;
        trash[i].dir_x=-trash[i].dir_x;
    }
    if(trash[i].posn_y<0){
        trash[i].posn_y=0;
        trash[i].dir_y=-trash[i].dir_y;
    }
    if(trash[i].posn_y>height){
        trash[i].posn_y=height;
        trash[i].dir_y=-trash[i].dir_y;
    }
    
    
    let tetrash=document.getElementById(trash[i].trash_id);
    
    tetrash.style.top=trash[i].posn_y+"px";
    tetrash.style.left=trash[i].posn_x+"px";

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
    if(!is_hero_holding){
        for(let i=0;i<trash.length;i++){
            if(Math.abs(trash[i].posn_x-hero_x)<20 && Math.abs(trash[i].posn_y-hero_y)<20 && trash[i].speed<1){
                trash[i].holded=true;
                is_hero_holding=true;
                break;
            }
        }
        
    }
    
    hero.style.top=hero_y+'px';
    hero.style.left=hero_x+'px';
    
}
function move_trash_with_player(i){
    
    trash[i].posn_y=hero_y-50;
    trash[i].posn_x=hero_x;
    let tetrash=document.getElementById(trash[i].trash_id);
    tetrash.style.top=trash[i].posn_y+"px";
    tetrash.style.left=trash[i].posn_x+"px";
}