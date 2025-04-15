import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CazzataComponent } from './cazzata.component';

describe('CazzataComponent', () => {
  let component: CazzataComponent;
  let fixture: ComponentFixture<CazzataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CazzataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CazzataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
