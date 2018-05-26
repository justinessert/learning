import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms'

import { Customer } from './customer';

@Component({
    selector: 'my-signup',
    templateUrl: './app/customers/customer.component.html'
})
export class CustomerComponent implements OnInit{
    customerForm: FormGroup;
    customer: Customer= new Customer();
    emailMessage: string;

    get addresses(): FormArray{
      return <FormArray>this.customerForm.get('addresses');
    }

    private validationMessages {
      email {
        required: 'Please enter your email address.',
        pattern: 'Please enter a valid email address.'
      }
    }
    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
      this.customerForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
        phone: '',
        notification: 'email',
        sendCatalog: true,
        addresses: this.fb.array([ this.buildAddress() ])
      });

      this.customerForm.get('notification').valueChanges.subscribe(value => this.setNotification(value));

      const emailControl = this.customerForm.get('email');
      emailControl.valueChanges.subscribe(value => this.setMessage(emailControl))
    }

    populateTestData(): void {
      this.customerForm.patchValue({
        firstName: 'Jack',
        lastName: 'Harkness',
        email: 'jack@torchwood.com',
        sendCatalog: false
      })
    }

    save() {
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    }

    buildAddress(): FormGroup {
      return this.fb.group({
        addressType: 'home',
        street1: '',
        street2: '',
        city: '',
        state: '',
        zip: ''
      })
    }

    addAddress(): void {
      this.addresses.push(this.buildAddress());
    }

    setMessage(c: AbstractControl): void {
      this.emailMessage = '';
      if((c.touched || c.dirty) && c.errors){
        this.emailMessage = Object.keys(c.errors).map( key => this.validationMessages.email[key]).join(' ');
      }
    }

    setNotification(notifyVia: string): void {
      const phoneControl = this.customerForm.get('phone');
      if ( notifyVia === 'text') {
        phoneControl.setValidators(Validators.required);
      } else {
        phoneControl.clearValidators();
      }
      phoneControl.updateValueAndValidity();
    };
 }
