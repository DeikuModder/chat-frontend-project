import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBubble } from './message-bubble';

describe('MessageBubble', () => {
  let component: MessageBubble;
  let fixture: ComponentFixture<MessageBubble>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageBubble],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageBubble);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('applies chatMemberColor to the sender header', () => {
    fixture.componentRef.setInput('sender', 'Alex');
    fixture.componentRef.setInput('chatMemberColor', '#ff0000');
    fixture.detectChanges();

    const header: HTMLElement | null = fixture.nativeElement.querySelector('header');

    expect(header).withContext("Header should exist when sender != 'You'").not.toBeNull();

    // Browsers normalize inline hex to rgb() in computed styles
    const color = getComputedStyle(header!).color;
    expect(color).toBe('rgb(255, 0, 0)');
  });

  it('falls back to default color when no chatMemberColor is provided', () => {
    fixture.componentRef.setInput('sender', 'Alex'); // ensure header renders
    // do not set chatMemberColor, keep default '#ffffff'
    fixture.detectChanges();

    const header: HTMLElement | null = fixture.nativeElement.querySelector('header');
    expect(header).not.toBeNull();

    const color = getComputedStyle(header!).color;
    expect(color).toBe('rgb(255, 255, 255)');
  });

  it('does not render the header when sender is "You"', () => {
    fixture.componentRef.setInput('sender', 'You');
    fixture.componentRef.setInput('chatMemberColor', '#00ff00');
    fixture.detectChanges();

    const header: HTMLElement | null = fixture.nativeElement.querySelector('header');
    expect(header).toBeNull();
  });
});
