import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DragDropModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'home';
  viewportWidth: number;

  constructor() {
    this.viewportWidth = window.innerWidth;
  }
  ngOnInit(): void {
    this.CalcShownNavItems();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.viewportWidth = event.target.innerWidth;
    this.CalcShownNavItems();
  }

  CalcShownNavItems = () => {
    let max_items = this.viewportWidth / 100;
    this.ShownNavItems = [];
    this.ExtraNavItems = [];

    for (let i = 0; i < this.NavItems.length; i++) {
      if (max_items > i) {
        this.ShownNavItems.push(this.NavItems[i]);
      } else {
        this.ExtraNavItems.push(this.NavItems[i]);
      }
    }
  };

  NavItems: NavItem[] = [
    { link: 'home', title: 'home' },
    { link: '#/gs', title: 'gs' },
    { link: '#/json', title: 'json' },
    { link: '#/speed', title: 'speed' },
    { link: '#/tile', title: 'tile mode' },
    { link: '#/oh-crud', title: 'oh crud' },
    { link: '#/404', title: '404' },
  ];

  ShownNavItems: NavItem[] = [];
  ExtraNavItems: NavItem[] = [];
}

interface NavItem {
  link: string;
  title: string;
}
