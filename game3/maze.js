//var size_of_maze=window.prompt("enter size of maze....")
//size_of_maze=Number(size_of_maze)


var size_of_maze=13;




const mazeArea=document.getElementById("maze_area");
let width = window.innerWidth;
let height= window.innerHeight;
size_of_maze=Math.floor(height/60);
width=Math.floor(width/2);
width=(width-(width%30))
width=(width-size_of_maze*30);
mazeArea.style.left=width+"px";
const start=document.getElementById('start');
const hero=document.getElementById('hero');
hero.style.left=width+"px";
const monsters=document.getElementById('monsters');
const instructions=document.getElementById("instructions");
const reset=document.getElementById('reset');
reset.style.visibility="hidden";
start.style.visibility="hidden";
mazeArea.style.width=(size_of_maze*60-30)+"px";
mazeArea.style.height=(size_of_maze*60-30)+"px";
instructions.style.top=0+"px";
instructions.style.left=(width)+"px";
instructions.style.width=(size_of_maze*60-30)+"px";
instructions.style.height=(size_of_maze*60-30)+"px";
document.getElementById("textprompt").style.top=(((size_of_maze*60-30)-250)/2)+"px";
document.getElementById("textprompt").style.left=(((size_of_maze*60-30)-250)/2)+"px";
mazeArea.style.backgroundColor="lightgreen"
let game_settings=document.getElementById("game_settings")
let play_audio=document.getElementById("play_audio")
let stop_audio=document.getElementById("stop_audio")
let quit=document.getElementById("quit")
let reset2=document.getElementById("reset2")
game_settings.style.visibility="hidden"

const settings=document.getElementById("settings")

var maze=[];
var visit=[]
let create_trash_timeout;
let create_monster_timeout;
for(let i=0;i<size_of_maze;i++){
    let temp=[];
    let tempy=[];
    for(let j=0;j<size_of_maze;j++){
        tempy.push(0);
        let tempdir=[1,2,3,30];
        let dir=[]
        let c=0;
        while(c<30){
            let choose=Math.floor(Math.random()*tempdir.length);
            dir.push(tempdir[choose]);
            tempdir.splice(choose,1);
            c++;
            

        }
        temp.push(dir);
    }
    visit.push(tempy);
    maze.push(temp);
}
var monsterID=[];
var monsterX=[];
var monsterY=[];
let x=width;
let y=0;
var monsterNumber=0;
var monsteradj=[];
var trashx=0;
var trashy=0;
var NOT_died=true;

const Background_Music = new Audio('./audio_files/game_bg_game_back4.mp3');
const end_game_Music = new Audio('./audio_files/game_over2.mp3');
function playBackground_Music() {
    Background_Music.play();
    Background_Music.setAttribute('autoplay', 'autoplay');
    Background_Music.loop = true;

}
settings.addEventListener("click",()=>{
    if(game_settings.style.visibility=="hidden"){
        game_settings.style.visibility="visible"

    }
    else{
        game_settings.style.visibility="hidden";
    }
    
})
play_audio.addEventListener("click",()=>{
    Background_Music.volume=1;
    end_game_Music.volume=1;
})
stop_audio.addEventListener("click",()=>{
    Background_Music.volume=0;
    end_game_Music.volume=0;
})
reset2.addEventListener("click",()=>{
    NOT_died=true;
    window.location.reload();
})


class Stack {
	constructor(){
		this.items = [];
	}
    push(element){
        this.items.push(element);
    }
    pop(){
        if (this.items.length == 0){
            console.log("Underflow");
            return;

        }
        return this.items.pop();
    }
    isEmpty(){
        return this.items.length == 0;
    }
}

