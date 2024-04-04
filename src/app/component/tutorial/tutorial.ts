import { CardTemplate } from "./card/card_template";

export const tutorials: CardTemplate[] = [
    {
      title: `Welcome to PathFinding Visualizer`,
      heading: `This is a tutuorial which will help to understand feature of these application.`,
      sub_heading: `
        If you want to dive right in, feel free to press the "Skip Tutorial" 
        button below. Otherwise, press "Next"!
      `,
      img: `assets/image/icon.png`
    },
    {
      title: `What is PathFinding Visualizer?`,
      heading: `
        A pathfinding algorithm seeks to find the shortest path between two points. 
        This application currently visualizes three pathfinding algorithms in action, and more to come!
      `,
      sub_heading: `
        All of the algorithms on this application are adapted for a 2D grid, 
        where movements from a node to another have a "cost" of 1.
      `,
      img: `assets/image/graph.png`
    },
    {
      title: `Picking an algorithm`,
      heading: `Choose an algorithm from the "Algorithms" drop-down menu.`,
      sub_heading: `
        Note that some algorithms are unweighted, while others are weighted. 
        Unweighted algorithms do not weight nodes into account, whereas weighted ones do. Additionally, 
        not all algorithms guarantee the shortest path.
      `,
      img: `assets/image/menu.gif`
    },
    {
      title: `Meet the algorithms`,
      heading: `Not all algorithms are created equal.`,
      sub_heading: `
        <div class="list_view">
          <p><strong>Breath-first Search</strong> (unweighted): a great algorithm; guarantees the shortest path.<p>
          <p><strong>Depth-first Search</strong>  (unweighted): a very bad algorithm for pathfinding; does not guarantee the shortest path.</p>
          <p><strong>Dijkstra\'s Algorithm</strong>  (weighted): the father of pathfinding algorithms; guarantees the shortest path</p>
          <p><strong>Birdirectional Algorithm</strong>  (unweighted): the bidirectional pathfinding algorithms; guarantees the shortest path</p>
          <p><strong>Astar Algorithm</strong>  (weighted): most effective of pathfinding algorithms; guarantees the shortest path</p>
        </div>`,
      img: ``
    },
    {
      title: `Adding walls and weights`,
      heading: `
        Click on the grid to add a weight. Move mouse on the grid while pressing Alt to add a wall. 
        Generate mazes and patterns from the "Mazes & Patterns" drop-down menu.
      `,
      sub_heading: `
        Walls are impenetrable, meaning that a path cannot cross through them. Weights, however, are not impassable. 
        They are simply more "costly" to move through. In this application, moving through a weight node has a "cost" of 15.
      `,
      img: `assets/image/wall.gif`
    },
    {
      title: `Adding a bomb`,
      heading: `Click the "Add Bomb" button.`,
      sub_heading: `
        Adding a bomb will change the course of the chosen algorithm. In other words, 
        the algorithm will first look for the bomb (in an effort to diffuse it) and will then look for the target node.
      `,
      img: `assets/image/boom.png`
    },
    {
      title: `Enjoy!`,
      heading: `I hope you have just as much fun playing around with this visualization tool as I had building it!`,
      sub_heading: `
        For Better experience use Laptop or PC.<br>
        If you want to see the source code for this application, check out my 
        <a href="https://github.com/ManishDait/pathfinding-visualizer" style="text-decoration: none;">github</a>.
      `,
      img: ``
    }
]