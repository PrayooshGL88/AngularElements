import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { tap } from 'rxjs/operators';

@Component({
  selector: 'user-poll',
  templateUrl: './user-poll.component.html',
  styleUrls: ['./user-poll.component.css'],
  encapsulation: ViewEncapsulation.Native 
})
export class UserPollComponent implements OnInit {

  yes: number;
  no: number;
  hasVoted = false;

  constructor() { 
    
  }

  ngOnInit() {
    
  }

  vote(val: string) {
    this.hasVoted = true;
    
  }

  get yesPercent() {
    return (this.yes / (this.yes + this.no)) * 100
  }

  get noPercent() {
    return (this.no / (this.yes + this.no) ) * 100
  }

}