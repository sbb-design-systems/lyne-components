import { expect } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';
import { spy } from 'sinon';

import { fixture } from '../core/testing/private.ts';
import { waitForCondition } from '../core/testing.ts';

import './image.component.ts';
import type { SbbImageElement } from './image.component.ts';

const imageUrl = import.meta.resolve('../core/testing/assets/lucerne.png');

describe(`sbb-image`, () => {
  it('should trigger load event', async () => {
    const loadSpy = spy();
    const errorSpy = spy();

    await fixture(
      html`<sbb-image
        image-src=${imageUrl}
        @load=${(e: Event) => loadSpy(e)}
        @error=${(e: Event) => errorSpy(e)}
      ></sbb-image>`,
    );

    await waitForCondition(() => loadSpy.called);

    expect(loadSpy).to.have.been.called;
    expect(errorSpy).not.to.have.been.called;
  });

  it('should trigger load event when viewport changes', async () => {
    const loadSpy = spy();
    const errorSpy = spy();

    await fixture(
      html`<sbb-image
        image-src=${imageUrl}
        @load=${(e: Event) => loadSpy(e)}
        @error=${(e: Event) => errorSpy(e)}
      ></sbb-image>`,
    );

    await waitForCondition(() => loadSpy.called);

    expect(loadSpy).to.have.been.called;
    expect(errorSpy).not.to.have.been.called;

    await setViewport({ width: 1200, height: 1000 });
    await waitForCondition(() => loadSpy.calledTwice);

    expect(loadSpy.callCount).to.be.equal(2);

    await setViewport({ width: 320, height: 1000 });
    await waitForCondition(() => loadSpy.calledThrice);

    expect(loadSpy.callCount).to.be.equal(3);
  });

  it('should trigger error event', async () => {
    const loadSpy = spy();
    const errorSpy = spy();

    const image: SbbImageElement = await fixture(
      html`<sbb-image
        image-src="http://localhost/dummy.png"
        @load=${(e: Event) => loadSpy(e)}
        @error=${(e: Event) => errorSpy(e)}
      ></sbb-image>`,
    );
    expect(image.complete).to.be.false;

    await waitForCondition(() => errorSpy.called);

    expect(image.complete).to.be.true;
    expect(loadSpy).not.to.have.been.called;
    expect(errorSpy).to.have.been.called;
  });

  it('should load image with single size', async () => {
    const loadSpy = spy();
    const errorSpy = spy();
    const imageConfig = `{
        "breakpoints": [
          {
            "image": {
              "height": 180,
              "width": 320
            },
            "mediaQueries": [
              {
                "conditionFeature": "max-width",
                "conditionFeatureValue": {
                  "lyneDesignToken": true,
                  "value": "sbb-breakpoint-zero-max"
                },
                "conditionOperator": false
              }
            ]
          }
        ]
      }`;

    const image: SbbImageElement = await fixture(
      html`<sbb-image
        image-src=${imageUrl}
        @load=${(e: Event) => loadSpy(e)}
        @error=${(e: Event) => errorSpy(e)}
        picture-sizes-config=${imageConfig}
      ></sbb-image>`,
    );

    await waitForCondition(() => loadSpy.called);

    expect(loadSpy).to.have.been.called;
    expect(errorSpy).not.to.have.been.called;
    expect(image.complete).to.be.true;
  });
});
