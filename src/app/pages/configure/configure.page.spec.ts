import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurePage } from './configure.page';

describe('ConfigurePage', () => {
  let component: ConfigurePage;
  let fixture: ComponentFixture<ConfigurePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
