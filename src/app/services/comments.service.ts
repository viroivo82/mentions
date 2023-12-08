import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface Comment {
    id: number;
    text: string;
    user: string;
    timestamp: Date;
}

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  comments: Comment[] = [
    { id: 1, text: 'This is the first comment', user: 'System', timestamp: new Date() },
    { id: 2, text: 'This is the second comment', user: 'System', timestamp: new Date() }
  ];

  constructor(private sanitizer: DomSanitizer) {}

  addComment(comment: Comment) {
    if (comment.text.trim() !== '') {
      this.comments.push(comment);
    }
  }

  getComments() {
    return this.comments;
  }

  getFormattedComment(comment: Comment): SafeHtml {
    const formattedText = comment.text.replace(/(@\w+)/g, '<span class="mentioned-user" style="font-weight: bold;">$1</span>');
    return this.sanitizer.bypassSecurityTrustHtml(formattedText);
  }
}
