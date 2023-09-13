import { SbbFileSelector } from './sbb-file-selector';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-file-selector', () => {
  it('renders default', async () => {
    const { root } = await newSpecPage({
      components: [SbbFileSelector],
      html: '<sbb-file-selector />',
    });

    expect(root).toEqualHtml(`
      <sbb-file-selector>
        <mock:shadow-root>
          <div class='sbb-file-selector'>
            <div class='sbb-file-selector__input-container'>
              <label>
                <sbb-button icon-name='folder-open-small' is-static='' size='m' variant='secondary'>
                  Choose a file
                </sbb-button>
                <input class='sbb-file-selector__visually-hidden' type='file'>
              </label>
            </div>
            <p aria-live='assertive' class='sbb-file-selector__visually-hidden' role='alert'></p>
          </div>
        </mock:shadow-root>
      </sbb-file-selector>
    `);
  });

  it('renders with dropzone area', async () => {
    const { root } = await newSpecPage({
      components: [SbbFileSelector],
      html: '<sbb-file-selector variant="dropzone"/>',
    });

    expect(root).toEqualHtml(`
      <sbb-file-selector variant='dropzone'>
        <mock:shadow-root>
          <div class='sbb-file-selector'>
            <div class='sbb-file-selector__input-container'>
              <label>
                <span class='sbb-file-selector__dropzone-area'>
                  <span class='sbb-file-selector__dropzone-area--icon'>
                    <sbb-icon name='folder-open-medium'></sbb-icon>
                  </span>
                  <span class='sbb-file-selector__dropzone-area--title'></span>
                  <span class='sbb-file-selector__dropzone-area--subtitle'>
                    Drag &amp; Drop your files here
                  </span>
                  <span class='sbb-file-selector__dropzone-area--button'>
                    <sbb-button size='m' variant='secondary' is-static=''>
                      Choose a file
                    </sbb-button>
                  </span>
                </span>
                <input class='sbb-file-selector__visually-hidden' type='file'>
              </label>
            </div>
            <p aria-live='assertive' class='sbb-file-selector__visually-hidden' role='alert'></p>
          </div>
        </mock:shadow-root>
      </sbb-file-selector>
    `);
  });
});
