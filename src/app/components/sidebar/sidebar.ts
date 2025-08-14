import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MenuItem} from '../../core/types/dashboard.model';
import {NgForOf, NgIf} from '@angular/common';


@Component({
  selector: 'app-sidebar',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  @Input() currentUser: any
  @Output() menuItemClick = new EventEmitter<string>()
  @Output() logoutClick = new EventEmitter<void>()

  menuItems: MenuItem[] = [
    { id: "profile", label: "Profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
    { id: "transfer", label: "Transfer", icon: "M8 5l4-4 4 4M12 1v12M16 19l-4 4-4-4M12 23V11", active: true },
    {
      id: "transactions",
      label: "Transactions",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    },
  ]

  adminItems: MenuItem[] = [
    {
      id: "ads",
      label: "Ads",
      icon: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z",
    },
    {
      id: "users",
      label: "Users",
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
    },
  ]

  // Check if user is admin (you can modify this logic based on your user model)
  get isAdmin(): boolean {
    return this.currentUser?.role === "admin" || this.currentUser?.isAdmin
  }

  onMenuItemClick(itemId: string): void {
    // Update active state
    this.menuItems.forEach((item) => (item.active = item.id === itemId))
    this.adminItems.forEach((item) => (item.active = item.id === itemId))

    this.menuItemClick.emit(itemId)
  }

  onLogout(): void {
    this.logoutClick.emit()
  }
}
