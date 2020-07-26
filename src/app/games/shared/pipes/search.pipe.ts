import {Pipe, PipeTransform} from '@angular/core';
import {Games} from '../../../shared/interface';

@Pipe({
  name: 'searchGames'
})

export class SearchPipe implements PipeTransform {
  transform(games: Games[], search = ''): Games[] {
    if (!search.trim()) {
      return games;
    }

    return games.filter(game => {
      return game.Name.en.toLowerCase().includes(search.toLowerCase());
    });
  }

}
