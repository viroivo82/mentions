import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  comments: Comment[] = [];

  addComment(comment: Comment) {
    if (comment.text.trim() !== '') {
      this.comments.push(comment);
    }
  }

  getComments() {
    return this.comments;
  }
}

export interface Comment {
    id: number;
    text: string;
    user: string;
    timestamp: Date;
  }