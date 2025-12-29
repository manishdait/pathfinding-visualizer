import { drawPath } from "./path";

export enum Algorithm {
  BREATH_FIRST_SEARCH = 'Breath First Search',
  DEPTH_FIRST_SERACH = 'Depth First Search',
  DIJKTRAS = 'Dijktras', 
  BIDIRECTIONAL = 'Bidirectional', 
  ASTAR = 'Astar'
};

export async function search (
  graph: Record<string, string[]>, 
  source: string, 
  target: string, 
  search: (
    graph: Record<string, string[]>, 
    source: string, 
    target: string, 
    visitedClass: string
  ) => Promise<string[]>,
  hop: string | null = null, 
  hasHop: boolean = false
) {
  let pathA: string[] = [];
  let pathB: string[] = [];

  if (hasHop) {
    pathA = await search(graph, source, hop!, 'visited_a');
    source = hop!;
  }

  pathB = await search(graph, source, target, 'visited_b');
  await drawPath(pathA);
  await drawPath(pathB);
}