import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('navBurger')
  navBurger!: ElementRef;
  @ViewChild('navMenu')
  navMenu!: ElementRef;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateHome() {
    this.router.navigateByUrl('home');
  }

  navigateToday() {
    this.router.navigateByUrl('today');
  }

  navigateThisWeek() {
    this.router.navigateByUrl('thisWeek');
  }

  navigateNextWeek() {
    this.router.navigateByUrl('nextWeek');
  }

  toggleNavbar() {
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active');
  }
}
