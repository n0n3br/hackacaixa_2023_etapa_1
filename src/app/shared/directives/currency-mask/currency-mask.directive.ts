import { Attribute, Directive } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[currencyMask]',
  standalone: true,
  host: {
    '(keyup)': 'onInputChange($event)',
    '(ionChange)': 'onInputChange($event)',
  },
  providers: [NgModel],
})
export class CurrencyMaskDirective {
  decimal: string = ',';
  thousand: string = '.';

  /**
   * Construtor
   * @param {NgModel} model
   */
  constructor(
    public model: NgModel,
    @Attribute('decimal') decimal: string,
    @Attribute('thousand') thousand: string
  ) {
    if (decimal) {
      this.decimal = decimal;
    }
    if (thousand) {
      this.thousand = thousand;
    }
  }

  /**
   * Listener onInputChange
   * @param event
   */
  onInputChange(event: any) {
    let value = event.target.value;
    if (value == '') {
      return;
    }
    value = value + '';
    value = parseInt(value.replace(/[\D]+/g, ''));
    value = value + '';
    value = value.replace(/([0-9]{2})$/g, this.decimal + '$1');
    var parts = value.toString().split(this.decimal);
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.thousand);
    value = parts.join(this.decimal);
    event.target.value = value;
    this.model.update.emit(value);
    return true;
  }
}
