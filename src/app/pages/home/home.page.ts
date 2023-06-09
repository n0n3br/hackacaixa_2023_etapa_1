import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AppService } from '../../app.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent],
})
export class HomePage implements OnInit {
  appService = inject(AppService);
  router = inject(Router);

  name$ = this.appService.name$;

  canContinue$ = this.name$.pipe(map((name) => name.length > 3));

  greeting = '';

  constructor() {}

  ngOnInit(): void {
    const hour = new Date().getHours();
    this.greeting =
      hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
  }

  onNameInput(event: any) {
    this.appService.setName(event.target!.value);
  }

  onClick() {
    this.router.navigate(['/', 'value-input']);
  }
}
