import { ChangeDetectorRef, Component, inject, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as emailjs from '@emailjs/browser';
import { ContactModel } from '../../models/contactModel';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth-service';
import { LanguageService } from '../../services/language-service';
import { ContactService } from '../../services/contact-service';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit, OnDestroy {

  presentForm: FormGroup;

  isBrowser = false;

  success = false;
  sending = false;

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
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {

    this.isBrowser = isPlatformBrowser(this.platformId);

    this.presentForm = this.fb.group({

      yourName: [
        '',
        Validators.required
      ],

      yourEmail: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      phone: [
        '',
        Validators.required
      ],

      yourMessage: [
        '',
        Validators.required
      ],

      acceptTerms: [
        false,
        Validators.requiredTrue
      ]

    });
  }


  ngOnInit(): void {


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

        console.error(
          'Contact adatok betöltési hiba:',
          err
        );

      }

    });

  }

  openEditModalContact(): void {

    if (this.contact) {

      this.editModelContact = {
        ...this.contact
      };

    } else {

      this.editModelContact = {
        contactHu: ''
      } as ContactModel;

    }

    this.cd.detectChanges();

  }


  saveContact(): void {

    if (!this.editModelContact) {
      return;
    }

    this.contactService
      .saveContact(this.editModelContact)
      .subscribe({

        next: (response) => {

          if (response && response.success) {

            const closeBtn =
              document.getElementById(
                'closeEditModalBtnContact'
              ) as HTMLButtonElement | null;

            if (closeBtn) {

              closeBtn.click();

            }


            this.contact = {
              ...this.editModelContact
            } as ContactModel;


            setTimeout(() => {

              this.loadContact();

            }, 300);


          } else {

            alert(
              this.currentLang === 'hu'
                ? 'Hiba történt a mentés során.'
                : 'An error occurred while saving.'
            );

          }

        },

        error: (err) => {

          console.error(
            'Contact mentési hiba:',
            err
          );

          alert(
            this.currentLang === 'hu'
              ? 'Szerver hiba a mentéskor.'
              : 'Server error while saving.'
          );

        }

      });

  }


  onSubmit(): void {

    if (
      this.presentForm.invalid ||
      this.sending
    ) {

      this.presentForm.markAllAsTouched();

      return;

    }


    this.sending = true;
    this.success = false;

    this.cd.detectChanges();


    const formData = {

      yourName:
        this.presentForm.get('yourName')?.value,

      yourEmail:
        this.presentForm.get('yourEmail')?.value,

      phone:
        this.presentForm.get('phone')?.value,

      yourMessage:
        this.presentForm.get('yourMessage')?.value

    };


    this.http
      .post<{
        success: boolean;
        message: string;
      }>(
        'https://n17.hu/api/contact.php',
        formData
      )
      .subscribe({

        next: (response) => {

          console.log(
            'PHP response:',
            response
          );


          if (response.success) {

            // Form törlése
            this.presentForm.reset({
              yourName: '',
              yourEmail: '',
              phone: '',
              yourMessage: '',
              acceptTerms: false
            });


            this.success = true;
            this.sending = false;

            this.cd.detectChanges();

            setTimeout(() => {

              this.success = false;

              this.cd.detectChanges();

            }, 4000);


          } else {

            this.sending = false;

            this.cd.detectChanges();


            alert(
              this.currentLang === 'hu'
                ? (
                    response.message ||
                    'Az üzenet küldése nem sikerült.'
                  )
                : (
                    response.message ||
                    'The message could not be sent.'
                  )
            );

          }

        },


        error: (error) => {

          console.error(
            'PHP contact error:',
            error
          );


          this.sending = false;

          this.cd.detectChanges();


          alert(
            this.currentLang === 'hu'
              ? 'Hiba történt az üzenet küldése közben 😢'
              : 'An error occurred while sending the message 😢'
          );

        }

      });

  }

scrollToTop(): void {
   
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });

      const container = document.querySelector('.scroll-container') as HTMLElement | null;
      if (container) {
        container.scrollTop = 0;
      }
    }, 0);
}

  ngOnDestroy(): void {

    this.subs.forEach(
      sub => sub.unsubscribe()
    );

  }

}