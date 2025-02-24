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

  it('should coerce position property', async () => {
    expect(element.position, 'default position').to.be.equal('start');

    element.position = 'end';
    await waitForLitRender(element);

    expect(element.position, 'end position').to.be.equal('end');
    expect(element).to.have.attribute('position', 'end');

    element.position = 'inexisting' as 'start';
    await waitForLitRender(element);

    expect(element.position, 'fallback to default').to.be.equal('start');
    expect(element).to.have.attribute('position', 'start');

    element.position = null as unknown as 'start';
    await waitForLitRender(element);

    expect(element.position, 'fallback null to default').to.be.equal('start');
    expect(element).to.have.attribute('position', 'start');
  });

  it('should coerce position attribute', () => {
    expect(element.position, 'default position').to.be.equal('start');

    element.setAttribute('position', 'end');
    expect(element.position, 'end position').to.be.equal('end');

    element.setAttribute('position', 'inexisting');
    expect(element.position, 'fallback to default').to.be.equal('start');

    element.setAttribute('position', '');
    expect(element.position, 'fallback null to default').to.be.equal('start');
  });

  it('should coerce color property', async () => {
    expect(element.color, 'default color').to.be.equal('white');

    element.color = 'milk';
    await waitForLitRender(element);

    expect(element.color, 'milk color').to.be.equal('milk');
    expect(element).to.have.attribute('color', 'milk');

    element.color = 'inexisting' as 'white';
    await waitForLitRender(element);

    expect(element.color, 'fallback to default').to.be.equal('white');
    expect(element).to.have.attribute('color', 'white');

    element.color = null as unknown as 'white';
    await waitForLitRender(element);

    expect(element.color, 'fallback null to default').to.be.equal('white');
    expect(element).to.have.attribute('color', 'white');
  });

  it('should coerce color attribute', () => {
    expect(element.color, 'default color').to.be.equal('white');

    element.setAttribute('color', 'milk');
    expect(element.color, 'milk color').to.be.equal('milk');

    element.setAttribute('color', 'inexisting');
    expect(element.color, 'fallback to default').to.be.equal('white');

    element.setAttribute('color', '');
    expect(element.color, 'fallback null to default').to.be.equal('white');
  });
});
