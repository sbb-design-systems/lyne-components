import { SbbDivider } from './sbb-divider';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-divider (default)', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbDivider],
      html: '<sbb-divider />',
    });

    expect(root).toEqualHtml(`
      <sbb-divider aria-orientation="horizontal" class="sbb-divider sbb-divider--horizontal" role="separator">
        <mock:shadow-root></mock:shadow-root>
      </sbb-divider>
    `);
  });
});

describe('sbb-divider (horizontal)', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbDivider],
      html: '<sbb-divider orientation="horizontal" />',
    });

    expect(root).toEqualHtml(`
      <sbb-divider aria-orientation="horizontal" class="sbb-divider sbb-divider--horizontal" orientation="horizontal" role="separator">
        <mock:shadow-root></mock:shadow-root>
      </sbb-divider>
    `);
  });
});

describe('sbb-divider (vertical)', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbDivider],
      html: '<sbb-divider orientation="vertical" />',
    });

    expect(root).toEqualHtml(`
      <sbb-divider aria-orientation="vertical" class="sbb-divider sbb-divider--vertical" orientation="vertical" role="separator">
        <mock:shadow-root></mock:shadow-root>
      </sbb-divider>
    `);
  });
});

describe('sbb-divider (horizontal, negative)', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbDivider],
      html: '<sbb-divider orientation="horizontal" negative />',
    });

    expect(root).toEqualHtml(`
      <sbb-divider aria-orientation="horizontal" class="sbb-divider sbb-divider--horizontal sbb-divider--negative" negative orientation="horizontal" role="separator">
        <mock:shadow-root></mock:shadow-root>
      </sbb-divider>
    `);
  });
});

describe('sbb-divider (vertical, negative)', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbDivider],
      html: '<sbb-divider orientation="vertical" negative />',
    });

    expect(root).toEqualHtml(`
      <sbb-divider aria-orientation="vertical" class="sbb-divider sbb-divider--vertical sbb-divider--negative" negative orientation="vertical" role="separator">
        <mock:shadow-root></mock:shadow-root>
      </sbb-divider>
    `);
  });
});
