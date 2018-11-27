import { Component, OnInit, ViewContainerRef} from '@angular/core';
import { DateTime } from 'luxon';

import { Tick } from '../../classes/tick';

@Component({
  selector: 'c-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
    taskName: string;
    active: boolean = false;
    ticks: Tick[] = [];
    timer: any;
    totalDuration: number = 0;
    minuteHand : any;
    delay: number = 60000;


    constructor(private viewContainerRef: ViewContainerRef) { }

    ngOnInit(): void {}

    track(event: MouseEvent): void {
        event.preventDefault();
        if(this.active) {
            this.active = false;
            let lastTick = this.ticks[this.ticks.length - 1];
            if(lastTick){
                lastTick.tockOutAt = DateTime.local();
                lastTick.duration  = lastTick.tockOutAt.diff(lastTick.tickInAt).as('hours');
                console.log(lastTick.duration);
                //if the lastTick's duration is less than 1 minute, then remove it from ticks
                if(lastTick.duration < 0.0166) {
                    this.ticks.pop();
                } else {
                    this.totalDuration += lastTick.duration;
                }
            }
            //if the total duration is less than 1 minute, then clean ticks
            if(this.totalDuration < 0.0166) this.ticks = [];

            this.endTimer();
        } else {
            this.active = true;
            let tick = new Tick;
            tick.tickInAt = DateTime.local();
            this.ticks.push(tick);
            this.startTimer(tick);
        }
    }

    startTimer(tick: Tick): void {
        this.timer = DateTime.local().diff(tick.tickInAt, ['hours','minutes']);
        this.minuteHand = setInterval(()=> {
            if(this.active) this.timer = DateTime.local().diff(tick.tickInAt, ['hours','minutes']);
        }, this.delay);
    }

    endTimer(): void {
        this.timer = null;
        clearInterval(this.minuteHand);
    }

    removeTick(tick: Tick){
        let index = this.ticks.indexOf(tick);
        if(index > -1) {
            this.totalDuration -= tick.duration;
            this.ticks.splice(index , 1);

            if(this.ticks.length == 0) {
                this.active = false;
                this.ticks = []
                this.totalDuration = 0;
                this.endTimer();
            }
        }
    }

    removeTask(){
        this.viewContainerRef
            .element
            .nativeElement
            .parentElement
            .removeChild(this.viewContainerRef.element.nativeElement);
    }

}
