import { expect } from '@open-wc/testing';

import { isFirefox, isIOS, isSafari, isWebkit } from '../dom/platform.ts';

import { InteractivityChecker, IsFocusableConfig } from './interactivity-checker.ts';

describe('InteractivityChecker', () => {
  let testContainerElement: HTMLElement;
  let checker: InteractivityChecker;

  /** Creates an array of elements with the given node names. */
  function createElements(...nodeNames: string[]): HTMLElement[] {
    return nodeNames.map((name) => document.createElement(name));
  }

  /** Appends elements to the testContainerElement. */
  function appendElements(elements: Element[]): void {
    for (const e of elements) {
      testContainerElement.appendChild(e);
    }
  }

  function createFromTemplate(template: string, append = false): HTMLElement {
    const tmpRoot = document.createElement('div');
    tmpRoot.innerHTML = template;

    const element = tmpRoot.firstElementChild!;
    element.remove();

    if (append) {
      appendElements([element]);
    }

    return element as HTMLElement;
  }

  beforeEach(() => {
    testContainerElement = document.createElement('div');
    document.body.appendChild(testContainerElement);
    checker = new InteractivityChecker();
  });

  afterEach(() => {
    testContainerElement.remove();
    testContainerElement.innerHTML = '';
  });

  describe('isDisabled', () => {
    it('should return true for disabled elements', () => {
      const elements = createElements('input', 'textarea', 'select', 'button', 'sbb-checkbox');
      elements.forEach((el) => el.setAttribute('disabled', ''));
      appendElements(elements);

      elements.forEach((el) => {
        expect(checker.isDisabled(el), `Expected <${el.nodeName} disabled> to be disabled`).to.be
          .true;
      });
    });

    it('should return false for elements without disabled', () => {
      const elements = createElements('input', 'textarea', 'select', 'button', 'sbb-checkbox');
      appendElements(elements);

      elements.forEach((el) => {
        expect(checker.isDisabled(el), `Expected <${el.nodeName}> not to be disabled`).to.be.false;
      });
    });
  });

  describe('isVisible', () => {
    it('should return false for a `display: none` element', () => {
      testContainerElement.innerHTML = `<input style="display: none;">`;
      const input = testContainerElement.querySelector('input') as HTMLElement;

      expect(checker.isVisible(input)).to.be.equal(false);
    });

    it('should return false for the child of a `display: none` element', () => {
      testContainerElement.innerHTML = `<div style="display: none;">
           <input>
         </div>`;
      const input = testContainerElement.querySelector('input') as HTMLElement;

      expect(checker.isVisible(input)).to.be.equal(false);
    });

    it('should return false for a `visibility: hidden` element', () => {
      testContainerElement.innerHTML = `<input style="visibility: hidden;">`;
      const input = testContainerElement.querySelector('input') as HTMLElement;

      expect(checker.isVisible(input)).to.be.equal(false);
    });

    it('should return false for the child of a `visibility: hidden` element', () => {
      testContainerElement.innerHTML = `<div style="visibility: hidden;">
           <input>
         </div>`;
      const input = testContainerElement.querySelector('input') as HTMLElement;

      expect(checker.isVisible(input)).to.be.equal(false);
    });

    it('should return true for an element with `visibility: hidden` ancestor and *closer* `visibility: visible` ancestor', () => {
      testContainerElement.innerHTML = `<div style="visibility: hidden;">
           <div style="visibility: visible;">
             <input>
           </div>
         </div>`;
      const input = testContainerElement.querySelector('input') as HTMLElement;

      expect(checker.isVisible(input)).to.be.equal(true);
    });

    it('should return true for an element without visibility modifiers', () => {
      const input = document.createElement('input');
      testContainerElement.appendChild(input);

      expect(checker.isVisible(input)).to.be.equal(true);
    });
  });

  describe('isFocusable', () => {
    it('should return true for native form controls', () => {
      const elements = createElements('input', 'textarea', 'select', 'button');
      appendElements(elements);

      elements.forEach((el) => {
        expect(checker.isFocusable(el), `Expected <${el.nodeName}> to be focusable`).to.be.true;
      });
    });

    it('should return true for an anchor with an href', () => {
      const anchor = document.createElement('a');
      anchor.href = 'google.com';
      testContainerElement.appendChild(anchor);

      expect(checker.isFocusable(anchor), `Expected <a> with href to be focusable`).to.be.true;
    });

    it('should return false for an anchor without an href', () => {
      const anchor = document.createElement('a');
      testContainerElement.appendChild(anchor);

      expect(checker.isFocusable(anchor), `Expected <a> without href not to be focusable`).to.be
        .false;
    });

    it('should return false for disabled form controls', () => {
      const elements = createElements('input', 'textarea', 'select', 'button');
      elements.forEach((el) => el.setAttribute('disabled', ''));
      appendElements(elements);

      elements.forEach((el) => {
        expect(checker.isFocusable(el), `Expected <${el.nodeName} disabled> not to be focusable`).to
          .be.false;
      });
    });

    it('should return false for a `display: none` element', () => {
      testContainerElement.innerHTML = `<input style="display: none;">`;
      const input = testContainerElement.querySelector('input') as HTMLElement;

      expect(checker.isFocusable(input), 'Expected element with `display: none` to not be visible')
        .to.be.false;
    });

    it('should return true for a `display: none` element with ignoreVisibility', () => {
      testContainerElement.innerHTML = `<input style="display: none;">`;
      const input = testContainerElement.querySelector('input') as HTMLElement;
      const config = new IsFocusableConfig();
      config.ignoreVisibility = true;

      expect(
        checker.isFocusable(input, config),
        'Expected element with `display: none` to be focusable',
      ).to.be.true;
    });

    it('should return false for the child of a `display: none` element', () => {
      testContainerElement.innerHTML = `<div style="display: none;">
           <input>
         </div>`;
      const input = testContainerElement.querySelector('input') as HTMLElement;

      expect(
        checker.isFocusable(input),
        'Expected element with `display: none` parent to not be visible',
      ).to.be.false;
    });

    it('should return false for a `visibility: hidden` element', () => {
      testContainerElement.innerHTML = `<input style="visibility: hidden;">`;
      const input = testContainerElement.querySelector('input') as HTMLElement;

      expect(
        checker.isFocusable(input),
        'Expected element with `visibility: hidden` not to be focusable',
      ).to.be.false;
    });

    it('should return false for the child of a `visibility: hidden` element', () => {
      testContainerElement.innerHTML = `<div style="visibility: hidden;">
           <input>
         </div>`;
      const input = testContainerElement.querySelector('input') as HTMLElement;

      expect(
        checker.isFocusable(input),
        'Expected element with `visibility: hidden` parent not to be focusable',
      ).to.be.false;
    });

    it('should return true for an element with `visibility: hidden` ancestor and *closer* `visibility: visible` ancestor', () => {
      testContainerElement.innerHTML = `<div style="visibility: hidden;">
           <div style="visibility: visible;">
             <input>
           </div>
         </div>`;
      const input = testContainerElement.querySelector('input') as HTMLElement;

      expect(
        checker.isFocusable(input),
        'Expected element with `visibility: hidden` ancestor and closer ' +
          '`visibility: visible` ancestor to be focusable',
      ).to.be.true;
    });

    it('should return false for an element with an empty tabindex', () => {
      const element = document.createElement('div');
      element.setAttribute('tabindex', '');
      testContainerElement.appendChild(element);

      expect(checker.isFocusable(element), `Expected element with tabindex="" not to be focusable`)
        .to.be.false;
    });

    it('should return false for an element with a non-numeric tabindex', () => {
      const element = document.createElement('div');
      element.setAttribute('tabindex', 'abba');
      testContainerElement.appendChild(element);

      expect(
        checker.isFocusable(element),
        `Expected element with non-numeric tabindex not to be focusable`,
      ).to.be.false;
    });

    it('should return true for an element with contenteditable', () => {
      const element = document.createElement('div');
      element.setAttribute('contenteditable', '');
      testContainerElement.appendChild(element);

      expect(checker.isFocusable(element), `Expected element with contenteditable to be focusable`)
        .to.be.true;
    });

    it('should return false for inert div and span', () => {
      const elements = createElements('div', 'span');
      appendElements(elements);

      elements.forEach((el) => {
        expect(checker.isFocusable(el), `Expected <${el.nodeName}> not to be focusable`).to.be
          .false;
      });
    });

    it('should return false for inert element', () => {
      const elements = createElements('button', 'a');
      elements.forEach((el) => (el.inert = true));
      appendElements(elements);

      elements.forEach((el) => {
        expect(checker.isFocusable(el), `Expected <${el.nodeName}> not to be focusable`).to.be
          .false;
      });
    });
  });

  describe('isTabbable', () => {
    if (!isIOS) {
      // Some tests should not run inside of iOS browsers, because those only allow specific
      // elements to be tabbable and cause the tests to always fail.
      describe('for non-iOS browsers', () => {
        it('should by default treat video elements with controls as tabbable', () => {
          const video = createFromTemplate('<video controls>', true);
          expect(checker.isTabbable(video)).to.be.true;
        });

        it('should respect the tabindex for video elements with controls', () => {
          const video = createFromTemplate('<video controls>', true);
          expect(checker.isTabbable(video)).to.be.true;

          video.tabIndex = -1;
          expect(checker.isTabbable(video)).to.be.false;
        });

        // Firefox always makes video elements (regardless of the controls) as tabbable, unless
        // explicitly opted-out by setting the tabindex.
        it('should by default treat video elements without controls as tabbable in firefox', () => {
          if (!isFirefox) {
            return;
          }

          const video = createFromTemplate('<video>', true);
          expect(checker.isTabbable(video)).to.be.true;

          video.tabIndex = -1;
          expect(checker.isTabbable(video)).to.be.false;
        });

        it('should mark form controls and anchors without tabindex attribute as tabbable', () => {
          const elements = createElements('input', 'textarea', 'select', 'button', 'a');
          appendElements(elements);

          elements.forEach((el) => {
            expect(checker.isTabbable(el), `Expected <${el.nodeName}> to be tabbable`).to.be.true;
          });
        });

        it('should return true for div and span with tabindex == 0', () => {
          const elements = createElements('div', 'span');

          elements.forEach((el) => el.setAttribute('tabindex', '0'));
          appendElements(elements);

          elements.forEach((el) => {
            expect(
              checker.isFocusable(el),
              `Expected <${el.nodeName} tabindex="0"> to be focusable`,
            ).to.be.true;
          });
        });

        it('should return false for native form controls and anchor with tabindex == -1', () => {
          const elements = createElements('input', 'textarea', 'select', 'button', 'a');

          elements.forEach((el) => el.setAttribute('tabindex', '-1'));
          appendElements(elements);

          elements.forEach((el) => {
            expect(
              checker.isTabbable(el),
              `Expected <${el.nodeName} tabindex="-1"> not to be tabbable`,
            ).to.be.false;
          });
        });

        it('should return true for div and span with tabindex == 0', () => {
          const elements = createElements('div', 'span');

          elements.forEach((el) => el.setAttribute('tabindex', '0'));
          appendElements(elements);

          elements.forEach((el) => {
            expect(checker.isTabbable(el), `Expected <${el.nodeName} tabindex="0"> to be tabbable`)
              .to.be.true;
          });
        });

        it('should carefully try to access the frame element of an elements window', () => {
          const iframe = createFromTemplate('<iframe>', true) as HTMLFrameElement;
          const button = createFromTemplate('<button tabindex="1">Not Tabbable</button>');

          appendElements([iframe]);

          iframe.setAttribute('tabindex', '-1');
          iframe.contentDocument!.body.appendChild(button);

          // Some browsers explicitly prevent overwriting of properties on a `Window` object.
          if (!isSafari) {
            Object.defineProperty(iframe.contentWindow, 'frameElement', {
              get: () => {
                throw 'Access Denied!';
              },
            });
          }

          expect(() => checker.isTabbable(button)).not.to.throw;
        });

        it('should mark elements which are contentEditable as tabbable', () => {
          const editableEl = createFromTemplate('<div contenteditable="true">', true);

          expect(checker.isTabbable(editableEl)).to.be.true;

          editableEl.tabIndex = -1;

          expect(checker.isTabbable(editableEl)).to.be.false;
        });

        it('should never mark iframe elements as tabbable', () => {
          const iframe = createFromTemplate('<iframe>', true);

          // iFrame elements will never be marked as tabbable, because it depends on the content
          // which is mostly not detectable due to CORS and also the checks will be not reliable.
          expect(checker.isTabbable(iframe)).to.be.false;
        });

        it('should detect audio elements with controls as tabbable', () => {
          const audio = createFromTemplate('<audio controls>', true);
          expect(checker.isTabbable(audio)).to.be.true;
          audio.tabIndex = -1;
          expect(checker.isTabbable(audio)).to.be.false;
        });

        it('should always detect audio elements without controls as non-tabbable', () => {
          const audio = createFromTemplate('<audio>', true);
          expect(checker.isTabbable(audio)).to.be.false;

          // Setting a `tabindex` has no effect. The audio element is expected
          // to be still not tabbable.
          audio.tabIndex = 0;
          expect(checker.isTabbable(audio)).to.be.false;
        });

        it('should never mark object frame elements as tabbable', () => {
          const objectEl = createFromTemplate('<object>', true);
          expect(checker.isTabbable(objectEl)).to.be.false;
        });
      });
    }

    if (isIOS && isWebkit) {
      describe('for iOS browsers', () => {
        it('should never allow div elements to be tabbable', () => {
          const divEl = createFromTemplate('<div tabindex="0">', true);
          expect(checker.isTabbable(divEl)).to.be.false;
        });

        it('should never allow span elements to be tabbable', () => {
          const spanEl = createFromTemplate('<span tabindex="0">Text</span>', true);
          expect(checker.isTabbable(spanEl)).to.be.false;
        });

        it('should never allow button elements to be tabbable', () => {
          const buttonEl = createFromTemplate('<button tabindex="0">', true);
          expect(checker.isTabbable(buttonEl)).to.be.false;
        });

        it('should never allow anchor elements to be tabbable', () => {
          const anchorEl = createFromTemplate('<a tabindex="0">Link</a>', true);
          expect(checker.isTabbable(anchorEl)).to.be.false;
        });
      });
    }
  });
});
