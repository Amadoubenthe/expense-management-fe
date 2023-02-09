import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandAddComponent } from './command-add.component';

describe('CommandAddComponent', () => {
  let component: CommandAddComponent;
  let fixture: ComponentFixture<CommandAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
