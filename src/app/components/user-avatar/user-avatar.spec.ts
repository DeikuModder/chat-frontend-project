import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { UserAvatar } from './user-avatar';

describe('UserAvatar', () => {
  let component: UserAvatar;
  let fixture: ComponentFixture<UserAvatar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAvatar],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAvatar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('applies userColor to the background', () => {
    fixture.componentRef.setInput('userColor', '#ff0000');
    fixture.detectChanges();

    const span: HTMLElement | null = fixture.nativeElement.querySelector('span');

    expect(span).not.toBeNull();

    // Browsers normalize inline hex to rgb() in computed styles
    const color = getComputedStyle(span!).backgroundColor;
    expect(color).toBe('rgb(255, 0, 0)');
  });

  it('falls back to default color when no userColor is provided', () => {
    fixture.detectChanges();

    const span: HTMLElement | null = fixture.nativeElement.querySelector('span');
    expect(span).not.toBeNull();

    const color = getComputedStyle(span!).backgroundColor;
    expect(color).toBe('rgb(39, 39, 42)');
  });
});
