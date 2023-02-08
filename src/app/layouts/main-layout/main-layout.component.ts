import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  opened!: boolean;

  // constructor(private menuService: MenuService) {}
  constructor() {}

  ngOnInit(): void {
    this.opened = true;
  }

  toggleMenu(event: boolean) {
    this.opened = event;
  }
}
