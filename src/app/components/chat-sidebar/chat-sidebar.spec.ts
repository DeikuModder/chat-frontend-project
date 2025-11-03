import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { ChatSidebar } from './chat-sidebar';

describe('ChatSidebar', () => {
  let component: ChatSidebar;
  let fixture: ComponentFixture<ChatSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatSidebar],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    // Ensure predictable starting state for localStorage-driven collapse
    window.localStorage.removeItem('isCollapsed');

    fixture = TestBed.createComponent(ChatSidebar);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('initial state reflects persisted collapsed value', () => {
    // Arrange: set persisted state before component creation
    window.localStorage.setItem('isCollapsed', 'true');

    // Recreate component to pick up persisted state
    fixture = TestBed.createComponent(ChatSidebar);
    component = fixture.componentInstance;

    // Act
    fixture.detectChanges();

    // Assert: collapsed() mirrors persisted value
    expect(component.collapsed()).toBeTrue();
  });

  it('emits collapsedChange when toggled', async () => {
    fixture.detectChanges();

    const before = component.collapsed();
    const emitSpy = spyOn(component.collapsedChange, 'emit');

    // Act: toggle (effect emits on a post-flush microtask)
    component.toggleCollapse();

    // Await microtask so the constructor-registered effect runs
    await Promise.resolve();

    // Assert
    expect(emitSpy).toHaveBeenCalledTimes(1);
    expect(emitSpy).toHaveBeenCalledWith(!before);
  });
});
