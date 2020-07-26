import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-game-card',
    templateUrl: './game-card.component.html',
    styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {
    @Input() game: any;
    @Output() onToggleFavourites: EventEmitter<any> = new EventEmitter<any>();
    @Output() onTogglePriority: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit(): void {
    }

    toggleFavourites(game): void {
        this.onToggleFavourites.emit(game);
    }

    togglePriority(game): void {
        this.onTogglePriority.emit(game);
    }

}
