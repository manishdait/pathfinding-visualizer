export class Maze{
    async randomMaze(row:any, column:any, goal:any){
        for(var i=0; i<=(((row*column)/2)-(column+(column+100))); i++){
            var r = Math.floor(Math.random()*row);
            var c = Math.floor(Math.random()*column);
            var node = `[${r},${c}]`;
            
            if(!document.getElementById(node)?.firstElementChild?.hasChildNodes() && node != goal){
                document.getElementById(node)?.firstElementChild?.classList.add('wall');
            }
        }
    }

    async randomWeight(row:any, column:any){
        for(var i=0; i<=(((row*column)/2)-(column+(column+100))); i++){
            var r = Math.floor(Math.random()*row);
            var c = Math.floor(Math.random()*column);
            var node = `[${r},${c}]`;
            
            if(!document.getElementById(node)?.firstElementChild?.hasChildNodes()){
                var img = document.createElement('span');
                img.className = 'material-symbols-outlined';
                img.classList.add('icon');
                img.classList.add('fill');
                img.innerHTML = 'weight';
                document.getElementById(node)!.setAttribute('weight','15');
                document.getElementById(node)?.firstElementChild?.appendChild(img);;
            }
        }
    }
}