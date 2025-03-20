import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { waitForLitRender } from '../../core/testing.js';
import type { SbbIconSidebarContainerElement } from '../icon-sidebar-container.js';

import { SbbIconSidebarElement } from './icon-sidebar.js';

import '../icon-sidebar-container.js';
import '../icon-sidebar-content.js';

describe('sbb-icon-sidebar', () => {
  let container: SbbIconSidebarContainerElement, element: SbbIconSidebarElement;

  beforeEach(async () => {
    container = await fixture(
      html`<sbb-icon-sidebar-container>
        <sbb-icon-sidebar></sbb-icon-sidebar>
        <sbb-icon-sidebar-content>Content</sbb-icon-sidebar-content>
      </sbb-icon-sidebar-container>`,
    );

    element = container.querySelector('sbb-icon-sidebar')!;
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbIconSidebarElement);
  });

  it('should return container', () => {
    expect(element.container).to.be.equal(container);
  });

  it('should change color property', async () => {
    expect(element.color, 'default color').to.be.equal('white');

    element.color = 'milk';
    await waitForLitRender(element);

    expect(element.color, 'milk color').to.be.equal('milk');
    expect(element).to.have.attribute('color', 'milk');
  });

  it('should change color attribute', () => {
    expect(element.color, 'default color').to.be.equal('white');

    element.setAttribute('color', 'milk');
    expect(element.color, 'milk color').to.be.equal('milk');
  });
});
