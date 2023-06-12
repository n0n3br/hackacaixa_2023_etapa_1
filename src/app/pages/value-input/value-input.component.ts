import { CommonModule, DecimalPipe } from '@angular/common';
import {
  Component,
  DestroyRef,
  OnInit,
  importProvidersFrom,
  inject,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { StoreService } from '../../shared/store/store.service';
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
import { CurrencyMaskDirective } from 'src/app/shared/directives/currency-mask/currency-mask.directive';
import { debounceTime, delay } from 'rxjs';
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
    CurrencyMaskDirective,
  ],
})
export class ValueInputComponent implements OnInit {
  private readonly store = inject(StoreService);
  private readonly toastService = inject(IonicToastService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  valor = 0;
  readonly name$ = this.store.name$;
  readonly form = this.formBuilder.group({
    value: new FormControl<string>('', [Validators.required]),
    installments: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1),
    ]),
  });

  constructor() {}

  ngOnInit() {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(500))
      .subscribe((values) => {
        setTimeout(() => {
          const values = this.form.getRawValue();
          this.store.setValue(
            values.value
              ? parseFloat(values.value.replace(/,/g, '').replace(/\./g, '')) /
                  100
              : 0
          );
          this.store.setInstallments(values.installments ?? 0);
        }, 0);
      });
  }

  onClick() {
    if (this.form.invalid) {
      this.toastService.showToast(
        'Valor e qtd. parcelas. tem que ser maior que 0'
      );
      return;
    }
    this.router.navigate(['/', 'simulation']);
  }
}
