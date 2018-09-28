import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {PublicService} from '../shared/public.service';
import {ResultRange} from '../mathlist/navbar-top/navbar-top.component';
import 'rxjs/add/operator/filter';
import {TimeComponent} from '../time/time.component';

declare var $: any;
declare var JumpObj: any;
declare var layer: any;
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  mathItems: Array<number[]>;
  answers: Array<number>;

  previousItems: number[];

  rightAnswerCount: number =0;
  errorAnswerCount: number=0;
  starsRating: number=0;

  total: number=0;
  clickFinish: boolean =true;
  //Pop setting
  rangeList: Array<ResultRange> = new Array();
  selectedRange: ResultRange = new ResultRange();

  @ViewChild('time') timeComponent: TimeComponent;


  constructor(private pubService: PublicService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.initListbox();
    // this.router.events
    //   .subscribe((event) => {
    //     if (event instanceof NavigationEnd) {
    //       $('body').css('background','url(/assets/images/bg.png)');
    //     }else if(event instanceof NavigationStart ){
    //       $('body').css('background','');
    //     }
    //   });
    // this.mathItems=this.pubService.buildMathItems(5,10,3,this.total);
    // this.answers=this.pubService.getRadomAnwser(5,10,this.mathItems[0][2]);
    // console.log(this.mathItems[0][0]+","+this.mathItems[0][1]+","+this.mathItems[0][2]);
  }

  ngOnInit() {
    this.pubService.navEvent.subscribe(selectRange=>{
      if(selectRange instanceof ResultRange) {
        this.selectedRange = selectRange;
        this.mathItems=this.pubService.buildMathItems(this.selectedRange.begin,this.selectedRange.end,this.selectedRange.operSymbol,this.selectedRange.countItems);
        this.answers=this.pubService.getRadomAnwser(this.selectedRange.begin,this.selectedRange.end,this.mathItems[0][2]);
        this.total=this.mathItems.length;
        if(this.mathItems.length>0){
          this.timeComponent.begin();
        }
      }
    });

    if(this.selectedRange !=null){
      $('#prepareMath').modal({backdrop: 'static', keyboard: false});
    }

  }



  clickAnswer(answer: number, event: any){
    if(this.clickFinish==false){
      return;
    }
    this.clickFinish=false;
    if(this.mathItems[0][2]==answer){
      if (this.previousItems !=this.mathItems[0]) {
        this.rightAnswerCount++;
      }
      this.previousItems = this.mathItems[0];
      let top = $('#resultCard').offset().top;
      let left = $('#resultCard').offset().left;

      let target=$(event.currentTarget);
      target.css('position','fixed');
      let topold = target.offset().top;
      let leftold =target.offset().left;
      target.animate({left:left+'px', top:top+'px'},800, ()=>{
        target.css('position','static');
        target.css('top',topold);
        target.css('left',leftold);
        if(this.mathItems.length==1){
          this.starsRating=this.rightAnswerCount/(this.rightAnswerCount+this.errorAnswerCount)*5;
          this.timeComponent.stop();
          $('#testResultModel').modal({backdrop: 'static', keyboard: false});
          return;
        }
        this.mathItems.shift();
        this.answers=this.pubService.getRadomAnwser(this.selectedRange.begin,this.selectedRange.end,this.mathItems[0][2]);
        this.clickFinish=true;
      });
    }else{
      let card=event.currentTarget;
      JumpObj(card,20);
      layer.msg('错啦',{icon: 5, time: 800});
      this.clickFinish=true;

      if (this.previousItems !=this.mathItems[0]) {
        this.errorAnswerCount++;
      }
    }
    this.previousItems=this.mathItems[0];
  }

  showSettingModel(){
    this.errorAnswerCount=0;
    this.rightAnswerCount=0;
    this.clickFinish=true;
    $('#prepareMath').modal({backdrop: 'static', keyboard: false});
  }
  repeatMathItems( ){
    this.errorAnswerCount=0;
    this.rightAnswerCount=0;
    this.clickFinish=true;
    this.generateMathItems();
  }


  /*
  *pop setting Model
  *
  *
  */

  initListbox(){
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
    this.selectedRange.countItems=5;
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
