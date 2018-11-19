import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TaskComponent } from './components/task/task.component';
import { RoundPipe } from './pipes/round.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    RoundPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
