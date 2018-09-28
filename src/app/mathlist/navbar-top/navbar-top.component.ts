import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PublicService} from '../../shared/public.service';

declare var $: any;
@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.css']
})
export class NavbarTopComponent implements OnInit {

  rangeList: Array<ResultRange> = new Array();
  selectedRange: ResultRange = new ResultRange();

  constructor(private router: Router, private routeInfo: ActivatedRoute, private pubService: PublicService) {
  }

  ngOnInit() {
    let rr: ResultRange=new ResultRange();
    rr.begin=1;
    rr.end=10;
    rr.description="1~10";

    let rr2: ResultRange=new ResultRange();
    rr2.begin=11;
    rr2.end=20;
    rr2.description="11~20";

    let rr3: ResultRange=new ResultRange();
    rr3.begin=0;
    rr3.end=0;
    rr3.description="自定义范围";
    this.rangeList.push(rr);
    this.rangeList.push(rr2);
    this.rangeList.push(rr3);
    this.selectedRange=rr2;
  }

  addCountClick(param) {
    this.selectedRange[param]=this.selectedRange[param]+1;
  }

  removeCountClick(param){
    if(this.selectedRange[param]-1>=0) {
      this.selectedRange[param] = this.selectedRange[param] - 1;
    }
  }

  operSymbolChange ( symbolValue){
    this.selectedRange.operSymbol=this.selectedRange.operSymbol+parseInt(symbolValue);
  }

  generateMathItems(){
    this.pubService.navEvent.emit(this.selectedRange);
    $('#prepareMath').modal('hide');
  }

}


export class ResultRange {
  public begin: number;
  public end: number;
  public countItems: number =20;

  public operSymbol: number=3;

  public description: string;

  constructor(){

  }

}

