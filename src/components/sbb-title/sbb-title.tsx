import { Component, h, Element, JSX, Prop } from '@stencil/core';
import { InterfaceTitleAttributes } from './sbb-title.custom';

let nextId = 0;

@Component({
  shadow: true,
  styleUrl: 'sbb-title.scss',
  tag: 'sbb-title',
})
export class SbbTitle {
  private _hasTextContent = false;

  /** Host element */
  @Element() private _element!: HTMLElement;

  /** Title level */
  @Prop() public level?: InterfaceTitleAttributes['level'] = '1';

  /**
   * Visual level for the title. Optional, if not set, the value of level will be used.
   */
  @Prop() public visualLevel?: InterfaceTitleAttributes['visualLevel'];

  /**
   * A11y Tip:
   * Sometimes we need to set an id, especially if we want to associate
   * a relationship with another element through the use of aria-labelledby
   * or aria-describedby or just offer an anchor target
   */
  @Prop() public titleId = `sbb-title-${++nextId}`;

  /**
   * Sometimes we need a title in the markup to present a proper hierarchy
   * to the screenreaders while we do not want to let that title appear
   * visually. In this case we set visuallyHidden to true
   */
  @Prop() public visuallyHidden?: false;

  /**
   * Choose negative variant
   */
  @Prop() public negative?: boolean = false;

  public componentWillLoad(): void {
    this._hasTextContent = !!(this._element.querySelector('[slot="title"]') as HTMLSpanElement)
      .innerText;
  }

  public render(): JSX.Element {
    const TAGNAME = `h${this.level}`; // eslint-disable-line @typescript-eslint/no-unused-vars

    const cssClasses = this._createCssClassesString();

    return this._hasTextContent ? (
      <TAGNAME class={cssClasses} id={this.titleId}>
        <slot name="title" />
      </TAGNAME>
    ) : undefined;
  }

  /**
   * Create the string containing the list of css-classes, depending on given parameters
   * @private
   */
  private _createCssClassesString(): string {
    let cssNames = 'title';

    if (this.visuallyHidden) {
      cssNames += ' title--hidden';
    }

    if (this.negative) {
      cssNames += ' title--negative';
    }

    const visualLevel = this.visualLevel ? this.visualLevel : this.level;
    return cssNames + ` title-${visualLevel}`;
  }
}
