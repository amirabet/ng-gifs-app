import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service.ts.service';

/*
*
* Aquí usamos una REFERENCIA LOCAL para trabajar con el valor del input
* usando #txtTagInput y de ella obteniendo directamente el valor: txtTagInput.value
* 
* 
@Component({
    selector: 'gifs-search-box',
    template: `
        <h5>Buscar:</h5>
        <input type="text"
            class="form form-control"
            placeholder="Buscar gifs..."
            (keyup.enter)="searchTag( txtTagInput.value )"
            #txtTagInput
            >
    `
})
*/

/*
*
* En este otro caso la referencia local  #txtTagInput se usa únicamente
* para luego referenciar el elemento desde el @ViewChild
* 

@Component({
    selector: 'gifs-search-box',
    template: `
        <h5>Buscar:</h5>
        <input type="text"
            class="form form-control"
            placeholder="Buscar gifs..."
            (keyup.enter)="searchTag()"
            #txtTagInput
            >
    `
})
*/

/*
*
* Finalmente aqui se usa un Template Component
* 
*/
@Component({
    selector: 'gifs-search-box',
    templateUrl: './search-box.component.html'
})

export class SearchBoxComponent  {
    constructor( private gifsService : GifsService ) { }

    /*
    *
    * tagInput! usa el declarador no nulable de TS (!) puesto que nunca serà null
    * Usamos ElementRef<HTMLInputElement> para definir el tipo de ViewChild
    * 
    */
    @ViewChild('txtTagInput')
    public tagInput!: ElementRef<HTMLInputElement>;

    @ViewChild('txtApiInput')
    public txtApiInput!: ElementRef<HTMLInputElement>;

    /*
    *
    * Aquí usamos el valor del input proporcionado por referencia local
    * en lugar de disponer del @ViewChild desde el que obtenemos el valor
    * 
    * 
    searchTag( newTag: string ){
        console.log(newTag);
    }
    */

    /*
    *
    * En este caso disponemos ya de la instancia del ViewChild 
    * y obtenemos el valor a través de ella 
    */
    public searchTag(): void {
        this.gifsService.searchTag(this.tagInput.nativeElement.value);
        this.tagInput.nativeElement.value = "";
    }

    public addApiKey(): void {
        this.gifsService.AddApiKey(this.txtApiInput.nativeElement.value);
        this.txtApiInput.nativeElement.value = "";
        
    }

    public removeApiKey(): void {
        this.gifsService.RemoveApiKey();
    }

    public hasApiKey(): boolean {
        return this.gifsService.hasApiKey();
    }
}
