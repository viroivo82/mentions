import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { CommentsService, Comment } from './comments.service';

describe('CommentsService', () => {
  let service: CommentsService;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentsService);
    sanitizer = TestBed.inject(DomSanitizer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a comment to the comments array', () => {
    const comment: Comment = { id: 3, text: 'Test comment', user: 'Test user', timestamp: new Date() };
    service.addComment(comment);
    expect(service.comments.length).toBe(3);
    expect(service.comments[2]).toEqual(comment);
  });

  it('should not add a comment if the text is empty', () => {
    const comment: Comment = { id: 1, text: '', user: 'Test user', timestamp: new Date() };
    service.addComment(comment);
    expect(service.comments.length).toBe(2);
  });

  it('should return the comments array', () => {
    const comments: Comment[] = [
      { id: 1, text: 'Test comment 1', user: 'Test user 1', timestamp: new Date() },
      { id: 2, text: 'Test comment 2', user: 'Test user 2', timestamp: new Date() },
    ];
    service.comments = comments;
    expect(service.getComments()).toEqual(comments);
  });

  it('should format the comment text with mentioned users', () => {
    const comment: Comment = { id: 1, text: 'Hello @user1, how are you?', user: 'Test user', timestamp: new Date() };
    const formattedText = 'Hello <span class="mentioned-user" style="font-weight: bold;">@user1</span>, how are you?';
    spyOn(sanitizer, 'bypassSecurityTrustHtml').and.returnValue(formattedText);
    expect(service.getFormattedComment(comment)).toEqual(formattedText);
    expect(sanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(formattedText);
  });
});