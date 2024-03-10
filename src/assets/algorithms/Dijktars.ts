import { wait } from "../helper/Timmer";

export class Dijktars{

    path:any = [];
    path_b:any = [];

    async search(graph:any, start:any, goal:any){
        var queue = [];
        var visited = []
        var pq:any = {};

        pq[start] = [0,null];

        queue.push(start);
        visited.push(start)
        while(queue.length > 0){
            var ele:any = queue.shift().split(" ")[0].trim();
            var pweight = this.getWeight(ele)

            if(ele == goal){
                // Success
                this.solve(pq,goal,this.path)
                this.draw_path();
                return;
            }

            document.getElementById(ele)!.firstElementChild!.classList.remove('boom-visited');
            document.getElementById(ele)!.firstElementChild!.classList.add('marker');
            await wait(15);
            document.getElementById(ele)!.firstElementChild!.classList.remove('marker');
            document.getElementById(ele)!.firstElementChild!.classList.add('visited');

            await wait(15);
            for(var i =0; i<graph[ele].length; i++){

                if(ele != start &&!document.getElementById(graph[ele][i])!.firstElementChild!.classList.contains('visited')&&!document.getElementById(graph[ele][i])!.firstElementChild!.classList.contains('wall')&&!visited.includes(graph[ele][i])){
                    visited.push(graph[ele][i]);
                    pq[graph[ele][i]] = [(pq[ele][0]+this.getWeight(graph[ele][i])),ele];
                    queue.push(`${graph[ele][i]} ${(pq[ele][0]+this.getWeight(graph[ele][i]))}`);
                    const getVal = (str: any) => str.split(' ')[1];
                    queue.sort((a, b) => getVal(a) - getVal(b));
                }

                else if(!document.getElementById(graph[ele][i])!.firstElementChild!.classList.contains('visited')&&!document.getElementById(graph[ele][i])!.firstElementChild!.classList.contains('wall')&&!visited.includes(graph[ele][i])){
                    visited.push(graph[ele][i]);
                    pq[graph[ele][i]] = [(pweight+this.getWeight(graph[ele][i])),ele];
                    queue.push(`${graph[ele][i]} ${(pweight+this.getWeight(graph[ele][i]))}`);
                    const getVal = (str:any) => str.split(' ')[1];
                    queue.sort((a, b) => getVal(a) - getVal(b));
                }
            }
        }
    }


    async search_boom(graph:any, start:any, goal:any, boom:any){
        var queue = [];
        var visited = []
        var pq:any = {};

        pq[start] = [0,null];

        queue.push(start);
        visited.push(start);
        while(queue.length > 0){
            var ele:any = queue.shift().split(" ")[0].trim();
            var pweight = this.getWeight(ele);

            if(ele == boom){
                // Sucess
                this.solve(pq,boom, this.path_b);
                this.search(graph, boom, goal);
                return;
            }

            document.getElementById(ele)!.firstElementChild!.classList.add('marker');
            await wait(15)
            document.getElementById(ele)!.firstElementChild!.classList.remove('marker');
            document.getElementById(ele)!.firstElementChild!.classList.add('boom-visited');

            await wait(15)
            for(var i =0; i<graph[ele].length; i++){

                if(ele != start &&!document.getElementById(graph[ele][i])!.firstElementChild!.classList.contains('boom-visited')&&!document.getElementById(graph[ele][i])!.firstElementChild!.classList.contains('wall')&&!visited.includes(graph[ele][i])){
                    visited.push(graph[ele][i]);
                    pq[graph[ele][i]] = [(pq[ele][0]+this.getWeight(graph[ele][i])),ele];
                    queue.push(`${graph[ele][i]} ${(pq[ele][0]+this.getWeight(graph[ele][i]))}`);
                    const getVal = (str: any) => str.split(' ')[1];
                    queue.sort((a, b) => getVal(a) - getVal(b));
                }

                else if(!document.getElementById(graph[ele][i])!.firstElementChild!.classList.contains('boom-visited')&&!document.getElementById(graph[ele][i])!.firstElementChild!.classList.contains('wall')&&!visited.includes(graph[ele][i])){
                    visited.push(graph[ele][i]);
                    pq[graph[ele][i]] = [(pweight+this.getWeight(graph[ele][i])),ele];
                    queue.push(`${graph[ele][i]} ${(pweight+this.getWeight(graph[ele][i]))}`);
                    const getVal = (str:any) => str.split(' ')[1];
                    queue.sort((a, b) => getVal(a) - getVal(b));
                }
            }
        }
    }

    async solve(pq:any, goal:any, arr:any){
        arr.push(goal);

        var n = goal;
        while(pq[n][1] != null){
            arr.push(pq[n][1]);
            n = pq[n][1];
        }
        arr.reverse();
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


    getWeight(id:any){
        return parseInt(document.getElementById(id)!.getAttribute('weight')!)
    }
}