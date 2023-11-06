import { waitForCondition, waitForLitRender, EventSpy } from '../../core/testing';
import { SbbExpansionPanelHeader } from '../expansion-panel-header';
import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SbbExpansionPanel } from './expansion-panel';
import { SbbExpansionPanelContent } from '../expansion-panel-content';
import '../expansion-panel-content';

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
    const header = element.querySelector('sbb-expansion-panel-header');
    expect(header).to.have.attribute('id', 'sbb-expansion-panel-header-2');
    expect(header).to.have.attribute('aria-controls', 'sbb-expansion-panel-content-2');
    expect(header).to.have.attribute('data-icon');

    const content = element.querySelector('sbb-expansion-panel-content');
    expect(content).to.have.attribute('id', 'sbb-expansion-panel-content-2');
    expect(content).to.have.attribute('aria-labelledby', `sbb-expansion-panel-header-2`);
    expect(content).to.have.attribute('data-icon-space');
  });

  it('has slotted elements with the correct properties when id are set', async () => {
    element = await fixture(html`
      <sbb-expansion-panel disable-animation>
        <sbb-expansion-panel-header id="header">Header</sbb-expansion-panel-header>
        <sbb-expansion-panel-content id="content">Content</sbb-expansion-panel-content>
      </sbb-expansion-panel>
    `);

    const header = element.querySelector('sbb-expansion-panel-header');
    expect(header).to.have.attribute('aria-controls', 'content');
    const content = element.querySelector('sbb-expansion-panel-content');
    expect(content).to.have.attribute('aria-labelledby', `header`);
  });

  it('click the header expands the panel, click again collapses it', async () => {
    const header: SbbExpansionPanelHeader = element.querySelector('sbb-expansion-panel-header');
    const content: SbbExpansionPanelContent = element.querySelector('sbb-expansion-panel-content');
    expect(element.expanded).to.be.equal(false);
    expect(header.getAttribute('aria-expanded')).to.be.equal('false');
    expect(content.getAttribute('aria-hidden')).to.be.equal('true');

    const toggleExpandedEventSpy = new EventSpy(SbbExpansionPanelHeader.events.toggleExpanded);
    const willOpenEventSpy = new EventSpy(SbbExpansionPanel.events.willOpen);
    const willCloseEventSpy = new EventSpy(SbbExpansionPanel.events.willClose);
    const didOpenEventSpy = new EventSpy(SbbExpansionPanel.events.didOpen);
    const didCloseEventSpy = new EventSpy(SbbExpansionPanel.events.didClose);

    header.click();
    await waitForCondition(() => toggleExpandedEventSpy.events.length === 1);
    expect(toggleExpandedEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);
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
    await waitForLitRender(element);
    expect(element.expanded).to.be.equal(false);
    expect(header.getAttribute('aria-expanded')).to.be.equal('false');
    expect(content.getAttribute('aria-hidden')).to.be.equal('true');
    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy.count).to.be.equal(1);
    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);
  });

  it('disabled property is proxied to header', async () => {
    const header: SbbExpansionPanelHeader = element.querySelector('sbb-expansion-panel-header');
    expect(header.disabled).to.be.undefined;
    expect(header).not.to.have.attribute('aria-disabled');

    element.disabled = true;
    await waitForLitRender(element);
    expect(header.disabled).to.be.equal(true);
    expect(header).to.have.attribute('aria-disabled', 'true');

    element.disabled = false;
    await waitForLitRender(element);
    expect(header.disabled).to.be.equal(false);
    expect(header).not.to.have.attribute('aria-disabled');
  });
});
