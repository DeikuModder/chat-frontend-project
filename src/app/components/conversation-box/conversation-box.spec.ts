import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationBox } from './conversation-box';

describe('ConversationBox', () => {
  let component: ConversationBox;
  let fixture: ComponentFixture<ConversationBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversationBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversationBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
