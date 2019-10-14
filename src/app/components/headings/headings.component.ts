import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-headings',
  templateUrl: './headings.component.html',
  styleUrls: ['./headings.component.scss'],
})
export class HeadingsComponent implements OnInit {

  @Input() heading: string;
  @Input() textSize: string = "14px";
  
  constructor() { }

  ngOnInit() {}

}
