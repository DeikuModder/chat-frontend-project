import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { ConversationBox } from './conversation-box';

describe('ConversationBox', () => {
  let component: ConversationBox;
  let fixture: ComponentFixture<ConversationBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversationBox],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ConversationBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
