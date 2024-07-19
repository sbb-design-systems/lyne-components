import { LitElement, html, type TemplateResult, type CSSResultGroup, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '@sbb-esta/lyne-elements/chip.js';
import style from './describe-each-chip-list.scss?lit&inline';

/**
 * Captures two groups
 * - simple => "key=value" patterns
 * - complex => "key=( key=value-... )
 */
const paramsRegex = /(?<complex>[a-zA-Z]*=\(.*\))|(?<simple>[a-zA-Z]+=[a-zA-Z]*)/gm;

type DescribeEachItem = {
  key: string;
  value: string;
  input: string;
  isBoolean: boolean;
  isUndefined: boolean;
  isComplex: boolean;
};

/**
 *  Convert the `describeEach` test title format into a list of more readable chips.
 *  Chips are displayed differently depending on the param they represent:
 *  - If param is boolean, show a green/red chip with the param name;
 *  - If param is undefined, show nothing;
 *  - Else, show a default chip with "key = value";
 */
@customElement('app-describe-each-chip-list')
export class DescribeEachChipList extends LitElement {
  public static override styles: CSSResultGroup = style;

  @property()
  public set testCaseName(name: string) {
    this._chips = Array.from(name.matchAll(paramsRegex)).map(this._mapToChip);
    this.requestUpdate();
  }
  private _chips: DescribeEachItem[] = [];

  private _mapToChip(match: RegExpMatchArray): DescribeEachItem {
    const [key, value] = match[0].split('=', 2);
    return {
      key,
      value,
      input: match[0],
      isBoolean: value === 'false' || value === 'true',
      isUndefined: value === 'undefined',
      isComplex: !!match.groups?.complex,
    };
  }

  public override render(): TemplateResult {
    return html`
      <div class="chip-list-wrapper">
        ${this._chips.map((c) =>
          c.isBoolean
            ? html`<sbb-chip size="xs" color=${c.value === 'true' ? 'custom-green' : 'custom-red'}
                >${c.key}</sbb-chip
              >`
            : c.isUndefined
              ? nothing
              : html`<sbb-chip size="xs">${c.key} = ${c.value}</sbb-chip>`,
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'app-describe-each-chip-list': DescribeEachChipList;
  }
}
