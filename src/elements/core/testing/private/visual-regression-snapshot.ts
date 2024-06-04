import { aTimeout } from '@open-wc/testing';
import { resetMouse, sendKeys, sendMouse, setViewport } from '@web/test-runner-commands';
import { visualDiff } from '@web/test-runner-visual-regression';
import type { TemplateResult } from 'lit';

import { visualRegressionFixture } from './fixture.js';

export function imageName(test: Mocha.Runnable): string {
  return test!.fullTitle().replaceAll(', ', '-').replaceAll(' ', '_');
}

function findElementCenter(element: HTMLElement): [number, number] {
  // Look for the first sbb-* element and get center of the element to
  // move the mouse cursor over it.
  const positionElement = element.localName.startsWith('sbb-')
    ? element
    : element.firstElementChild!;
  const position = positionElement.getBoundingClientRect();
  return [
    Math.round(position.x + window.scrollX + position.width / 2),
    Math.round(position.y + window.scrollY + position.height / 2),
  ];
}

class VisualDiffSetup {
  private _snapshotElement?: HTMLElement;
  private _stateElement?: HTMLElement;

  public get snapshotElement(): HTMLElement {
    return (
      this._snapshotElement ??
      (document.getElementById('visual-regression-fixture-wrapper') as HTMLElement)
    );
  }

  public get stateElement(): HTMLElement {
    return this._stateElement ?? this.snapshotElement;
  }

  public withSnapshotElement(element: HTMLElement): this {
    this._snapshotElement = element;
    return this;
  }

  public withStateElement(element: HTMLElement): this {
    this._stateElement = element;
    return this;
  }

  public async withFixture(
    template: TemplateResult,
    wrapperStyles?: Parameters<typeof visualRegressionFixture>[1],
  ): Promise<this> {
    this._snapshotElement = await visualRegressionFixture(template, wrapperStyles);
    return this;
  }
}

const applyViewportIfDefined = async (
  viewport: { width: number; height: number } | undefined,
): Promise<void> => {
  if (viewport) {
    await setViewport(viewport);
  }
};

export interface VisualDiffState {
  name: string;
  with: (setup: (setup: VisualDiffSetup) => void | Promise<void>) => Mocha.Func;
}

export const visualDiffDefault: VisualDiffState = {
  name: 'default',
  with(setup: (setup: VisualDiffSetup) => void | Promise<void>): Mocha.Func {
    return async function (this: Mocha.Context) {
      const context = new VisualDiffSetup();
      await setup(context);
      await applyViewportIfDefined(this.ctx['requestViewport']);
      await visualDiff(context.snapshotElement, imageName(this.test!));
    };
  },
};

export const visualDiffFocus: VisualDiffState = {
  name: 'default',
  with(setup: (setup: VisualDiffSetup) => void | Promise<void>): Mocha.Func {
    return async function (this: Mocha.Context) {
      const context = new VisualDiffSetup();
      await setup(context);
      await applyViewportIfDefined(this.ctx['requestViewport']);
      context.snapshotElement.focus();
      await sendKeys({ press: 'Tab' });
      await visualDiff(context.snapshotElement, imageName(this.test!));
    };
  },
};

export const visualDiffHover: VisualDiffState = {
  name: 'default',
  with(setup: (setup: VisualDiffSetup) => void | Promise<void>): Mocha.Func {
    return async function (this: Mocha.Context) {
      const context = new VisualDiffSetup();
      await setup(context);
      await applyViewportIfDefined(this.ctx['requestViewport']);
      const position = findElementCenter(context.stateElement);
      try {
        await sendMouse({ type: 'move', position });
        await aTimeout(5);
        await visualDiff(context.snapshotElement, imageName(this.test!));
      } finally {
        await resetMouse();
      }
    };
  },
};

export const visualDiffActive: VisualDiffState = {
  name: 'default',
  with(setup: (setup: VisualDiffSetup) => void | Promise<void>): Mocha.Func {
    return async function (this: Mocha.Context) {
      const context = new VisualDiffSetup();
      await setup(context);
      await applyViewportIfDefined(this.ctx['requestViewport']);
      const position = findElementCenter(context.stateElement);
      try {
        await sendMouse({ type: 'move', position });
        await sendMouse({ type: 'down' });
        await aTimeout(5);
        await visualDiff(context.snapshotElement, imageName(this.test!));
      } finally {
        await resetMouse();
      }
    };
  },
};

export const visualDiffStandardStates = [
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
  visualDiffActive,
] as const;
