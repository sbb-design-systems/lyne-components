import leanTheme from '../../styles/lean-theme.scss?inline';
import offBrandTheme from '../../styles/off-brand-theme.scss?inline';
import safetyTheme from '../../styles/safety-theme.scss?inline';

/**
 * Picks another theme than standard and applies it to the document head.
 * Only for tests!
 */
export async function overrideStandardThemeWith(
  theme: 'lean' | 'safety' | 'off-brand',
): Promise<void> {
  let themeFile = '';

  switch (theme) {
    case 'lean':
      themeFile = leanTheme;
      break;
    case 'safety':
      themeFile = safetyTheme;
      break;
    case 'off-brand':
      themeFile = offBrandTheme;
      break;
  }

  const styleBlock = Array.from(document.head.querySelectorAll('style')).find((e) =>
    e.textContent.includes('@font-face'),
  )!;
  const preloadedFontFaces =
    styleBlock.textContent.match(/@font-face\s*{[\s\S]*?}/g)?.join('\n\n') ?? '';

  const leanStyleBlock = document.createElement('style');
  leanStyleBlock.textContent = themeFile.replace(
    /@font-face\b\s*\{[\s\S]*?\}/g,
    preloadedFontFaces,
  );

  styleBlock.remove();
  document.head.appendChild(leanStyleBlock);

  await document.fonts.ready;
}
