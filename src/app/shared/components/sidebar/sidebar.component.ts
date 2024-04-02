import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service.ts.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  standalone: false
})
export class SidebarComponent {

  constructor( private gifsService : GifsService ) {}

  get tagsHistory(): string[] {
    return this.gifsService.tagsHistory;
  }

  get apiKey(): string {
    return this.gifsService.apiKey;
  }

  public searchTag(tag: string){
    this.gifsService.searchTag(tag);
  }
}
