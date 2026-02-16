import { expect, fixture } from '@open-wc/testing';
import type { TemplateResult } from 'lit';
import { html, LitElement, render } from 'lit';

import { sbbSpread } from './spread.ts';

class SpreadDirectiveTestOnlyElement extends LitElement {
  public static override get properties(): Record<string, any> {
    return {
      truthy: { type: Boolean }, // true
      'boolean-false': { type: Boolean }, // false
      'true-string': { type: String }, // 'true'
      'false-string': { type: String }, // 'false'
      words: { type: String }, // any string
      numeric: { type: Number }, // any number
      zero: { type: Number }, // 0
      nullish: { type: Boolean }, // null
      'not-defined': { type: Boolean }, // undefined,
    };
  }

  public constructor() {
    super();
  }

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

customElements.define('spread-test-only', SpreadDirectiveTestOnlyElement);

describe(`sbbSpread`, () => {
  it('should spread attributes', async () => {
    const attributes: Record<string, any> = {
      truthy: true,
      'true-string': 'true',
      'false-string': 'false',
      words: 'This value is a string',
      numeric: 1,
      'boolean-false': false,
      nullish: null,
      'not-defined': undefined,
      zero: 0,
    };

    const element = await fixture(html`
      <spread-test-only ${sbbSpread(attributes)}>Test element</spread-test-only>
    `);

    expect(element).to.have.attribute('truthy');
    expect(element).to.have.attribute('words', 'This value is a string');
    expect(element).to.have.attribute('true-string', 'true');
    expect(element).to.have.attribute('false-string', 'false');
    expect(element).to.have.attribute('numeric', '1');
    expect(element).to.have.attribute('zero');
    expect(element).not.to.have.attribute('boolean-false');
    expect(element).not.to.have.attribute('nullish');
    expect(element).not.to.have.attribute('not-defined');
  });

  it('should groom attributes', async () => {
    const element: HTMLDivElement = await fixture(html`<div></div>`);

    const binding = (spreadAttributes: Record<string, any>): TemplateResult =>
      html`<spread-test-only id="content" ${sbbSpread(spreadAttributes)}></spread-test-only>`;

    const attributes: Record<string, any> = {
      'is-truthy': false,
      words: 'This value is a string',
      numeric: 1,
    };
    render(binding(attributes), element);

    const spreadElement: SpreadDirectiveTestOnlyElement =
      element.querySelector<SpreadDirectiveTestOnlyElement>('#content')!;
    expect(spreadElement).not.to.have.attribute('is-truthy');
    expect(spreadElement).to.have.attribute('words', 'This value is a string');
    expect(spreadElement).to.have.attribute('numeric', '1');

    const groomAttributes: Record<string, any> = {
      'is-truthy': true,
      words: 'This value is a string',
      numeric: 0,
    };
    render(binding(groomAttributes), element);

    expect(spreadElement).to.have.attribute('is-truthy');
    expect(spreadElement).to.have.attribute('words', 'This value is a string');
    expect(spreadElement).to.have.attribute('numeric');
  });

  describe('binding order', () => {
    it('overrides attributes added before (both interpolated and not)', async () => {
      const element: HTMLDivElement = await fixture(html`<div></div>`);
      const attributes: Record<string, any> = {
        'is-truthy': false,
        words: null,
        numeric: 1,
      };

      const binding = (spreadAttributes: Record<string, any>): TemplateResult =>
        html`<spread-test-only
          id="content"
          words="Two words"
          .numeric=${'99'}
          ${sbbSpread(spreadAttributes)}
        ></spread-test-only>`;

      render(binding(attributes), element);

      const spreadTestElement: SpreadDirectiveTestOnlyElement =
        element.querySelector<SpreadDirectiveTestOnlyElement>('#content')!;
      expect(spreadTestElement).not.to.have.attribute('is-truthy');
      expect(spreadTestElement).not.to.have.attribute('words');
      expect(spreadTestElement).to.have.attribute('numeric', '1');
    });

    it('overrides non-interpolated attributes added after', async () => {
      const element: HTMLDivElement = await fixture(html`<div></div>`);
      const attributes: Record<string, any> = {
        'is-truthy': false,
        words: 'This value is a string',
        numeric: 1,
      };

      const binding = (spreadAttributes: Record<string, any>): TemplateResult =>
        html`<spread-test-only
          id="content"
          ${sbbSpread(spreadAttributes)}
          numeric=${'99'}
          words="ii"
        ></spread-test-only>`;

      render(binding(attributes), element);

      const spreadTestElement: SpreadDirectiveTestOnlyElement =
        element.querySelector<SpreadDirectiveTestOnlyElement>('#content')!;
      expect(spreadTestElement).not.to.have.attribute('is-truthy');
      expect(spreadTestElement).to.have.attribute('words', 'This value is a string');
      expect(spreadTestElement).to.have.attribute('numeric', '99');
    });
  });
});

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'spread-test-only': SpreadDirectiveTestOnlyElement;
  }
}
