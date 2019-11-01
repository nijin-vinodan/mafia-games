import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShuffleService {

  times = 2000;
  constructor() { }

  /**
   * Randomize a given array
   * @param arr
   */
  private randomize(arr) {
    let counter: number = arr.length;
    let temp, index;
    while (counter > 0) {
      index = Math.floor(Math.random() * counter);
      counter--;
      temp = arr[counter];
      arr[counter] = arr[index];
      arr[index] = temp;
    }
    return arr;
  }

  /**
   * Shuffle
   * @param arr
   */
  async shuffle(arr) {
    let times = this.times;
    while ( times ) {
      console.log("Randomizing");
      arr = this.randomize(arr);
      times--;
    }
    return arr;
  }
}

