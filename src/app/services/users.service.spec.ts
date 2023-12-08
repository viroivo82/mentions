import { TestBed } from '@angular/core/testing';
import { UsersService, User } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the list of users', () => {
    const users: User[] = service.getUsers();
    expect(users.length).toBeGreaterThan(0);
  });

  it('should add a user to the mentioned users list', () => {
    const user: User = { userID: 5, name: 'John' };
    service.addUserMentioned(user);
    const mentionedUsers: User[] = service.getUsersMentioned();
    expect(mentionedUsers).toContain(user);
  });

  it('should not add a duplicate user to the mentioned users list', () => {
    const user: User = { userID: 1, name: 'Kevin' };
    service.addUserMentioned(user);
    const mentionedUsers: User[] = service.getUsersMentioned();
    expect(mentionedUsers.length).toBe(1);
  });

  it('should clear the mentioned users list', () => {
    service.clearUsersMentioned();
    const mentionedUsers: User[] = service.getUsersMentioned();
    expect(mentionedUsers.length).toBe(0);
  });
});
