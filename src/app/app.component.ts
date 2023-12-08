import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CommentsComponent } from './comments/comments.component';
import { User } from './services/users.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CommentsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Mentions';
  
  handleUserMentioned(users: User[]) {
    users.forEach(user => console.log(`${user.name} was mentioned in a comment.`));
  }
}