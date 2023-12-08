import { Injectable } from '@angular/core';

export interface User {
    userID: number;
    name: string;
  }

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    private users: User[] = [
        {userID: 1, name: 'Kevin'},
        {userID: 2, name: 'Jeff'},
        {userID: 3, name: 'Bryan'},
        {userID: 4, name: 'Gabbey'},
    ];

    private usersMentioned: User[] = [];

    constructor() { }

    getUsers(): User[] {
        return this.users;
    }

    addUserMentioned(user: User) {
        if (!this.usersMentioned.find(u => u.name === user.name)) {
          this.usersMentioned.push(user);
        }
    }

    getUsersMentioned(): User[] {
        return this.usersMentioned;
    }

    clearUsersMentioned() {
        this.usersMentioned = [];
    }

    getUserByName(name: string): User | undefined {
        return this.users.find(user => user.name === name);
    }
}