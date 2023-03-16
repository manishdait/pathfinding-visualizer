import { wait } from "./Timmer";

export class DFS{

    async search(graph:any, start:any, goal:any){
        var stack = [];
        var visited = [];
        var prev:any = {};
        
        stack.push(start);
        visited.push(start);
        prev[start] = null;
        while(stack.length > 0){
            var node:any = stack.pop();
            
            document.getElementById(node)!.firstElementChild!.classList.remove('visited')
            document.getElementById(node)!.firstElementChild!.classList.add('marker');
            await wait(12)
            document.getElementById(node)!.firstElementChild!.classList.remove('marker');

            document.getElementById(node)!.firstElementChild!.classList.add('visited')
             
            visited.push(node)
            if(node === goal){
                this.solve(goal,prev)
                return;
            }
            
            graph[node].reverse()
            for(var i=0; i<graph[node].length; i++){
                
                if(!document.getElementById(graph[node][i])!.firstElementChild!.classList.contains('visited') && !document.getElementById(graph[node][i])!.firstElementChild!.classList.contains('visited-shared') && !document.getElementById(graph[node][i])!.firstElementChild!.classList.contains('wall')){
                    stack.push(graph[node][i]);
                    prev[graph[node][i]] = node;
                }
                
            }
            graph[node].reverse()
            await wait(10);

        }
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