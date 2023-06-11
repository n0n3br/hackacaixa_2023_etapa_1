import { AbstractControl } from '@angular/forms';
import { ValidatorFn, ValidationErrors } from '@angular/forms';

export const cpfValidator: ValidatorFn = (
  ctrl: AbstractControl
): ValidationErrors | null => {
  const { value } = ctrl;
  const cpf = Array.from(value, Number).filter((el) => !isNaN(el));
  if (!cpf) {
    return null;
  }
  if (cpf.every((d, i, [h]) => d === h)) return { invalidCpf: value };

  const d2 = cpf.pop();
  let vd2 = (cpf.reduce((p, d, i) => p + d * (11 - i), 0) * 10) % 11;
  if (vd2 > 9) vd2 = 0;
  if (d2 !== vd2) return { invalidCpf: value };

  const d1 = cpf.pop();
  let vd1 = (cpf.reduce((p, d, i) => p + d * (10 - i), 0) * 10) % 11;
  if (vd1 > 9) vd1 = 0;
  if (d1 !== vd1) return { invalidCpf: value };

  return null;
};
