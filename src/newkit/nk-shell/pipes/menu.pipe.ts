import { Pipe, PipeTransform, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { TranslateService, LangChangeEvent } from 'newkit/core';

@Pipe({
  name: 'menuTranslate',
  pure: false
})

export class MenuTranslatePipe implements PipeTransform {
  onLangChange: EventEmitter<LangChangeEvent>;
  constructor(private translateService: TranslateService, private _ref: ChangeDetectorRef) {

  }

  transform(value: any, args: any[]): any {
    if (!this.onLangChange) {
      this.onLangChange = this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
        this._ref.markForCheck();
      });
    }
    let lang = this.translateService.currentLang || this.translateService.getDefaultLang();
    return value[lang] || value['en-us'];
  }
}
