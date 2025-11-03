import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { MessageBubble } from './message-bubble';
import { By } from '@angular/platform-browser';
import { UserAvatar } from '../user-avatar/user-avatar';

describe('MessageBubble', () => {
  let component: MessageBubble;
  let fixture: ComponentFixture<MessageBubble>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageBubble],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageBubble);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('applies chatMemberColor to the sender header when is group chat', () => {
    fixture.componentRef.setInput('sender', 'Alex');
    fixture.componentRef.setInput('chatMemberColor', '#ff0000');
    fixture.componentRef.setInput('isGroupChat', true);
    fixture.detectChanges();

    const header: HTMLElement | null = fixture.nativeElement.querySelector('header');

    expect(header).withContext("Header should exist when sender != 'You'").not.toBeNull();

    // Browsers normalize inline hex to rgb() in computed styles
    const color = getComputedStyle(header!).color;
    expect(color).toBe('rgb(255, 0, 0)');
  });

  it('falls back to default color when no chatMemberColor is provided', () => {
    fixture.componentRef.setInput('sender', 'Alex'); // ensure header renders
    fixture.componentRef.setInput('isGroupChat', true);
    // do not set chatMemberColor, keep default '#ffffff'
    fixture.detectChanges();

    const header: HTMLElement | null = fixture.nativeElement.querySelector('header');
    expect(header).not.toBeNull();

    const color = getComputedStyle(header!).color;
    expect(color).toBe('rgb(255, 255, 255)');
  });

  it('does render the header when sender is not "You"', () => {
    fixture.componentRef.setInput('sender', 'Alex');
    fixture.componentRef.setInput('isGroupChat', true);
    fixture.detectChanges();

    const header: HTMLElement | null = fixture.nativeElement.querySelector('header');
    expect(header).not.toBeNull();
  });

  it('does not render the header when is not group chat', () => {
    fixture.componentRef.setInput('sender', 'Support');
    fixture.componentRef.setInput('isGroupChat', false);
    fixture.detectChanges();

    const header: HTMLElement | null = fixture.nativeElement.querySelector('header');
    expect(header).toBeNull();
  });

  it('does not render the header when is not group chat', () => {
    fixture.componentRef.setInput('sender', 'Support');
    fixture.componentRef.setInput('isGroupChat', false);
    fixture.detectChanges();

    const header: HTMLElement | null = fixture.nativeElement.querySelector('header');
    expect(header).toBeNull();
  });

  it('renders app-user-avatar when group chat and sender is not "You"', () => {
    fixture.componentRef.setInput('isGroupChat', true);
    fixture.componentRef.setInput('sender', 'Alex');
    fixture.componentRef.setInput('chatMemberColor', '#ff0000');
    fixture.detectChanges();

    // A) Presence via native querySelector
    const el: HTMLElement | null = fixture.nativeElement.querySelector('app-user-avatar');
    expect(el).not.toBeNull();
  });

  it('does not render app-user-avatar when sender is "You"', () => {
    fixture.componentRef.setInput('isGroupChat', true);
    fixture.componentRef.setInput('sender', 'You');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('app-user-avatar')).toBeNull();
  });

  it('does not render app-user-avatar when not a group chat', () => {
    fixture.componentRef.setInput('isGroupChat', false);
    fixture.componentRef.setInput('sender', 'Alex');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('app-user-avatar')).toBeNull();
  });
});
