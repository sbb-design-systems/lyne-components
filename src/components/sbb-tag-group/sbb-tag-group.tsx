import { Component, ComponentInterface, Element, h, JSX, Listen } from '@stencil/core';
import getDocumentWritingMode from '../../global/helpers/get-document-writing-mode';
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

  public tags: HTMLSbbTagElement[];

  private _getTags(): HTMLSbbTagElement[] {
    return Array.from(this._element.querySelectorAll('sbb-tag')) as HTMLSbbTagElement[];
  }

  private _onTagSlotChange(): void {
    this.tags = this._getTags();
  }

  public connectedCallback(): void {
    this._isNested = !!hostContext('sbb-tag-group', this._element);
  }

  // FIXME will be refactored in https://github.com/lyne-design-system/lyne-components/pull/1485
  @Listen('keydown')
  public handleKeyDown(evt: KeyboardEvent): void {
    if (
      (evt.target as HTMLElement) !== this._element &&
      (evt.target as HTMLElement).parentElement !== this._element
    ) {
      return;
    }

    const enabledTags: HTMLSbbTagElement[] = this._getTags().filter(
      (tag) => !tag.hasAttribute('disabled')
    );
    const cur: number = enabledTags.findIndex((e) => e === evt.target);
    const size: number = enabledTags.length;
    const prev: number = cur === 0 ? size - 1 : cur - 1;
    const next: number = cur === size - 1 ? 0 : cur + 1;

    const currentWritingMode = getDocumentWritingMode();
    const prevKey = currentWritingMode === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
    const nextKey = currentWritingMode === 'rtl' ? 'ArrowLeft' : 'ArrowRight';

    if (evt.key === prevKey || evt.key === 'ArrowUp') {
      enabledTags[prev]?.focus();
    } else if (evt.key === nextKey || evt.key === 'ArrowDown') {
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
