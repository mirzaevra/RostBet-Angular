import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-game-card',
    templateUrl: './game-card.component.html',
    styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {
    @Input() game: any;
    @Output() switchFavourites: EventEmitter<any> = new EventEmitter<any>();
    @Output() switchPriority: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit(): void {
    }

    toggleFavourites(game): void {
        this.switchFavourites.emit(game);
    }

    togglePriority(game): void {
        this.switchPriority.emit(game);
    }

}
