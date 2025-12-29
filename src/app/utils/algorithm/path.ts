import { wait } from "../utils";

export function resolvePath(dict: Record<string, string | null>, target: string): string[] {
  const path = [];
  path.push(target);

  let node = target;

  while(dict[node] !== null) {
    path.push(dict[node]!);
    node = dict[node]!;
  }

  path.reverse();
  return path; 
}

export async function drawPath(nodes: string[]) {
  for(var node of nodes){
    document.getElementById(node)!.classList.remove('visited');
    document.getElementById(node)!.classList.add('path');
    await wait(15);
  }
}
