import { wait } from "../utils";
import { resolvePath } from "./path";

export async function bidirectional(
  graph: Record<string, string[]>, 
  source: string, 
  target: string, 
  visitedClass: string
): Promise<string[]> {
  const sourcePrev: Record<string, string | null> = {};
  const targetPrev: Record<string, string | null> = {};

  const svisited: Set<string> = new Set<string>();
  const tvisited: Set<string> = new Set<string>();

  const sourceQueue: string[] = [source];
  const targetQueue: string[] = [target];

  sourcePrev[source] = null;
  targetPrev[target] = null;

  while (sourceQueue.length != 0 && targetQueue.length != 0) {
    const sNode = sourceQueue.shift();    
    if (!sNode) continue;

    const tNode = targetQueue.shift();    
    if (!tNode) continue;

    const sEle = document.getElementById(sNode);
    if (!sEle) continue;

    const tEle = document.getElementById(tNode);
    if (!tEle) continue;
    
    sEle.classList.add('marker');
    tEle.classList.add('marker');
    await wait(15);
    sEle.classList.remove('marker');
    tEle.classList.remove('marker');
    
    sEle.classList.remove("visited_a", "visited_b");
    sEle.classList.add(visitedClass);
    tEle.classList.remove("visited_a", "visited_b");
    tEle.classList.add(visitedClass);
    await wait(15);
    
    svisited.add(sNode);
    tvisited.add(tNode);

    if ((svisited.has(sNode) && tvisited.has(sNode)) || (svisited.has(tNode) && tvisited.has(tNode))) {
      const node = (svisited.has(sNode) && tvisited.has(sNode)) ? sNode : tNode;
      const spath = resolvePath(sourcePrev, node);
      const tpath = resolvePath(targetPrev, node);

      tpath.reverse();
      const path = spath.concat(tpath);
      return path;
    }

    for (const neighbour of graph[sNode] ?? []) {
      if (
        svisited.has(neighbour) || 
        sourceQueue.includes(neighbour) || 
        document.getElementById(neighbour)?.classList.contains('wall')
      ) {
        continue;
      }

      sourceQueue.push(neighbour);
      sourcePrev[neighbour] = sNode;
    }

    for (const neighbour of graph[tNode] ?? []) {
      if (
        tvisited.has(neighbour) || 
        targetQueue.includes(neighbour) || 
        document.getElementById(neighbour)?.classList.contains('wall')
      ) {
        continue;
      }

      targetQueue.push(neighbour);
      targetPrev[neighbour] = tNode;
    }
  }
  
  return [];
}
