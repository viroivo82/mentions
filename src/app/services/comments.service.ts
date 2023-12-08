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
  comments: Comment[] = [];

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
