import { SbbIcon } from './sbb-icon';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-icon', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbIcon],
      html: '<sbb-icon />',
    });

    expect(root).toEqualHtml(`
        <sbb-icon aria-hidden="true" role="img" data-empty data-namespace="default">
          <mock:shadow-root>
            <span class="sbb-icon__container"><svg height="0" width="0"></svg></span>
          </mock:shadow-root>
        </sbb-icon>
      `);
  });

  it('renders aria-hidden and no aria-label', async () => {
    const { root } = await newSpecPage({
      components: [SbbIcon],
      html: `<sbb-icon name="app-icon-medium"></sbb-icon>`,
    });

    expect(root).toEqualHtml(`
      <sbb-icon name="app-icon-medium" aria-hidden="true" role="img" data-namespace="default" data-empty>
        <mock:shadow-root>
          <span class="sbb-icon__container"><svg height="0" width="0"></svg></span>
        </mock:shadow-root>
      </sbb-icon>
    `);
  });

  it('renders default aria-label', async () => {
    const { root } = await newSpecPage({
      components: [SbbIcon],
      html: `<sbb-icon name="app-icon-medium" aria-hidden="false"></sbb-icon>`,
    });

    expect(root).toEqualHtml(`
      <sbb-icon name="app-icon-medium" aria-hidden="false" aria-label="Icon app icon medium" role="img" data-namespace="default" data-empty>
        <mock:shadow-root>
          <span class="sbb-icon__container"><svg height="0" width="0"></svg></span>
        </mock:shadow-root>
      </sbb-icon>
    `);
  });

  it('renders custom aria-label', async () => {
    const { root } = await newSpecPage({
      components: [SbbIcon],
      html: `<sbb-icon name="app-icon-medium" aria-hidden="false" aria-label="Custom label"></sbb-icon>`,
    });

    expect(root).toEqualHtml(`
      <sbb-icon name="app-icon-medium" aria-hidden="false" aria-label="Custom label" role="img" data-namespace="default" data-empty>
        <mock:shadow-root>
          <span class="sbb-icon__container"><svg height="0" width="0"></svg></span>
        </mock:shadow-root>
      </sbb-icon>
    `);
  });

  it('renders default label after changing source', async () => {
    const page = await newSpecPage({
      components: [SbbIcon],
      html: `<sbb-icon name="app-icon-medium" aria-hidden="false"></sbb-icon>`,
    });

    const icon = page.root;

    expect(icon).toEqualHtml(`
      <sbb-icon name="app-icon-medium" aria-hidden="false" aria-label="Icon app icon medium" role="img" data-namespace="default" data-empty>
        <mock:shadow-root>
          <span class="sbb-icon__container"><svg height="0" width="0"></svg></span>
        </mock:shadow-root>
      </sbb-icon>
    `);

    icon.setAttribute('name', 'pie-medium');
    await page.waitForChanges();

    expect(icon).toEqualHtml(`
      <sbb-icon name="pie-medium" aria-hidden="false" aria-label="Icon pie medium" role="img" data-namespace="default" data-empty>
        <mock:shadow-root>
          <span class="sbb-icon__container"><svg height="0" width="0"></svg></span>
        </mock:shadow-root>
      </sbb-icon>
    `);
  });

  it('registers a custom namespace', async () => {
    SbbIcon.registerNamespace('kom', 'https://icons.app.sbb.ch/kom/');

    const { root } = await newSpecPage({
      components: [SbbIcon],
      html: `<sbb-icon name="kom:heart-medium"></sbb-icon>`,
    });

    expect(root).toEqualHtml(`
      <sbb-icon name="kom:heart-medium" aria-hidden="true" role="img" data-namespace="kom" data-empty>
        <mock:shadow-root>
          <span class="sbb-icon__container"><svg height="0" width="0"></svg></span>
        </mock:shadow-root>
      </sbb-icon>
    `);
  });

  it('registers a custom icon', async () => {
    SbbIcon.registerIcon(
      'dom',
      'app-logo',
      '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0,0,36,36"><path fill-rule="evenodd" clip-rule="evenodd" d="m4.25,9.5391c0-2.92036,2.36814-5.2885,5.2885-5.2885h16.923c2.9204,0,5.2885,2.36814,5.2885,5.2885v16.9215c0,2.9219-2.3696,5.29-5.2885,5.29H9.5385c-2.92019,0-5.2885-2.3695-5.2885-5.29V9.5391zm5.2885-6.2885c-3.47264,0-6.2885,2.81586-6.2885,6.2885v16.9215c0,3.4725,2.81569,6.29,6.2885,6.29h16.923c3.4711,0,6.2885-2.8159,6.2885-6.29V9.5391c0-3.47264-2.8159-6.2885-6.2885-6.2885H9.5385zm13.8859,13.726L19.8964,13.5h2.6216L27,18l-4.482,4.5h-2.6216l3.528-3.4534h-4.3868V22.5h-2.0739v-3.4534h-4.3624l3.528,3.4534h-2.6229L9,18l4.5064-4.5h2.6229l-3.528,3.4766h4.3624V13.5h2.0739v3.4766h4.3868z"/></svg>'
    );

    const { root } = await newSpecPage({
      components: [SbbIcon],
      html: `<sbb-icon name="dom:app-logo"></sbb-icon>`,
    });

    expect(root).toEqualHtml(`
      <sbb-icon name="dom:app-logo" aria-hidden="true" role="img" data-namespace="dom">
        <mock:shadow-root>
          <span class="sbb-icon__container">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0,0,36,36"><path fill-rule="evenodd" clip-rule="evenodd" d="m4.25,9.5391c0-2.92036,2.36814-5.2885,5.2885-5.2885h16.923c2.9204,0,5.2885,2.36814,5.2885,5.2885v16.9215c0,2.9219-2.3696,5.29-5.2885,5.29H9.5385c-2.92019,0-5.2885-2.3695-5.2885-5.29V9.5391zm5.2885-6.2885c-3.47264,0-6.2885,2.81586-6.2885,6.2885v16.9215c0,3.4725,2.81569,6.29,6.2885,6.29h16.923c3.4711,0,6.2885-2.8159,6.2885-6.29V9.5391c0-3.47264-2.8159-6.2885-6.2885-6.2885H9.5385zm13.8859,13.726L19.8964,13.5h2.6216L27,18l-4.482,4.5h-2.6216l3.528-3.4534h-4.3868V22.5h-2.0739v-3.4534h-4.3624l3.528,3.4534h-2.6229L9,18l4.5064-4.5h2.6229l-3.528,3.4766h4.3624V13.5h2.0739v3.4766h4.3868z"/></svg>
          </span>
        </mock:shadow-root>
      </sbb-icon>
    `);
  });

  it('registers a custom icon with color immutable', async () => {
    SbbIcon.registerIcon(
      'dom',
      'app-logo',
      '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0,0,36,36"><path fill-rule="evenodd" clip-rule="evenodd" d="m4.25,9.5391c0-2.92036,2.36814-5.2885,5.2885-5.2885h16.923c2.9204,0,5.2885,2.36814,5.2885,5.2885v16.9215c0,2.9219-2.3696,5.29-5.2885,5.29H9.5385c-2.92019,0-5.2885-2.3695-5.2885-5.29V9.5391zm5.2885-6.2885c-3.47264,0-6.2885,2.81586-6.2885,6.2885v16.9215c0,3.4725,2.81569,6.29,6.2885,6.29h16.923c3.4711,0,6.2885-2.8159,6.2885-6.29V9.5391c0-3.47264-2.8159-6.2885-6.2885-6.2885H9.5385zm13.8859,13.726L19.8964,13.5h2.6216L27,18l-4.482,4.5h-2.6216l3.528-3.4534h-4.3868V22.5h-2.0739v-3.4534h-4.3624l3.528,3.4534h-2.6229L9,18l4.5064-4.5h2.6229l-3.528,3.4766h4.3624V13.5h2.0739v3.4766h4.3868z"/></svg>',
      { colorImmutable: true }
    );

    const { root } = await newSpecPage({
      components: [SbbIcon],
      html: `<sbb-icon name="dom:app-logo"></sbb-icon>`,
    });

    expect(root).toEqualHtml(`
      <sbb-icon name="dom:app-logo" aria-hidden="true" role="img" data-namespace="dom">
        <mock:shadow-root>
          <span class="sbb-icon__container">
            <svg xmlns="http://www.w3.org/2000/svg" class="color-immutable" width="36" height="36" viewBox="0,0,36,36"><path fill-rule="evenodd" clip-rule="evenodd" d="m4.25,9.5391c0-2.92036,2.36814-5.2885,5.2885-5.2885h16.923c2.9204,0,5.2885,2.36814,5.2885,5.2885v16.9215c0,2.9219-2.3696,5.29-5.2885,5.29H9.5385c-2.92019,0-5.2885-2.3695-5.2885-5.29V9.5391zm5.2885-6.2885c-3.47264,0-6.2885,2.81586-6.2885,6.2885v16.9215c0,3.4725,2.81569,6.29,6.2885,6.29h16.923c3.4711,0,6.2885-2.8159,6.2885-6.29V9.5391c0-3.47264-2.8159-6.2885-6.2885-6.2885H9.5385zm13.8859,13.726L19.8964,13.5h2.6216L27,18l-4.482,4.5h-2.6216l3.528-3.4534h-4.3868V22.5h-2.0739v-3.4534h-4.3624l3.528,3.4534h-2.6229L9,18l4.5064-4.5h2.6229l-3.528,3.4766h4.3624V13.5h2.0739v3.4766h4.3868z"/></svg>
          </span>
        </mock:shadow-root>
      </sbb-icon>
    `);
  });
});
