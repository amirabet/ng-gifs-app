import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private _tagshistory: string[] = [];
  private _giphyApiKey: string = "";
  private _urlService: string = "https://api.giphy.com/v1/gifs";
  private _gifsLimit: number = 15;
  private _localStorageHistoryKey: string = 'history';
  private _sessionStorageApiKey: string = 'giphyApiKey';

  public gifsList: Gif[] = [];

  constructor( private http: HttpClient) { 
    this.loadSessionStorage();
    if(this.hasApiKey())
      this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagshistory];
  }

  get apiKey() {
    return this._giphyApiKey;
  }

  private organizeHistory(tag: string){
    tag = tag.toLowerCase();

    if( this._tagshistory.includes(tag))
      this._tagshistory = this._tagshistory.filter( (oldtag) => oldtag !== tag );

      this._tagshistory.unshift( tag );
      this._tagshistory = this._tagshistory.splice(0, 10);
      this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem(this._localStorageHistoryKey, JSON.stringify(this._tagshistory));
  }

  /*
  * Se pone en el constructor de la clase para ser llamado a cada instanciación 
  */
  private loadLocalStorage(): void {
    if(!this.hasApiKey()){
      console.log('No API key')
      return;
    }

    if(!localStorage.getItem(this._localStorageHistoryKey))
      return;

    this._tagshistory = JSON.parse( localStorage.getItem(this._localStorageHistoryKey)! );
    
    if(this._tagshistory.length === 0)
      return;

    this.searchTag(this._tagshistory[0])
  }

  public hasApiKey (): boolean {
    return this._giphyApiKey !== "";
  }

  public searchTag ( tag: string ): void {
    if(tag.length === 0)
      return;

    this.organizeHistory( tag );

    /*
    * Hecho con método fecth standard de JS
    
    fetch("https://api.giphy.com/v1/gifs/search?api_key=GYPHY_API_KEY&q=lanca delta&limit=15")
      .then( resp => resp.json)
      .then ( data => console.log(data));
    */
    
    /*
    * Objecto de http params nativo de JS
    */
    const params = new HttpParams()
      .set('api_key', this._giphyApiKey)
      .set('q',tag)
      .set('limit', this._gifsLimit.toString())

    /*
    * Hecho con el HttpClient inyectado y usando un Observable para la respuesta
    */
    this.http.get<SearchResponse>(`${ this._urlService }/search`, { params } ).
      subscribe( resp => {
        this.gifsList = resp.data;
      })
  }

  public AddApiKey(newApiKey: string): void{
    this._giphyApiKey = newApiKey;
    this.saveSessionStorage();
  }

  public RemoveApiKey(): void {
    this._giphyApiKey = '';
    sessionStorage.removeItem(this._sessionStorageApiKey);
    this.gifsList = [];
    localStorage.removeItem(this._sessionStorageApiKey);

  }

  private saveSessionStorage(): void {
    sessionStorage.setItem(this._sessionStorageApiKey, this._giphyApiKey);
  }

  private loadSessionStorage(): void {
    if(!sessionStorage.getItem(this._sessionStorageApiKey))
      return;

    this._giphyApiKey = sessionStorage.getItem(this._sessionStorageApiKey)?.toString() || '';
  }

}
