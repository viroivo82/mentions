import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsComponent } from './comments.component';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a comments array', () => {
    expect(Array.isArray(component.comments)).toBe(true);
  });

  it('should display comments', () => {
    component.comments = [
      { id: 1, text: 'Test comment', user: 'Test user', timestamp: new Date() },
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.comment-text').textContent).toContain(
      'Test comment'
    );
  });
});
