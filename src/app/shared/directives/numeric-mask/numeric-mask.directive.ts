import { Directive, Attribute } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[numericMask]',
  host: {
    '(keyup)': 'onInputChange($event)',
    '(ionChange)': 'onInputChange($event)',
  },
  providers: [NgModel],
  standalone: true,
})
export class NumericMaskDirective {
  $event: any;
  mask = '';
  /**
   * Construtor
   * @param {NgModel} model
   */
  constructor(public model: NgModel, @Attribute('numericMask') mask: string) {
    if (mask) {
      this.mask = mask;
    }
  }

  private format(value: string, pattern: string) {
    let i = 0;
    const result = pattern.replace(/\*/g, (_) => value[i++] ?? '_');
    return result.slice(
      0,
      result.indexOf('_') > -1 ? result.indexOf('_') : result.length
    );
  }

  /**
   * Listener para mudança de valor do input
   * @param event
   */
  onInputChange(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > this.mask.length) {
      value = value.slice(0, this.mask.length - value.length);
    }
    if (
      event.keyIdentifier === 'U+0008' ||
      event.keyCode === 8 ||
      event.key === 'Backspace'
    ) {
      if (value.length) {
        while (this.mask[value.length] && this.mask[value.length] !== '*') {
          value = this.format(value.substring(0, value.length - 1), this.mask);
        }
        if (this.mask.substring(0, value.length).indexOf('*') < 0) {
          value = this.format(value.substring(0, value.length - 1), this.mask);
        }
      }
    } else {
      value = this.format(value, this.mask);
    }
    event.target.value = value;
    if (this.model) {
      this.model.update.emit(value);
    }
    return true;
  }
}
