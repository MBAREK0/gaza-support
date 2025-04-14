import { Component } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import {RouterLink} from "@angular/router";
import {emails} from "./data/emails";

@Component({
  selector: 'app-letter',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, RouterLink],
  templateUrl: './letter.component.html',
  styleUrl: './letter.component.css'
})
export class LetterComponent {
  selectedLang = 'ar';
  documentDir = 'ltr';

  // Track which buttons have been clicked for copying
  copiedButtonIds: {[key: string]: boolean} = {};
  letterCopied = false;
  allEmailsCopied = false;

  supermarkets = emails;

  constructor(private translate: TranslateService, private location: Location) {
    translate.setDefaultLang('en');
    translate.use(this.selectedLang);
    this.updateDirection(this.selectedLang);
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    this.updateDirection(lang);

    // Reset all copied states when language is changed
    this.copiedButtonIds = {};
    this.letterCopied = false;
    this.allEmailsCopied = false;
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

  copyText(text: string, id: string) {
    navigator.clipboard.writeText(text)
      .then(() => {
        // Set this specific button as copied
        this.copiedButtonIds[id] = true;

        // Reset button state after 2 seconds
        setTimeout(() => {
          this.copiedButtonIds[id] = false;
        }, 2000);
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
        this.letterCopied = true;

        // Reset button state after 2 seconds
        setTimeout(() => {
          this.letterCopied = false;
        }, 2000);
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

  copyAllEmails() {
    // Filter out only items with email addresses (not links)
    const emailContacts = this.supermarkets
      .filter(market => market.type !== 'link')
      .map(market => market.contact)
      .join(', ');

    navigator.clipboard.writeText(emailContacts)
      .then(() => {
        this.allEmailsCopied = true;

        // Reset button state after 2 seconds
        setTimeout(() => {
          this.allEmailsCopied = false;
        }, 2000);
      })
      .catch(err => {
        console.error('Could not copy emails: ', err);
      });
  }
}
