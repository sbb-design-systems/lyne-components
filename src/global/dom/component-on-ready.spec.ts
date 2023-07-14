/* eslint-disable max-classes-per-file */
/* eslint-disable no-useless-constructor */
import { componentOnReady } from './request-animation-frame';

describe('componentOnReady()', () => {
  it('should correctly call callback for a custom element', () =>
    new Promise<void>((done) => {
      customElements.define(
        'hello-world',
        class extends HTMLElement {
          public constructor() {
            super();
          }
        },
      );

      const component = document.createElement('hello-world');

      componentOnReady(component, (el) => {
        expect(el).toBe(component);
        done();
      });
    }));

  it('should correctly call callback for a lazy loaded component', () =>
    new Promise<void>((done) => {
      const cb = jest.fn(
        (el) =>
          new Promise((resolve) => {
            setTimeout(() => resolve(el), 250);
          }),
      );

      customElements.define(
        'hello-world',
        class extends HTMLElement {
          public constructor() {
            super();
          }

          public componentOnReady(): Promise<unknown> {
            return cb(this);
          }
        },
      );

      const component = document.createElement('hello-world');

      componentOnReady(component, (el) => {
        expect(el).toBe(component);
        expect(cb).toHaveBeenCalledTimes(1);
        done();
      });
    }));
});
