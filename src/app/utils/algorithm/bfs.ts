import { wait } from "../utils";
import { drawPath, resolvePath } from "./path";

async function search(graph: {[key: string]:string[]}, source: string, target: string, marker: string): Promise<string[]> {
  const prev: {[key: string]:string | null} = {};

  const queue: string[] = [];
  const visited: string[] = [];
  
  queue.push(source);

  prev[source] = null;

  while (queue.length != 0) {
    const node = queue.shift();
    
    document.getElementById(node!)?.classList.add('marker');
    await wait(15);

    document.getElementById(node!)?.classList.remove('marker');
    if (document.getElementById(node!)?.classList.contains('visited_a')) {
      document.getElementById(node!)?.classList.remove('visited_a')
    }
    document.getElementById(node!)?.classList.add(marker);
    await wait(15);
    
    visited.push(node!);

    if (node === target) {
      const path = resolvePath(prev, target);
      return path;
    }

    const neighbours = graph[node!];
    for (let neighbour of neighbours) {
      if (visited.includes(neighbour) || queue.includes(neighbour) || document.getElementById(neighbour)?.classList.contains('wall')) {
        continue;
      }
      queue.push(neighbour);
      prev[neighbour] = node!;
    }
  }
  return [];
}

export async function bfs (graph: {[key: string]:string[]}, source: string, target: string, hop: string | null = null, isHop: boolean = false) {
  let pathA: string[] = [];
  let pathB: string[] = [];

  if (isHop) {
    pathA = await search(graph, source, hop!, 'visited_a');
    source = hop!;
  }

  pathB = await search(graph, source, target, 'visited_b');
  await drawPath(pathA);
  await drawPath(pathB);
}