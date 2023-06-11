import { CommonModule, Location } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HeaderComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);
  readonly destroy$ = inject(DestroyRef);
  showBackButton = false;
  constructor() {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.showBackButton = Boolean(data['showBackButton']);
    });
  }
  goBack() {
    this.location.back();
  }
}
