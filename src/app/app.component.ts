import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import { inject } from '@vercel/analytics';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  template : `
    <router-outlet />
  `,

})
export class AppComponent {
  ngOnInit() {
    inject();
  }
}
