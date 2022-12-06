import { Component, ComponentInterface, Element, h, JSX, Listen } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';
import { hostContext } from '../../global/helpers/host-context';

/**
 * @slot unnamed - Provide one or more 'sbb-tag' to add to the group.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-tag-group.scss',
  tag: 'sbb-tag-group',
})
export class SbbTagGroup implements ComponentInterface {
  @Element() private _element: HTMLElement;

  private _isNested: boolean;

  public tags: HTMLStencilElement[];

  private _getTags(): HTMLStencilElement[] {
    return Array.from(this._element.children).filter((child) =>
      /^SBB-TAG$/u.test(child.tagName)
    ) as HTMLStencilElement[];
  }

  private _onTagSlotChange(): void {
    this.tags = this._getTags();
  }

  public connectedCallback(): void {
    this._isNested = !!hostContext('sbb-tag-group', this._element);
  }

  @Listen('keydown')
  public handleKeyDown(evt: KeyboardEvent): void {
    if (
      (evt.target as HTMLElement) !== this._element &&
      (evt.target as HTMLElement).parentElement !== this._element
    ) {
      return;
    }

    const enabledTags = this._getTags().filter((tag) => !tag.hasAttribute('disabled'));
    const cur = enabledTags.findIndex((e) => e === evt.target);
    const size = enabledTags.length;
    const prev = cur === 0 ? size - 1 : cur - 1;
    const next = cur === size - 1 ? 0 : cur + 1;

    if (evt.key == 'ArrowLeft' || evt.key === 'ArrowUp') {
      enabledTags[prev]?.focus();
    } else if (evt.key == 'ArrowRight' || evt.key === 'ArrowDown') {
      enabledTags[next]?.focus();
    }
  }

  public render(): JSX.Element {
    if (this._isNested) {
      throw new Error('Error: nested sbb-tag-group.');
    }
    return (
      <div class="sbb-tag-group">
        <slot onSlotchange={() => this._onTagSlotChange()} />
      </div>
    );
  }
}
