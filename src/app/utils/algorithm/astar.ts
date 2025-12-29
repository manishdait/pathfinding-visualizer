import { wait } from "../utils";
import { resolvePath } from "./path";

export async function astar(
  graph: { [key: string]: string[] },
  source: string,
  target: string,
  visitedClass: string
): Promise<string[]> {
  const hurastic = mapHurastic(graph, target);
  const queue: string[] = []

  const visited: Set<string> = new Set<string>();
  const f: Record<string, number> = {};
  const dist: Record<string, number> = {};
  const seenOrder: Record<string, number> = {};
  const prev: Record<string, string | null> = {};

  let order = 0;

  for (const node in graph) {
    dist[node] = Infinity;
    f[node] = Infinity;
    prev[node] = null;
  }

  f[source] = hurastic[source];
  dist[source] = 0;
  queue.push(source);
  seenOrder[source] = order++;

  while (queue.length !== 0) {
    queue.sort((a, b) => {
      if (f[a] === f[b]) {
        return seenOrder[a] - seenOrder[b];
      }
      return f[a] - f[b]
    });

    const node = queue.shift();
    if (!node) continue;

    const ele = document.getElementById(node);
    if (!ele) continue;
    
    ele.classList.add("marker");
    await wait(15);
    ele.classList.remove("marker");

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
        document.getElementById(neighbour)?.classList.contains("wall")
      ) {
        continue;
      }

      const weight = parseInt(document.getElementById(neighbour)?.getAttribute("weight") ?? "1");
      const newDist = dist[node] + weight;

      if (newDist < dist[neighbour]) {
        f[neighbour] = newDist + hurastic[neighbour];
        dist[neighbour] = newDist;
        prev[neighbour] = node;

        if (seenOrder[neighbour] === undefined) {
          seenOrder[neighbour] = order++;
        }

        if(!queue.includes(neighbour)) {
          queue.push(neighbour);
        }
      }
    }
  }

  return [];
}

function mapHurastic(graph: Record<string, string[]>, target: string): Record<string, number> {
  const hurastic: Record<string, number> = {};
  const targetEle = document.getElementById(target);
  if (!targetEle) return {};

  const targetRow = parseInt(targetEle.getAttribute('row')!);
  const targetCol = parseInt(targetEle.getAttribute('col')!);

  for (const node in graph) {
    const ele = document.getElementById(node);
    if (!ele) continue;

    const row = parseInt(ele.getAttribute('row')!);
    const col = parseInt(ele.getAttribute('col')!);

    // Manhatan distance
    const h = Math.abs(targetRow - row) + Math.abs(targetCol - col);
    hurastic[node] = h;
  }

  return hurastic;
}
