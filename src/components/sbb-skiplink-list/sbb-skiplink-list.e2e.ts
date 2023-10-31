import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { waitForLitRender } from '../../global/testing';
import { SbbSkiplinkList } from './sbb-skiplink-list';
import { SbbLink } from '../sbb-link';
import '../sbb-link';

describe('sbb-skiplink-list', () => {
  let element: SbbSkiplinkList;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-skiplink-list>
        <sbb-link href="#" id="link-1">Link 1</sbb-link>
        <sbb-link href="#" id="link-2">Link 2</sbb-link>
        <sbb-link href="#" id="link-3">Link 3</sbb-link>
      </sbb-skiplink-list>
      <button id="button">Focus me</button>
    `);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbSkiplinkList);
  });

  it('should be visible on focus', async () => {
    const listItemLinks = element.shadowRoot.querySelectorAll('li');
    expect(listItemLinks.length).to.be.equal(3);

    expect(listItemLinks[0]).to.have.style('height', '0px');
    expect(listItemLinks[0]).to.have.style('overflow', 'hidden');

    const firstLink: SbbLink = element.querySelector('#sbb-skiplink-list-link-0');
    firstLink.focus();
    expect(listItemLinks[0]).not.to.have.style('height', '0px');
    expect(listItemLinks[0]).to.have.style('overflow', 'visible');

    const secondLink: SbbLink = element.querySelector('#sbb-skiplink-list-link-1');
    secondLink.focus();
    expect(listItemLinks[0]).to.have.style('height', '0px');
    expect(listItemLinks[0]).to.have.style('overflow', 'hidden');
    expect(listItemLinks[1]).not.to.have.style('height', '0px');
    expect(listItemLinks[1]).to.have.style('overflow', 'visible');
  });

  it('should detected later added links', async () => {
    element = await fixture(html`<sbb-skiplink-list></sbb-skiplink-list>`);

    element.innerHTML = `
        <sbb-link href='1'>Link 1</sbb-link>
        <sbb-link href='2'>Link 2</sbb-link>`;

    await waitForLitRender(element);

    expect(element.querySelector('sbb-link')).to.have.attribute('id');
    expect(element.querySelector('sbb-link')).to.have.attribute('slot');
  });
});
