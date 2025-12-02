import { aTimeout, expect } from '@open-wc/testing';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { forceType } from '../decorators.ts';
import { fixture } from '../testing/private.ts';
import { waitForLitRender } from '../testing/wait-for-render.ts';

import { SbbPropertyWatcherController } from './property-watcher-controller.ts';

/** Test watched element */
@customElement('watched-element')
class SbbWatchedElement extends LitElement {
  @forceType()
  @property()
  public accessor size: string = 's';
  @forceType()
  @property({ type: Boolean })
  public accessor disabled: boolean = false;
}

/** Test watcher element */
@customElement('watcher-element')
class SbbWatcherElement extends LitElement {
  @forceType()
  @property()
  public accessor size: string = 's';

  @property({ type: Boolean })
  public set disabled(value: boolean) {
    this._disabled = value;
  }
  public get disabled(): boolean {
    return this._disabled || this._referenceDisabled;
  }
  private _disabled: boolean = false;

  private _referenceDisabled = false;

  public constructor() {
    super();
    this.addController(
      new SbbPropertyWatcherController(this, () => this.closest('watched-element'), {
        size: (p) => (this.size = p.size),
        disabled: (p) => (this._referenceDisabled = p.disabled),
      }),
    );
  }
}

describe('SbbPropertyWatcherController', () => {
  it('should render', async () => {
    const parent = await fixture<SbbWatchedElement>(html`
      <watched-element>
        <watcher-element></watcher-element>
      </watched-element>
    `);
    const child = parent.querySelector<SbbWatcherElement>('watcher-element')!;

    expect(parent.size).to.be.equal('s');
    expect(parent.disabled).to.be.equal(false);
    expect(child.size).to.be.equal('s');
    expect(child.disabled).to.be.equal(false);
  });

  it('should sync size property', async () => {
    const parent = await fixture<SbbWatchedElement>(html`
      <watched-element size="m">
        <watcher-element></watcher-element>
      </watched-element>
    `);
    const child = parent.querySelector<SbbWatcherElement>('watcher-element')!;

    expect(child.size).to.be.equal('m');
  });

  it('should sync disable property', async () => {
    const parent = await fixture<SbbWatchedElement>(html`
      <watched-element disabled>
        <watcher-element></watcher-element>
      </watched-element>
    `);
    const child = parent.querySelector<SbbWatcherElement>('watcher-element')!;

    expect(child.disabled).to.be.equal(true);
  });

  it('should sync size property when dynamically connecting child', async () => {
    const parent = await fixture<SbbWatchedElement>(html`
      <watched-element size="m"></watched-element>
    `);
    const child = document.createElement('watcher-element') as SbbWatcherElement;
    parent.appendChild(child);

    expect(child.size).to.be.equal('m');
  });

  it('should sync size property when dynamically connecting parent and child', async () => {
    const root = await fixture(html` <div></div> `);
    const parent = document.createElement('watched-element') as SbbWatchedElement;
    parent.size = 'm';
    const child = document.createElement('watcher-element') as SbbWatcherElement;
    parent.appendChild(child);
    root.appendChild(parent);

    expect(child.size).to.be.equal('m');
  });

  it('should sync size property when moving child between parents', async () => {
    const root = await fixture(html`
      <div>
        <watched-element size="m">
          <watcher-element></watcher-element>
        </watched-element>
        <watched-element size="l"></watched-element>
      </div>
    `);
    const parent2 = root.querySelector<SbbWatchedElement>('watched-element[size="l"]')!;
    const child = root.querySelector<SbbWatcherElement>('watcher-element')!;

    expect(child.size).to.be.equal('m');

    parent2.appendChild(child);

    expect(child.size).to.be.equal('l');
  });

  it('should sync size property when moving child outside parent', async () => {
    const root = await fixture(html`
      <div>
        <watched-element size="m">
          <watcher-element></watcher-element>
        </watched-element>
      </div>
    `);
    const child = root.querySelector<SbbWatcherElement>('watcher-element')!;

    expect(child.size).to.be.equal('m');

    child.remove();
    child.size = 's';
    root.appendChild(child);

    expect(child.size).to.be.equal('s');
  });

  it('should sync size property when changed in parent', async () => {
    const parent = await fixture<SbbWatchedElement>(html`
      <watched-element size="m">
        <watcher-element></watcher-element>
      </watched-element>
    `);
    const child = parent.querySelector<SbbWatcherElement>('watcher-element')!;

    expect(child.size).to.be.equal('m');

    parent.size = 'l';
    await parent.updateComplete;

    expect(child.size).to.be.equal('l');
  });

  it('should observe child element with manual connection and disconnection', async () => {
    const watcher = await fixture<SbbWatcherElement>(html`<watcher-element></watcher-element>`);
    const propertyWatcherController = new SbbPropertyWatcherController(
      watcher,
      () => watcher.querySelector('watched-element'),
      {
        size: (p) => (watcher.size = p.size),
      },
    );
    watcher.addController(propertyWatcherController);
    watcher.size = 'm';
    await waitForLitRender(watcher);

    const watched = document.createElement('watched-element');
    watched.size = 's';

    watcher.appendChild(watched);
    await waitForLitRender(watcher);

    // Should update after connection
    propertyWatcherController.connect();
    expect(watcher.size).to.be.equal('s');

    // Should still sync
    watched.size = 'm';
    await waitForLitRender(watcher);
    expect(watcher.size).to.be.equal('m');

    // Should not sync after disconnection
    propertyWatcherController.disconnect();
    watched.size = 's';
    await waitForLitRender(watcher);
    expect(watcher.size).to.be.equal('m');
  });

  it('should handle undefined custom element', async () => {
    const watched = await fixture<SbbWatcherElement>(
      html`<watched-element-deferred size="m">
        <watcher-element></watcher-element>
      </watched-element-deferred>`,
    );
    const watcher = watched.querySelector<SbbWatcherElement>('watcher-element')!;
    const propertyWatcherController = new SbbPropertyWatcherController(watcher, () => watched, {
      size: (p) => (watcher.size = p.size),
    });
    watcher.addController(propertyWatcherController);

    customElements.define('watched-element-deferred', class extends SbbWatchedElement {});
    await customElements.whenDefined('watched-element-deferred');

    // Initially the size of the watcher is taken until the Promise callback of whenDefined was executed.
    expect(watcher.size).to.be.equal('s');
    await aTimeout(0);
    expect(watcher.size).to.be.equal('m');

    watched.size = 's';
    await waitForLitRender(watcher);
    expect(watcher.size).to.be.equal('s');

    // Should still sync
    watched.size = 'm';
    await waitForLitRender(watcher);
    expect(watcher.size).to.be.equal('m');
  });
});

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'watched-element': SbbWatchedElement;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'watcher-element': SbbWatcherElement;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'watched-element-deferred': SbbWatchedElement;
  }
}
