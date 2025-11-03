import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationButton } from './notification-button';
import { provideZonelessChangeDetection } from '@angular/core';

describe('NotificationButton', () => {
  let component: NotificationButton;
  let fixture: ComponentFixture<NotificationButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationButton],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle isPopUpOpen on togglePopUp call', () => {
    expect(component.isPopUpOpen()).toBeFalse();
    component.togglePopUp();
    expect(component.isPopUpOpen()).toBeTrue();
    component.togglePopUp();
    expect(component.isPopUpOpen()).toBeFalse();
  });

  it('should render pop up div on isPopUpOpen', () => {
    component.isPopUpOpen.set(true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#notification-popup')).toBeTruthy();
  });

  it('should not render pop up div when isPopUpOpen is false', () => {
    component.isPopUpOpen.set(false);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#notification-popup')).toBeNull();
  });

  it('should display unread notifications count', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const badge = compiled.querySelector('#notification-badge');
    expect(badge?.textContent.trim()).toBe(component.unreadCount);
  });

  it('should mark notification as read', () => {
    const notification = component.unreadNotifications[0];
    expect(notification.read).toBeFalse();
    component.markAsRead(notification);
    expect(notification.read).toBeTrue();
    expect(component.unreadNotifications.find((n) => n.id === notification.id)).toBeUndefined();
    expect(component.readNotifications.find((n) => n.id === notification.id)).toBeDefined();
  });
});
