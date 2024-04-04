import { wait } from "../helper/timmer";

export class BiDirectional {

    path: any = [];
    b_path: any = [];

    public async search(graph: any, start: any, goal: any) {
        var start_queue = [];
        var start_visited = [];

        var s_path: any = [];
        var g_path: any = [];

        var goal_queue = [];
        var goal_visited = [];

        var start_prev:any = {};
        var goal_prev:any = {};
        start_queue.push(start);
        start_visited.push(start);

        goal_queue.push(goal);
        goal_visited.push(goal);

        start_prev[start] = null;
        goal_prev[goal] = null;

        while(start_queue.length > 0 && goal_queue.length > 0) {
            var s_ele:any = start_queue.shift();
            var g_ele:any = goal_queue.shift();

            document.getElementById(s_ele)!.firstElementChild!.classList.add('marker');
            document.getElementById(s_ele)!.firstElementChild!.classList.remove('boom-visited');
            document.getElementById(g_ele)!.firstElementChild!.classList.add('marker');
            document.getElementById(g_ele)!.firstElementChild!.classList.remove('boom-visited');

            await wait(15);
            document.getElementById(s_ele)!.firstElementChild!.classList.remove('marker');
            document.getElementById(s_ele)!.firstElementChild!.classList.add('visited');
            document.getElementById(g_ele)!.firstElementChild!.classList.remove('marker');
            document.getElementById(g_ele)!.firstElementChild!.classList.add('visited');

            console.log(start_visited.includes(g_ele), goal_visited.includes(s_ele));
            

            if((start_visited.includes(g_ele) && goal_visited.includes(g_ele)) || (start_visited.includes(s_ele) && goal_visited.includes(s_ele))){
                // Sucess
                var node =start_visited.includes(g_ele) && goal_visited.includes(g_ele)? g_ele : s_ele;
                this.solve(node, start_prev, s_path);
                this.solve(node, goal_prev, g_path);
                g_path.reverse();
                this.path = s_path.concat(g_path);
                this.drawPath();
                return;
            }

            for(var i=0; i<graph[s_ele].length; i++){
                
                if(!start_visited.includes(graph[s_ele][i]) && !document.getElementById(graph[s_ele][i])!.firstElementChild!.classList.contains('wall')){
                     start_queue.push(graph[s_ele][i]);
                     start_visited.push(graph[s_ele][i]);
                     start_prev[graph[s_ele][i]] = s_ele;
                }
               
            }

            for(var i=0; i<graph[g_ele].length; i++){
                
                if(!goal_visited.includes(graph[g_ele][i]) && !document.getElementById(graph[g_ele][i])!.firstElementChild!.classList.contains('wall')){
                     goal_queue.push(graph[g_ele][i]);
                     goal_visited.push(graph[g_ele][i]);
                     goal_prev[graph[g_ele][i]] = g_ele;
                }
               
            }

            await wait(15);
        }
    }


    async solve(point:any, prev:any, arr:any){
        arr.push(point);
        var node = point;
    
        while(prev[node] != null){
            arr.push(prev[node]);
            node = prev[node];
        }
        arr.reverse();
    }

    public async drawPath(){
        for(var item in this.b_path){
            document.getElementById(this.b_path[item])!.firstElementChild!.classList.remove('visited');
            document.getElementById(this.b_path[item])!.firstElementChild!.classList.remove('boom-visited');
            document.getElementById(this.b_path[item])!.firstElementChild!.classList.remove('path');
            document.getElementById(this.b_path[item])!.firstElementChild!.classList.add('path-marker');
            await wait(15);
            document.getElementById(this.b_path[item])!.firstElementChild!.classList.remove('path-marker');
            document.getElementById(this.b_path[item])!.firstElementChild!.classList.add('path');
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
        var start_queue = [];
        var start_visited = [];

        var s_path: any = [];
        var g_path: any = [];

        var goal_queue = [];
        var goal_visited = [];

        var start_prev:any = {};
        var goal_prev:any = {};
        start_queue.push(start);
        start_visited.push(start);

        goal_queue.push(boom);
        goal_visited.push(boom);

        start_prev[start] = null;
        goal_prev[goal] = null;
        while(start_queue.length > 0 && goal_queue.length > 0){
            var s_ele:any = start_queue.shift();
            var g_ele:any = goal_queue.shift();
            document.getElementById(s_ele)!.firstElementChild!.classList.add('marker');
            document.getElementById(g_ele)!.firstElementChild!.classList.add('marker');
          
            await wait(15);
            document.getElementById(s_ele)!.firstElementChild!.classList.remove('marker');
            document.getElementById(s_ele)!.firstElementChild!.classList.add('boom-visited');
            document.getElementById(g_ele)!.firstElementChild!.classList.remove('marker');
            document.getElementById(g_ele)!.firstElementChild!.classList.add('boom-visited');
            
            
            if((start_visited.includes(g_ele) && goal_visited.includes(g_ele)) || (start_visited.includes(s_ele) && goal_visited.includes(s_ele))){
                // Sucess
                var node =start_visited.includes(g_ele) && goal_visited.includes(g_ele)? g_ele : s_ele;
                this.solve(node, start_prev, s_path);
                this.solve(node, goal_prev, g_path);
                g_path.reverse();
                this.b_path = s_path.concat(g_path);
                this.search(graph,boom,goal)
                return;
            }
            for(var i=0; i<graph[s_ele].length; i++){
                
                if(!start_visited.includes(graph[s_ele][i]) && !document.getElementById(graph[s_ele][i])!.firstElementChild!.classList.contains('wall')){
                     start_queue.push(graph[s_ele][i]);
                     start_visited.push(graph[s_ele][i]);
                     start_prev[graph[s_ele][i]] = s_ele;
                }
               
            }

            for(var i=0; i<graph[g_ele].length; i++){
                
                if(!goal_visited.includes(graph[g_ele][i]) && !document.getElementById(graph[g_ele][i])!.firstElementChild!.classList.contains('wall')){
                     goal_queue.push(graph[g_ele][i]);
                     goal_visited.push(graph[g_ele][i]);
                     goal_prev[graph[g_ele][i]] = g_ele;
                }
               
            }
    
       await wait(15);
    }
    }

}
