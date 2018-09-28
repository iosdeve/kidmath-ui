import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
declare var $: any;
@Injectable()
export class PublicService {
  urlMathItems='kidmath/generatemathitems';

  navEvent =new EventEmitter();

  constructor(private  http: HttpClient, private router: Router) {
    this.router.events
      .subscribe((event) => {
        // if (event instanceof NavigationEnd) {
        //   $('body').css('background','url(/assets/images/bg.png)');
        // }else if(event instanceof NavigationStart ){
        //   $('body').css('background','');
        // }

        console.log(event);
      });
  }

  generateMathItems(begin:number, end:number, operateSymbol:string, count: number): Observable<Array<string>>{
    let url=this.urlMathItems+"?rangeBegin="+begin+"&rangeEnd="+end+"&operation="+operateSymbol+"&count="+count;;
    return this.http.get<Array<string>>(url).pipe();
  }

  getMathItemsAsString (rangeBegin: number, rangeEnd: number, operation: number, count: number): Array<string>{
    let selectedItems: Array<number[]> = this.buildMathItems(rangeBegin,rangeEnd,operation,count);
    let mathItems: Array<string>=new Array<string>();
    selectedItems.forEach(math=>{
      let symbol: string = math[3]==0?"+":"-";
      let item: string=math[0]+symbol+math[1]+"=";
      mathItems.push(item);
    });
    return mathItems;
  }


  buildMathItems(rangeBegin: number, rangeEnd: number, operation: number, count: number) :Array<number[]>{
    const mathItems: Array <number[]> = new Array <number[]> ();
    for(let i=rangeBegin; i<=rangeEnd; i++) {

      for(let num1=1; num1<=i; num1++) {
        let num2=i-num1;
        if(num1>num2) {
          break;
        }
        let math: number [] = [num1, num2, i, 0];
        mathItems.push(math);

      }
    }
    let selectedItems: Array <number[]> =   new Array <number[]> ();
    for(let i=0; i<count; i++) {
      let size: number =mathItems.length;
      if(size<1) {
        break;
      }
      let selectIndex: number=Math.floor(Math.random()*(size));
      let item: number []  = mathItems[selectIndex];

      //随机交互两个加数的位置
      if(selectIndex%2==0) {
        let temp: number=item[0];
        item[0]=item[1];
        item[1]=temp;
      }
      let selectOperation: number = Math.floor(Math.random()*(2));
      if(operation==3) {
        if(selectOperation==0) {

        }else {
          let temp: number=item[0];
          item[0]=item[2];
          item[2]=temp;
          item[3]=1;
        }
      }else if(operation==2) {
        let temp: number=item[0];
        item[0]=item[2];
        item[2]=temp;
        item[3]=1;

      }else if(operation==1){

      }
      selectedItems.push(item);
      mathItems.splice(selectIndex,1);
    }
    return selectedItems;
  }

  getRadomAnwser(rangeBegin: number, rangeEnd: number, rightAnswer: number): Array<number>{
    rangeBegin = parseInt(String(rangeBegin));
    rangeEnd = parseInt(String(rangeEnd));
    let answers: Array<number> = new Array<number>();
    for( let i=0; i<4; i++) {
      let rangeBegin2=(rangeBegin-4) >= 0 ? rangeBegin-4 : 0;
      let randomNumber=Math.floor(Math.random() * (rangeEnd+4 - rangeBegin2));
      let answer: number = rangeBegin2 + randomNumber + 1;
      if(answers.indexOf(answer)>=0 || answer==rightAnswer){
        i--;
      }else {
        answers.push(answer);
      }
    }

    let index: number = Math.floor(Math.random() * (4));
    answers[index]=rightAnswer;
    return answers;
  }
}