var q=new Stack();
for(let i=0;i<size_of_maze;i++){
    for(let j=0;j<size_of_maze;j++){
        let element=document.createElement('div');
        element.style.height="30px";
        element.style.width="30px";
        element.style.position="absolute";
        element.style.top=(i*60)+"px";
        element.style.left=(j*60)+"px";
        //element.style.backgroundColor="black";
        element.id="("+i+","+j+")";
        let img_element=document.createElement("img");
        img_element.id="("+i+","+j+")"+"img";
        img_element.src='./images/walls/tree.png';
        element.appendChild(img_element);
        mazeArea.appendChild(element);
        

    }
}
for(let i=0;i<size_of_maze;i++){
    for(let j=0;j<size_of_maze-1;j++){
        element=document.createElement('div');
        element.style.height="30px";
        element.style.width="30px";
        element.style.position="absolute";
        element.style.top=(i*60)+"px";
        element.style.left=(j*60+30)+"px";
        //element.style.backgroundColor="t;
        element.id="V("+i+","+j+")";
        
        let img_element=document.createElement("img");
        img_element.id="V("+i+","+j+")"+"img";
        img_element.src='./images/walls/tree.png';
        element.appendChild(img_element);
        mazeArea.appendChild(element);
    }
}
for(let i=0;i<size_of_maze-1;i++){
    for(let j=0;j<size_of_maze;j++){
        element=document.createElement('div');
        element.style.height="30px";
        element.style.width="30px";
        element.style.position="absolute";
        element.style.top=(i*60+30)+"px";
        element.style.left=(j*60)+"px";
        //element.style.backgroundColor="black";
        element.id="H("+i+","+j+")";
        let img_element=document.createElement("img");
        img_element.id="H("+i+","+j+")"+"img";
        img_element.src='./images/walls/tree.png';
        element.appendChild(img_element);
        
        mazeArea.appendChild(element);
    }
}
for(let i=0;i<size_of_maze-1;i++){
    for(let j=0;j<size_of_maze-1;j++){
        element=document.createElement('div');
        element.style.height="30px";
        element.style.width="30px";
        element.style.position="absolute";
        element.style.top=(i*60+30)+"px";
        element.style.left=(j*60+30)+"px";
        //element.style.backgroundColor="black";
        element.id="B("+i+","+j+")";
        let img_element=document.createElement("img");
        img_element.id="B("+i+","+j+")"+"img";
        img_element.src='./images/walls/tree.png';
        element.appendChild(img_element);
        
        mazeArea.appendChild(element);
    }
}
visit[0][0]=1;
q.push(0*size_of_maze+0);
var adj=[];
for(let i=0;i<size_of_maze;i++){
    let temp=[];
    for(let j=0;j<size_of_maze;j++){
        let p=[];
        temp.push(p);

    }
    adj.push(temp);
}
document.getElementById("(0,0)img").remove()

