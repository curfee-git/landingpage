interface DropdownElements {
  readonly container: Element;
  readonly trigger: HTMLButtonElement;
  readonly menu: HTMLElement;
  readonly items: NodeListOf<HTMLElement>;
}

class Dropdown {
  private isOpen = false;
  private focusIndex = -1;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(private readonly elements: DropdownElements) {
    this.setInitialState();
    this.bindEvents();
  }

  private setInitialState(): void {
    this.elements.menu.style.transform = 'scale(0.92)';
    this.elements.menu.style.transformOrigin = 'top left';
  }

  private clearHideTimeout(): void {
    if (this.hideTimeout !== null) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }

  private show(): void {
    this.clearHideTimeout();
    const { menu, trigger } = this.elements;
    menu.style.opacity = '1';
    menu.style.pointerEvents = 'auto';
    menu.style.transform = 'scale(1)';
    trigger.setAttribute('aria-expanded', 'true');
    this.isOpen = true;
  }

  private hide(): void {
    this.clearHideTimeout();
    const { menu, trigger } = this.elements;
    menu.style.opacity = '0';
    menu.style.pointerEvents = 'none';
    menu.style.transform = 'scale(0.92)';
    trigger.setAttribute('aria-expanded', 'false');
    this.isOpen = false;
    this.focusIndex = -1;
  }

  private focusItem(index: number): void {
    const { items } = this.elements;
    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;
    this.focusIndex = index;
    items[this.focusIndex].focus();
  }

  private bindEvents(): void {
    const { container, trigger, menu } = this.elements;

    container.addEventListener('mouseenter', () => {
      this.clearHideTimeout();
      this.show();
    });
    container.addEventListener('mouseleave', () => {
      this.hideTimeout = setTimeout(() => this.hide(), 150);
    });

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      this.isOpen ? this.hide() : this.show();
    });

    trigger.addEventListener('keydown', (e) => {
      if (['ArrowDown', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        if (!this.isOpen) this.show();
        this.focusItem(0);
      }
    });

    menu.addEventListener('keydown', (e) => this.handleMenuKeydown(e));

    document.addEventListener('click', (e) => {
      if (this.isOpen && !container.contains(e.target as Node)) this.hide();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.hide();
        trigger.focus();
      }
    });
  }

  private handleMenuKeydown(e: KeyboardEvent): void {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.focusItem(this.focusIndex + 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.focusItem(this.focusIndex - 1);
        break;
      case 'Home':
        e.preventDefault();
        this.focusItem(0);
        break;
      case 'End':
        e.preventDefault();
        this.focusItem(this.elements.items.length - 1);
        break;
      case 'Escape':
        this.hide();
        this.elements.trigger.focus();
        break;
      case 'Tab':
        this.hide();
        break;
    }
  }
}

export function initDropdowns(): void {
  for (const container of document.querySelectorAll('[data-dropdown]')) {
    const trigger = container.querySelector('button') as HTMLButtonElement | null;
    const menu = container.querySelector('[data-dropdown-menu]') as HTMLElement | null;
    if (!trigger || !menu) continue;

    const items = menu.querySelectorAll('[role="menuitem"]') as NodeListOf<HTMLElement>;
    new Dropdown({ container, trigger, menu, items });
  }
}
