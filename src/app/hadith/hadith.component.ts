// hadith.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-hadith',
  standalone: true,
  templateUrl: './hadith.component.html',
  styleUrls: ['./hadith.component.css']
})
export class HadithComponent {
  title = 'علاش كنقاطعو؟';
  hadithText = 'قالَ رَسُولُ اللهِ صَلى اللهُ عَليهِ وَسَلم: "لا تَزُولُ قَدَما عَبْدٍ يَوْمَ القِيامَةِ حَتَّى يُسْأَلَ عَنْ عُمُرِهِ فِيما أَفْناهُ، وَعَنْ عِلْمِهِ فِيمَ فَعَلَ، وَعَنْ مالِهِ مِنْ أَيْنَ اكْتَسَبَهُ وَفِيمَ أنْفَقَهُ، وَعَنْ جِسْمِهِ فِيمَ أَبْلاهُ"';
  narrator = 'رواه الترمذي';
  footer = 'لأننا سنُسأل';
  hashtag = '#قاطع_الشركات_الداعمة_للكيان_الصهيوني';
}





