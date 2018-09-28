import {Component, Input, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {
  @Input()
  rating:number=0;
  stars:boolean[];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.stars=[];
    for(let i=1; i<=5;i++){
      this.stars.push(i>this.rating);
    }
  }

}
