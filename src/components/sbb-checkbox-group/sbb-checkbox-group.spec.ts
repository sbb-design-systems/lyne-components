import { SbbCheckboxGroup } from './sbb-checkbox-group';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-checkbox-group', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbCheckboxGroup],
      html: `
        <sbb-checkbox-group>
          <sbb-checkbox value="checkbox-1">Label 1</sbb-checkbox>
          <sbb-checkbox value="checkbox-2">Label 2</sbb-checkbox>
          <sbb-checkbox value="checkbox-3">Label 3</sbb-checkbox>
        </sbb-checkbox-group>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-checkbox-group orientation="horizontal">
        <mock:shadow-root>
          <div class="sbb-checkbox-group">
            <slot></slot>
          </div>
        </mock:shadow-root>
        <sbb-checkbox value="checkbox-1">Label 1</sbb-checkbox>
        <sbb-checkbox value="checkbox-2">Label 2</sbb-checkbox>
        <sbb-checkbox value="checkbox-3">Label 3</sbb-checkbox>
      </sbb-checkbox-group>
    `);
  });
});
