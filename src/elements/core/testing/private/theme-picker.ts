import leanTheme from '../../styles/lean-theme.scss?inline';
import offBrandTheme from '../../styles/off-brand-theme.scss?inline';
import safetyTheme from '../../styles/safety-theme.scss?inline';

// We use the Inter font for off-brand themes
const interFontElement = document.createElement('link');
interFontElement.href =
  'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap';
interFontElement.rel = 'stylesheet';

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

  const styleBlock = Array.from(document.head.querySelectorAll('style')).find(
    (e) => e.textContent.includes('@font-face') && e.textContent.includes('font-family: SBB'),
  );

  const themeStyleBlock = document.createElement('style');
  if (styleBlock) {
    const preloadedFontFaces =
      styleBlock?.textContent.match(/@font-face\s*{[\s\S]*?}/g)?.join('\n\n') ?? '';

    themeStyleBlock.textContent = themeFile.replace(
      /@font-face\b\s*\{[\s\S]*?\}/g,
      preloadedFontFaces,
    );

    interFontElement.remove();
    styleBlock.remove();
  } else {
    document.head.appendChild(interFontElement);
    themeStyleBlock.textContent = themeFile;
  }

  document.head.appendChild(themeStyleBlock);

  await document.fonts.ready;
}
