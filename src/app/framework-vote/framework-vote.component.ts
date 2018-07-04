import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

import {DemoService} from "../Services/demo.service";
import {Observable} from 'rxjs';

@Component({
  selector: 'dummy-vote',
  templateUrl: './framework-vote.component.html',
  styleUrls: ['./framework-vote.component.css'],
  encapsulation: ViewEncapsulation.Native
})
export class DummyVoteComponent implements OnInit {
  
  @Input() logo: string;
  @Input() title: string;
  @Output() like = new EventEmitter();
  @Output() dislike = new EventEmitter();
  likeCount = 0;
  dislikeCount = 0;
  userList:any = [];
  constructor(private demoService: DemoService) {
    
  }
  ngOnInit() {
    
    this.demoService.getBooksAndMovies().subscribe(
      (data:any) => {
        // refresh the list
        console.log(data);
        this.userList = data[0].data;
        return true;
      },
      error => {
        console.error("Error saving food!");
        // return Observable.throw(error);  // Angular 5/RxJS 5.5
        return false;
      }
   );
  }
  vote(type: string) {
    if (type === 'like') {
      this.likeCount++;
      this.like.emit(this.likeCount);
    } else {
      this.dislikeCount++;
      this.dislike.emit(this.dislikeCount);
    }
  }
}