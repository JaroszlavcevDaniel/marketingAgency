import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as emailjs from '@emailjs/browser';
import { ContactModel } from '../../models/contactModel';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth-service';
import { LanguageService } from '../../services/language-service';
import { ContactService } from '../../services/contact-service';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit, OnDestroy {
  contactForm!: FormGroup;
  isSending = false;

  
  captchaNum1!: number;
  captchaNum2!: number;
  captchaAnswer!: number;

    currentLang: 'hu' | 'en' = 'hu';
  
    contact?: ContactModel;
  
      isAdmin = false;
  
      editModelContact?: ContactModel;
  
    private subs: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
     private cd: ChangeDetectorRef,
    private contactService: ContactService,
        private authService: AuthService,
    private languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    this.generateCaptcha();
    this.initForm();

      const langSub = this.languageService.lang$.subscribe(lang => {

      this.currentLang = lang;

      this.cd.detectChanges();

    });

    this.subs.push(langSub);

    const authSub = this.authService.isLoggedIn$.subscribe(logged => {
  this.isAdmin = logged;
  this.cd.detectChanges();

    });

    this.subs.push(authSub);

    if (typeof this.authService.loadSession === 'function') {
      this.authService.loadSession();
    }


    this.loadContact();

  }


    loadContact(): void {
  
      this.contactService.getContact().subscribe({
  
        next: (response) => {
  
          this.contact = response.data;
  
          this.cd.detectChanges();
  
        },
  
        error: (err) => {
  
          console.error('Contact adatok betöltési hiba:', err);
  
        }
  
      });
  
    }
  
      openEditModalContact(): void {
     if (this.contact) {
      this.editModelContact = { ...this.contact };
    } else {
      this.editModelContact = { contactHu: '' } as ContactModel;
    }
    this.cd.detectChanges();
    }
  
    saveContact() {
        if (!this.editModelContact) return;
    
        this.contactService.saveContact(this.editModelContact).subscribe({
          next: (response) => {
            if (response && response.success) {
              
              const closeBtn = document.getElementById('closeEditModalBtnContact') as HTMLButtonElement;
              if (closeBtn) {
                closeBtn.click();
              }
    
              this.contact = { ...this.editModelContact } as ContactModel;
    
              setTimeout(() => {
                this.loadContact();
              }, 300);
    
            } else {
              alert('Hiba történt a mentés során.');
            }
          },
          error: (err) => {
            console.error(err);
            alert('Szerver hiba a mentéskor.');
          }
        });
      }
  
     ngOnDestroy(): void {
  
      this.subs.forEach(sub => sub.unsubscribe());
  
    }
  
    scrollToTop(): void {
    window.scrollTo(0, 0);
    
    const container = document.querySelector('.scroll-container');
    if (container) {
      container.scrollTop = 0;
    }
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
    this.captchaNum1 = Math.floor(Math.random() * 10) + 1; 
    this.captchaNum2 = Math.floor(Math.random() * 10) + 1; 
    this.captchaAnswer = this.captchaNum1 + this.captchaNum2;
  }

  isCaptchaCorrect(): boolean {
    const userValue = this.contactForm?.get('captcha')?.value;
    return parseInt(userValue, 10) === this.captchaAnswer;
  }

  onSubmit(formValues: any): void {
    if (this.contactForm.valid && this.isCaptchaCorrect() && !this.isSending) {
      this.isSending = true;

      const SERVICE_ID = 'YOUR_SERVICE_ID';
      const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
      const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

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
      this.contactForm.markAllAsTouched();
    }
  }
}