const timer = (ms: number | undefined) => new Promise(res=>setTimeout(res,ms));
export async function wait(delay:number){
   await timer(delay);
}

