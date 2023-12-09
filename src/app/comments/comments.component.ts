// comments.component.ts
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentsService, Comment } from '../services/comments.service';
import { MentionComponent } from '../mention/mention.component';
import { User, UsersService } from '../services/users.service';
import { MentionedUserPipe } from '../pipe/mentioned-user.pipe';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, MentionComponent, MentionedUserPipe],
})
export class CommentsComponent {
  comments: Comment[] = []; // array of comments
  newComment = ''; // new comment to add
  showMention = false; // show the mention component
  filter = ''; // filter the users in the mention component
  userSelected = false; // user selected in the mention component

  @Output() usersMentioned = new EventEmitter<User[]>();

  constructor(
    public commentsService: CommentsService,
    private usersService: UsersService
  ) {}

  addComment() {
    // if the enter key is pressed to select a user this prevents the enter key from saving the comment
    if (this.userSelected) {
      this.userSelected = false;
      this.showMention = false;
      return;
    }

    // this triggers a function to alert mentioned users
    if (this.usersService.getUsersMentioned()) {
      this.usersMentioned.emit(
        this.usersService
          .getUsersMentioned()
          .filter((user) => this.newComment.includes(user.name))
      );
    }
    const comment: Comment = {
      id: Date.now(), // use the current timestamp as a unique id
      text: this.newComment,
      user: 'System', // replace with the actual username
      timestamp: new Date(),
    };
    this.commentsService.addComment(comment);
    this.newComment = '';
    this.usersService.clearUsersMentioned();
  }

  ngOnInit() {
    this.comments = this.commentsService.getComments();
  }

  handleUserSelected(user: string) {
    const atIndex = this.newComment.lastIndexOf('@');
    if (atIndex !== -1) {
      this.newComment = this.newComment.slice(0, atIndex) + '@' + user;
    }
    this.showMention = false;
    this.userSelected = true;
  }

  handleKeyup() {
    const atIndex = this.newComment.lastIndexOf('@');
    if (atIndex !== -1) {
      this.filter = this.newComment.slice(atIndex + 1);
      this.showMention = true;
    } else {
      this.filter = '';
      this.showMention = false;
    }
  }
}
