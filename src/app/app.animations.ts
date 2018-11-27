import { trigger, state, style, animate, transition,  animation } from '@angular/animations';

export const slide = trigger('slide', [
    transition(':enter', [
        animation([
            style({transform: 'translateY(-30%)', opacity: 0}),
            animate(`0.25s cubic-bezier(.47,.82,.7,1)`)
        ])
    ]),
    transition(':leave', [
        animation([
            animate(`0.25s linear`),
            style({transform: 'translateX(-100%)', opacity: 0})
        ])
    ])
]);

export const fadeDown = trigger('fadeDown', [
    transition(':enter', [
        animation([
            style({transform: 'translateY(-30%)', opacity: 0}),
            animate(`0.25s cubic-bezier(.47,.82,.7,1)`)
        ])
    ]),
    transition(':leave', [
        animation([
            animate(`0.25s cubic-bezier(.47,.82,.7,1)`),
            style({transform: 'translateY(-30%)', opacity: 0})
        ])
    ])
]);
