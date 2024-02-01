import type { TemplateResult } from 'lit';
import { LitElement, html, nothing } from 'lit';
import { state } from 'lit/decorators.js';

import { SlotChildObserver } from './slot-child-observer';
import '../../screenreader-only';

const SSR_CHILD_COUNT_ATTRIBUTE = 'data-ssr-child-count';
const SLOTNAME_PREFIX = 'li';

/**
 * Helper type for willUpdate or similar checks.
 * Allows the usage of the string literal 'listChildren'.
 *
 * @example
 * protected override willUpdate(changedProperties: PropertyValueMap<WithListChildren<this>>): void {
 *   if (changedProperties.has('listChildren')) {
 *     ...
 *   }
 * }
 */
export type WithListChildren<
  T extends NamedSlotListElement<C>,
  C extends HTMLElement = HTMLElement,
> = T & { listChildren: C[] };

/**
 * This base class provides named slot list observer functionality.
 * This allows using the pattern of rendering a named slot for each child, which allows
 * wrapping children in a ul/li list.
 */
export abstract class NamedSlotListElement<
  C extends HTMLElement = HTMLElement,
> extends SlotChildObserver(LitElement) {
  /** A list of upper-cased tag names to match against. (e.g. SBB-LINK) */
  protected abstract readonly listChildTagNames: string[];

  /**
   * A list of children with the defined tag names.
   * This array is only updated, if there is an actual change
   * to the child elements.
   */
  @state() protected listChildren: C[] = [];

  protected override checkChildren(): void {
    const listChildren = Array.from(this.children ?? []).filter((e): e is C =>
      this.listChildTagNames.includes(e.tagName),
    );
    // If the slotted child instances have not changed, we can skip syncing and updating
    // the link reference list.
    if (
      listChildren.length === this.listChildren.length &&
      this.listChildren.every((e, i) => listChildren[i] === e)
    ) {
      return;
    }

    this.listChildren
      .filter((c) => !listChildren.includes(c))
      .forEach((c) => c.removeAttribute('slot'));
    this.listChildren = listChildren;
    this.listChildren.forEach((c, index) => c.setAttribute('slot', `${SLOTNAME_PREFIX}-${index}`));

    // Remove the ssr attribute, once we have actually initialized the children elements.
    this.removeAttribute(SSR_CHILD_COUNT_ATTRIBUTE);
  }

  /**
   * Renders list and list slots for slotted children or an amount of list slots
   * corresponding to the `data-ssr-child-count` attribute value.
   *
   * This is a possible optimization for SSR, as in an SSR Lit environment
   * other elements are not available, but might be available in the meta
   * framework wrapper (like e.g. React). This allows to provide the amount of
   * children to be passed via the `data-ssr-child-count` attribute value.
   */
  protected renderList(
    attributes: { class?: string; ariaLabel?: string; ariaLabelledby?: string } = {},
  ): TemplateResult {
    const listSlotNames = this.listSlotNames();

    if (listSlotNames.length >= 2) {
      return html`
        <ul
          class=${attributes.class || this.tagName.toLowerCase()}
          aria-label=${attributes.ariaLabel || nothing}
          aria-labelledby=${attributes.ariaLabelledby || nothing}
        >
          ${listSlotNames.map((name) => html`<li><slot name=${name}></slot></li>`)}
        </ul>
        ${this.renderHiddenSlot()}
      `;
    } else if (listSlotNames.length === 1) {
      return html`<sbb-screenreader-only>${attributes.ariaLabel}</sbb-screenreader-only>
        <span class=${attributes.class || this.tagName.toLowerCase()}>
          <span><slot name=${listSlotNames[0]}></slot></span>
        </span>
        ${this.renderHiddenSlot()} `;
    } else {
      return this.renderHiddenSlot();
    }
  }

  /**
   * Returns an array of list slot names with the length corresponding to the amount of matched
   * children or the `data-ssr-child-count` attribute value.
   *
   * This is a possible optimization for SSR, as in an SSR Lit environment
   * other elements are not available, but might be available in the meta
   * framework wrapper (like e.g. React). This allows to provide the amount of
   * children to be passed via the `data-ssr-child-count` attribute value.
   */
  protected listSlotNames(): string[] {
    const listChildren = this.listChildren.length
      ? this.listChildren
      : Array.from({ length: +(this.getAttribute(SSR_CHILD_COUNT_ATTRIBUTE) ?? 0) });
    return listChildren.map((_, i) => `${SLOTNAME_PREFIX}-${i}`);
  }

  /**
   * Returns a hidden slot, which is intended as the children change detection.
   * When an element without a slot attribute is slotted to the element, it triggers
   * the slotchange event, which can be used to assign it to the appropriate named slot.
   */
  protected renderHiddenSlot(): TemplateResult {
    return html`<span hidden><slot></slot></span>`;
  }
}