var timerID=setInterval(()=>{
    if(q.isEmpty()){
        
        for(let i=0;i<size_of_maze;i++){
            let columnadj=[]
            for(let j=0;j<size_of_maze;j++){
                let temp=[];
                for(let k=0;k<adj[i][j].length;k++){
                    temp.push(adj[i][j][k]);
                }
                columnadj.push(temp);

            }
            monsteradj.push(columnadj);
            //console.log(monsteradj)
        }
        updateMaze();
        display_start();
        console.log("complete maze generation")
        //console.log(adj)
        clearInterval(timerID);
        return;
    }
    let s = q.pop();
    //q.pop();
    for (let k=0;k<maze[s%size_of_maze][Math.floor(s/size_of_maze)].length;k++){
        let i=s%size_of_maze;
        let j=Math.floor(s/size_of_maze);
        if(maze[s%size_of_maze][Math.floor(s/size_of_maze)][k]==1){
            if(s%size_of_maze+1>size_of_maze-1){
                continue;
            }
            if(visit[s%size_of_maze+1][Math.floor(s/size_of_maze)]==1){
                continue;
            }
            else{
                
                adj[i][j].push(j*size_of_maze+i+1);
                adj[i+1][j].push(i+j*size_of_maze);
                visit[s%size_of_maze+1][Math.floor(s/size_of_maze)]=1;
                document.getElementById("("+(i+1)+","+j+")img").remove();
                document.getElementById("H("+i+","+j+")img").remove();
                q.push(Math.floor(s/size_of_maze)*size_of_maze+s%size_of_maze+1);
            }

        }
        else if(maze[s%size_of_maze][Math.floor(s/size_of_maze)][k]==2){
            if(s%size_of_maze-1<0){
                continue;
            }
            if(visit[s%size_of_maze-1][Math.floor(s/size_of_maze)]==1){
                continue;
            }
            else{
                adj[i][j].push(j*size_of_maze+i-1);
                adj[i-1][j].push(i+j*size_of_maze);
                visit[s%size_of_maze-1][Math.floor(s/size_of_maze)]=1;
                document.getElementById("("+(i-1)+","+j+")img").remove();
                document.getElementById("H("+(i-1)+","+j+")img").remove();
                q.push(Math.floor(s/size_of_maze)*size_of_maze+s%size_of_maze-1);
            }
        }
        else if(maze[s%size_of_maze][Math.floor(s/size_of_maze)][k]==3){
            if(Math.floor(s/size_of_maze)-1<0){
                continue;
            }
            if(visit[s%size_of_maze][Math.floor(s/size_of_maze)-1]==1){
                continue;
            }
            else{
                adj[i][j].push((j-1)*size_of_maze+i);
                adj[i][j-1].push(i+j*size_of_maze);
                visit[s%size_of_maze][Math.floor(s/size_of_maze)-1]=1;
                document.getElementById("("+i+","+(j-1)+")img").remove();
                document.getElementById("V("+i+","+(j-1)+")img").remove();
                q.push(Math.floor(s/size_of_maze-1)*size_of_maze+s%size_of_maze);
            }
            
            
        }
        else if(maze[s%size_of_maze][Math.floor(s/size_of_maze)][k]==30){
            if(Math.floor(s/size_of_maze)+1>size_of_maze-1){
                continue;
            }
            if(visit[s%size_of_maze][Math.floor(s/size_of_maze)+1]==1){
                continue;
            }
            else{
                adj[i][j].push((j+1)*size_of_maze+i);
                adj[i][j+1].push(i+j*size_of_maze);
                visit[s%size_of_maze][Math.floor(s/size_of_maze)+1]=1;
                document.getElementById("("+i+","+(j+1)+")img").remove();
                document.getElementById("V("+i+","+j+")img").remove();
                q.push(Math.floor(s/size_of_maze+1)*size_of_maze+s%size_of_maze);
            }
            
        }
        
    }

},30);
function display_start(){

    start.style.visibility="visible";

}
var timerCreateNewMonster=null;
var timer1=null;
var points=0;
let display_timer=setInterval(change_timer,1000);
var counter=-1;
//createmonster();
start.addEventListener("click",()=>{
    instructions.style.visibility="hidden"
    start.style.visibility="hidden";
    createtrash();
    //createmonster();
    timer1=setInterval(shortest_path,500)
    shortest_path();
    playBackground_Music()
    //timerCreateNewMonster=setInterval(createmonster,10000)
   
    

})
window.addEventListener("keydown",(value)=>{
    if(NOT_died){
        let defaultx=x;
        let defaulty=y;
        if(value.key=='w'){
            let a1=document.getElementById("hero_w");
            a1.style.visibility="visible";
            let a2=document.getElementById("hero_a");
            a2.style.visibility="hidden";
            let a3=document.getElementById("hero_s");
            a3.style.visibility="hidden";
            let a4=document.getElementById("hero_d");
            a4.style.visibility="hidden";

            y-=60;
            
        }
        else if(value.key=='a'){
            let a1=document.getElementById("hero_w");
            a1.style.visibility="hidden";
            let a2=document.getElementById("hero_a");
            a2.style.visibility="visible";
            let a3=document.getElementById("hero_s");
            a3.style.visibility="hidden";
            let a4=document.getElementById("hero_d");
            a4.style.visibility="hidden";
            x-=60;
        }
        else if(value.key=='s'){
            let a1=document.getElementById("hero_w");
            a1.style.visibility="hidden";
            let a2=document.getElementById("hero_a");
            a2.style.visibility="hidden";
            let a3=document.getElementById("hero_s");
            a3.style.visibility="visible";
            let a4=document.getElementById("hero_d");
            a4.style.visibility="hidden";
            y+=60;
        }
        else if(value.key=='d'){
            let a1=document.getElementById("hero_w");
            a1.style.visibility="hidden";
            let a2=document.getElementById("hero_a");
            a2.style.visibility="hidden";
            let a3=document.getElementById("hero_s");
            a3.style.visibility="hidden";
            let a4=document.getElementById("hero_d");
            a4.style.visibility="visible";
            x+=60;   
        }
        if(movable(Math.floor((x-width)/60),Math.floor((y)/60),Math.floor((defaultx-width)/60),Math.floor((defaulty)/60))){
            hero.style.top=y+"px";
            hero.style.left=x+"px";
            if(Math.floor((x-width)/60)==trashx && Math.floor((y)/60)==trashy){
                document.getElementById("trash("+trashx+","+trashy+")"+"_img").remove();
                document.getElementById("trash("+trashx+","+trashy+")").remove();
                clearTimeout(create_trash_timeout);
                clearTimeout(create_monster_timeout);
                points+=1;
                let pp=document.getElementById("score");
                pp.innerHTML=points;
                createtrash();
                console.log("r1");
                
                
                
                
                counter=5;
                
                document.getElementById("timer").innerHTML="0";

            }

        }
        else{
            check_kill();
            x=defaultx;
            y=defaulty;


        }
    }
})
function createtrash(){
    if(NOT_died){
        let trash=document.createElement('div');
        trashx=(Math.floor(Math.random()*size_of_maze));
        trashy=(Math.floor(Math.random()*size_of_maze));
        trash.id="trash("+trashx+","+trashy+")";
        trash.style.height="30px";
        trash.style.width="30px";
        trash.style.position="absolute";
        trash.style.animation="blink normal 2s infinite ease-in-out";
        let trash_img=document.createElement("img");
        trash_img.id="trash("+trashx+","+trashy+")"+"_img";
        let gg=Math.floor(Math.random()*4)
        trash_img.src="./images/trash/garb"+gg+".png";
        trash.style.top=(trashy*60+0)+"px";
        trash.style.left=(trashx*60+width)+"px";
        
        trash.appendChild(trash_img);
        monsters.appendChild(trash);
        counter=5;
        
        
        create_monster_timeout=setTimeout(createmonster,5000);
    }
    
}
function createmonster(){
    if(NOT_died){
        let j=trashx;
        let i=trashy;
        let t3=document.getElementById("trash("+j+","+i+")");
        if(t3==null){
            return ;
        }
        //console.log(i,j)
        
        let monster=document.createElement('div');
        monsterNumber+=1;
        monsterX.push(i);
        monsterY.push(j);
        monsterID.push("monster"+monsterNumber);
        monster.id="monster"+monsterNumber;
        monster.style.height="30px";
        monster.style.width="30px";
        monster.style.position="absolute";
        
        monster.style.top=(monsterX[monsterNumber-1]*60)+"px";
        monster.style.left=(monsterY[monsterNumber-1]*60+width)+"px";
        let mm = document.createElement("img");
        mm.id="IMGmonster"+monsterNumber;
        mm.src="./images/monster/monster.png";
        
        monster.appendChild(mm);
        monsters.appendChild(monster);
        let t1=document.getElementById("trash("+trashx+","+trashy+")"+"_img");
        t1.remove();
        let t2=document.getElementById("trash("+trashx+","+trashy+")");
        t2.remove();

        create_trash_timeout=setTimeout(createtrash,3000);
    }
    
}
function movable(y,x,b,a){
    if(x<0 || x>size_of_maze-1 || y<0 || y>size_of_maze-1 ){
        console.log(x+" "+y+" - "+a+" "+b)
        return false;
    }
    
    for(let i=0;i<adj[a][b].length;i++){
        if(adj[a][b][i]==(x+y*size_of_maze)){
            return true;
        }
    }
    
    console.log(adj[a][b],(x+y*size_of_maze));
    
    return false;
}
function updateMaze(){
    var newmaze=[];
    for(let i=1;i<size_of_maze-1;i++){
        for(let j=1;j<size_of_maze-1;j++){
            if(adj[i][j].length==2){
                
                let temp=[];
                temp.push(i);
                temp.push(j);
                newmaze.push(temp);
            }
            let ran=Math.floor(Math.random()*10);;
            if(ran<=3 && adj[i][j].length==1){
                let temp=[];
                temp.push(i);
                temp.push(j);
                newmaze.push(temp);
            }
            if(ran==1 && adj[i][j].length==3){
                let temp=[];
                temp.push(i);
                temp.push(j);
                newmaze.push(temp);
            }
        }
    }
    //console.log(newmaze)

    for(let i=0;i<newmaze.length;i++){
        let dir=Math.floor((Math.random()*4));
        if(dir==0){
            let noduplicate=true;
            for(let k=0;k<adj[newmaze[i][0]][newmaze[i][1]].length;k++){
                if(adj[newmaze[i][0]][newmaze[i][1]][k]==newmaze[i][0]+1+newmaze[i][1]*size_of_maze){
                    noduplicate=false;
                    break;
                }
            }
            if(noduplicate){
                let temp=document.getElementById("H("+newmaze[i][0]+","+newmaze[i][1]+")img");
                if(temp!=null){
                    temp.remove();
                }
                let log_image=document.createElement('img');
                log_image.id="H("+newmaze[i][0]+","+newmaze[i][1]+")img_log";
                log_image.src="./images/walls/log.png";
                let temp2=document.getElementById("H("+newmaze[i][0]+","+newmaze[i][1]+")");
                temp2.appendChild(log_image);

                adj[newmaze[i][0]][newmaze[i][1]].push(newmaze[i][0]+1+newmaze[i][1]*size_of_maze);
                adj[newmaze[i][0]+1][newmaze[i][1]].push(newmaze[i][0]+newmaze[i][1]*size_of_maze);

            }
            
        }
        if(dir==1){
            let noduplicate=true;
            for(let k=0;k<adj[newmaze[i][0]][newmaze[i][1]].length;k++){
                if(adj[newmaze[i][0]][newmaze[i][1]][k]==newmaze[i][0]-1+newmaze[i][1]*size_of_maze){
                    noduplicate=false;
                    break;
                }
            }
            if(noduplicate){
                
                let temp=document.getElementById("H("+(newmaze[i][0]-1)+","+newmaze[i][1]+")img");
                if(temp!=null){
                    temp.remove();
                }
                
                let log_image=document.createElement('img');
                log_image.id="H("+(newmaze[i][0]-1)+","+newmaze[i][1]+")img_log";
                log_image.src="./images/walls/log.png";
                let temp2=document.getElementById("H("+(newmaze[i][0]-1)+","+newmaze[i][1]+")");
                temp2.appendChild(log_image);
            adj[newmaze[i][0]][newmaze[i][1]].push(newmaze[i][0]-1+newmaze[i][1]*size_of_maze);
            adj[newmaze[i][0]-1][newmaze[i][1]].push(newmaze[i][0]+newmaze[i][1]*size_of_maze);

            }
            
            
        }
        if(dir==2){
            let noduplicate=true;
            for(let k=0;k<adj[newmaze[i][0]][newmaze[i][1]].length;k++){
                if(adj[newmaze[i][0]][newmaze[i][1]][k]==newmaze[i][0]+(newmaze[i][1]-1)*size_of_maze){
                    noduplicate=false;
                    break;
                }
            }
            if(noduplicate){
                let temp=document.getElementById("V("+newmaze[i][0]+","+(newmaze[i][1]-1)+")img");
                if(temp!=null){
                    temp.remove();
                }
                let log_image=document.createElement('img');
                log_image.id="V("+newmaze[i][0]+","+(newmaze[i][1]-1)+")img_log";
                log_image.src="./images/walls/log.png";
                let temp2=document.getElementById("V("+newmaze[i][0]+","+(newmaze[i][1]-1)+")");
                temp2.appendChild(log_image);
                adj[newmaze[i][0]][newmaze[i][1]].push(newmaze[i][0]+(newmaze[i][1]-1)*size_of_maze);
                adj[newmaze[i][0]][newmaze[i][1]-1].push(newmaze[i][0]+newmaze[i][1]*size_of_maze);

            }
            
            
        }
        if(dir==3){
            let noduplicate=true;
            for(let k=0;k<adj[newmaze[i][0]][newmaze[i][1]].length;k++){
                if(adj[newmaze[i][0]][newmaze[i][1]][k]==newmaze[i][0]+(newmaze[i][1]+1)*size_of_maze){
                    noduplicate=false;
                    break;
                }
            }
            if(noduplicate){
                let temp=document.getElementById("V("+newmaze[i][0]+","+newmaze[i][1]+")img");
                if(temp!=null){
                    temp.remove();
                }
                let log_image=document.createElement('img');
                log_image.id="V("+newmaze[i][0]+","+newmaze[i][1]+")img_log";
                log_image.src="./images/walls/log.png";
                let temp2=document.getElementById("V("+newmaze[i][0]+","+newmaze[i][1]+")");
                temp2.appendChild(log_image);
                adj[newmaze[i][0]][newmaze[i][1]].push(newmaze[i][0]+(newmaze[i][1]+1)*size_of_maze);
                adj[newmaze[i][0]][newmaze[i][1]+1].push(newmaze[i][0]+newmaze[i][1]*size_of_maze);

            }
            
            
        }
    }
    //console.log(adj)
}
function shortest_path(){
    let b=Math.floor((x-width)/60);
    let a=Math.floor((y)/60);
    let r=new Stack();
    let distance=[];
    let visited=[]
    for(let i=0;i<size_of_maze;i++){
        let temp=[];
        let tempy=[];
        for(let j=0;j<size_of_maze;j++){
            temp.push(false)
            tempy.push(1000000);
        }
        visited.push(temp);
        distance.push(tempy);
    }
    visited[a][b]=true;
    distance[a][b]=0;
    r.push(a+b*size_of_maze);
    while(!r.isEmpty()){
        if(r.isEmpty()){
            break;
        }
        let s =r.pop();
       
        for (let i=0;i<monsteradj[s%size_of_maze][Math.floor(s/size_of_maze)].length;i++){

            if (visited[monsteradj[s%size_of_maze][Math.floor(s/size_of_maze)][i]%size_of_maze][Math.floor(monsteradj[s%size_of_maze][Math.floor(s/size_of_maze)][i]/size_of_maze)]){
                continue;
            } 
            visited[monsteradj[s%size_of_maze][Math.floor(s/size_of_maze)][i]%size_of_maze][Math.floor(monsteradj[s%size_of_maze][Math.floor(s/size_of_maze)][i]/size_of_maze)]= true;
            distance[monsteradj[s%size_of_maze][Math.floor(s/size_of_maze)][i]%size_of_maze][Math.floor(monsteradj[s%size_of_maze][Math.floor(s/size_of_maze)][i]/size_of_maze)]=Math.min(distance[s%size_of_maze][Math.floor(s/size_of_maze)]+1,distance[monsteradj[s%size_of_maze][Math.floor(s/size_of_maze)][i]%size_of_maze][Math.floor(monsteradj[s%size_of_maze][Math.floor(s/size_of_maze)][i]/size_of_maze)]);
            r.push(monsteradj[s%size_of_maze][Math.floor(s/size_of_maze)][i]%size_of_maze+Math.floor(monsteradj[s%size_of_maze][Math.floor(s/size_of_maze)][i]/size_of_maze)*size_of_maze);
        }
    }
    //console.log(monsteradj,"monsteradj");
    //console.log(adj);
    for(let i=0;i<monsterID.length;i++){
        let ma=monsterX[i];
        let mb=monsterY[i];
        let t=monsteradj[ma][mb][0];
        let d=distance[t%size_of_maze][Math.floor(t/size_of_maze)];
        //let dlete=[d];
        for(let i=1;i<monsteradj[ma][mb].length;i++){
            //dlete.push(distance[monsteradj[ma][mb][i]%size_of_maze][Math.floor(monsteradj[ma][mb][i]/size_of_maze)]);
            if(distance[adj[ma][mb][i]%size_of_maze][Math.floor(monsteradj[ma][mb][i]/size_of_maze)]<d){
                t=monsteradj[ma][mb][i];
                d=distance[monsteradj[ma][mb][i]%size_of_maze][Math.floor(monsteradj[ma][mb][i]/size_of_maze)];
            }
        }
        
        ma=t%size_of_maze;
        mb=Math.floor(t/size_of_maze);
        monsterX[i]=ma;
        monsterY[i]=mb;
        //console.log(dlete,d,ma,mb)
        let element=document.getElementById(monsterID[i])
        element.style.top=(ma*60)+"px";
        element.style.left=(mb*60+width)+"px";

    }
    check_kill();

    
    
    
    



}
function check_kill(){
    for(let i=0;i<monsterX.length;i++){
        if(monsterY[i]==Math.floor((x-width)/60) && monsterX[i]==Math.floor((y)/60)){
            clearInterval(timer1);
            clearInterval(timerCreateNewMonster);
            counter=-1;
            
            hero.style.visibility="hidden";
            Background_Music.pause();
            NOT_died=false;
            end_game_Music.play();
            setTimeout(()=>reset.style.visibility="visible",4000)
            
            //mazeArea.style.backgroundColor="#FFCCCB"

            return;

        }
    }
}
reset.addEventListener("click",()=>{
    NOT_died=true;
    window.location.reload();
})

function change_timer(){
    
    

    if(counter==-1){
        document.getElementById("timer").innerHTML=0;

    }
    else{
        document.getElementById("timer").innerHTML=counter;
        counter-=1;
        
    }
    

    
}
   

 