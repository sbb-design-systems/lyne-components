import { toggleDatasetEntry } from './dataset';
import { isValidAttribute } from './is-valid-attribute';

export function pageScrollDisabled(): boolean {
  return isValidAttribute(document.body, 'data-sbb-scroll-disabled');
}

/**
 * Handle the page scroll, allowing to disable/enable the window scroll avoiding a potential
 * content shift caused by the disappearance/appearance of the scrollbar.
 */
export class ScrollHandler {
  private _position: string;
  private _overflow: string;
  private _marginInlineEnd: string;

  public disableScroll(): void {
    if (pageScrollDisabled()) {
      return;
    }

    // Save any pre-existing styles to reapply them to the body when enabling the scroll again.
    this._position = document.body.style.position;
    this._overflow = document.body.style.overflow;
    this._marginInlineEnd = document.body.style.marginInlineEnd;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'relative';
    document.body.style.marginInlineEnd = `${scrollbarWidth}px`;
    document.body.style.setProperty('--sbb-scrollbar-width', `${scrollbarWidth}px`);

    toggleDatasetEntry(document.body, 'sbbScrollDisabled', true);
  }

  public enableScroll(): void {
    if (!pageScrollDisabled()) {
      return;
    }

    // Revert body inline styles.
    document.body.style.position = this._position || null;
    document.body.style.overflow = this._overflow || null;
    document.body.style.marginInlineEnd = this._marginInlineEnd || null;
    document.body.style.setProperty('--sbb-scrollbar-width', '0');

    toggleDatasetEntry(document.body, 'sbbScrollDisabled', false);
  }
}
