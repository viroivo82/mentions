import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { User } from './services/users.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'mentions' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title.toLowerCase()).toEqual('mentions');
  });
  it('should log a message for each mentioned user', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const users: User[] = [
      { userID: 1, name: 'John Doe' },
      { userID: 2, name: 'Jane Smith' },
      { userID: 3, name: 'Mike Johnson' }
    ];
    spyOn(console, 'log');
    app.handleUserMentioned(users);
    expect(console.log).toHaveBeenCalledTimes(users.length);
    users.forEach(user => {
      expect(console.log).toHaveBeenCalledWith(`${user.name} was mentioned in a comment.`);
    });
  });
});