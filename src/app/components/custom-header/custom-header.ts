import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-custom-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './custom-header.html',
  styleUrl: './custom-header.css',
})
export class CustomHeader {
  readonly menuOpen = signal(false);
  readonly isDark = signal(false);

  constructor() {
    // Determine initial theme: saved preference or system setting
    try {
      const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null;
      const prefersDark =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-color-scheme: dark)').matches;
      const dark = stored ? stored === 'dark' : !!prefersDark;
      this.isDark.set(dark);
      this.applyTheme();
    } catch {
      // In SSR or restricted environments, no-op
    }
  }

  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }

  toggleTheme() {
    this.isDark.update((v) => !v);
    try {
      localStorage.setItem('theme', this.isDark() ? 'dark' : 'light');
    } catch {
      // ignore storage errors
    }
    this.applyTheme();
  }

  private applyTheme() {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (this.isDark()) root.classList.add('dark');
    else root.classList.remove('dark');
  }
}
