import { DomSanitizer } from '@angular/platform-browser';
import { MentionedUserPipe } from './mentioned-user.pipe';
import { TestBed } from '@angular/core/testing';

describe('MentionedUserPipe', () => {
  let sanitizer: DomSanitizer;
  let pipe: MentionedUserPipe;

  beforeEach(() => {
    sanitizer = TestBed.inject(DomSanitizer);
    pipe = new MentionedUserPipe(sanitizer);
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format the comment text with mentioned users', () => {
    const text: string = 'Hello @user1, how are you?';

    const formattedText =
      'Hello <span class="mentioned-user" style="font-weight: bold;">@user1</span>, how are you?';
    spyOn(sanitizer, 'bypassSecurityTrustHtml').and.returnValue(formattedText);
    expect(pipe.transform(text)).toEqual(formattedText);
    expect(sanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(
      formattedText
    );
  });
});
