import { Component, ComponentInterface, Element, h, Host, JSX, Listen, State } from '@stencil/core';
import { getNextElementIndex, isArrowKeyPressed } from '../../global/helpers/arrow-navigation';
import { toggleDatasetEntry } from '../../global/helpers/dataset';

/**
 * @slot unnamed - Use this to slot the sbb-breadcrumb elements.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-breadcrumb-group.scss',
  tag: 'sbb-breadcrumb-group',
})
export class SbbBreadcrumbGroup implements ComponentInterface {
  /** Local instance of slotted sbb-breadcrumb elements */
  @State() private _breadcrumbs: HTMLSbbBreadcrumbElement[];

  /** Whether the list needs to be shortened with the ellipsis breadcrumb. */
  @State() private _isCollapsed: boolean;

  @Element() private _element!: HTMLElement;

  private _totalBreadcrumbsWidth: number;

  private _breadcrumbGroupController: AbortController;

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
      if (this._isCollapsed) {
        return this._focusNextCollapsed(evt);
      }
      this._focusNextExpanded(evt);
    }
  }

  public connectedCallback(): void {
    this._readBreadcrumb();
    this._breadcrumbGroupController = new AbortController();
    window.addEventListener(
      'resize',
      () => {
        this._isCollapsed = false;
        this._evaluateCollapsedState();
      },
      {
        passive: true,
        signal: this._breadcrumbGroupController.signal,
      }
    );
  }

  public componentDidLoad(): void {
    this._measureBreadcrumbs();
    this._evaluateCollapsedState();
  }

  public componentDidUpdate(): void {
    toggleDatasetEntry(this._element, 'loaded', true);
  }

  public disconnectedCallback(): void {
    this._breadcrumbGroupController.abort();
  }

  /** Creates and sets an array with only the sbb-breadcrumb children. */
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

  /** Apply the aria-current attribute to the last sbb-breadcrumb element. */
  private _syncBreadcrumbs(): void {
    const breadcrumbs = this._element.querySelectorAll('sbb-breadcrumb');
    const length = breadcrumbs.length - 1;
    breadcrumbs.forEach((breadcrumb, index) => {
      if (index === length) {
        breadcrumb['aria-current'] = 'page';
      }
      if (!breadcrumb.id) {
        breadcrumb.id = `sbb-breadcrumb-${index}`;
      }
    });
  }

  private _measureBreadcrumbs(): void {
    const listElements = this._element.shadowRoot.querySelectorAll(
      'li:not(#sbb-breadcrumb-group-ellipsis)'
    );

    if (listElements?.length > 0) {
      // Get gap value between breadcrumb elements
      const breadcrumbGap = parseInt(
        getComputedStyle(
          this._element.shadowRoot.querySelector('.sbb-breadcrumb-group')
        ).getPropertyValue('column-gap'),
        10
      );

      // Calculate total width of the breadcrumb elements
      this._totalBreadcrumbsWidth =
        Array.from(listElements)
          .map((e) => e.clientWidth)
          .reduce((a: number, b: number) => a + (b || 0), 0) +
        breadcrumbGap * (listElements.length - 1);
    }
  }

  /**
   * Sets the focus on the correct element when the ellipsis breadcrumb is displayed and the user is navigating with keyboard's arrows.
   */
  private _focusNextCollapsed(evt: KeyboardEvent): void {
    const arrayCollapsed: HTMLSbbBreadcrumbElement[] = [
      this._breadcrumbs[0],
      this._element.shadowRoot.querySelector(
        '#sbb-breadcrumb-ellipsis'
      ) as HTMLSbbBreadcrumbElement,
      this._breadcrumbs[this._breadcrumbs.length - 1],
    ];
    const current: number = arrayCollapsed.findIndex(
      (e) => e === document.activeElement || e === this._element.shadowRoot.activeElement
    );
    const nextIndex: number = getNextElementIndex(evt, current, arrayCollapsed.length);
    arrayCollapsed[nextIndex]?.focus();
    evt.preventDefault();
  }

  private _focusNextExpanded(evt: KeyboardEvent): void {
    const current: number = this._breadcrumbs.findIndex((e) => e === document.activeElement);
    const nextIndex: number = getNextElementIndex(evt, current, this._breadcrumbs.length);
    this._breadcrumbs[nextIndex]?.focus();
    evt.preventDefault();
  }

  /**
   * Displays the full breadcrumb list by resetting the _hasEllipsis value and removing the listener on resize.
   * Note: due to @State annotation on _isCollapsed, this method triggers a new render; as a consequence, the focus is moved
   * to the `body`, so if the ellipsis element has focus, it's asynchronously forced to the first element.
   */
  private _expandBreadcrumbs(): void {
    this._isCollapsed = false;
    this._breadcrumbGroupController.abort();
    if (
      this._element.shadowRoot.activeElement ===
      this._element.shadowRoot.querySelector('#sbb-breadcrumb-ellipsis')
    ) {
      setTimeout(() => this._breadcrumbs[1].focus(), 0);
    }
  }

  /** Evaluate if the expanded breadcrumb element fits in page width, otherwise it needs ellipsis */
  private _evaluateCollapsedState(): void {
    this._isCollapsed =
      this._breadcrumbs?.length > 2 && this._element.clientWidth < this._totalBreadcrumbsWidth;
  }

  private _renderCollapsed(): JSX.Element {
    for (let i = 0; i < this._breadcrumbs.length; i++) {
      if (i === 0 || i === this._breadcrumbs.length - 1) {
        this._breadcrumbs[i].setAttribute('slot', `breadcrumb-${i}`);
      } else {
        this._breadcrumbs[i].removeAttribute('slot');
      }
    }
    const idFirstElement = this._breadcrumbs[0].id ?? `sbb-breadcrumb-0`;
    const idLastElement =
      this._breadcrumbs[this._breadcrumbs.length - 1].id ??
      `sbb-breadcrumb-${this._breadcrumbs.length - 1}`;

    return [
      <li class="sbb-breadcrumb-group__item">
        <slot
          name="breadcrumb-0"
          key={idFirstElement}
          onSlotchange={(): void => this._readBreadcrumb()}
        />
      </li>,
      <li class="sbb-breadcrumb-group__item" id="sbb-breadcrumb-group-ellipsis">
        <sbb-icon name="chevron-small-right-small"></sbb-icon>
        <sbb-breadcrumb
          id="sbb-breadcrumb-ellipsis"
          role="link"
          tabindex="0"
          onClick={() => this._expandBreadcrumbs()}
        >
          &hellip;
        </sbb-breadcrumb>
      </li>,
      <li class="sbb-breadcrumb-group__item">
        <sbb-icon name="chevron-small-right-small"></sbb-icon>
        <slot
          name={`breadcrumb-${this._breadcrumbs.length - 1}`}
          key={idLastElement}
          onSlotchange={(): void => this._readBreadcrumb()}
        />
      </li>,
    ];
  }

  private _renderExpanded(): JSX.Element {
    const slotName = (index): string => `breadcrumb-${index}`;

    return this._breadcrumbs.map((element: HTMLSbbBreadcrumbElement, index: number) => {
      element.setAttribute('slot', slotName(index));
      return (
        <li class="sbb-breadcrumb-group__item" key={element.id}>
          <slot name={slotName(index)} onSlotchange={(): void => this._readBreadcrumb()} />
          {index !== this._breadcrumbs.length - 1 && (
            <sbb-icon name="chevron-small-right-small"></sbb-icon>
          )}
        </li>
      );
    });
  }

  public render(): JSX.Element {
    return (
      <Host role="navigation">
        <ol class="sbb-breadcrumb-group">
          {this._isCollapsed ? this._renderCollapsed() : this._renderExpanded()}
        </ol>
        <span hidden>
          <slot onSlotchange={(): void => this._readBreadcrumb()} />
        </span>
      </Host>
    );
  }
}
