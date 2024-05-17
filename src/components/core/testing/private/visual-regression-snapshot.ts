import { aTimeout } from '@open-wc/testing';
import { resetMouse, sendKeys, sendMouse } from '@web/test-runner-commands';
import { visualDiff } from '@web/test-runner-visual-regression';

export function imageName(test: Mocha.Runnable): string {
  return test!.fullTitle().replaceAll(', ', '-').replaceAll(' ', '_');
}

function findElementCenter(snapshotElement: () => HTMLElement): [number, number] {
  const element = snapshotElement();
  // Look for the first sbb-* element and get center of the element to
  // move the mouse cursor over it.
  const positionElement = element.localName.startsWith('sbb-')
    ? element
    : element.firstElementChild!;
  const position = positionElement.getBoundingClientRect();
  return [
    Math.round(position.x + position.width / 2),
    Math.round(position.y + position.height / 2),
  ];
}

export function testVisualDiff(snapshotElement: () => HTMLElement): void {
  it('default', async function () {
    await visualDiff(snapshotElement(), imageName(this.test!));
  });
}

export function testVisualDiffFocus(snapshotElement: () => HTMLElement): void {
  it('focus', async function () {
    await sendKeys({ press: 'Tab' });
    await aTimeout(50);
    await visualDiff(snapshotElement(), imageName(this.test!));
  });
}

export function testVisualDiffHover(
  snapshotElement: () => HTMLElement,
  stateElement?: (() => HTMLElement) | undefined,
): void {
  it('hover', async function () {
    const position = findElementCenter(stateElement ?? snapshotElement);

    try {
      await sendMouse({ type: 'move', position });
      await aTimeout(5);
      await visualDiff(snapshotElement(), imageName(this.test!));
    } finally {
      await resetMouse();
    }
  });
}

export function testVisualDiffActive(
  snapshotElement: () => HTMLElement,
  stateElement?: (() => HTMLElement) | undefined,
): void {
  it('active', async function () {
    const position = findElementCenter(stateElement ?? snapshotElement);

    try {
      await sendMouse({ type: 'move', position });
      await sendMouse({ type: 'down' });
      await aTimeout(5);
      await visualDiff(snapshotElement(), imageName(this.test!));
    } finally {
      await resetMouse();
    }
  });
}

export function visualRegressionSnapshot(
  snapshotElement: () => HTMLElement,
  stateElement?: () => HTMLElement,
): void {
  testVisualDiff(snapshotElement);
  testVisualDiffFocus(snapshotElement);
  testVisualDiffHover(snapshotElement, stateElement);
  testVisualDiffActive(snapshotElement, stateElement);
}

/**
 * Generates styles for the wrapper element in visual regression testing.
 * @param options.padding Defaults to 2rem to include shadows and similar styles.
 * @param options.backgroundColor Defaults to white.
 */
export function visualRegressionWrapperStyles(
  options: {
    padding?: string;
    backgroundColor?: string;
  } = {},
): string {
  return `padding: ${options.padding ?? '2rem'};background-color: ${options.backgroundColor ?? 'var(--sbb-color-white)'};`;
}
