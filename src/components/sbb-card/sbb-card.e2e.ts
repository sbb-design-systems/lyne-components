import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-card', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-card size="l" color="transparent-bordered"></sbb-card>');

    element = await page.find('sbb-card');
    expect(element).toHaveClass('hydrated');
  });

  it('should render with sbb-card-badge', async () => {
    page = await newE2EPage();
    await page.setContent(
      `
      <sbb-card size="xl">
        <h2>Title</h2>
        Content text
        <sbb-card-badge>
          <span>%</span>
          <span>from CHF</span>
          <span>19.99</span>
        </sbb-card-badge>
      </sbb-card>
`,
    );
    const card = await page.find('sbb-card');

    expect(
      await page.evaluate(() =>
        getComputedStyle(
          document.querySelector('sbb-card').shadowRoot.querySelector('.sbb-card__badge-wrapper'),
        ).getPropertyValue('display'),
      ),
    ).not.toBe('none');
    expect(card).toHaveAttribute('data-has-card-badge');
    expect(card).toEqualHtml(`
      <sbb-card color="white" data-has-card-badge size="xl" class="hydrated">
        <mock:shadow-root>
          <span class="sbb-card">
            <slot name="action"></slot>
            <span class="sbb-card__wrapper">
              <slot></slot>
            </span>
            <span class="sbb-card__badge-wrapper">
              <slot name="badge" />
            </span>
          </span>
        </mock:shadow-root>
        <h2>Title</h2>
        Content text
        <sbb-card-badge class="hydrated" color="charcoal" dir="ltr" role="text" slot="badge">
          <span>%</span>
          <span>from CHF</span>
          <span>19.99</span>
        </sbb-card-badge>
      </sbb-card>
    `);
  });

  it('should render without sbb-card-badge', async () => {
    page = await newE2EPage();
    await page.setContent(
      `
      <sbb-card size="xl">
        <h2>Title</h2>
        Content text
      </sbb-card>`,
    );
    const card = await page.find('sbb-card');

    expect(
      await page.evaluate(() =>
        getComputedStyle(
          document.querySelector('sbb-card').shadowRoot.querySelector('.sbb-card__badge-wrapper'),
        ).getPropertyValue('display'),
      ),
    ).toBe('none');
    expect(card).not.toHaveAttribute('data-has-card-badge');
  });
});
