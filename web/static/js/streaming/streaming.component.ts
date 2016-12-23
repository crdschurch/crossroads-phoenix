// angular imports
import { Component, ComponentResolver, ViewChild, DynamicComponentLoader, ViewContainerRef, AfterViewInit } from '@angular/core';

// streaming
import { ContentCardComponent } from './content-card.component';
import { CountdownComponent } from './countdown.component';
import { CurrentSeriesComponent } from './current-series.component';
import { ScheduleComponent } from './schedule.component';
import { SocialSharingComponent } from './social-sharing.component';
import { StreamspotService } from './streamspot.service';
import { StickyHeaderDirective } from './sticky-header.directive';
import { VideoComponent } from './video.component';

// CRDS core
import { DynamicContentNg2Component } from '../../core/dynamic_content/dynamic-content-ng2.component';
import { CMSDataService } from '../../core/services/CMSData.service';

// Third-party
import { PageScroll } from '../ng2-page-scroll/ng2-page-scroll.component';
import { PageScrollConfig } from '../ng2-page-scroll/ng2-page-scroll-config';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

// pipes
import { ReplaceNonAlphaNumericPipe } from '../media/pipes/replace-non-alpha-numeric.pipe';
import { HtmlToPlainTextPipe } from '../../core/pipes/html-to-plain-text.pipe';
import { TruncatePipe } from '../../core/pipes/truncate.pipe';


var WOW = require('wow.js/dist/wow.min.js');
var $:any = require('jquery');
var bootstrap:any = require('bootstrap');
declare var _: any;

@Component({
  selector: 'streaming-ng2',
  directives: [
    MODAL_DIRECTIVES,
    DynamicContentNg2Component, 
    ScheduleComponent, 
    CountdownComponent,
    SocialSharingComponent, 
    PageScroll, 
    StickyHeaderDirective,
    ContentCardComponent, 
    CurrentSeriesComponent,
    VideoComponent
  ],
  templateUrl: './streaming.ng2component.html',
  providers: [CMSDataService],
  pipes: [
    ReplaceNonAlphaNumericPipe, 
    HtmlToPlainTextPipe, 
    TruncatePipe 
  ]
})

export class StreamingComponent {
  @ViewChild('videoTarget', {read: ViewContainerRef}) videoTarget;
  @ViewChild('watchNowModal') watchNowModal: ModalComponent;
  videoComponent: any;
  inProgress: boolean = false;
  currentSeries: any;
  pastWeekends: any = [];

  constructor(private streamspotService: StreamspotService, 
              private cmsDataService: CMSDataService,
              private componentResolver:ComponentResolver,
              private viewContainerRef:ViewContainerRef) {

    PageScrollConfig.defaultScrollOffset = -10;
    PageScrollConfig.defaultEasingFunction = (t:number, b:number, c:number, d:number):number => {
      if (t === 0) return b;
      if (t === d) return b + c;
      if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    };

    this.streamspotService.isBroadcasting.subscribe((inProgress: boolean) => {
      this.inProgress = inProgress;
    });

    new WOW({
      offset: 100,
      mobile: false
    }).init();

    var pastWeekendTotal = 0;
    var maxPastWeekends = 4;

    this.cmsDataService
        .getXMostRecentMessages(maxPastWeekends)
        .subscribe((pastWeekends) => {
          
          var queriedPastWeekends = pastWeekends;
          queriedPastWeekends.forEach((event, i, pastWeekends) => {

            pastWeekendTotal++;
            if ( pastWeekendTotal > maxPastWeekends ) {
              return false;
            }

            if (typeof event.series !== "undefined") {
              let slugPipe = new ReplaceNonAlphaNumericPipe();

              event.delay = i * 100;
              event.subtitle = event.title
              if (event.number === 0) {
                event.number++;
              }
              event.title = `${event.series.title} #${event.number}`;

              event.url = `/message/${event.id}/${slugPipe.transform(event.title)}`
              event.image = 'https://crds-cms-uploads.imgix.net/content/images/register-bg.jpg'

              if (typeof event.messageVideo !== "undefined" && typeof event.messageVideo.still !== 'undefined') {
                event.image = event.messageVideo.still.filename
              } 
            }
          })

          queriedPastWeekends = queriedPastWeekends.slice(0,maxPastWeekends);
          this.pastWeekends = queriedPastWeekends;

        });
  }

  watchNowClicked(event) {
    if (this.inProgress) {
      this.watchNowModal.open();

      if (typeof this.videoComponent !== 'undefined') { 
        this.videoComponent.destroy(); 
      }

      this.componentResolver.resolveComponent(VideoComponent).then((factory) => {
        this.videoComponent = this.videoTarget.createComponent(factory);
        this.videoComponent.instance.inModal = true;
      })
    }
  }
  
  modalClose() {
    this.videoComponent.destroy(); 
  }

}
