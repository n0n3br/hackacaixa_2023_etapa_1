import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StoreService } from 'src/app/shared/store/store.service';

@Component({
  selector: 'app-simulation-error',
  templateUrl: './simulation-error.component.html',
  styleUrls: ['./simulation-error.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class SimulationErrorComponent implements OnInit {
  private readonly store = inject(StoreService);
  private readonly router = inject(Router);
  readonly error$ = this.store.simulationError$;
  readonly name$ = this.store.name$;
  constructor() {}

  ngOnInit() {}
  redirect() {
    this.router.navigate(['/', 'value-input']);
  }
}
