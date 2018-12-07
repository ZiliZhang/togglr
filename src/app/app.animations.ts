import { trigger, style, animate, transition } from '@angular/animations';

export const slide = trigger('slide', [
    transition(':enter', [
        style({height: 0, transform: 'translateY(-30%)', opacity: 0}),
        animate(`0.25s cubic-bezier(.47,.82,.7,1)`, style({height: '*', transform: 'translateY(0%)', opacity: 1}))
    ]),
    transition(':leave', [
        animate(`0.25s linear`, style({height: 0, transform: 'translateX(-100%)', opacity: 0}))
    ])
]);

export const fadeDown = trigger('fadeDown', [
    transition(':enter', [
        style({transform: 'translateY(-30%)', opacity: 0}),
        animate(`0.3s cubic-bezier(.47,.82,.7,1)`)
    ])
]);

export const fadeUp = trigger('fadeUp', [
    transition(':enter', [
        style({transform: 'translateY(100%)', opacity: 0}),
        animate(`0.25s cubic-bezier(.47,.82,.7,1)`)
    ]),
    transition(':leave', [
        animate(`0.25s cubic-bezier(.47,.82,.7,1)`),
        style({transform: 'translateY(30%)', opacity: 0})
    ])
]);

export const fadeOut = trigger('fadeOut', [
    transition(':enter', [
        style({opacity: 0}),
        animate(`0.25s cubic-bezier(.47,.82,.7,1)`)
    ]),
    transition(':leave', [
        animate(`0.25s cubic-bezier(.47,.82,.7,1)`),
        style({opacity: 0})
    ])
]);
