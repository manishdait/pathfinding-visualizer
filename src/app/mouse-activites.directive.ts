import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMouseActivites]'
})
export class MouseActivitesDirective {

  @Input() isWeight:any;

  constructor(private element:ElementRef, private renderer: Renderer2) { 
    this.renderer.setStyle(this.element.nativeElement,'cursor','pointer')
  }

  @HostListener('dragover') createWall(){
    var ele = this.element.nativeElement.firstChild;
    if(!ele.hasChildNodes()){
      ele.classList.add('wall');
    }
    
  }

  @HostListener('click') createWeight(){

    var ele = this.element.nativeElement.firstChild;
    if(ele.classList.contains('wall')){
      ele.classList.remove('wall');
      return;
    }

    if(ele.hasChildNodes()){
      this.element.nativeElement.setAttribute('weight','1');
      ele.removeChild(ele.firstChild);
      return;
    }

    if(this.isWeight){
      var img = document.createElement('span');
      img.className = 'material-symbols-outlined'
      img.classList.add('icon')
      img.innerHTML = 'weight'
      this.element.nativeElement.setAttribute('weight','15');
      ele.appendChild(img);
      console.log(this.isWeight)
    }

  }

}
