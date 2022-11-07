import { SbbCheckboxGroup } from './sbb-checkbox-group';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-checkbox-group', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbCheckboxGroup],
      html: `
        <sbb-checkbox-group>
          <sbb-checkbox name="checkbox-1" value="checkbox-1">Label 1</sbb-checkbox>
          <sbb-checkbox name="checkbox-2" value="checkbox-2">Label 2</sbb-checkbox>
          <sbb-checkbox name="checkbox-3" value="checkbox-3">Label 3</sbb-checkbox>
        </sbb-checkbox-group>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-checkbox-group aria-label="sbb-checkbox-group-1-name">
        <mock:shadow-root>
          <div class="sbb-checkbox-group">
            <slot></slot>
          </div>
        </mock:shadow-root>
        <sbb-checkbox name="checkbox-1" value="checkbox-1">Label 1</sbb-checkbox>
        <sbb-checkbox name="checkbox-2" value="checkbox-2">Label 2</sbb-checkbox>
        <sbb-checkbox name="checkbox-3" value="checkbox-3">Label 3</sbb-checkbox>
      </sbb-checkbox-group>
    `);
  });
});
