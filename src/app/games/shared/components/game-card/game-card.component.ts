import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Games} from '../../../../shared/interface';

@Component({
    selector: 'app-game-card',
    templateUrl: './game-card.component.html',
    styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {
    @Input() game: Games;
    @Output() switchFavourites: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit(): void {
    }

    toggleFavourites(game): void {
        this.switchFavourites.emit(game);
    }
}
