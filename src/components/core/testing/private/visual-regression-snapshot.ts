import { sendKeys, sendMouse } from '@web/test-runner-commands';
import { visualDiff } from '@web/test-runner-visual-regression';

export function imageName(test: Mocha.Runnable): string {
  return test!.fullTitle().replaceAll(', ', '-').replaceAll(' ', '_');
}

export function visualRegressionSnapshot(snapshotElement: () => HTMLElement): void {
  it('default', async function () {
    await visualDiff(snapshotElement(), imageName(this.test!));
  });

  it('focus', async function () {
    await sendKeys({ press: 'Tab' });
    await visualDiff(snapshotElement(), imageName(this.test!));
  });

  it('hover', async function () {
    const element = snapshotElement();
    const positionElement = element.localName.startsWith('sbb-')
      ? element
      : element.firstElementChild!;
    const position = positionElement.getBoundingClientRect();
    await sendMouse({
      type: 'move',
      position: [
        Math.round(position.x + position.width / 2),
        Math.round(position.y + position.height / 2),
      ],
    });

    try {
      await visualDiff(element, imageName(this.test!));
    } finally {
      await sendMouse({
        type: 'move',
        position: [0, 0],
      });
    }
  });
}
