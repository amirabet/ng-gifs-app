import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html'
})

export class LazyImageComponent implements OnInit {
  
  @Input()
  public url!: string;

  @Input()
  public alt: string = "";

  @Input()
  public height: string = "125px";

  public hasLoaded: boolean = false;

  ngOnInit(): void {
    if(!this.url)
      throw new Error('Url property is required.');

    console.log("image HEIGHT: ",this.height);
  }

  onLoad(){
    setTimeout (() => {
      console.log("image Loaded");
      this.hasLoaded = true;
    }, 1000);
    
  }
}
