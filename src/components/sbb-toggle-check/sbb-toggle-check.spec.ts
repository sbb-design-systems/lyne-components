import { SbbToggleCheck } from './sbb-toggle-check';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-toggle-check', () => {
  it('renders sbb-toggle-check', async () => {
    const { root } = await newSpecPage({
      components: [SbbToggleCheck],
      html: '<sbb-toggle-check></sbb-toggle-check>',
    });

    expect(root).toEqualHtml(`
        <sbb-toggle-check>
          <mock:shadow-root>
            <label class="toggle-check">
              <input type="checkbox"/>
              <span class="toggle-check__slider toggle-check__slider--after">
                <span class="toggle-check__circle"></span>
              </span>
              <slot></slot>
            </label>
          </mock:shadow-root>
        </sbb-toggle-check>
      `);
  });
});

describe('label position', () => {
  it('renders label before toggle', async () => {
    const { root } = await newSpecPage({
      components: [SbbToggleCheck],
      html: '<sbb-toggle-check label-position="before"></sbb-toggle-check>',
    });

    expect(root).toEqualHtml(`
      <sbb-toggle-check label-position="before">
        <mock:shadow-root>
          <label class="toggle-check">
            <input type="checkbox"/>
            <slot></slot>
            <span class="toggle-check__slider toggle-check__slider--before">
              <span class="toggle-check__circle"></span>
            </span>
          </label>
        </mock:shadow-root>
      </sbb-toggle-check>
    `);
  });
});

describe('states', () => {
  describe('checked state', () => {
    it('renders toggle in checked state', async () => {
      const { root } = await newSpecPage({
        components: [SbbToggleCheck],
        html: '<sbb-toggle-check checked></sbb-toggle-check>',
      });

      expect(root).toEqualHtml(`
        <sbb-toggle-check checked>
          <mock:shadow-root>
            <label class="toggle-check toggle-check--checked">
              <input checked="" type="checkbox"/>
              <span class="toggle-check__slider toggle-check__slider--after">
                <span class="toggle-check__circle">
                  <span class="toggle-check__tick">
                    <slot name="icon"></slot>
                  </span>
                </span>
              </span>
              <slot></slot>
            </label>
          </mock:shadow-root>
        </sbb-toggle-check>
      `);
    });
  });

  describe('disabled state', () => {
    it('renders toggle in disabled state', async () => {
      const { root } = await newSpecPage({
        components: [SbbToggleCheck],
        html: '<sbb-toggle-check disabled></sbb-toggle-check>',
      });

      expect(root).toEqualHtml(`
        <sbb-toggle-check disabled>
          <mock:shadow-root>
            <label class="toggle-check toggle-check--disabled">
              <input type="checkbox" disabled/>
              <span class="toggle-check__slider toggle-check__slider--after">
                <span class="toggle-check__circle"></span>
              </span>
              <slot></slot>
            </label>
          </mock:shadow-root>
        </sbb-toggle-check>
      `);
    });
  });

  describe('disabled and checked state', () => {
    it('renders toggle in disabled and checked state', async () => {
      const { root } = await newSpecPage({
        components: [SbbToggleCheck],
        html: '<sbb-toggle-check checked disabled></sbb-toggle-check>',
      });

      expect(root).toEqualHtml(`
        <sbb-toggle-check checked disabled>
          <mock:shadow-root>
            <label class="toggle-check toggle-check--disabled toggle-check--checked">
              <input checked="" type="checkbox" disabled/>
              <span class="toggle-check__slider toggle-check__slider--after">
                <span class="toggle-check__circle">
                  <span class="toggle-check__tick">
                    <slot name="icon"></slot>
                  </span>
                </span>
              </span>
              <slot></slot>
            </label>
          </mock:shadow-root>
        </sbb-toggle-check>
      `);
    });
  });
});
