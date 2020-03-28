import { trigger, state, animate, transition, style } from '@angular/animations';

export const slideInOutAnimation =
  trigger('slideInOutAnimation', [
    // end state styles
    state('*', style({
      // the view covers the whole screen
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    })),

    // route 'enter' transition
    transition(':enter', [
      style({
        right: '-400%'
      }),

      animate('.5s ease-in-out', style({
        right: 0
      }))
    ]),

    // route 'leave' transition
    transition(':leave', [
      animate('.5s ease-in-out', style({
        right: '-400%'
      }))
    ])
  ]);
