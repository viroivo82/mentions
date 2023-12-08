import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'mentionedUser',
  standalone: true,
})
export class MentionedUserPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    const formattedText = value.replace(
      /(@\w+)/g,
      '<span class="mentioned-user" style="font-weight: bold;">$1</span>'
    );

    return this.sanitizer.bypassSecurityTrustHtml(formattedText);
  }
}
