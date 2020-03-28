import { trigger, animate, transition, style } from '@angular/animations';
export const fadeInAnimation =
  // triggername: fadeInAnimation
  trigger('fadeInAnimation', [
    // route enter transition
    transition(':enter', [
      // start style
      style({ opacity: 0 }),
      // duration and style at the end of the transition
      animate('0.3s', style({ opacity: 1 }))
    ])
  ]);
