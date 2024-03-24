const hero=document.getElementById("hero");
const trash_container=document.getElementById("trash");
const monsters_container=document.getElementById("monsters");
var w=false;
var a=false;
var s=false;
var d=false;
var trash=[];
var monster=[];

var width = window.innerWidth;
var height = window.innerHeight;
var hero_y=100;
var hero_x=300;
var is_hero_holding=false;

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
var time_left_for_new_monsters=500;
var number_of_trashes=0;
var number_of_monsters=0;

function update_game(){
    time_left_for_new_trash-=1;
    time_left_for_new_monsters-=1;

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
        time_left_for_new_trash=Math.floor((Math.random()*100)+500);

    }
    else if(time_left_for_new_trash==0){
        time_left_for_new_trash=Math.floor((Math.random()*100)+500);
    }
    if(time_left_for_new_monsters==0 && number_of_monsters<10){
        number_of_monsters+=1;
        var new_monsters_id=number_of_monsters+"monster";
        
        
        let m=document.createElement("div");
        m.style.position="absolute";
        m.style.height="40px";
        m.style.width="40px";
        let xx=0;
        let yy=0;
        if(Math.random()>0.5){
            if(Math.random()>0.5){
                xx=Math.floor(Math.random()*width);;
                yy=-(Math.floor(Math.random()*100));;
            }
            else{
                xx=Math.floor(Math.random()*width);;
                yy=height+(Math.floor(Math.random()*100));;
            }
        }
        else{
            if(Math.random()>0.5){
                yy=Math.floor(Math.random()*height);;
                xx=-(Math.floor(Math.random()*100));;
            }
            else{
                yy=Math.floor(Math.random()*height);;
                xx=width+(Math.floor(Math.random()*100));;
            }

        }
        
        console.log(xx,yy);
        

        m.style.top=yy+"px";
        m.style.left=xx+"px";
        m.style.border="1px solid";
        m.style.borderColor="red";
        m.style.userSelect="none";
        m.id=new_monsters_id;

        var temp_monsters= {posn_x : xx , posn_y : yy,monster_id :new_monsters_id,speed:2,type:1,holded:false}
        
        monster.push(temp_monsters);
        monsters_container.appendChild(m);
        time_left_for_new_monsters=Math.floor((Math.random()*100)+500);

    }
    else if(time_left_for_new_monsters==0){
        time_left_for_new_monsters=Math.floor((Math.random()*100)+500);
    }
    
    update_position_of_hero()
    update_position_of_monsters()
    update_trash_posn()
    check_collison_monster_with_trash()
    check_collison_monster_with_hero()
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
function update_position_of_monsters(){
    for(let i=0;i<monster.length;i++){
        
        let dx = hero_x-monster[i].posn_x;
        let dy = hero_y-monster[i].posn_y;
        monster[i].posn_x=monster[i].posn_x+(dx/Math.sqrt(dx*dx+dy*dy))*monster[i].speed;
        monster[i].posn_y=monster[i].posn_y+(dy/Math.sqrt(dx*dx+dy*dy))*monster[i].speed;
        let mm=document.getElementById(monster[i].monster_id);
        mm.style.top=monster[i].posn_y+"px";
        mm.style.left=monster[i].posn_x+"px";

    }
}
function check_collison_monster_with_hero(){

}
function check_collison_monster_with_trash(){

}