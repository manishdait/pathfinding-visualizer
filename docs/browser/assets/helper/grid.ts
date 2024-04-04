export class Grid{
    mapGrid(row:number, col:number): {[key: string]:string[]} {
        let graph:{[key: string]:string[]} = {};
        let i =0;
        while(i < row){
            for(var j = 0; j<col; j++){
                var node = `[${i},${j}]`;
                var neighbour = [];
                var topElement = document.getElementById(`[${i-1},${j}]`);
                var rightElement = document.getElementById(`[${i},${j+1}]`);
                var leftElement = document.getElementById(`[${i},${j-1}]`);
                var bottomElement = document.getElementById(`[${i+1},${j}]`);
    
                if(topElement != null){
                    neighbour.push(`[${i-1},${j}]`);
                }
    
                if(rightElement != null){
                    neighbour.push(`[${i},${j+1}]`);
                }
    
                if(bottomElement != null){
                    neighbour.push(`[${i+1},${j}]`);
                }
    
                
                if(leftElement != null){
                    neighbour.push(`[${i},${j-1}]`);
                }
    
                graph[node] = neighbour        
            }
            i++;
        }
        return graph;
    }

    mapHurestic(goal: string, row: number, col: number) {
        let hurestic: {[key: string]: number} = {};
        let cordinate = goal.replace('[', '').replace(']', '').split(',');
        let goal_row:number = parseInt(cordinate[0]);
        let goal_col = parseInt(cordinate[1]);
        
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                hurestic[`[${i},${j}]`] = Math.abs(goal_row - i) + Math.abs(goal_col - j);
            }
        }

        return hurestic;
    }
}