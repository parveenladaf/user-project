import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  userForm : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.initFormControl();
  }

  initFormControl() {
    const numericNumberReg= '^-?[0-9]\\d*(\\.\\d{1,2})?$';

    this.userForm = this.formBuilder.group({
      name: [
        '',
        [Validators.required, Validators.pattern('([a-zA-Z]+)')],
      ],
      email_id: [
        '',
        [
          Validators.pattern(
            '([a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,})'
          ),
        ],
      ],
      mobile_no: ['', [Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      address: ['', [Validators.required, Validators.pattern('([a-zA-Z]+)')]],
    });
  }

  onSave() {
    if (!this.userForm.valid) {
      this.userService.openToast(
        'Please Enter All The Required Fields',
        'Close'
      );
      return;
    }

    this.userService.userSave(this.userForm.value).subscribe(
      (data) => {
        if (data) {
          this.userService.openToast('User registered successfully', 'Close');
        }
      },
      (err) => {
        this.userService.openToast(err['error']['message'], 'Close');
      }
    );
  }


}
