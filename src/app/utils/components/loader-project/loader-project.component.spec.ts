import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderProjectComponent } from './loader-project.component';

describe('LoaderProjectComponent', () => {
  let component: LoaderProjectComponent;
  let fixture: ComponentFixture<LoaderProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderProjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoaderProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
