import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(candidats: any[], searchText: any): any[] {
    if (searchText === undefined) {
      return candidats;
    } else {
        return candidats.filter(candidat => candidat.etat.toLowerCase().includes(searchText.toLowerCase())
        || candidat.status.toLowerCase().includes(searchText.toLowerCase())
        || candidat.nom.toLowerCase().includes(searchText.toLowerCase())
        || candidat.prenom.toLowerCase().includes(searchText.toLowerCase())
        || candidat.age.toLowerCase().includes(searchText.toLowerCase())
        || candidat.tel.toLowerCase().includes(searchText.toLowerCase())
        || candidat.email.toLowerCase().includes(searchText.toLowerCase())
        
        );
    }
  }
}
