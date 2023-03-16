import { wait } from "./Timmer";


export class BFS{

    public async search(graph:any, start:any, goal:any){
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

            document.getElementById(ele)!.firstElementChild!.classList.add('visited');
            
            
            if(ele === goal){
                console.log("Success");
                this.solve(goal,prev);
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

  async solve(goal:any, prev:any){
    var path = [];
    path.push(goal);
    var node = goal;

    while(prev[node] != null){
        path.push(prev[node]);
        node = prev[node];
    }

    path.reverse()
    for(var item in path){
        document.getElementById(path[item])!.firstElementChild!.classList.remove('visited');
        document.getElementById(path[item])!.firstElementChild!.classList.add('path-marker');
        await wait(15);
        document.getElementById(path[item])!.firstElementChild!.classList.remove('path-marker');
        document.getElementById(path[item])!.firstElementChild!.classList.add('path');
        await wait(15);
    }

}
}