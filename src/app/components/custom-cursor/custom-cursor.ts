import { isPlatformBrowser } from '@angular/common';
import { Component, inject, NgZone, OnDestroy, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  imports: [],
  templateUrl: './custom-cursor.html',
})
export class CustomCursor implements OnDestroy {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private onMove = (e: MouseEvent) => {
    const root = document.documentElement;

    root.style.setProperty('--cursor-x', `${e.clientX}px`);

    root.style.setProperty('--cursor-y', `${e.clientY}px`);

    document.getElementById('cursor-dot')?.style.setProperty('opacity', '1');
  };

  private onLeave = () => {
    document.getElementById('cursor-dot')?.style.setProperty('opacity', '0');
  };

  private onClick = () => {
    const el = document.getElementById('cursor-dot');
    if (!el) return;
    // restart animation if already active
    el.classList.remove('click-animate');
    // force reflow to allow re-adding the class to retrigger animation
    void el.offsetWidth;
    el.classList.add('click-animate');
  };

  constructor(private zone: NgZone) {
    if (this.isBrowser) {
      this.zone.runOutsideAngular(() => {
        window.addEventListener('mousemove', this.onMove, { passive: true });
        window.addEventListener('mouseleave', this.onLeave, { passive: true });
        window.addEventListener('mouseenter', this.onMove, { passive: true });
        window.addEventListener('click', this.onClick, { passive: true });
      });
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      window.removeEventListener('mousemove', this.onMove);
      window.removeEventListener('mouseleave', this.onLeave);
      window.removeEventListener('mouseenter', this.onMove);
      window.removeEventListener('click', this.onClick);
    }
  }
}
