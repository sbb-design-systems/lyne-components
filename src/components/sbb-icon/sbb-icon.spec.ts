import { SbbIcon } from './sbb-icon';
import { newSpecPage } from '@stencil/core/testing';
import { SbbIconConfig } from '../../global/helpers/config';

describe('sbb-icon', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbIcon],
      html: '<sbb-icon />',
    });

    expect(root).toEqualHtml(`
        <sbb-icon aria-hidden="true" role="img" data-empty data-namespace="default">
          <mock:shadow-root>
            <span class="sbb-icon-inner"><svg height="0" width="0"></svg></span>
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
      <sbb-icon name="app-icon-medium" aria-hidden="true" role="img" data-namespace="default">
        <mock:shadow-root>
          <span class="sbb-icon-inner"><svg height="36" width="36"></svg></span>
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
      <sbb-icon name="app-icon-medium" aria-hidden="false" aria-label="Icon app icon medium" role="img" data-namespace="default">
        <mock:shadow-root>
          <span class="sbb-icon-inner"><svg height="36" width="36"></svg></span>
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
      <sbb-icon name="app-icon-medium" aria-hidden="false" aria-label="Custom label" role="img" data-namespace="default">
        <mock:shadow-root>
          <span class="sbb-icon-inner"><svg height="36" width="36"></svg></span>
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
      <sbb-icon name="app-icon-medium" aria-hidden="false" aria-label="Icon app icon medium" role="img" data-namespace="default">
        <mock:shadow-root>
          <span class="sbb-icon-inner"><svg height="36" width="36"></svg></span>
        </mock:shadow-root>
      </sbb-icon>
    `);

    icon.setAttribute('name', 'pie-medium');
    await page.waitForChanges();

    expect(icon).toEqualHtml(`
      <sbb-icon name="pie-medium" aria-hidden="false" aria-label="Icon pie medium" role="img" data-namespace="default">
        <mock:shadow-root>
          <span class="sbb-icon-inner"><svg height="36" width="36"></svg></span>
        </mock:shadow-root>
      </sbb-icon>
    `);
  });

  it('registers a custom namespace', async () => {
    const sbbIconConfig: SbbIconConfig = globalThis.sbbConfig.icon;
    sbbIconConfig.namespaces = new Map<string, string>().set(
      'kom',
      'https://icons.app.sbb.ch/kom/',
    );
    sbbIconConfig.interceptor = (parameters) => {
      expect(parameters.namespace).toEqual('kom');
      expect(parameters.name).toEqual('heart-medium');
      expect(parameters.url).toEqual('https://icons.app.sbb.ch/kom/heart-medium.svg');
      return parameters.request();
    };
    const interceptorSpy = jest.spyOn(sbbIconConfig, 'interceptor');

    const { root } = await newSpecPage({
      components: [SbbIcon],
      html: `<sbb-icon name="kom:heart-medium"></sbb-icon>`,
    });

    expect(root).toEqualHtml(`
      <sbb-icon name="kom:heart-medium" aria-hidden="true" role="img" data-namespace="kom" data-empty>
        <mock:shadow-root>
          <span class="sbb-icon-inner"><svg height="0" width="0"></svg></span>
        </mock:shadow-root>
      </sbb-icon>
    `);

    expect(interceptorSpy).toHaveBeenCalled();

    // Reset icon config
    delete globalThis.sbbConfig.icon;
  });
});
