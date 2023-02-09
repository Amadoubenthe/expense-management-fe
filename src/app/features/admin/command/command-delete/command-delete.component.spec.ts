import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandDeleteComponent } from './command-delete.component';

describe('CommandDeleteComponent', () => {
  let component: CommandDeleteComponent;
  let fixture: ComponentFixture<CommandDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
