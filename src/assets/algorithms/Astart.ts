import { wait } from "../helper/Timmer";

type Node = {
    id: string,
    prevNode: string|null,
    gn: number,
    hn: number,
    fn: number
}

export class Astar {
    path:any = [];
    path_b:any = [];
    track: {[key: string]: any} = {};
    visited:string[] = [];

    public async search(graph:any, hurestic:any, start: any, goal: any) {
        let queue: Node[] = [];

        queue.push({
            id: start, 
            prevNode: null, 
            gn: 0, 
            hn: this.calculate_hn(goal, start), 
            fn: this.calculate_hn(goal, start) + 0
        });

        while (queue.length > 0) {
            var node = queue.shift();

            document.getElementById(node!.id)!.firstElementChild!.classList.remove('boom-visited');
            document.getElementById(node!.id)!.firstElementChild!.classList.add('marker');
            await wait(15);
            document.getElementById(node!.id)!.firstElementChild!.classList.remove('marker');
            document.getElementById(node!.id)!.firstElementChild!.classList.add('visited');

            if (node!.id === goal) {
                console.log(hurestic);
                console.log(this.visited);
                console.log(this.track)
                console.log(node);
                
                this.solve(node!, false)
                this.drawPath()
                break;
            }

            for (var neighbour of graph[node!.id]) {
                if (!this.visited.includes(node!.id) && !this.visited.includes(neighbour) && !document.getElementById(neighbour)!.firstElementChild!.classList.contains('wall')){
                    let new_gn = node!.gn + this.getWeight(neighbour);

                    let existingNode = this.hasNode(queue, neighbour);

                    console.log(existingNode);
                    if(existingNode!=null) {
                        existingNode.prevNode = node!.id, 
                        existingNode.gn = new_gn, 
                        existingNode.hn = this.calculate_hn(goal, neighbour)
                    } else {
                        queue.push({
                            id: neighbour, 
                            prevNode: node!.id,
                            gn: new_gn,
                            hn: this.calculate_hn(goal, neighbour),
                            fn: this.calculate_hn(goal, neighbour) + new_gn
                        });    
                    }

                    this.track[node!.id] = node!.prevNode;
                }
            }
            this.visited.push(node!.id);

            queue.sort((a,b) => a.fn - b.fn)
        }
    }


    public async search_bomb(graph:any, hurestic:any, start: any, goal: any, bomb:any) {
        let queue: Node[] = [];

        queue.push({
            id: start, 
            prevNode: null, 
            gn: 0, 
            hn: this.calculate_hn(bomb, start), 
            fn: this.calculate_hn(bomb, start) + 0
        });

        while (queue.length > 0) {
            var node = queue.shift();

            document.getElementById(node!.id)!.firstElementChild!.classList.add('marker');
            await wait(15)
            document.getElementById(node!.id)!.firstElementChild!.classList.remove('marker');
            document.getElementById(node!.id)!.firstElementChild!.classList.add('boom-visited');

            if (node!.id === bomb) {
                console.log(hurestic);
                console.log(this.visited);
                console.log(this.track)
                console.log(node);
                
                this.solve(node!, true)
                this.visited = []
                this.track = {}

                this.search(graph,hurestic, bomb, goal);
                break;
            }

            for (var neighbour of graph[node!.id]) {
                if (!this.visited.includes(node!.id) && !this.visited.includes(neighbour) && !document.getElementById(neighbour)!.firstElementChild!.classList.contains('wall')){
                    let new_gn = node!.gn + this.getWeight(neighbour);

                    let existingNode = this.hasNode(queue, neighbour);

                    console.log(existingNode);
                    if(existingNode!=null) {
                        existingNode.prevNode = node!.id, 
                        existingNode.gn = new_gn, 
                        existingNode.hn = this.calculate_hn(bomb, neighbour)
                    } else {
                        queue.push({
                            id: neighbour, 
                            prevNode: node!.id,
                            gn: new_gn,
                            hn: this.calculate_hn(bomb, neighbour),
                            fn: this.calculate_hn(bomb, neighbour) + new_gn
                        });    
                    }

                    this.track[node!.id] = node!.prevNode;
                }
            }
            this.visited.push(node!.id);

            queue.sort((a,b) => a.fn - b.fn)
        }
    }

    getWeight(id:any){
        return parseInt(document.getElementById(id)!.getAttribute('weight')!)
    }

    public async drawPath(){
        for(var item of this.path_b){
            document.getElementById(item)!.firstElementChild!.classList.remove('visited');
            document.getElementById(item)!.firstElementChild!.classList.remove('boom-visited');
            document.getElementById(item)!.firstElementChild!.classList.remove('path');
            document.getElementById(item)!.firstElementChild!.classList.add('path-marker');
            await wait(15);
            document.getElementById(item)!.firstElementChild!.classList.remove('path-marker');
            document.getElementById(item)!.firstElementChild!.classList.add('path');
            await wait(15);
        }
        await wait(15);
        for(var item of this.path){
            document.getElementById(item)!.firstElementChild!.classList.remove('visited');
            document.getElementById(item)!.firstElementChild!.classList.remove('boom-visited');
            document.getElementById(item)!.firstElementChild!.classList.remove('path');
            document.getElementById(item)!.firstElementChild!.classList.add('path-marker');
            await wait(15);
            document.getElementById(item)!.firstElementChild!.classList.remove('path-marker');
            document.getElementById(item)!.firstElementChild!.classList.add('path');
            await wait(15);
        }
    }

    solve(goal:Node, isBomb:boolean) {
        let arr = [];
        arr.push(goal.id);

        let ele = goal.prevNode;
        arr.push(ele)
        while (this.track[ele!] != null) {
            console.log(arr);
            
            arr.push(this.track[ele!]);
            ele = this.track[ele!];
        }
        
        if(!isBomb) {
          this.path = arr.reverse()
          console.log(this.path);
        } else {
            this.path_b = arr.reverse();
            console.log(this.path_b);
        }
    }

    hasNode(queue: Node[], node: string) {
        for(let n of queue) {
            if (n.id == node) {
                return n;
            }
        }
        return null;
    }

    calculate_hn(id1: string, id2: string) {
        var a  = id1.replace('[', '').replace(']', '').split(',');
        var b  = id2.replace('[', '').replace(']', '').split(',');
        return (Math.abs(parseInt(b[0]) - parseInt(a[0]))) + Math.abs(parseInt(b[1]) - parseInt(a[1]));
    }
}



