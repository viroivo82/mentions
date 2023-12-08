import { Injectable } from '@angular/core';

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
    {
      id: 1,
      text: 'This is the first comment',
      user: 'System',
      timestamp: new Date(),
    },
    {
      id: 2,
      text: 'This is the second comment',
      user: 'System',
      timestamp: new Date(),
    },
  ];

  addComment(comment: Comment) {
    if (comment.text.trim() !== '') {
      this.comments.push(comment);
    }
  }

  getComments() {
    return this.comments;
  }
}
