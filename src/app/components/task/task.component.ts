import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { DateTime } from 'luxon';

import { Tick } from '../../classes/tick';

import { fadeDown, fadeUp, fadeOut, slide } from '../../app.animations';

@Component({
  selector: 'c-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  animations:[ fadeDown, fadeUp, fadeOut, slide ],
})
export class TaskComponent implements OnInit {
    taskName: string;
    active: boolean = false;
    ticks: Tick[] = [];
    timer: any;
    totalDuration: number = 0;
    minuteHand : any;
    delay: number = 60000;
    showTask: boolean = true;
    copied: boolean = false;
    currentTick: Tick;

    readonly oneMinute: number = 1/60;

    @ViewChild('notes') notesForm;

    constructor(private viewContainerRef: ViewContainerRef) {}

    ngOnInit(): void {}

    track(event: MouseEvent): void {
        event.preventDefault();
        if(this.active) {
            this.active = false;
            let lastTick = this.ticks[this.ticks.length - 1];
            if(lastTick){
                lastTick.tockOutAt = DateTime.local();
                this.updateTickDuration(lastTick);
            }
            this.endTimer();
        } else {
            this.active = true;
            let tick = new Tick;
            tick.tickInAt = DateTime.local();
            this.ticks.push(tick);
            this.currentTick = tick;
            this.setTimer();
        }
    }

    setTimer(): void {
        this.timer = DateTime.local().diff(this.currentTick.tickInAt, ['hours','minutes']);
        this.minuteHand = setInterval(()=> {
            if(this.active) this.timer = DateTime.local().diff(this.currentTick.tickInAt, ['hours','minutes']);
        }, this.delay);
    }

    endTimer(): void {
        this.timer = null;
        clearInterval(this.minuteHand);
    }

    updateTickIn(tick: Tick, e){
        tick.tickInAt = tick.tickInAt.set({hour: parseInt(e.split(':')[0]),minute: parseInt(e.split(':')[1])});
        if(tick.tockOutAt) this.updateTickDuration(tick);
    }

    updateTimer(tick: Tick){
        if(tick == this.currentTick) {
            this.currentTick = tick;
            this.setTimer();
        }
    }

    updateTockOut(tick: Tick, e){
        tick.tockOutAt = tick.tockOutAt.set({hour: parseInt(e.split(':')[0]),minute: parseInt(e.split(':')[1])});
    }

    updateTickDuration(tick:Tick){
        //subtract old duration from totalDuration
        if(tick.duration) this.totalDuration -= tick.duration;
        //get/re-calculate duration
        tick.duration  = tick.tockOutAt.diff(tick.tickInAt).as('hours');

        //if the lastTick's duration is less than 1 minute, then remove it from ticks
        if(tick.duration < this.oneMinute) {
            this.ticks.pop();
        } else {
            this.totalDuration += tick.duration;
        }

        //if the total duration is less than 1 minute, then clean ticks
        if(this.totalDuration < this.oneMinute) {
            this.ticks = [];
            this.notesForm.control.markAsPristine();
        }
    }

    removeTick(tick: Tick) {
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

    removeTask() {
        this.showTask = false;
        setTimeout(() => {
            this.viewContainerRef
                .element
                .nativeElement
                .parentElement
                .removeChild(this.viewContainerRef.element.nativeElement);
        }, 250);
    }

    copyToClipboard(): void {
        let plainText: string = '';
        for(let tick of this.ticks) {
            if(tick.note){
                let note = tick.note.replace(/\r\n|\r|\n/g, '\n  ');
                plainText += `* ${note} \n`;
            }
        }

        function listener(e) {
            e.clipboardData.setData('text/plain', plainText);
            e.preventDefault();
        }

        document.addEventListener('copy', listener);
        document.execCommand('copy');
        document.removeEventListener('copy', listener);

        this.copied = true;
        setTimeout(() => {
            this.copied = false;
        }, 1500);

    }

}
