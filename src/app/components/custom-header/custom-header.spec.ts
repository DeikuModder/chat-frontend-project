import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { CustomHeader } from './custom-header';

describe('CustomHeader', () => {
  let component: CustomHeader;
  let fixture: ComponentFixture<CustomHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomHeader],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
