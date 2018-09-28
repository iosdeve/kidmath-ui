import { Component, OnInit } from '@angular/core';
import {s} from '@angular/core/src/render3';
declare  var $: any;
@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {
  min: number=0;
  sec: number=0;
  ms: number=0;

  msStr: string ='00';
  secStr: string ='00';
  minStr: string ='00';

  timer=null;
  count: number=0;

  constructor() { }

  ngOnInit() {
  }

  show(){
    this.ms++;
    if(this.sec==60){
      this.min++;this.sec=0;
    }
    if(this.ms==100){
      this.sec++;this.ms=0;
    }
    let msStr=String(this.ms);
    if(this.ms<10){
      msStr="0"+this.ms;
    }
    let secStr=String(this.sec);
    if(this.sec<10){
      secStr="0"+this.sec;
    }
    let minStr=String(this.min);
    if(this.min<10){
      minStr="0"+this.min;
    }

    this.minStr=minStr;
    this.secStr=secStr;
    this.msStr=msStr;
  }

  begin( ){
    this.minStr='00';
    this.secStr='00';
    this.msStr='00';
    this.min=0;
    this.sec=0;
    this.ms=0;
    clearInterval(this.timer);
    this.timer=setInterval(()=>{
      this.show();
    },10);
  }

  stop(){
    clearInterval(this.timer);
  }

}
