import { Component, ComponentInterface, Element, h, Host, JSX, Listen, State } from '@stencil/core';
import { getNextElementIndex, isArrowKeyPressed } from '../../global/helpers/arrow-navigation';

/**
 * @slot unnamed - Use this to slot the sbb-breadcrumb.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-breadcrumb-group.scss',
  tag: 'sbb-breadcrumb-group',
})
export class SbbBreadcrumbGroup implements ComponentInterface {
  /** Local instance of slotted sbb-breadcrumb elements */
  @State() private _breadcrumbs: HTMLSbbBreadcrumbElement[];

  @Element() private _element!: HTMLElement;

  @Listen('keydown')
  public handleKeyDown(evt: KeyboardEvent): void {
    if (
      !this._breadcrumbs ||
      // don't trap nested handling
      ((evt.target as HTMLElement) !== this._element &&
        (evt.target as HTMLElement).parentElement !== this._element)
    ) {
      return;
    }

    if (isArrowKeyPressed(evt)) {
      const current: number = this._breadcrumbs.findIndex((e) => e === document.activeElement);
      const nextIndex: number = getNextElementIndex(evt, current, this._breadcrumbs.length);
      this._breadcrumbs[nextIndex]?.focus();
      evt.preventDefault();
    }
  }

  public connectedCallback(): void {
    this._readBreadcrumb();
  }

  /**
   * Create an array with only the sbb-breadcrumb children
   */
  private _readBreadcrumb(): void {
    const breadcrumbs = Array.from(this._element.children).filter(
      (e): e is HTMLSbbBreadcrumbElement => e.tagName === 'SBB-BREADCRUMB'
    );
    // If the slotted sbb-breadcrumb instances have not changed,
    // we can skip syncing and updating the breadcrumbs reference list.
    if (
      this._breadcrumbs &&
      breadcrumbs.length === this._breadcrumbs.length &&
      this._breadcrumbs.every((e, i) => breadcrumbs[i] === e)
    ) {
      return;
    }
    this._syncBreadcrumbs();
    this._breadcrumbs = breadcrumbs;
  }

  private _syncBreadcrumbs(): void {
    const breadcrumbs = this._element.querySelectorAll('sbb-breadcrumb');
    const length = breadcrumbs.length - 1;
    breadcrumbs.forEach((breadcrumb, index) => {
      breadcrumb.ariaCurrent = index === length ? 'page' : undefined;
    });
  }

  public render(): JSX.Element {
    const slotName = (index): string => `breadcrumb-${index}`;
    this._breadcrumbs.forEach((breadcrumb, index) =>
      breadcrumb.setAttribute('slot', slotName(index))
    );

    return (
      <Host role="navigation">
        <ol class="sbb-breadcrumb-group">
          {this._breadcrumbs.map((_, index) => (
            <li class="sbb-breadcrumb-group__item">
              {index !== 0 && <sbb-icon name="chevron-small-right-small"></sbb-icon>}
              <slot name={slotName(index)} onSlotchange={(): void => this._readBreadcrumb()} />
            </li>
          ))}
        </ol>
        <span hidden>
          <slot onSlotchange={(): void => this._readBreadcrumb()} />
        </span>
      </Host>
    );
  }
}
