import { wait } from "../utils";
import { drawPath, resolvePath } from "./path";

export async function bfs(graph: {[key: string]:string[]}, soucre: string, target: string) {
  const prev: {[key: string]:string | null} = {};

  const queue: string[] = [];
  const visited: string[] = [];
  
  queue.push(soucre);

  prev[soucre] = null;

  while (queue.length != 0) {
    const node = queue.shift();
    
    document.getElementById(node!)?.classList.add('marker');
    await wait(15);

    document.getElementById(node!)?.classList.remove('marker');
    document.getElementById(node!)?.classList.add('visited');
    await wait(15);
    
    visited.push(node!);

    if (node === target) {
      const path = resolvePath(prev, target);
      drawPath(path);
      return;
    }

    const neighbours = graph[node!];
    for (let neighbour of neighbours) {
      console.log(neighbour);
      

      if (visited.includes(neighbour) || queue.includes(neighbour) || document.getElementById(neighbour)?.classList.contains('wall')) {
        console.log("visited");
        continue;
      }
      queue.push(neighbour);
      prev[neighbour] = node!;
    }
  }
}