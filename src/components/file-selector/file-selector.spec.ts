import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './file-selector';

describe('sbb-file-selector', () => {
  it('renders default', async () => {
    const root = await fixture(html`<sbb-file-selector></sbb-file-selector>`);

    expect(root).dom.to.be.equal(`
      <sbb-file-selector>
      </sbb-file-selector>
    `);
    expect(root).shadowDom.to.be.equal(`
      <div class='sbb-file-selector'>
        <div class='sbb-file-selector__input-container'>
          <label>
            <sbb-button icon-name='folder-open-small' is-static='' size='m' variant='secondary' dir='ltr'>
              Choose a file
            </sbb-button>
            <input class='sbb-file-selector__visually-hidden' type='file'>
          </label>
        </div>
        <p class='sbb-file-selector__visually-hidden' role='status'></p>
      </div>
    `);
  });

  it('renders with dropzone area', async () => {
    const root = await fixture(html`<sbb-file-selector variant="dropzone"></sbb-file-selector>`);

    expect(root).dom.to.be.equal(`
      <sbb-file-selector variant='dropzone'>
      </sbb-file-selector>
    `);
    expect(root).shadowDom.to.be.equal(`
      <div class='sbb-file-selector'>
        <div class='sbb-file-selector__input-container'>
          <label>
            <span class='sbb-file-selector__dropzone-area'>
              <span class='sbb-file-selector__dropzone-area--icon'>
                <sbb-icon name='folder-open-medium' aria-hidden="true" data-namespace="default" role="img"></sbb-icon>
              </span>
              <span class='sbb-file-selector__dropzone-area--title'></span>
              <span class='sbb-file-selector__dropzone-area--subtitle'>
                Drag &amp; Drop your files here
              </span>
              <span class='sbb-file-selector__dropzone-area--button'>
                <sbb-button size='m' variant='secondary' is-static='' dir='ltr'>
                  Choose a file
                </sbb-button>
              </span>
            </span>
            <input class='sbb-file-selector__visually-hidden' type='file'>
          </label>
        </div>
        <p class='sbb-file-selector__visually-hidden' role='status'></p>
      </div>
    `);
  });
});
