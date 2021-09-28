import { AbstractControl } from '@angular/forms';


export class CustomInputValidators {

  static PasswordMatch(control: AbstractControl) {
    let password = control.get('Password').value as AbstractControl;
    let confirmPassword = control.get('ConfirmPassword').value;

    if (password != confirmPassword) control.get('ConfirmPassword').setErrors({ ConfirmPassword: true });
    else {
      return null;
    }
  }

  static PasswordOptions(control: AbstractControl) {
    let password = control.get('Password').value as string;

    if (password.search(/[#?!@$%^&*-]/) == -1) control.get('Password').setErrors({ RequireNonAlphanumeric: true });
    if (password.search(/[A-Z]/) == -1) control.get('Password').setErrors({ RequireUppercase: true });
    if (password.search(/[a-z]/) == -1) control.get('Password').setErrors({ RequireLowercase: true });
    if (password.search(/[?=.*?[0-9]/) == -1) control.get('Password').setErrors({ RequireDigit: true });
    if (password.length < 6) control.get('Password').setErrors({ RequiredLength: true });

    else {
      return null;
    }
  }

  static ContactNumberOptions(control: AbstractControl) {
    // let contactNumber = control.get('ContactNumber').value as string;
    let controlCtrl = control.get('formArray').get([0]).get('CellPhoneNumber');
    let controlValue = controlCtrl.value as string;

    if (controlValue.length != 10) controlCtrl.setErrors({ RequiredLength: true });
    if (controlValue.match(/[A-Z]/))controlCtrl.setErrors({ HasUppercase: true });
    if (controlValue.match(/[a-z]/)) controlCtrl.setErrors({ HasLowercase: true });
    if (controlValue.match(/[^a-zA-Z\d\s:]/)) controlCtrl.setErrors({ HasNonAlphanumeric: true });

    else {
      return null;
    }
  }


}


export class ConfirmIdentityNumber {
  static IsRSA(control: AbstractControl) {
    let identityNumber = control.get('IdNumber').value;

    if (identityNumber.length != 13) {
      control.get('IdNumber').setErrors({ idNumberIncorrect: true });
    }

    if (isNaN(identityNumber)) {
      control.get('IdNumber').setErrors({ idNumberIncorrect: true });
    }


    var tempDate =  new Date(identityNumber.substring(0, 2), identityNumber.substring(2, 4), identityNumber.substring(4, 6));
    var id_date = tempDate.getDate();
    var id_month = tempDate.getMonth();
    var id_year = tempDate.getFullYear();


    if ((tempDate.getFullYear() != identityNumber.substring(0, 2)) && (id_month != identityNumber.substring(2, 4)) && (id_date != identityNumber.substring(4, 6))) {
      control.get('IdNumber').setErrors({ idNumberIncorrect: true });
    }

    // apply Luhn formula for check-digits
    var tempTotal = 0;
    var checkSum = 0;
    var multiplier = 1;
    for (var i = 0; i < 13; ++i) {
      tempTotal = parseInt(identityNumber.charAt(i)) * multiplier;
      if (tempTotal > 9) {
        tempTotal = parseInt(tempTotal.toString().charAt(0)) + parseInt(tempTotal.toString().charAt(1));
      }
      checkSum = checkSum + tempTotal;
      multiplier = (multiplier % 2 == 0) ? 1 : 2;
    }

    if ((checkSum % 10) != 0) {
      control.get('IdNumber').setErrors({ idNumberIncorrect: true });
    }

    else {
      return null;
    }
  }
}
