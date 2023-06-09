import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AppService } from '../../app.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicToastService } from '../../shared/services/ionic-toast/ionic-toast.service';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-value-input',
  standalone: true,
  templateUrl: './value-input.component.html',
  styleUrls: ['./value-input.component.scss'],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
  ],
})
export class ValueInputComponent implements OnInit {
  private readonly appService = inject(AppService);
  private readonly toastService = inject(IonicToastService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  readonly name$ = this.appService.name$;
  readonly form = this.formBuilder.group({
    value: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0.01),
    ]),
    installments: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1),
    ]),
  });

  constructor() {}

  ngOnInit() {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((values) => {
        this.appService.setValue(values.value ?? 0);
        this.appService.setInstallments(values.installments ?? 0);
      });
  }

  onClick() {
    if (this.form.invalid) {
      this.toastService.showToast(
        'Valor e qtd. prest. tem que ser maior que 0'
      );
      return;
    }
    this.router.navigate(['/', 'simulation']);
  }
}
