import { CommonModule, Location } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { combineLatest, filter, firstValueFrom, map } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { CpfcnpjMaskDirective } from 'src/app/shared/directives/cpf-cnpj-mask/cpf-cnpj-mask.directive';
import { PhoneMaskDirective } from 'src/app/shared/directives/phone-mask/phone-mask.directive';
import { Simulacao } from 'src/app/shared/model/Simulacao';
import { IonicAlertService } from 'src/app/shared/services/ionic-alert/ionic-alert.service';
import { cpfValidator } from 'src/app/shared/validators/cpf/cpf.validator';
import { ZipcodeValidator } from 'src/app/shared/validators/zipcode/zipcode.validator';

@Component({
  selector: 'app-submit-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HeaderComponent,
    CommonModule,
    CpfcnpjMaskDirective,
    PhoneMaskDirective,
  ],
})
export class ContactFormComponent implements OnInit {
  appService = inject(AppService);
  ionicAlertService = inject(IonicAlertService);
  router = inject(Router);
  zipcodeValidator = inject(ZipcodeValidator);
  formBuilder = inject(FormBuilder);
  location = inject(Location);

  name$ = this.appService.name$;
  result$ = this.appService.currentResult$;
  type$ = this.appService.selectedType$;

  simulation?: Simulacao;
  type = '';

  destroy$ = inject(DestroyRef);

  vm$ = combineLatest([this.name$, this.result$, this.type$]).pipe(
    map(([name, result, type]) => ({ name, result, type }))
  );

  form = this.formBuilder.group({
    name: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.minLength(3),
    ]),
    cpf: new FormControl('', [Validators.required, cpfValidator]),
    phone: new FormControl('', [Validators.required]),
    contactBy: new FormControl('', [Validators.required]),
    contactOn: new FormControl<string>(this.addHours(-3).toISOString(), [
      Validators.required,
    ]),
  });

  contactMeans = [
    { value: 'phone', label: 'Telefone' },
    { value: 'whatsapp', label: 'WhatsApp' },
  ];

  constructor() {}

  private addHours(h: number) {
    const date = new Date();
    date.setHours(date.getHours() + h);
    return date;
  }
  ngOnInit() {
    this.vm$
      .pipe(
        takeUntilDestroyed(this.destroy$),
        filter(
          (vm) => Boolean(vm.name) && Boolean(vm.result) && Boolean(vm.type)
        )
      )
      .subscribe((vm) => {
        this.simulation = vm.result;
        this.type = vm.type;
        this.form.patchValue({
          name: vm.name,
        });
      });
  }

  async onSend() {
    if (this.form.invalid || !this.simulation) {
      return;
    }
    try {
      const postValues = {
        name: this.form.controls.name.value!,
        cpf: this.form.controls.cpf.value!,
        phone: this.form.controls.phone.value!,
        contactBy: this.form.controls.contactBy.value!,
        contactOn: this.form.controls.contactOn.value!.slice(11, 16),
        type: this.type,
        simulation: this.simulation,
      };

      await firstValueFrom(this.appService.postContactForm(postValues));
      await this.ionicAlertService.showAlert(
        'Sucesso',
        'Em breve entraremos em contato com você.'
      );
      this.router.navigate(['/']);
    } catch (error) {
      console.error(error);
      await this.ionicAlertService.showAlert(
        'Erro',
        'Houve um erro ao enviar os dados. Tente novamente'
      );
    }
  }
}
