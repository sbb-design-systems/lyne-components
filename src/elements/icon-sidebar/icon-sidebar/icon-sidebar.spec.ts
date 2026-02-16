import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';
import { waitForLitRender } from '../../core/testing.ts';
import type { SbbIconSidebarContainerElement } from '../icon-sidebar-container.ts';

import { SbbIconSidebarElement } from './icon-sidebar.component.ts';

import '../icon-sidebar-container.ts';
import '../icon-sidebar-content.ts';

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
