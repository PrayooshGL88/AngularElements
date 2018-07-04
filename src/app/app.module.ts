import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import {DemoService} from "./Services/demo.service"
import { DummyVoteComponent } from './framework-vote/framework-vote.component';
import { HttpClientModule } from '@angular/common/http';
import { Injector } from '@angular/core';
import { NgModule } from '@angular/core';
import { UserPollComponent } from "./user-poll/user-poll.component";
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent,
    DummyVoteComponent,
    UserPollComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  entryComponents: [
    DummyVoteComponent,
    UserPollComponent
  ],
  providers: [DemoService],
  bootstrap: [UserPollComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
  }
  ngDoBootstrap() {
    const el = createCustomElement(UserPollComponent, { injector: this.injector });
    customElements.define('user-poll', el);
  }
}
