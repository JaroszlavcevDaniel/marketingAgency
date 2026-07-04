import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {
  contactForm!: FormGroup;
  isSending = false;

  // Kliens oldali matematikai Captcha változói
  captchaNum1!: number;
  captchaNum2!: number;
  captchaAnswer!: number;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.generateCaptcha();
    this.initForm();
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      message: ['', [Validators.required, Validators.minLength(10)]],
      captcha: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]]
    });
  }

  generateCaptcha(): void {
    this.captchaNum1 = Math.floor(Math.random() * 10) + 1; // 1 és 10 között
    this.captchaNum2 = Math.floor(Math.random() * 10) + 1; // 1 és 10 között
    this.captchaAnswer = this.captchaNum1 + this.captchaNum2;
  }

  isCaptchaCorrect(): boolean {
    const userValue = this.contactForm?.get('captcha')?.value;
    return parseInt(userValue, 10) === this.captchaAnswer;
  }

  onSubmit(formValues: any): void {
    if (this.contactForm.valid && this.isCaptchaCorrect() && !this.isSending) {
      this.isSending = true;

      // TODO: Cseréld ki ezeket a saját azonosítóidra az EmailJS fiókodból!
      const SERVICE_ID = 'YOUR_SERVICE_ID';
      const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
      const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

      // Az objektum kulcsai egyezzenek az EmailJS sablonodban megadott {{változókkal}}
      const templateParams = {
        name: formValues.name,
        email: formValues.email,
        phone: formValues.phone || 'Nincs megadva',
        message: formValues.message
      };

      emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
        .then(() => {
          alert('Köszönjük! Az üzenetet sikeresen elküldtük.');
          this.contactForm.reset();
          this.generateCaptcha();
        })
        .catch((error) => {
          console.error('EmailJS küldési hiba:', error);
          alert('Hiba történt a küldés során. Kérjük, próbálja meg újra később.');
        })
        .finally(() => {
          this.isSending = false;
        });

    } else {
      // Ha érvénytelen, pirossal kiemeljük a hibás mezőket
      this.contactForm.markAllAsTouched();
    }
  }
}