import { expect } from '@open-wc/testing';
import { html } from 'lit';

import type { SbbDialogElement } from '../../dialog.ts';
import type { SbbMenuElement } from '../../menu.ts';
import type { SbbOpenCloseBaseElement } from '../base-elements/open-close-base-element.ts';
import { pageScrollDisabled } from '../dom/scroll.ts';
import { fixture } from '../testing/private.ts';

import { SbbScrollController } from './scroll-controller.ts';

import '../../dialog.ts';
import '../../menu.ts';

describe('SbbScrollController', () => {
  it('should handle the scroll when multiple overlays are opened', async () => {
    const scrollElements = new Set<SbbOpenCloseBaseElement>();
    const element = await fixture(html`
      <div id="scroll-container" style="overflow: auto; height: 400px;">
        <p style="height: 800px;">Scrollable content</p>
        <sbb-menu id="menu" trigger="menu-trigger"></sbb-menu>
        <sbb-dialog id="dialog" trigger="dialog-trigger">
          <sbb-dialog-content>Dialog content</sbb-dialog-content>
        </sbb-dialog>
      </div>
    `);

    const menu: SbbMenuElement = element.querySelector('#menu')!;
    const dialog: SbbDialogElement = element.querySelector('#dialog')!;
    const controllerOne = new SbbScrollController(menu, scrollElements);
    const controllerTwo = new SbbScrollController(dialog, scrollElements);

    // Starting situation.
    expect(pageScrollDisabled()).to.be.false;
    expect(element.scrollTop).to.be.equal(0);

    element.scrollTop = element.scrollHeight;
    controllerOne.disableScroll();
    controllerTwo.enableScroll();
    // Scroll is disabled since the line related to controllerTwo has no effect (owner: controllerOne).
    expect(pageScrollDisabled()).to.be.true;
    expect(element.scrollTop).not.to.be.equal(0);

    controllerOne.enableScroll();
    // Scroll is enabled: controllerOne has completed its 'lifecycle'.
    expect(pageScrollDisabled()).to.be.false;
    expect(element.scrollTop).not.to.be.equal(0);

    controllerTwo.disableScroll();
    controllerOne.disableScroll();
    expect(pageScrollDisabled()).to.be.true;
    controllerTwo.enableScroll();
    expect(pageScrollDisabled()).to.be.true;
    controllerOne.enableScroll();
    expect(pageScrollDisabled()).to.be.false;
    expect(element.scrollTop).not.to.be.equal(0);
  });
});
