import { wait } from "../helper/Timmer";

export class BFS{
    
    path: any = [];
    path_b: any = [];

    public async search(graph: any, start: any, goal: any) {
        var queue = [];
        var visited = [];
        
        var prev:any = {};
        queue.push(start);
        visited.push(start);
        prev[start] = null;
        while(queue.length > 0){
            var ele:any = queue.shift();
            document.getElementById(ele)!.firstElementChild!.classList.remove('boom-visited');
            document.getElementById(ele)!.firstElementChild!.classList.add('marker');
          
            await wait(15);
            document.getElementById(ele)!.firstElementChild!.classList.remove('marker');

            document.getElementById(ele)!.firstElementChild!.classList.add('visited');
            
            
            if(ele === goal){
                // Sucess
                this.solve(goal,prev, this.path);
                this.drawPath();
                return prev;
            }
            for(var i=0; i<graph[ele].length; i++){
                
                if(!visited.includes(graph[ele][i]) && !document.getElementById(graph[ele][i])!.firstElementChild!.classList.contains('wall')){
                     queue.push(graph[ele][i]);
                     visited.push(graph[ele][i]);
                     prev[graph[ele][i]] = ele;
                }
               
            }

            await wait(15);
    }
    return prev;
}

  async solve(goal:any, prev:any, arr:any){

    arr.push(goal);
    var node = goal;

    while(prev[node] != null){
        arr.push(prev[node]);
        node = prev[node];
    }
    arr.reverse();
}

public async drawPath(){
    for(var item in this.path_b){
        document.getElementById(this.path_b[item])!.firstElementChild!.classList.remove('visited');
        document.getElementById(this.path_b[item])!.firstElementChild!.classList.remove('boom-visited');
        document.getElementById(this.path_b[item])!.firstElementChild!.classList.remove('path');
        document.getElementById(this.path_b[item])!.firstElementChild!.classList.add('path-marker');
        await wait(15);
        document.getElementById(this.path_b[item])!.firstElementChild!.classList.remove('path-marker');
        document.getElementById(this.path_b[item])!.firstElementChild!.classList.add('path');
        await wait(15);
     }

     for(var item in this.path){
      document.getElementById(this.path[item])!.firstElementChild!.classList.remove('visited');
      document.getElementById(this.path[item])!.firstElementChild!.classList.remove('boom-visited');
      document.getElementById(this.path[item])!.firstElementChild!.classList.remove('path');
      document.getElementById(this.path[item])!.firstElementChild!.classList.add('path-marker');
      await wait(15);
      document.getElementById(this.path[item])!.firstElementChild!.classList.remove('path-marker');
      document.getElementById(this.path[item])!.firstElementChild!.classList.add('path');
      await wait(15);
   }
}


public async search_boom(graph:any, start:any, goal:any, boom:any){
    var queue = [];
    var visited = [];
    
    var prev:any = {};
    queue.push(start);
    visited.push(start);
    prev[start] = null;
    while(queue.length > 0){
        var ele:any = queue.shift();
        document.getElementById(ele)!.firstElementChild!.classList.add('marker');
      
        await wait(15);
        document.getElementById(ele)!.firstElementChild!.classList.remove('marker');

        document.getElementById(ele)!.firstElementChild!.classList.add('boom-visited');
        
        
        if(ele === boom){
            // Sucess
            this.solve(boom,prev, this.path_b);
            this.search(graph,boom,goal)
            return prev;
        }
        for(var i=0; i<graph[ele].length; i++){
            
            if(!visited.includes(graph[ele][i]) && !document.getElementById(graph[ele][i])!.firstElementChild!.classList.contains('wall')){
                 queue.push(graph[ele][i]);
                 visited.push(graph[ele][i]);
                 prev[graph[ele][i]] = ele;
            }
           
        }

        await wait(15);
}
return prev;
}
}