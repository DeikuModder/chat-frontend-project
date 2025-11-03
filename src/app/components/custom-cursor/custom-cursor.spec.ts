import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { CustomCursor } from './custom-cursor';

describe('CustomCursor', () => {
  let component: CustomCursor;
  let fixture: ComponentFixture<CustomCursor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomCursor],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomCursor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
