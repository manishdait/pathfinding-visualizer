import { wait } from "../utils";
import { resolvePath } from "./path";

export async function dfs(
  graph: Record<string, string[]>, 
  source: string, 
  target: string, 
  visitedClass: string
): Promise<string[]> {
  const prev: Record<string, string | null> = {};
  const visited: Set<string> = new Set<string>();

  const stack: string[] = [source];

  prev[source] = null;

  while (stack.length != 0) {
    const node = stack.pop();    
    if (!node) continue;

    const ele = document.getElementById(node);
    if (!ele) continue;
    
    ele.classList.add('marker');
    await wait(15);
    ele.classList.remove('marker');
    
    visited.add(node);

    ele.classList.remove("visited_a", "visited_b");
    ele.classList.add(visitedClass);
    await wait(15);
    

    if (node === target) {
      return resolvePath(prev, target);
    }

    const neighbours = [...graph[node] ?? []].reverse();
    for (const neighbour of neighbours) {
      if (
        document.getElementById(neighbour)?.classList.contains('wall') || 
        document.getElementById(neighbour)?.classList.contains(visitedClass)
      ) {
        continue;
      }

      stack.push(neighbour);
      prev[neighbour] = node;
    }

  }
  
  return [];
}
