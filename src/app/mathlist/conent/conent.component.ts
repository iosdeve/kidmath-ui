import { Component, OnInit } from '@angular/core';
import {PublicService} from '../../shared/public.service';
import {ActivatedRoute} from '@angular/router';
import {strictEqual} from 'assert';
import {ResultRange} from '../navbar-top/navbar-top.component';

@Component({
  selector: 'app-conent',
  templateUrl: './conent.component.html',
  styleUrls: ['./conent.component.css']
})
export class ConentComponent implements OnInit {

  mathGroup: Array<string[]> = new Array<string[]>();
  constructor(private pubService: PublicService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.pubService.navEvent.subscribe(selectRange=>{
      if(selectRange instanceof ResultRange) {
        const rr: ResultRange = selectRange;
        let mathItems:Array<string> = this.pubService.getMathItemsAsString(rr.begin, rr.end, rr.operSymbol, rr.countItems);
        this.mathGroup = new Array<string[]>();
        for (let i = 0; i < mathItems.length; i ++) {
          let group=[mathItems[i],mathItems[i+1],mathItems[i+2]];
          this.mathGroup.push(group);
          i=i+2;
        }
        this.mathGroup.push([null,null,null]);
      }
    });
  }

}
