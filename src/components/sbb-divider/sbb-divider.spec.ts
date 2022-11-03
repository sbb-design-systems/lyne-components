import { SbbDivider } from './sbb-divider';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-divider', () => {
  it('should render with default values', async () => {
    const { root } = await newSpecPage({
      components: [SbbDivider],
      html: '<sbb-divider />',
    });

    expect(root).toEqualHtml(`
      <sbb-divider orientation='horizontal' aria-orientation='horizontal' role='separator'>
        <mock:shadow-root>
          <div class='sbb-divider'></div>
        </mock:shadow-root>
      </sbb-divider>
    `);
  });

  it('should render with orientation horizontal', async () => {
    const { root } = await newSpecPage({
      components: [SbbDivider],
      html: '<sbb-divider orientation="horizontal" />',
    });

    expect(root).toEqualHtml(`
      <sbb-divider orientation='horizontal' aria-orientation='horizontal' role='separator'>
        <mock:shadow-root>
          <div class='sbb-divider'></div>
        </mock:shadow-root>
      </sbb-divider>
    `);
  });

  it('should render with orientation vertical', async () => {
    const { root } = await newSpecPage({
      components: [SbbDivider],
      html: '<sbb-divider orientation="vertical" />',
    });

    expect(root).toEqualHtml(`
      <sbb-divider orientation='vertical' aria-orientation='vertical' role='separator'>
        <mock:shadow-root>
          <div class='sbb-divider'></div>
        </mock:shadow-root>
      </sbb-divider>
    `);
  });
});
