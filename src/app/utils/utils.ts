const timer = (ms: number | undefined) => new Promise(res=>setTimeout(res,ms));
export async function wait(delay:number){
   await timer(delay);
}

export function mapGrid(rowEnd: number, colEnd: number): {[key: string]:string[]} {
  const graph: {[key: string]:string[]} = {};
  
  for (let i = 0; i < rowEnd; i++) {
    for (let j = 0; j < colEnd; j++) {
      const node = document.getElementById(`${i},${j}`);
      graph[`${i},${j}`] = [];

      if (i-1 >= 0) {
        graph[`${i},${j}`].push(`${i-1},${j}`);
      }

      if (j+1 < colEnd) {
        graph[`${i},${j}`].push(`${i},${j+1}`);
      }

      if (i+1 < rowEnd) {
        graph[`${i},${j}`].push(`${i+1},${j}`);
      }

      if (j-1 >= 0) {
        graph[`${i},${j}`].push(`${i},${j-1}`);
      }
    }
  }

  return graph;
}