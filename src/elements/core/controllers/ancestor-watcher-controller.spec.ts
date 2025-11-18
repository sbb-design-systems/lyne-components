import { expect } from '@open-wc/testing';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { forceType } from '../decorators.ts';
import { fixture } from '../testing/private.js';

import { SbbAncestorWatcherController } from './ancestor-watcher-controller.js';

/** Test parent element */
@customElement('parent-element')
class SbbParentElement extends LitElement {
  @forceType()
  @property()
  public accessor size: string = 's';
  @forceType()
  @property({ type: Boolean })
  public accessor disabled: boolean = false;
}

/** Test child element */
@customElement('child-element')
class SbbChildElement extends LitElement {
  @forceType()
  @property()
  public accessor size: string = 's';

  @property({ type: Boolean })
  public set disabled(value: boolean) {
    this._disabled = value;
  }
  public get disabled(): boolean {
    return this._disabled || this._ancestorDisabled;
  }
  private _disabled: boolean = false;

  private _ancestorDisabled = false;

  public constructor() {
    super();
    this.addController(
      new SbbAncestorWatcherController(this, () => this.closest('parent-element'), {
        size: (p) => (this.size = p.size),
        disabled: (p) => (this._ancestorDisabled = p.disabled),
      }),
    );
  }
}

describe('SbbAncestorWatcherController', () => {
  it('should render', async () => {
    const parent = await fixture<SbbParentElement>(html`
      <parent-element>
        <child-element></child-element>
      </parent-element>
    `);
    const child = parent.querySelector<SbbChildElement>('child-element')!;

    expect(parent.size).to.be.equal('s');
    expect(parent.disabled).to.be.equal(false);
    expect(child.size).to.be.equal('s');
    expect(child.disabled).to.be.equal(false);
  });

  it('should sync size property', async () => {
    const parent = await fixture<SbbParentElement>(html`
      <parent-element size="m">
        <child-element></child-element>
      </parent-element>
    `);
    const child = parent.querySelector<SbbChildElement>('child-element')!;

    expect(child.size).to.be.equal('m');
  });

  it('should sync disable property', async () => {
    const parent = await fixture<SbbParentElement>(html`
      <parent-element disabled>
        <child-element></child-element>
      </parent-element>
    `);
    const child = parent.querySelector<SbbChildElement>('child-element')!;

    expect(child.disabled).to.be.equal(true);
  });

  it('should sync size property when dynamically connecting child', async () => {
    const parent = await fixture<SbbParentElement>(html`
      <parent-element size="m"></parent-element>
    `);
    const child = document.createElement('child-element') as SbbChildElement;
    parent.appendChild(child);

    expect(child.size).to.be.equal('m');
  });

  it('should sync size property when dynamically connecting parent and child', async () => {
    const root = await fixture(html` <div></div> `);
    const parent = document.createElement('parent-element') as SbbParentElement;
    parent.size = 'm';
    const child = document.createElement('child-element') as SbbChildElement;
    parent.appendChild(child);
    root.appendChild(parent);

    expect(child.size).to.be.equal('m');
  });

  it('should sync size property when moving child between parents', async () => {
    const root = await fixture(html`
      <div>
        <parent-element size="m">
          <child-element></child-element>
        </parent-element>
        <parent-element size="l"></parent-element>
      </div>
    `);
    const parent2 = root.querySelector<SbbParentElement>('parent-element[size="l"]')!;
    const child = root.querySelector<SbbChildElement>('child-element')!;

    expect(child.size).to.be.equal('m');

    parent2.appendChild(child);

    expect(child.size).to.be.equal('l');
  });

  it('should sync size property when moving child outside parent', async () => {
    const root = await fixture(html`
      <div>
        <parent-element size="m">
          <child-element></child-element>
        </parent-element>
      </div>
    `);
    const child = root.querySelector<SbbChildElement>('child-element')!;

    expect(child.size).to.be.equal('m');

    child.remove();
    child.size = 's';
    root.appendChild(child);

    expect(child.size).to.be.equal('s');
  });

  it('should sync size property when changed in parent', async () => {
    const parent = await fixture<SbbParentElement>(html`
      <parent-element size="m">
        <child-element></child-element>
      </parent-element>
    `);
    const child = parent.querySelector<SbbChildElement>('child-element')!;

    expect(child.size).to.be.equal('m');

    parent.size = 'l';
    await parent.updateComplete;

    expect(child.size).to.be.equal('l');
  });
});

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'parent-element': SbbParentElement;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'child-element': SbbChildElement;
  }
}
