import { Directive, TemplateRef, ViewContainerRef, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appFillMaze]'
})
export class FillMazeDirective implements OnInit {

  @Input() appFillMaze: any;
  @Input() appFillMazeCol: any;

  constructor(private template: TemplateRef<any>, private view: ViewContainerRef) { }

 ngOnInit(): void {
  let count: number = 0;
  for(var i=0; i<this.appFillMaze; i++) {
    for(var j=0; j<this.appFillMazeCol; j++) {
      const contex = {
        appFillMazeId: `[${i},${j}]`,
        appFillMazeCount: count
      };
      this.view.createEmbeddedView(this.template, contex);
      count++;
    }
  }
 }
}
