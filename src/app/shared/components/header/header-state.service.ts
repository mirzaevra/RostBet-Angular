import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderStateService {
  private allGamesCount = 0;
  private filteredGamesCount = 0;

  setAllGemesCount(count): void {
    this.allGamesCount = count;
  }

  getAllGemesCount(): number {
    return this.allGamesCount;
  }

  setFilteredGemesCount(count): void {
    this.filteredGamesCount = count;
  }

  getFilteredGemesCount(): number {
    return this.filteredGamesCount;
  }
}
