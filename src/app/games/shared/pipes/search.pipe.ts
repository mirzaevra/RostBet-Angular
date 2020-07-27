import {Pipe, PipeTransform} from '@angular/core';
import {Games} from '../../../shared/interface';
import {HeaderStateService} from '../../../shared/components/header/header-state.service';

@Pipe({
  name: 'searchGames'
})

export class SearchPipe implements PipeTransform {
  constructor(
    private headerStateService: HeaderStateService
  ) {
  }

  transform(games: Games[], search = '', perPage, page): Games[] {
    if (!search.trim()) {
      return games;
    }

    const filteredGames = [...games]
      .filter(game => {
        return game.Name.en.toLowerCase().includes(search.toLowerCase()) && !game.priority;
      }).slice(0, perPage * page);
    this.headerStateService.setFilteredGemesCount(filteredGames.length);
    return filteredGames;
  }

}
