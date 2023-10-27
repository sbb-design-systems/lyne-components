import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { waitForLitRender } from '../../global/testing';
import { SbbSkiplinkList } from './sbb-skiplink-list';
import { SbbLink } from '../sbb-link';
import '../sbb-skiplink-list';

describe('sbb-skiplink-list', () => {
  /** NOTE: These are too hard to migrate and are prone to errors :/
   * consider that the E2EPage is now the 'document' (you should just delete it)
   * and that the E2EElement equivalent is directly the SbbComponent (e.g. SbbTimeInput) */
  let element: SbbSkiplinkList;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-skiplink-list>
        <sbb-link href="1">Link 1</sbb-link>
        <sbb-link href="2">Link 2</sbb-link>
        <sbb-link href="3">Link 3</sbb-link>
      </sbb-skiplink-list>
      <button id="button">Focus me</button>
    `);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbSkiplinkList);
  });

  it('should be visible on focus', async () => {
    const listItemLinks = element.shadowRoot.querySelectorAll('li');
    expect(listItemLinks).not.to.be.null;
    expect(listItemLinks.length).to.be.equal(3);

    expect(listItemLinks[0].style.height).to.be.equal('0px');
    expect(listItemLinks[0].style.overflow).to.be.equal('hidden');

    const firstLink: SbbLink = document.querySelector(
      'sbb-skiplink-list > sbb-link#sbb-skiplink-list-link-0',
    );
    firstLink.focus();
    expect(listItemLinks[0].style.height).not.to.be.equal('0px');
    expect(listItemLinks[0].style.overflow).to.be.equal('visible');

    const secondLink: SbbLink = document.querySelector(
      'sbb-skiplink-list > sbb-link#sbb-skiplink-list-link-1',
    );
    secondLink.focus();
    expect(listItemLinks[0].style.height).to.be.equal('0px');
    expect(listItemLinks[0].style.overflow).to.be.equal('hidden');
    expect(listItemLinks[1].style.height).not.to.be.equal('0px');
    expect(listItemLinks[1].style.overflow).to.be.equal('visible');
  });

  it('should detected later added links', async () => {
    await fixture(html`<sbb-skiplink-list></sbb-skiplink-list>`);
    element = document.querySelector('sbb-skiplink-list');

    await waitForLitRender(element);

    document.querySelector('sbb-skiplink-list').innerHTML = `
        <sbb-link href='1'>Link 1</sbb-link>
        <sbb-link href='2'>Link 2</sbb-link>`;

    await waitForLitRender(element);

    expect(document.querySelector('sbb-link')).to.have.attribute('id');
    expect(document.querySelector('sbb-link')).to.have.attribute('slot');
  });
});
