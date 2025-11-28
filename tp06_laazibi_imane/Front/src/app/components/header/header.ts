  import { Component, Signal } from '@angular/core';
  import { CommonModule } from '@angular/common'; 
  import { PollutionService } from '../../services/pollution.service';
  import { Pollution } from '../../models/pollution.model';
  import { Output, EventEmitter } from '@angular/core';
  import { PollutionFrom } from '../pollution-form/pollution-from'; 
  import { Routes } from '@angular/router';
  import { RouterOutlet, RouterModule } from '@angular/router';
  import { provideRouter } from '@angular/router'; 
  import { FavorisState } from '../../../shared/states/favoris-state';
  import { Store } from '@ngxs/store';
  import { toSignal } from '@angular/core/rxjs-interop';

  @Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterModule, CommonModule],
    templateUrl: './header.html',
    styleUrl: './header.css'
  })
  export class Header {
    favorisCount: Signal<number>;

    constructor(private store: Store) {
      this.favorisCount = toSignal(
        this.store.select(FavorisState.getFavorisCount),
        { initialValue: 0 }
      );
    }
  }
