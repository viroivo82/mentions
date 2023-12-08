// comments.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentsService } from './comments.service';
import { Comment } from './comments.service'; // Import the Comment interface from the comments.service file

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
    imports: [FormsModule, CommonModule],
    standalone: true
})
export class CommentsComponent {
    comments: Comment[] = []; // array of comments
    newComment = ''; // new comment to add    

    constructor(private commentsService: CommentsService) { }

    addComment() {
        const comment: Comment = {
            id: Date.now(), // use the current timestamp as a unique id
            text: this.newComment,
            user: 'System', // replace with the actual username
            timestamp: new Date() // convert the timestamp to a Date object
        };
        this.commentsService.addComment(comment);
        this.newComment = '';
    }

    ngOnInit() {
        this.comments = this.commentsService.getComments();
    }
}