import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { waitForLitRender } from '../../core/testing.js';

import { SbbFileSelectorDropzoneElement } from './file-selector-dropzone.component.js';

describe(`sbb-file-selector-dropzone`, () => {
  let form: HTMLFormElement;
  let element: SbbFileSelectorDropzoneElement;

  beforeEach(async () => {
    form = await fixture(html`
      <form>
        <fieldset>
          <sbb-file-selector-dropzone name="fs"></sbb-file-selector-dropzone>
          <input type="file" name="native" />
        </fieldset>
      </form>
    `);
    element = form.querySelector('sbb-file-selector-dropzone')!;

    await waitForLitRender(form);
  });

  it('renders', () => {
    assert.instanceOf(element, SbbFileSelectorDropzoneElement);
  });

  it('should allow single file drop when multiple=false', async () => {
    const dragElement = element.shadowRoot!.querySelector('.sbb-file-selector__input-container');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(new File(['foo'], 'programmatically_created.txt'));

    dragElement?.dispatchEvent(
      new DragEvent('drop', {
        dataTransfer,
      }),
    );
    await waitForLitRender(element);

    expect(element.files.length).to.be.equal(1);
  });

  it('should block multiple files drop when multiple=false', async () => {
    const dragElement = element.shadowRoot!.querySelector('.sbb-file-selector__input-container');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(new File(['foo'], 'programmatically_created.txt'));
    dataTransfer.items.add(new File(['foo2'], 'programmatically_created2.txt'));

    dragElement?.dispatchEvent(
      new DragEvent('drop', {
        dataTransfer,
      }),
    );

    await waitForLitRender(element);

    expect(element.files.length).to.be.equal(0);
  });

  it('should allow correct file type drop', async () => {
    const dragElement = element.shadowRoot!.querySelector('.sbb-file-selector__input-container');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(new File(['foo'], 'programmatically_created.png'));

    element.accept = '.pdf, .png';
    await waitForLitRender(element);

    dragElement?.dispatchEvent(
      new DragEvent('drop', {
        dataTransfer,
      }),
    );
    await waitForLitRender(element);

    expect(element.files.length).to.be.equal(1);
  });

  it('should block wrong file types drop', async () => {
    const dragElement = element.shadowRoot!.querySelector('.sbb-file-selector__input-container');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(new File(['foo'], 'programmatically_created.txt'));

    element.accept = '.pdf, .png';
    await waitForLitRender(element);

    dragElement?.dispatchEvent(
      new DragEvent('drop', {
        dataTransfer,
      }),
    );

    await waitForLitRender(element);

    expect(element.files.length).to.be.equal(0);
  });

  it('should allow correct file type drop when multiple=true', async () => {
    const dragElement = element.shadowRoot!.querySelector('.sbb-file-selector__input-container');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(new File(['foo'], 'programmatically_created.png'));
    dataTransfer.items.add(new File(['foo'], 'programmatically_created.pdf'));

    element.multiple = true;
    element.accept = '.pdf, .png';
    await waitForLitRender(element);

    dragElement?.dispatchEvent(
      new DragEvent('drop', {
        dataTransfer,
      }),
    );
    await waitForLitRender(element);

    expect(element.files.length).to.be.equal(2);
  });

  it('should block wrong file types drop when multiple = true', async () => {
    const dragElement = element.shadowRoot!.querySelector('.sbb-file-selector__input-container');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(new File(['foo'], 'programmatically_created.txt'));
    dataTransfer.items.add(new File(['foo'], 'programmatically_created.pdf'));

    element.accept = '.pdf, .png';
    element.multiple = true;
    await waitForLitRender(element);

    dragElement?.dispatchEvent(
      new DragEvent('drop', {
        dataTransfer,
      }),
    );

    await waitForLitRender(element);

    expect(element.files.length).to.be.equal(0);
  });

  // All the functionalities of sbb-file-selector-dropzone are tested in file-selector-common.spec.ts file
});
