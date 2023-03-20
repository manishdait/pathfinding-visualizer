import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NodeComponent } from './node/node.component';
import { FillMazeDirective } from './fill-maze.directive';
import { MouseActivitesDirective } from './mouse-activites.directive';

@NgModule({
  declarations: [
    AppComponent,
    NodeComponent,
    FillMazeDirective,
    MouseActivitesDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
