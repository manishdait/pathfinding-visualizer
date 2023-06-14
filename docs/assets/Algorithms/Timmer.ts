const timer = (ms: number | undefined) => new Promise(res=>setTimeout(res,ms));
let speed = 0;
export async function wait(delay:number){
   await timer(delay);
}

