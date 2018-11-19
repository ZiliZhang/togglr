import { Component, OnInit } from '@angular/core';
import { DateTime, Duration } from 'luxon';

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


    constructor() { }

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
            lastTick.tockOutAt = this.now;
            lastTick.duration  = lastTick.tockOutAt.diff(lastTick.tickInAt, 'hours').hours - 0;
            this.totalDuration += lastTick.duration;
            this.endTimer();
            if(!this.totalDuration) this.ticks = [];
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
        setInterval(()=> {
            if(this.active) this.timer = this.now.diff(tick.tickInAt, ['hours','minutes']);
        }, 60000);
    }

    endTimer(): void {
        this.timer = null;
    }

}
