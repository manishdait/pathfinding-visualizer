import { wait } from "../utils";
import { resolvePath } from "./path";

export async function bfs(
  graph: Record<string, string[]>, 
  source: string, 
  target: string, 
  visitedClass: string
): Promise<string[]> {
  const prev: Record<string, string | null> = {};
  const visited: Set<string> = new Set<string>();

  const queue: string[] = [source];

  prev[source] = null;

  while (queue.length != 0) {
    const node = queue.shift();    
    if (!node) continue;

    const ele = document.getElementById(node);
    if (!ele) continue;
    
    ele.classList.add('marker');
    await wait(15);
    ele.classList.remove('marker');
    
    ele.classList.remove("visited_a", "visited_b");
    ele.classList.add(visitedClass);
    await wait(15);
    
    visited.add(node);

    if (node === target) {
      return resolvePath(prev, target);
    }

    for (const neighbour of graph[node] ?? []) {
      if (
        visited.has(neighbour) || 
        queue.includes(neighbour) || 
        document.getElementById(neighbour)?.classList.contains('wall')
      ) {
        continue;
      }

      queue.push(neighbour);
      prev[neighbour] = node;
    }
  }
  
  return [];
}
