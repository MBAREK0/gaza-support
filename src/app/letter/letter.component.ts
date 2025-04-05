import { Component } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-letter',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, RouterLink],
  templateUrl: './letter.component.html',
  styleUrl: './letter.component.css'
})
export class LetterComponent {
  selectedLang = 'en';
  documentDir = 'ltr';

  supermarkets = [
    {
      name: 'marjane',
      type: 'email',
      contact: ' rt [at] Marjane.ma'
    },
    {
      name: 'carrefour',
      type: 'email',
      contact: 'Serviceclient [at] labelvie.ma'
    },
    {
      name: 'aswakassalam',
      type: 'email',
      contact: 'service.clientele [at] aswakassalam.com'
    },
    {
      name: 'bim',
      type: 'link',
      contact: 'https://www.bim.ma/contenu/10/formulaire-de-r%C3%A9clamation.aspx'
    }
  ];

  constructor(private translate: TranslateService, private location: Location) {
    translate.setDefaultLang('en');
    translate.use(this.selectedLang);
    this.updateDirection(this.selectedLang);
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    this.updateDirection(lang);
  }

  updateDirection(lang: string) {
    this.documentDir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', this.documentDir);
    document.body.setAttribute('dir', this.documentDir);

    // Add or remove RTL class from body
    if (lang === 'ar') {
      document.body.classList.add('rtl-language');
    } else {
      document.body.classList.remove('rtl-language');
    }
  }

  copyText(text: string) {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert(this.translate.instant('copied'));
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });
  }

  copyLetterTemplate() {
    const letter =
      this.translate.instant('letter.greeting') + '\n\n' +
      this.translate.instant('letter.paragraph1') + '\n\n' +
      this.translate.instant('letter.paragraph2') + '\n\n' +
      this.translate.instant('letter.paragraph3') + '\n\n' +
      this.translate.instant('letter.paragraph4') + '\n\n' +
      this.translate.instant('letter.paragraph5') + '\n\n' +
      this.translate.instant('letter.paragraph6') + '\n\n' +
      this.translate.instant('letter.paragraph7') + '\n\n' +
      this.translate.instant('letter.paragraph8') + '\n\n' +
      this.translate.instant('letter.paragraph9') + '\n\n' +
      this.translate.instant('letter.paragraph10') + '\n\n' +
      this.translate.instant('letter.paragraph11') + '\n\n' +
      this.translate.instant('letter.paragraph12') + '\n\n' +
      this.translate.instant('letter.closing');

    navigator.clipboard.writeText(letter)
      .then(() => {
        alert(this.translate.instant('letter.copied'));
      })
      .catch(err => {
        console.error('Could not copy letter: ', err);
      });
  }

  getCurrentUrl(): string {
    // Get the current URL dynamically instead of storing it in a property
    const baseUrl = window.location.origin;
    const path = this.location.path();
    return encodeURIComponent(baseUrl + path);
  }

  getShareLink(platform: string): string {
    const currentUrl = this.getCurrentUrl();

    switch (platform) {
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
      case 'twitter':
        return `https://twitter.com/intent/tweet?url=${currentUrl}`;
      case 'whatsapp':
        return `https://wa.me/?text=${currentUrl}`;
      case 'linkedin':
        return `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
      default:
        return '#';
    }
  }
}
