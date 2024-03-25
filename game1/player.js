const hero=document.getElementById("hero");
const trash_container=document.getElementById("trash");
const monsters_container=document.getElementById("monsters");
var w=false;
var a=false;
var s=false;
var d=false;
var trash=[];
var monster=[];
var hearts = 10
var prev_hearts=10;
var width = window.innerWidth;
var height = window.innerHeight;
var hero_y=100;
var hero_x=300;
var is_hero_holding=false;

document.addEventListener('keydown', (event) => {
    //console.log(event.key)
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
var time_left_for_new_trash=400;
var time_left_for_new_monsters=500;
var number_of_trashes=0;
var total_trashes_now=0;
var number_of_monsters=0;
var total_monsters_now=0;
function update_game(){
    time_left_for_new_trash-=1;
    time_left_for_new_monsters-=1;

    if(time_left_for_new_trash==0 && total_trashes_now<=10){
        number_of_trashes+=1;
        total_trashes_now+=1;
        var new_trash_id=number_of_trashes+"trash";
        
        
        let m=document.createElement("div");
        m.style.position="absolute";
        m.style.height="20px";
        m.style.width="20px";
        let xx=Math.floor(Math.random()*width);
        let yy=Math.floor(Math.random()*height);
        //console.log(xx,yy);
        while(xx>hero_x-80 && xx<hero_x+80 && yy>hero_y-80 && yy<hero_y+80){
            //console.log(xx,yy)
            xx=Math.floor(Math.random()*width);
            yy=Math.floor(Math.random()*height);
        }

        m.style.top=yy+"px";
        m.style.left=xx+"px";
        /* m.style.border="1px solid";
        m.style.borderColor="red"; */
        m.style.userSelect="none";
        m.id=new_trash_id;
        let type_of_trash=Math.floor(Math.random()*6);
        if(type_of_trash==0){
            let choose=Math.floor(Math.random()*4)+1;
            let kk=document.createElement("img");
            kk.src="./images/trash/glass/glass"+choose+".png";
            //console.log("./trash/glass/glass"+choose)
            kk.id=new_trash_id+"img"
            var temp_trash= {posn_x : xx , posn_y : yy,trash_id :new_trash_id,dir_x:1,dir_y:1,speed:0,type:0,holded:false,angle:0}
        
            trash.push(temp_trash);
            trash_container.appendChild(m);
            m.appendChild(kk);
            time_left_for_new_trash=Math.floor((Math.random()*100)+400);

        }
        else if(type_of_trash==1){
            let choose=Math.floor(Math.random()*4)+1;
            let kk=document.createElement("img");
            kk.src="./images/trash/metal/metal"+choose+".png";
            //console.log("./trash/glass/glass"+choose)
            var temp_trash= {posn_x : xx , posn_y : yy,trash_id :new_trash_id,dir_x:1,dir_y:1,speed:0,type:1,holded:false,angle:0}
            kk.id=new_trash_id+"img"
            trash.push(temp_trash);
            trash_container.appendChild(m);
            m.appendChild(kk);
            time_left_for_new_trash=Math.floor((Math.random()*100)+500);

        }
        else if(type_of_trash==2){
            let choose=Math.floor(Math.random()*4)+1;
            let kk=document.createElement("img");
            kk.src="./images/trash/paper/paper"+choose+".png";
            //console.log(".images/trash/glass/glass"+choose)
            var temp_trash= {posn_x : xx , posn_y : yy,trash_id :new_trash_id,dir_x:1,dir_y:1,speed:0,type:2,holded:false,angle:0}
            kk.id=new_trash_id+"img"
            trash.push(temp_trash);
            trash_container.appendChild(m);
            m.appendChild(kk);
            time_left_for_new_trash=Math.floor((Math.random()*100)+500);
            
        }
        else if(type_of_trash==3){
            let choose=Math.floor(Math.random()*4)+1;
            let kk=document.createElement("img");
            kk.src="./images/trash/plastic/plastic"+choose+".png";
            //console.log("./trash/glass/glass"+choose)
            var temp_trash= {posn_x : xx , posn_y : yy,trash_id :new_trash_id,dir_x:1,dir_y:1,speed:0,type:3,holded:false,angle:0}
            kk.id=new_trash_id+"img"
            trash.push(temp_trash);
            trash_container.appendChild(m);
            m.appendChild(kk);
            time_left_for_new_trash=Math.floor((Math.random()*100)+500);
            
        }
        else if(type_of_trash==4){
            let choose=Math.floor(Math.random()*8)+1;
            let kk=document.createElement("img");
            kk.src="./images/trash/organic/org"+choose+".png";
            //console.log("./trash/glass/glass"+choose)
            var temp_trash= {posn_x : xx , posn_y : yy,trash_id :new_trash_id,dir_x:1,dir_y:1,speed:0,type:4,holded:false,angle:0}
            kk.id=new_trash_id+"img"
            trash.push(temp_trash);
            trash_container.appendChild(m);
            m.appendChild(kk);
            time_left_for_new_trash=Math.floor((Math.random()*100)+500);

        }
        else if(type_of_trash==5){
            
            let choose=Math.floor(Math.random()*6)+1;
            let kk=document.createElement("img");
            kk.src="./images/trash/hazard/hazard"+choose+".png";
            kk.id=new_trash_id+"img" 
            m.appendChild(kk);
           
            //console.log("./trash/glass/glass"+choose)
            var temp_trash= {posn_x : xx , posn_y : yy,trash_id :new_trash_id,dir_x:1,dir_y:1,speed:0,type:5,holded:false,angle:0}
            
            trash.push(temp_trash);
            trash_container.appendChild(m);
            
            time_left_for_new_trash=Math.floor((Math.random()*100)+500);

        }
        

    }
    else if(time_left_for_new_trash==0){
        time_left_for_new_trash=Math.floor((Math.random()*100)+500);
    }
    if(time_left_for_new_monsters==0 && total_monsters_now<=20){
        number_of_monsters+=1;
        total_monsters_now+=1;

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
        
        //console.log(xx,yy);
        

        m.style.top=yy+"px";
        m.style.left=xx+"px";
        /* m.style.border="1px solid";
        m.style.borderColor="red"; */
        m.style.userSelect="none";
        m.id=new_monsters_id;
        let rr=Math.floor(Math.random()*6);
        if(rr==0){
            
            let kk=document.createElement("img");
            kk.src="./images/monsters/yellow_dustbin.png";
            kk.id=new_monsters_id+"img"
            m.appendChild(kk);
            let kk2=document.createElement("img");
            kk2.src="./images/monsters/yellow_rev.png";
            kk2.id=new_monsters_id+"imgr"
            m.appendChild(kk2);
            //console.log("yellow");
            var temp_monsters= {posn_x : xx , posn_y : yy,monster_id :new_monsters_id,speed:1,type:0,holded:false}
            monster.push(temp_monsters);
            monsters_container.appendChild(m);
            time_left_for_new_monsters=Math.floor((Math.random()*100)+500);
        }
        else if(rr==1){
            let kk=document.createElement("img");
            kk.src="./images/monsters/black_dustbin.png";
            kk.id=new_monsters_id+"img"
            m.appendChild(kk);
            let kk2=document.createElement("img");
            kk2.src="./images/monsters/black_rev.png";
            kk2.id=new_monsters_id+"imgr"
            m.appendChild(kk2);
            //console.log("black");
            var temp_monsters= {posn_x : xx , posn_y : yy,monster_id :new_monsters_id,speed:1,type:1,holded:false}
            monster.push(temp_monsters);
            monsters_container.appendChild(m);
            time_left_for_new_monsters=Math.floor((Math.random()*100)+500);
        }
        else if(rr==2){
            let kk=document.createElement("img");
            kk.src="./images/monsters/white_dustbin.png";
            kk.id=new_monsters_id+"img"
            m.appendChild(kk);
            //console.log("white");
            let kk2=document.createElement("img");
            kk2.src="./images/monsters/white_rev.png";
            kk2.id=new_monsters_id+"imgr"
            m.appendChild(kk2);
            var temp_monsters= {posn_x : xx , posn_y : yy,monster_id :new_monsters_id,speed:1.5,type:2,holded:false}
            monster.push(temp_monsters);
            monsters_container.appendChild(m);
            time_left_for_new_monsters=Math.floor((Math.random()*100)+500);
        }
        else if(rr==3){
            let kk=document.createElement("img");
            kk.src="./images/monsters/blue_dustbin.png";
            kk.id=new_monsters_id+"img"
            m.appendChild(kk);
            let kk2=document.createElement("img");
            kk2.src="./images/monsters/blue_rev.png";
            kk2.id=new_monsters_id+"imgr"
            m.appendChild(kk2);
            //console.log("blue");
            var temp_monsters= {posn_x : xx , posn_y : yy,monster_id :new_monsters_id,speed:1.5,type:3,holded:false}
            monster.push(temp_monsters);
            monsters_container.appendChild(m);
            time_left_for_new_monsters=Math.floor((Math.random()*100)+500);
        }
        else if(rr==4){
            let kk=document.createElement("img");
            kk.src="./images/monsters/green_dustbin.png";
            kk.id=new_monsters_id+"img"
            m.appendChild(kk);
            let kk2=document.createElement("img");
            kk2.src="./images/monsters/green_rev.png";
            kk2.id=new_monsters_id+"imgr"
            m.appendChild(kk2);
            //console.log("green");
            var temp_monsters= {posn_x : xx , posn_y : yy,monster_id :new_monsters_id,speed:2,type:4,holded:false}
            monster.push(temp_monsters);
            monsters_container.appendChild(m);
            time_left_for_new_monsters=Math.floor((Math.random()*100)+500);
        }
        else if(rr==5){
            let kk=document.createElement("img");
            kk.src="./images/monsters/red_dustbin.png";
            kk.id=new_monsters_id+"img"
            m.appendChild(kk);
            let kk2=document.createElement("img");
            kk2.src="./images/monsters/red_rev.png";
            kk2.id=new_monsters_id+"imgr"
            m.appendChild(kk2);
            //console.log("red");
            var temp_monsters= {posn_x : xx , posn_y : yy,monster_id :new_monsters_id,speed:2,type:5,holded:false}
            monster.push(temp_monsters);
            monsters_container.appendChild(m);
            time_left_for_new_monsters=Math.floor((Math.random()*100)+500);
        }
        

    }
    else if(time_left_for_new_monsters==0){
        time_left_for_new_monsters=Math.floor((Math.random()*100)+500);
    }
    
    update_position_of_hero()
    update_position_of_monsters()
    update_trash_posn()
    check_collison_monster_with_trash()
    check_collison_monster_with_hero()
    if(prev_hearts!=hearts){
        if(hearts==0){
            end_game();
        }
        prev_hearts=hearts;
        for(let i=prev_hearts+1;i<=10;i++){
            let hr = document.getElementById("l"+i);
            hr.style.visibility="hidden";
        }
    }
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
    trash[i].angle+=trash[i].speed*2;
    tetrash.style.rotate=(trash[i].angle)+"deg";

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
        var do_it=true;
        for(let j=0;j<monster.length;j++){
            if(j!=i){
                if(Math.abs(monster[j].posn_x-monster[i].posn_x)<40 && Math.abs(monster[j].posn_y-monster[i].posn_y)<40){
                    do_it=false;
                    monster[i].posn_x=monster[i].posn_x-(dx/Math.sqrt(dx*dx+dy*dy))*monster[i].speed;
                    monster[i].posn_y=monster[i].posn_y-(dy/Math.sqrt(dx*dx+dy*dy))*monster[i].speed;
                    break;
                }
            }
        }
        if(do_it){
            if(dx>0){
                
                let sm1=monster[i].monster_id+"img";
                let m1=document.getElementById(sm1);
                m1.style.visibility="hidden";
                let sm2=monster[i].monster_id+"imgr";
                let m2=document.getElementById(sm2);
                m2.style.visibility="visible";
            }
            else{
                let sm1=monster[i].monster_id+"imgr";
                let m1=document.getElementById(sm1);
                m1.style.visibility="hidden";
                let sm2=monster[i].monster_id+"img";
                let m2=document.getElementById(sm2);
                m2.style.visibility="visible";
            }
            let mm=document.getElementById(monster[i].monster_id);
            mm.style.top=monster[i].posn_y+"px";
            mm.style.left=monster[i].posn_x+"px";
        }
        

    }
}
function check_collison_monster_with_hero(){
    for(let i=0;i<monster.length;i++){
        if(Math.abs(hero_x-monster[i].posn_x)<20 && Math.abs(hero_y-monster[i].posn_y)<20){
            end_game();
            return ;
        }
    }
}
function check_collison_monster_with_trash(){

    for(let i=0;i<monster.length;i++){
        for(let j=0;j<trash.length;j++){
            if(trash[j].speed!=0 && Math.abs(trash[j].posn_x-monster[i].posn_x)<20 && Math.abs(trash[j].posn_y-monster[i].posn_y)<20){
                if(trash[j].type!=monster[i].type){
                    hearts-=1;
                }
                let monster_removed_img=document.getElementById(monster[i].monster_id+"img");
                monster_removed_img.remove();
                let monster_removed_img2=document.getElementById(monster[i].monster_id+"imgr");
                monster_removed_img2.remove();
                let monster_removed=document.getElementById(monster[i].monster_id);
                monster_removed.remove();
                let trash_removed_img=document.getElementById(trash[j].trash_id+"img");
                trash_removed_img.remove();
                let trash_removed=document.getElementById(trash[j].trash_id);
                trash_removed.remove();
                temp_trash=[]
                temp_monster=[]
                total_monsters_now-=1;
                total_trashes_now-=1;
                for(let t=0;t<trash.length;t++){
                    if(t!=j){
                        temp_trash.push(trash[t]);
                    }
                    
                }
                for(let t=0;t<monster.length;t++){
                    if(t!=i){
                        temp_monster.push(monster[t]);
                    }
                }
                monster=[]
                trash=[];
                for(let t=0;t<temp_trash.length;t++){
                    trash.push(temp_trash[t]);
                    
                    
                }
                for(let t=0;t<temp_monster.length;t++){
                    monster.push(temp_monster[t]);
                    
                }
                
                return;
            }
            
        }
        
    }
}
function end_game(){
    clearInterval(timerID);
}