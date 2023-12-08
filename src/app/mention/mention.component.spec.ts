import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionComponent } from './mention.component';
import { User } from '../services/users.service';

describe('MentionComponent', () => {
  let component: MentionComponent;
  let fixture: ComponentFixture<MentionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('filteredUsers', () => {
      it('should return all users when filter is not set', () => {
            // Arrange
            component.users = [
                { userID: 1, name: 'John' },
                { userID: 2, name: 'Jane' },
                { userID: 3, name: 'Alice' }
            ];
            
            // Act
            const result = component.filteredUsers;
            
            // Assert
            expect(result).toEqual(component.users);
        });

    it('should return filtered users when filter is set', () => {
      // Arrange
      component.users = [
            { userID: 1, name: 'John' },
            { userID: 2, name: 'Jane' },
            { userID: 3, name: 'Alice' }
        ];
        component.filter = 'j';
    
        // Act
        const result = component.filteredUsers;
    
        // Assert
        expect(result).toEqual([
            { userID: 1, name: 'John' },
            { userID: 2, name: 'Jane' }
        ]);
    });

it('should ignore case sensitivity when filtering users', () => {
    // Arrange
    component.users = [
        { userID: 1, name: 'John' },
        { userID: 2, name: 'Jane' },
        { userID: 3, name: 'Alice' }
    ];
    component.filter = 'a';
    
    // Act
    const result = component.filteredUsers;
    
    // Assert
    expect(result).toEqual([
        { userID: 2, name: 'Jane' },
        { userID: 3, name: 'Alice' }
    ]);
});
});
  describe('handleKeyDown', () => {
    it('should select the next user when ArrowDown key is pressed', () => {
      // Arrange
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      const index = component.filteredUsers.indexOf(component.selectedUser);

      // Act
      component.handleKeyDown(event);

      // Assert
      expect(component.selectedUser).toEqual(component.filteredUsers[index + 1]);
    });

    it('should select the previous user when ArrowUp key is pressed', () => {
      // Arrange
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      const index = component.filteredUsers.indexOf(component.selectedUser);

      // Act
      component.handleKeyDown(event);

      // Assert
      expect(component.selectedUser).toEqual(component.filteredUsers[index - 1]);
    });
  });


  describe('selectUser', () => {
    it('should set the selectedUser', () => {
      // Arrange
      const user: User = { userID: 1, name: 'John' };

      // Act
      component.selectUser(user);

      // Assert
      expect(component.selectedUser).toEqual(user);
    });

    it('should emit the selected user name', () => {
      // Arrange
      const user: User = { userID: 1, name: 'John' };
      spyOn(component.userSelected, 'emit');

      // Act
      component.selectUser(user);

      // Assert
      expect(component.userSelected.emit).toHaveBeenCalledWith(user.name);
    });
  });
});