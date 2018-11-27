import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TaskComponent } from './components/task/task.component';
import { RoundPipe } from './pipes/round.pipe';
import { ElasticDirective } from './directives/elastic.directive';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    RoundPipe,
    ElasticDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ TaskComponent ]
})
export class AppModule { }
