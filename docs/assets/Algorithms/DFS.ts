import { wait } from "./Timmer";

export class DFS{

    path:any = []
    path_b:any = []

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
            document.getElementById(node)!.firstElementChild!.classList.remove('boom-visited')
            document.getElementById(node)!.firstElementChild!.classList.add('marker');
            await wait(12)
            document.getElementById(node)!.firstElementChild!.classList.remove('marker');

            document.getElementById(node)!.firstElementChild!.classList.add('visited')
             
            visited.push(node)
            if(node === goal){
                this.solve(goal,prev, this.path)
                this.draw_path()
                return;
            }
            
            graph[node].reverse()
            for(var i=0; i<graph[node].length; i++){
                
                if(!document.getElementById(graph[node][i])!.firstElementChild!.classList.contains('visited') && !document.getElementById(graph[node][i])!.firstElementChild!.classList.contains('wall')){
                    stack.push(graph[node][i]);
                    prev[graph[node][i]] = node;
                }
                
            }
            graph[node].reverse()
            await wait(10);

        }
    }

     async solve(goal:any, prev:any, arr:any){
        arr.push(goal);
        var node = goal;
        while(prev[node] != null){
            arr.push(prev[node]);
            node = prev[node];
        }
        arr.reverse()
    }

    async draw_path(){
        
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

    async search_boom(graph:any, start:any, goal:any, boom:any){
        var stack = [];
        var visited = [];
        var prev:any = {};
        
        stack.push(start);
        visited.push(start);
        prev[start] = null;
        while(stack.length > 0){
            var node:any = stack.pop();
            
            document.getElementById(node)!.firstElementChild!.classList.remove('boom-visited')
            document.getElementById(node)!.firstElementChild!.classList.add('marker');
            await wait(12)
            document.getElementById(node)!.firstElementChild!.classList.remove('marker');

            document.getElementById(node)!.firstElementChild!.classList.add('boom-visited')
             
            visited.push(node)
            if(node === boom){
                this.solve(boom,prev, this.path_b)
                this.search(graph,boom,goal)
                return;
            }
            
            graph[node].reverse()
            for(var i=0; i<graph[node].length; i++){
                
                if(!document.getElementById(graph[node][i])!.firstElementChild!.classList.contains('visited') && !document.getElementById(graph[node][i])!.firstElementChild!.classList.contains('boom-visited') && !document.getElementById(graph[node][i])!.firstElementChild!.classList.contains('wall')){
                    stack.push(graph[node][i]);
                    prev[graph[node][i]] = node;
                }
                
            }
            graph[node].reverse()
            await wait(10);

        }
    }
}