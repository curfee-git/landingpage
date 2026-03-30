import { LAYOUT } from '@/configurations/layout';

class ScrollToTopButton {
  private readonly visibleClasses = ['opacity-100', 'translate-y-0', 'pointer-events-auto'] as const;
  private readonly hiddenClasses = ['opacity-0', 'translate-y-4', 'pointer-events-none'] as const;

  constructor(private readonly button: HTMLButtonElement) {
    this.bindEvents();
  }

  private bindEvents(): void {
    this.button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => this.updateVisibility(), { passive: true });
  }

  private updateVisibility(): void {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const isVisible = scrollableHeight > 0 && window.scrollY / scrollableHeight > LAYOUT.fabScrollThreshold;

    for (const cls of this.hiddenClasses) this.button.classList.toggle(cls, !isVisible);
    for (const cls of this.visibleClasses) this.button.classList.toggle(cls, isVisible);
  }
}

export function initFab(): void {
  const fab = document.querySelector('[data-scroll-top]') as HTMLButtonElement | null;
  if (!fab) return;

  new ScrollToTopButton(fab);
}
