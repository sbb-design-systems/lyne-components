import {
  type CSSResultGroup,
  html,
  isServer,
  type PropertyValues,
  type TemplateResult,
  unsafeCSS,
} from 'lit';
import { property } from 'lit/decorators.js';

import {
  forceType,
  getNextElementIndex,
  isArrowKeyPressed,
  SbbDisabledMixin,
  SbbElement,
  SbbNamedSlotListMixin,
  type WithListChildren,
} from '../../core.ts';
import type { SbbTagElement } from '../tag/tag.component.ts';

import style from './tag-group.scss?inline';

/**
 * It can be used as a container for one or more `sbb-tag`.
 *
 * @slot - Use the unnamed slot to add one or more 'sbb-tag' elements to the `sbb-tag-group`.
 * @overrideType value - (T = string | (string | null)[]) | null
 */
export class SbbTagGroupElement<T = string> extends SbbDisabledMixin(
  SbbNamedSlotListMixin<SbbTagElement, typeof SbbElement>(SbbElement),
) {
  public static override readonly elementName: string = 'sbb-tag-group';
  public static override styles: CSSResultGroup = [unsafeCSS(style)];
  // DIV is added here due to special requirements from sbb.ch.
  protected override readonly listChildLocalNames = ['sbb-tag', 'div'];

  /**
   * This will be forwarded as aria-label to the inner list.
   */
  @forceType()
  @property({ attribute: 'accessibility-label' })
  public accessor accessibilityLabel: string = '';

  /**
   * If set multiple to false, the selection is exclusive and the value is a string (or null).
   * If set multiple to true, the selection can have multiple values and therefore value is an array.
   *
   * Changing multiple during run time is not supported.
   */
  @forceType()
  @property({ type: Boolean })
  public accessor multiple: boolean = false;

  /**
   * Tag group size, either s (lean theme default) or m (standard theme default).
   */
  @property({ reflect: true }) public accessor size: SbbTagElement['size'] = null;

  /**
   * Value of the sbb-tag-group.
   * If set multiple to false, the value is a string (or null).
   * If set multiple to true, the value is an array.
   */
  @property()
  public set value(value: T | (T | null)[] | null) {
    if (isServer || !this.hasUpdated) {
      this._value = value;
      return;
    }
    this._applyValueToTags(value);
  }
  public get value(): T | (T | null)[] | null {
    return isServer || !this.hasUpdated
      ? this._value
      : this.multiple
        ? this.tags.filter((t) => t.checked).map((t) => t.value)
        : (this.tags.find((t) => t.checked)?.value ?? null);
  }
  private _value: T | (T | null)[] | null = null;

  /** The child instances of sbb-tag as an array. */
  public get tags(): SbbTagElement<T>[] {
    return Array.from(this.querySelectorAll?.<SbbTagElement<T>>('sbb-tag') ?? []);
  }

  public constructor() {
    super();
    this.addEventListener?.('keydown', (e) => this._handleArrowKeyDown(e));
  }

  protected override willUpdate(changedProperties: PropertyValues<WithListChildren<this>>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('value') && !this.hasUpdated && this._value) {
      this._applyValueToTags(this.value);
    }

    if (changedProperties.has('disabled')) {
      this.tags.forEach((r) => r.requestUpdate?.('disabled'));
    }

    if (changedProperties.has('listChildren') || changedProperties.has('multiple')) {
      if (!this.multiple) {
        // Ensure only one tag checked
        this.tags
          .filter((tag) => tag.checked)
          .slice(1)
          .forEach((tag) => (tag.checked = false));

        this._updateFocusableTags();
      } else if (changedProperties.has('multiple')) {
        // In multiple mode all enabled tags should be focusable
        this._enabledTags().forEach((t) => (t.tabIndex = 0));
      }
    }

    if (changedProperties.has('accessibilityLabel') || changedProperties.has('multiple')) {
      if (this.multiple) {
        this.internals.role = this.accessibilityLabel ? null : 'group';
        this.internals.ariaLabel = null;
      } else {
        this.internals.role = 'radiogroup';
        this.internals.ariaLabel = this.accessibilityLabel;
      }
    }
  }

  /**
   * In exclusive mode, only the checked tag (or the first non-disabled tag) should be focusable.
   */
  private _updateFocusableTags(): void {
    const enabledTags = this._enabledTags();
    if (!enabledTags.length) {
      return;
    }

    if (enabledTags.some((t) => t.checked)) {
      enabledTags.forEach((t) => {
        t.tabIndex = t.checked ? 0 : -1;
      });
    } else {
      enabledTags[0].tabIndex = 0;
      enabledTags.slice(1).forEach((t) => (t.tabIndex = -1));
    }
  }

  private _enabledTags(): SbbTagElement<T>[] {
    return this.tags.filter((t) => !t.disabled);
  }

  private _handleArrowKeyDown(evt: KeyboardEvent): void {
    if (this.multiple || !isArrowKeyPressed(evt)) {
      return;
    }
    evt.preventDefault();

    const enabledTags = this._enabledTags();
    const current = enabledTags.indexOf(evt.target as SbbTagElement<T>);
    if (current === -1) {
      return;
    }

    const nextIndex = getNextElementIndex(evt, current, enabledTags.length);
    const nextTag = enabledTags[nextIndex];

    // Only move focus, do not select. Selection happens via click or Space/Enter.
    enabledTags.forEach((t) => (t.tabIndex = -1));
    nextTag.tabIndex = 0;
    nextTag.focus();
  }

  private _applyValueToTags(value: any): void {
    const tags = this.tags;

    if (value === null) {
      tags.forEach((t) => (t.checked = false));
    } else if (this.multiple) {
      if (!Array.isArray(value) && tags.every((t) => t.value !== value)) {
        try {
          // If it is multiple mode and no tag matches the value, we try to parse the value as JSON.
          // This allows server side rendering to use array values to be passed to the client side.
          value = JSON.parse(value as string);
        } catch {
          /* empty */
        }
      }
      const valueAsArray = Array.isArray(value) ? value : [value];
      tags.forEach((t) => (t.checked = valueAsArray.includes(t.value)));
    } else {
      if (!Array.isArray(value)) {
        tags.forEach((t) => (t.checked = t.value === value));
      } else if (import.meta.env.DEV) {
        console.warn('value must not be set as an array in singular mode.', value);
      }
    }
  }

  protected override render(): TemplateResult {
    return html`
      ${this.renderList({
        class: 'sbb-tag-group__list',
        ariaLabel: this.multiple ? this.accessibilityLabel : undefined,
      })}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-tag-group': SbbTagGroupElement;
  }
}
