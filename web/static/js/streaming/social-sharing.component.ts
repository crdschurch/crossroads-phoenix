import { Component, ElementRef, OnInit } from '@angular/core';

declare var addthis: any;

@Component({
  selector: 'social-sharing',
  templateUrl: './social-sharing.component.html',
  properties: ['url', 'title', 'description']
})

export class SocialSharingComponent implements OnInit {
  url:         string;
  title:       string;
  description: string;

  constructor(public element: ElementRef) {
    this.element.nativeElement
  }

  ngOnInit() {
    if (typeof addthis !== 'undefined') {

      addthis.init();
      addthis.toolbox(this.element.nativeElement, 
        {pubid: 'ra-5391d6a6145291c4'}, 
        {
          url: this.url || window.location.href,
          title: this.title || document.querySelector('meta[property="og:title"]')['content'],
          description: this.description || document.querySelector('meta[property="og:description"]')['content']
        });
    } 
  }
}