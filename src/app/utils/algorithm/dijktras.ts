import { wait } from "../utils";
import { resolvePath } from "./path";

export async function dijkstra(
  graph: { [key: string]: string[] },
  source: string,
  target: string,
  visitedClass: string
): Promise<string[]> {

  const dist: Record<string, number> = {};
  const prev: Record<string, string | null> = {};
  const seenOrder: Record<string, number> = {};
  const visited: Set<string> = new Set();

  const queue: string[] = [];
  let order = 0;

  for (const node in graph) {
    dist[node] = Infinity;
    prev[node] = null;
  }

  dist[source] = 0;
  queue.push(source);
  seenOrder[source] = 0;
  order++;

  while (queue.length !== 0) {
    queue.sort((a, b) => {
      if(dist[a] === dist[b]) {
        return seenOrder[a] - seenOrder[b];
      }
      return dist[a] - dist[b]
    });

    const node = queue.shift()!;
    if (visited.has(node)) continue;

    visited.add(node);

    const ele = document.getElementById(node);
    if (!ele) continue;

    ele.classList.add("marker");
    await wait(15);
    ele.classList.remove("marker");

    ele.classList.remove("visited_a", "visited_b");
    ele.classList.add(visitedClass);
    await wait(15);

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
        dist[neighbour] = newDist;
        prev[neighbour] = node;
        queue.push(neighbour);

        if (seenOrder[neighbour] === undefined) {
          seenOrder[neighbour] = order++;
        }
      }
    }
  }

  return [];
}
