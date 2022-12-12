import { Component, ComponentInterface, Element, h, JSX, Listen } from '@stencil/core';
import { getNextElementIndex, isArrowKeyPressed } from '../../global/helpers/arrow-navigation';
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

  @Listen('keydown')
  public handleKeyDown(evt: KeyboardEvent): void {
    const enabledTags: HTMLSbbTagElement[] = this._getTags().filter(
      (tag) => !tag.hasAttribute('disabled')
    );

    if (
      !enabledTags ||
      // don't trap nested handling
      ((evt.target as HTMLElement) !== this._element &&
        (evt.target as HTMLElement).parentElement !== this._element)
    ) {
      return;
    }

    if (isArrowKeyPressed(evt)) {
      const cur: number = enabledTags.findIndex((e: HTMLSbbTagElement) => e === evt.target);
      const nextIndex: number = getNextElementIndex(evt, cur, enabledTags.length);
      enabledTags[nextIndex]?.focus();
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
