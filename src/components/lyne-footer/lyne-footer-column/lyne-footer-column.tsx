import {
  Component,
  Element,
  h,
  State
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'lyne-footer-column.scss',
  tag: 'lyne-footer-column'
})

export class LyneFooterColumn {
  @Element() private _element: HTMLElement;
  @State() public isOpen = false;
  @State() public accordions: HTMLLyneFooterColumnElement[];

  private _titleElement: HTMLElement;

  public componentWillLoad(): void {
    const allAccordions = document.querySelectorAll('lyne-footer-column');

    this.accordions = Array.from(allAccordions)
      .filter((accordion) => accordion !== this._element);

    this._element.addEventListener('transitionend', this.transitionEnd.bind(this));
    this._element.addEventListener('lyne-footer-column_close-accordion', this.closeAccordion.bind(this));
    this._titleElement = this._element.querySelector('lyne-footer-column-title');
  }

  public disconnectedCallback(): void {
    this._element.removeEventListener('transitionend', this.transitionEnd.bind(this));
    this._element.removeEventListener('lyne-footer-column_close-accordion', this.closeAccordion.bind(this));
  }

  public transitionEnd(): void {
    this._element.style.height = null;
    if (this.isOpen) {
      this._element.classList.add('visible');
      this._titleElement.classList.add('visible');
    } else {
      this._element.classList.remove('visible');
      this._titleElement.classList.remove('visible');
    }
  }

  public isDesktopViewport(): boolean {
    return window.innerWidth > 1024;
  }

  public toggleAccordion(): void {
    if (this.isDesktopViewport()) {
      return;
    }

    if (this.isOpen) {
      this.closeAccordion();
    } else {
      this.openAccordion();
    }
  }

  public openAccordion(): void {
    const height = this._element.offsetHeight;

    this.isOpen = true;
    this._element.style.height = 'auto';
    this._element.style.height = '0px';

    setTimeout(() => {
      this._element.style.height = `${height}px`;
    }, 0);

    this.closeOpenAccordions();
  }

  public closeAccordion(): void {
    if (!this.isOpen) {
      return;
    }

    const height = this._element.offsetHeight;

    this.isOpen = false;

    this._element.style.height = `${height}px`;

    setTimeout(() => {
      this._element.style.height = '0px';
    }, 0);
  }

  public closeOpenAccordions(): void {
    if (!this.isOpen) {
      return;
    }

    const closeEvent = new CustomEvent('lyne-footer-column_close-accordion');

    this.accordions.forEach((accordion) => {
      accordion.dispatchEvent(closeEvent);
    });
  }

  public render(): any {
    return [
      <li
        class='footer-columns-list-item'
      >
        <button
          onClick={this.toggleAccordion.bind(this)}
          onKeyDown={this.toggleAccordion.bind(this)}
        >
          <slot />
        </button>
      </li>
    ];
  }
}
