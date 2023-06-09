import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-simulation-error',
  templateUrl: './simulation-error.component.html',
  styleUrls: ['./simulation-error.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class SimulationErrorComponent implements OnInit {
  appService = inject(AppService);
  router = inject(Router);
  error$ = this.appService.simulationError$;
  name$ = this.appService.name$;
  constructor() {}

  ngOnInit() {}
  redirect() {
    this.router.navigate(['/', 'value-input']);
  }
}
