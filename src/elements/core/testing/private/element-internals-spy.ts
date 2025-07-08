import { type SinonStub, stub } from 'sinon';

export function elementInternalsSpy(): WeakMap<HTMLElement, ElementInternals> {
  const elementInternals = new WeakMap<HTMLElement, ElementInternals>();

  before(() => {
    const attachInternals = HTMLElement.prototype.attachInternals;
    stub(HTMLElement.prototype, 'attachInternals').callsFake(function (this: HTMLElement) {
      const internals = attachInternals.call(this);
      elementInternals.set(this, internals);
      return internals;
    });
  });

  after(() => {
    (HTMLElement.prototype.attachInternals as SinonStub).restore();
  });

  return elementInternals;
}
