import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMoviesComponent } from './menu-movies.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MatModule} from '../../mat/mat.module';

describe('MenuMoviesComponent', () => {
  let component: MenuMoviesComponent;
  let fixture: ComponentFixture<MenuMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ MenuMoviesComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
