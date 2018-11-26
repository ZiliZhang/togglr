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
    now: DateTime = DateTime.local();
    ticks: Tick[] = [];
    timer: any;
    totalDuration: number = 0;
    active: boolean = false;
    minuteHand : any;


    constructor(private viewContainerRef: ViewContainerRef) { }

    ngOnInit(): void {
        setInterval(()=> {
            this.now = DateTime.local();
        }, 60000);
    }

    track(event: MouseEvent): void {
        event.preventDefault();
        if(this.active) {
            this.active = false;
            let lastTick = this.ticks[this.ticks.length - 1];
            if(lastTick){
                lastTick.tockOutAt = this.now;
                lastTick.duration  = lastTick.tockOutAt.diff(lastTick.tickInAt, 'hours').hours - 0;
                this.totalDuration += lastTick.duration;

                //if the lastTick's duration is 0, then remove it from ticks
                if(!lastTick.duration) this.ticks.pop();
            }

            //if the total duration is 0, then clean ticks
            if(!this.totalDuration) this.ticks = [];

            this.endTimer();
        } else {
            this.active = true;
            let tick = new Tick;
            tick.tickInAt = this.now;
            this.ticks.push(tick);
            this.startTimer(tick);
        }
    }

    startTimer(tick: Tick): void {
        this.timer = this.now.diff(tick.tickInAt, ['hours', 'minutes']);
        this.minuteHand = setInterval(()=> {
            if(this.active) this.timer = this.now.diff(tick.tickInAt, ['hours','minutes']);
        }, 60000);
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
