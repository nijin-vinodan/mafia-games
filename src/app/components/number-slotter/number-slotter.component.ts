import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-number-slotter',
  templateUrl: './number-slotter.component.html',
  styleUrls: ['./number-slotter.component.scss'],
})
export class NumberSlotterComponent implements OnInit {

  count = 0;

  constructor() { }

  ngOnInit() {}

  /**
   * Increment Counter Value
   */
  incrementCount() {
    this.count += 1;
  }

  /**
   * Decrement Counter Value
   */
  decrementCount() {
    if (this.count - 1 >= 0) {
      this.count -= 1;
    }
  }

}
