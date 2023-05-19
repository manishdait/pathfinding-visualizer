export class Grid{
    mapGrid(row:number, col:number){
        let graph:any = {};
        let i =0;
        while(i < row){
            for(var j = 0; j<col; j++){
                var node = `[${i},${j}]`;
                var neighbor = [];
                var topEle = document.getElementById(`[${i-1},${j}]`);
                var rightEle = document.getElementById(`[${i},${j+1}]`);
                var leftEle = document.getElementById(`[${i},${j-1}]`);
                var bottomEle = document.getElementById(`[${i+1},${j}]`);
    
                
    
                if(topEle != null){
                    neighbor.push(`[${i-1},${j}]`);
                }
    
                if(rightEle != null){
                    neighbor.push(`[${i},${j+1}]`);
                }
    
                if(bottomEle != null){
                    neighbor.push(`[${i+1},${j}]`);
                }
    
                
                if(leftEle != null){
                    neighbor.push(`[${i},${j-1}]`);
                }
    
                graph[node] = neighbor        
            }
            i++;
        }
        return graph;
      }
    
}