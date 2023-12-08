import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { UsersService, User } from '../services/users.service';

@Component({
  selector: 'app-mention',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mention.component.html',
  styleUrl: './mention.component.scss'
})

export class MentionComponent {
    constructor(private usersService: UsersService) { }

    users: User[] = this.usersService.getUsers();
    selectedUser: User = this.users[-1];
  
    @Input() filter: string = '';
    @Output() userSelected = new EventEmitter<string>();
  
    get filteredUsers() {
        if (this.filter) {
            return this.users.filter(user => user.name.toLowerCase().includes(this.filter.toLowerCase()));
        } else {
            return this.users;
        }
    }

    selectUser(user: User) {
        this.selectedUser = user;
        this.userSelected.emit(user.name);
        this.usersService.addUserMentioned(user);
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyDown(event: KeyboardEvent) {
        const index = this.filteredUsers.indexOf(this.selectedUser);
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (index < this.filteredUsers.length - 1) {
                this.selectedUser = this.filteredUsers[index + 1];
            }
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (index > 0) {
                this.selectedUser = this.filteredUsers[index - 1];
            }
        } else if (event.key === 'Enter') {
            event.preventDefault();
            if (this.selectedUser && index > -1) {
                this.selectUser(this.selectedUser);
                this.selectedUser = this.users[-1];
            }
        }
    }
}
