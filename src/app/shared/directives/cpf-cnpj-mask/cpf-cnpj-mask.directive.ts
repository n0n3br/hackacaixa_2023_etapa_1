import { Directive } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[cpfcnpjMask]',
  host: {
    '(keyup)': 'onInputChange($event)',
    '(ionChange)': 'onInputChange($event)',
  },
  providers: [NgModel],
  standalone: true,
})
export class CpfcnpjMaskDirective {
  $event: any;

  /**
   * Construtor
   * @param {NgModel} model
   */
  constructor(public model: NgModel) {}

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
    let pattern = value.length <= 14 ? '***.***.***-**' : '**.***.***/****-**';
    if (value.length > 15) {
      value = value.slice(0, 11 - value.length);
    }

    if (
      event.keyIdentifier === 'U+0008' ||
      event.keyCode === 8 ||
      event.key === 'Backspace'
    ) {
      if (value.length) {
        while (pattern[value.length] && pattern[value.length] !== '*') {
          value = this.format(value.substring(0, value.length - 1), pattern);
        }
        if (pattern.substring(0, value.length).indexOf('*') < 0) {
          value = this.format(value.substring(0, value.length - 1), pattern);
        }
      }
    } else {
      value = this.format(value, pattern);
    }
    event.target.value = value;
    if (this.model) {
      this.model.update.emit(value);
    }
    return true;
  }
}
