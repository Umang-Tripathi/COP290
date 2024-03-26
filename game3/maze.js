//var size_of_maze=window.prompt("enter size of maze....")
//size_of_maze=Number(size_of_maze)


var size_of_maze=30;
const mazeArea=document.getElementById("maze_area");


mazeArea.style.backgroundColor="lightgreen"
var maze=[];
var visit=[]
for(let i=0;i<size_of_maze;i++){
    let temp=[];
    let tempy=[];
    for(let j=0;j<size_of_maze;j++){
        tempy.push(0);
        let tempdir=[1,2,3,4];
        let dir=[]
        let c=0;
        while(c<4){
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
        element.style.height="16px";
        element.style.width="16px";
        element.style.position="absolute";
        element.style.top=(i*20)+"px";
        element.style.left=(j*20)+"px";
        element.style.backgroundColor="black";
        element.id="("+i+","+j+")";

        mazeArea.appendChild(element);
        
    }
}
for(let i=0;i<size_of_maze;i++){
    for(let j=0;j<size_of_maze-1;j++){
        element=document.createElement('div');
        element.style.height="16px";
        element.style.width="4px";
        element.style.position="absolute";
        element.style.top=(i*20)+"px";
        element.style.left=(j*20+16)+"px";
        element.style.backgroundColor="black";
        element.id="V("+i+","+j+")";
        
        mazeArea.appendChild(element);
    }
}
for(let i=0;i<size_of_maze-1;i++){
    for(let j=0;j<size_of_maze;j++){
        element=document.createElement('div');
        element.style.height="4px";
        element.style.width="16px";
        element.style.position="absolute";
        element.style.top=(i*20+16)+"px";
        element.style.left=(j*20)+"px";
        element.style.backgroundColor="black";
        element.id="H("+i+","+j+")";
        
        mazeArea.appendChild(element);
    }
}
for(let i=0;i<size_of_maze-1;i++){
    for(let j=0;j<size_of_maze-1;j++){
        element=document.createElement('div');
        element.style.height="4px";
        element.style.width="4px";
        element.style.position="absolute";
        element.style.top=(i*20+16)+"px";
        element.style.left=(j*20+16)+"px";
        element.style.backgroundColor="black";
        element.id="B("+i+","+j+")";
        
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
document.getElementById("(0,0)").style.backgroundColor="transparent"

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
            //monsteradj.push(columnadj);
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
                document.getElementById("("+(i+1)+","+j+")").style.backgroundColor="transparent";
                document.getElementById("H("+i+","+j+")").style.backgroundColor="transparent";
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
                document.getElementById("("+(i-1)+","+j+")").style.backgroundColor="transparent";
                document.getElementById("H("+(i-1)+","+j+")").style.backgroundColor="transparent";
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
                document.getElementById("("+i+","+(j-1)+")").style.backgroundColor="transparent";
                document.getElementById("V("+i+","+(j-1)+")").style.backgroundColor="transparent";
                q.push(Math.floor(s/size_of_maze-1)*size_of_maze+s%size_of_maze);
            }
            
            
        }
        else if(maze[s%size_of_maze][Math.floor(s/size_of_maze)][k]==4){
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
                document.getElementById("("+i+","+(j+1)+")").style.backgroundColor="transparent";
                document.getElementById("V("+i+","+j+")").style.backgroundColor="transparent";
                q.push(Math.floor(s/size_of_maze+1)*size_of_maze+s%size_of_maze);
            }
            
        }
        
    }

},10);
