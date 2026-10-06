import { expect } from '@open-wc/testing';
import type { SinonStub } from 'sinon';
import { stub } from 'sinon';

import { type SbbIconConfig, mergeConfig, readConfig } from '../core.ts';

import { getSvgContent } from './icon-request.ts';

describe(`sbb-icon-request`, () => {
  const iconNamespace = 'https://my-icons.com/icons';
  let iconConfig: SbbIconConfig | undefined;
  let warnStub: SinonStub;

  beforeEach(() => {
    iconConfig = readConfig().icon;
    warnStub = stub(console, 'warn');
  });

  afterEach(() => {
    warnStub.restore();
    mergeConfig({ icon: iconConfig });
  });

  /**
   * Since the interceptor never fails, after the first call the cached value is returned;
   * callCounter is incremented only once.
   */
  it('keeps successful responses cached', async () => {
    let callCounter = 0;
    mergeConfig({
      icon: {
        namespaces: new Map<string, string>().set('my-icons', iconNamespace),
        interceptor: async () => {
          callCounter++;
          return '<svg-fake data-name="retry-success"></svg-fake>';
        },
      },
    });

    const first = await getSvgContent('my-icons', 'retry-success', false);
    const second = await getSvgContent('my-icons', 'retry-success', false);

    expect(first).to.be.equal('<svg-fake data-name="retry-success"></svg-fake>');
    expect(second).to.be.equal('<svg-fake data-name="retry-success"></svg-fake>');
    expect(callCounter).to.be.equal(1);
  });

  /**
   * The interceptor gets no content the first time, the cache is emptied, and callCounter is incremented at the next call.
   */
  it('retries when an empty response was cached previously', async () => {
    let callCount = 0;
    mergeConfig({
      icon: {
        namespaces: new Map<string, string>().set('my-icons', iconNamespace),
        interceptor: async () => {
          callCount++;
          return callCount === 1 ? '' : '<svg-fake data-name="retry-empty"></svg-fake>';
        },
      },
    });

    const first = await getSvgContent('my-icons', 'retry-empty', false);
    const second = await getSvgContent('my-icons', 'retry-empty', false);

    expect(first).to.be.equal('');
    expect(second).to.be.equal('<svg-fake data-name="retry-empty"></svg-fake>');
    expect(callCount).to.be.equal(2);

    const third = await getSvgContent('my-icons', 'retry-empty', false);
    expect(third).to.be.equal('<svg-fake data-name="retry-empty"></svg-fake>');
    expect(callCount).to.be.equal(2);
  });

  /**
   * The interceptor fails the first time, the cache is emptied, and callCounter is incremented at the next call.
   */
  it('retries when the interceptor rejects', async () => {
    let callCount = 0;
    mergeConfig({
      icon: {
        namespaces: new Map<string, string>().set('my-icons', iconNamespace),
        interceptor: async () => {
          callCount++;
          if (callCount === 1) {
            throw new Error('Temporary failure');
          }
          return '<svg-fake data-name="retry-reject"></svg-fake>';
        },
      },
    });

    const first = await getSvgContent('my-icons', 'retry-reject', false);
    const second = await getSvgContent('my-icons', 'retry-reject', false);

    expect(first).to.be.equal('');
    expect(second).to.be.equal('<svg-fake data-name="retry-reject"></svg-fake>');
    expect(callCount).to.be.equal(2);

    const third = await getSvgContent('my-icons', 'retry-reject', false);
    expect(third).to.be.equal('<svg-fake data-name="retry-reject"></svg-fake>');
    expect(callCount).to.be.equal(2);
  });

  /**
   * The interceptor synchronously fails the first time, the cache is emptied, and callCounter is incremented at the next call.
   */
  it('retries when the interceptor throws synchronously', async () => {
    let callCount = 0;
    mergeConfig({
      icon: {
        namespaces: new Map<string, string>().set('my-icons', iconNamespace),
        interceptor: () => {
          callCount++;
          if (callCount === 1) {
            throw new Error('Synchronous temporary failure');
          }
          return Promise.resolve('<svg-fake data-name="retry-sync-throw"></svg-fake>');
        },
      },
    });

    const first = await getSvgContent('my-icons', 'retry-sync-throw', false);
    const second = await getSvgContent('my-icons', 'retry-sync-throw', false);

    expect(first).to.be.equal('');
    expect(second).to.be.equal('<svg-fake data-name="retry-sync-throw"></svg-fake>');
    expect(callCount).to.be.equal(2);

    const third = await getSvgContent('my-icons', 'retry-sync-throw', false);
    expect(third).to.be.equal('<svg-fake data-name="retry-sync-throw"></svg-fake>');
    expect(callCount).to.be.equal(2);
  });
});
