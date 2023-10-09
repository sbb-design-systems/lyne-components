import { waitForCondition } from '../../global/testing';
import {
  SbbExpansionPanelHeader,
  events as sbbExpansionPanelHeaderEvents,
} from '../sbb-expansion-panel-header/sbb-expansion-panel-header';
import { events as sbbExpansionPanelEvents } from './sbb-expansion-panel';
import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { EventSpy } from '../../global/testing/event-spy';
import { SbbExpansionPanel } from './sbb-expansion-panel';
import '../sbb-expansion-panel-header';
import '../sbb-expansion-panel-content';
import { SbbExpansionPanelContent } from '../sbb-expansion-panel-content';

describe('sbb-expansion-panel', () => {
  let element: SbbExpansionPanel;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-expansion-panel disable-animation>
        <sbb-expansion-panel-header icon-name="dog-medium">Header</sbb-expansion-panel-header>
        <sbb-expansion-panel-content>Content</sbb-expansion-panel-content>
      </sbb-expansion-panel>
    `);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbExpansionPanel);
  });

  it('has slotted elements with the correct properties', async () => {
    const header = document.querySelector('sbb-expansion-panel-header');
    expect(header).to.have.attribute('id', 'sbb-expansion-panel-header-1');
    expect(header).to.have.attribute('aria-controls', 'sbb-expansion-panel-content-1');
    expect(header).to.have.attribute('data-icon', '');
    const content = document.querySelector('sbb-expansion-panel-content');
    expect(content).to.have.attribute('id', 'sbb-expansion-panel-content-1');
    expect(content).to.have.attribute('aria-labelledby', `sbb-expansion-panel-header-1`);
    expect(content).to.have.attribute('data-icon-space', '');
  });

  it('has slotted elements with the correct properties when id are set', async () => {
    await fixture(html`
      <sbb-expansion-panel disable-animation>
        <sbb-expansion-panel-header id="header">Header</sbb-expansion-panel-header>
        <sbb-expansion-panel-content id="content">Content</sbb-expansion-panel-content>
      </sbb-expansion-panel>
    `);

    const header = document.querySelector('sbb-expansion-panel-header');
    expect(header).to.have.attribute('aria-controls', 'content');
    const content = document.querySelector('sbb-expansion-panel-content');
    expect(content).to.have.attribute('aria-labelledby', `header`);
  });

  it('click the header expands the panel, click again collapses it', async () => {
    const header: SbbExpansionPanelHeader = document.querySelector('sbb-expansion-panel-header');
    const content: SbbExpansionPanelContent = document.querySelector('sbb-expansion-panel-content');
    expect(element.expanded).to.be.equal(false);
    expect(header.getAttribute('aria-expanded')).to.be.equal('false');
    expect(content.getAttribute('aria-hidden')).to.be.equal('true');

    const toggleExpandedEventSpy = new EventSpy(sbbExpansionPanelHeaderEvents.toggleExpanded);
    const willOpenEventSpy = new EventSpy(sbbExpansionPanelEvents.willOpen);
    const willCloseEventSpy = new EventSpy(sbbExpansionPanelEvents.willClose);
    const didOpenEventSpy = new EventSpy(sbbExpansionPanelEvents.didOpen);
    const didCloseEventSpy = new EventSpy(sbbExpansionPanelEvents.didClose);

    header.click();
    await waitForCondition(() => toggleExpandedEventSpy.events.length === 1);
    expect(toggleExpandedEventSpy.count).to.be.equal(1);
    await element.updateComplete;
    expect(element.expanded).to.be.equal(true);
    expect(header.getAttribute('aria-expanded')).to.be.equal('true');
    expect(content.getAttribute('aria-hidden')).to.be.equal('false');
    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);
    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);

    header.click();
    await waitForCondition(() => toggleExpandedEventSpy.events.length === 2);
    expect(toggleExpandedEventSpy.count).to.be.equal(2);
    await element.updateComplete;
    expect(element.expanded).to.be.equal(false);
    expect(header.getAttribute('aria-expanded')).to.be.equal('false');
    expect(content.getAttribute('aria-hidden')).to.be.equal('true');
    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy.count).to.be.equal(1);
    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);
  });

  it('disabled property is proxied to header', async () => {
    const header: SbbExpansionPanelHeader = document.querySelector('sbb-expansion-panel-header');
    expect(header.disabled).to.be.undefined;
    expect(header).not.to.have.attribute('aria-disabled');

    element.disabled = true;
    await element.updateComplete;
    expect(header.disabled).to.be.equal(true);
    expect(header).to.have.attribute('aria-disabled', 'true');

    element.disabled = false;
    await element.updateComplete;
    expect(header.disabled).to.be.equal(false);
    expect(header).to.have.attribute('aria-disabled', null);
  });
});
