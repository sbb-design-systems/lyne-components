import { SbbIcon } from './sbb-icon';

import { SbbIconConfig, readConfig } from '../../global/config';
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './sbb-icon';
import { waitForLitRender } from '../../global/testing';

describe('sbb-icon', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-icon />`);

    expect(root).dom.to.be.equal(`
      <sbb-icon aria-hidden="true" role="img" data-empty data-namespace="default">
      </sbb-icon>
    `);
    expect(root).shadowDom.to.be.equal(`
      <span class="sbb-icon-inner"><svg height="0" width="0"></svg></span>
    `);
  });

  it('renders aria-hidden and no aria-label', async () => {
    const root: SbbIcon = await fixture(html`<sbb-icon name="app-icon-medium"></sbb-icon>`);

    expect(root).dom.to.be.equal(`
      <sbb-icon name="app-icon-medium" aria-hidden="true" role="img" data-namespace="default">
      </sbb-icon>
    `);
    expect(root).shadowDom.to.be.equal(`
      <span class="sbb-icon-inner"><svg height="36" width="36"></svg></span>
    `);
  });

  it('renders default aria-label', async () => {
    const root = await fixture(
      html`<sbb-icon name="app-icon-medium" aria-hidden="false"></sbb-icon>`,
    );

    expect(root).dom.to.be.equal(`
      <sbb-icon name="app-icon-medium" aria-hidden="false" aria-label="Icon app icon medium" role="img" data-namespace="default">
      </sbb-icon>
    `);
    expect(root).shadowDom.to.be.equal(`
      <span class="sbb-icon-inner"><svg height="36" width="36"></svg></span>
    `);
  });

  it('renders custom aria-label', async () => {
    const root = await fixture(
      html`<sbb-icon
        name="app-icon-medium"
        aria-hidden="false"
        aria-label="Custom label"
      ></sbb-icon>`,
    );

    expect(root).dom.to.be.equal(`
      <sbb-icon name="app-icon-medium" aria-hidden="false" aria-label="Custom label" role="img" data-namespace="default">
      </sbb-icon>
    `);
    expect(root).shadowDom.to.be.equal(`
      <span class="sbb-icon-inner"><svg height="36" width="36"></svg></span>
    `);
  });

  it('renders default label after changing source', async () => {
    const icon: SbbIcon = await fixture(
      html`<sbb-icon name="app-icon-medium" aria-hidden="false"></sbb-icon>`,
    );

    expect(icon).dom.to.be.equal(`
      <sbb-icon name="app-icon-medium" aria-hidden="false" aria-label="Icon app icon medium" role="img" data-namespace="default">
      </sbb-icon>
    `);
    expect(icon).shadowDom.to.be.equal(`
      <span class="sbb-icon-inner"><svg height="36" width="36"></svg></span>
    `);

    icon.setAttribute('name', 'pie-medium');
    await waitForLitRender(icon);

    expect(icon).dom.to.be.equal(`
      <sbb-icon name="pie-medium" aria-hidden="false" aria-label="Icon pie medium" role="img" data-namespace="default">
      </sbb-icon>
    `);
    expect(icon).shadowDom.to.be.equal(`
      <span class="sbb-icon-inner"><svg height="36" width="36"></svg></span>
    `);
  });

  it('registers a custom namespace', async () => {
    const globalConfig = readConfig();
    let interceptorCalled = false;
    globalConfig.icon = {};

    const sbbIconConfig: SbbIconConfig = globalThis.sbbConfig.icon;
    sbbIconConfig.namespaces = new Map<string, string>().set(
      'kom',
      'https://icons.app.sbb.ch/kom/',
    );
    sbbIconConfig.interceptor = (parameters) => {
      expect(parameters.namespace).to.be.equal('kom');
      expect(parameters.name).to.be.equal('heart-medium');
      expect(parameters.url).to.be.equal('https://icons.app.sbb.ch/kom/heart-medium.svg');
      interceptorCalled = true;
      return parameters.request();
    };

    const root = await fixture(html`<sbb-icon name="kom:heart-medium"></sbb-icon>`);
    expect(root).dom.to.be.equal(`
      <sbb-icon name="kom:heart-medium" aria-hidden="true" role="img" data-namespace="kom">
      </sbb-icon>
    `);
    expect(root).shadowDom.to.be.equal(`
      <span class="sbb-icon-inner"><svg height="0" width="0"></svg></span>
    `);

    expect(interceptorCalled).to.be.true;

    // Reset icon config
    delete globalThis.sbbConfig.icon;
  });
});
