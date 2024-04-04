import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appMapMaze]',
  standalone: true
})
export class MapMazeDirective {

  @Input() appMapMaze: any;
  @Input() appMapMazeCol: any;

  constructor(private template: TemplateRef<any>, private view: ViewContainerRef) { }

 ngOnInit(): void {
  let count: number = 0;
  for(var i=0; i<this.appMapMaze; i++) {
    for(var j=0; j<this.appMapMazeCol; j++) {
      const contex = {
        appMapMazeId: `[${i},${j}]`,
        appMapMazeCount: count
      };
      this.view.createEmbeddedView(this.template, contex);
      count++;
    }
  }
 }

}
