import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-number-slotter',
  templateUrl: './number-slotter.component.html',
  styleUrls: ['./number-slotter.component.scss'],
})
export class NumberSlotterComponent implements OnInit {

  /**
   * Variable to hold input count
   */
  @Input() count : number = 0;

  /**
   * Variable to emit counter changes
   */
  @Output() counterChange = new EventEmitter();
  
  constructor() { }

  ngOnInit() {}

  /**
   * Increment Counter Value
   */
  incrementCount(){
    this.count += 1;
    this.counterChange.emit(this.count);
  }

  /**
   * Decrement Counter Value
   */
  decrementCount(){
    if(this.count - 1 >= 0){
      this.count -= 1;
      this.counterChange.emit(this.count);
    } 
  }
  
}
