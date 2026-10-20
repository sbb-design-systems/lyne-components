import { addons } from 'storybook/manager-api';
import theme from './theme.js';

addons.setConfig({
  enableShortcuts: false,
  theme,
});

const version = process.env.VERSION;
const legacyVersions = document
  .querySelector('meta[name="legacy-versions"]')
  ?.getAttribute('content')
  ?.trim()
  .split(',')
  .map((v) => v.trim());

document.addEventListener('DOMContentLoaded', () => {
  const injectAccessibleSelect = () => {
    const headerContainer = document.querySelector('.sidebar-header');

    if (!headerContainer) {
      // If UI is still loading, try again later
      setTimeout(injectAccessibleSelect, 50);
      return;
    }

    if (document.querySelector('.sbb-version-switcher-wrapper')) {
      return;
    }

    const switcherWrapper = document.createElement('div');
    switcherWrapper.className = 'sbb-version-switcher-wrapper';

    if (legacyVersions?.length) {
      // Prod deployment with injected legacy versions

      const firstOption = document.createElement('option');
      firstOption.value = 'latest';
      firstOption.textContent = `v${version} (latest)`;

      const versionOptions = [firstOption].concat(
        legacyVersions.map((v) => {
          const option = document.createElement('option');
          option.value = v;
          option.textContent = `v${v}`;
          return option;
        }),
      );

      const select = document.createElement('select');
      select.ariaLabel = 'Switch to version';
      select.append(...versionOptions);
      switcherWrapper.appendChild(select);

      select.addEventListener('change', (e) => {
        // With preventDefault() we avoid a real selection.
        // In that case, when browsing back to the current deployment, it doesn't show an selection of a legacy version.
        e.preventDefault();
        const target = e.target;
        const version = Number(target.value);

        if (!isNan(version)) {
          window.location.href = `https://lyne-elements-v${version}.app.sbb.ch/`;
        }
      });
    } else if (version) {
      // Dev environment or previews

      const span = document.createElement('span');
      span.textContent = version;

      // Shas are cut, so adding a title gives an easy way to see the version
      span.title = version;
      switcherWrapper.appendChild(span);
    } else {
      // Local environment
      return;
    }

    // Border around the box. Has to be an independent element in order to better visually ident
    // the native arrow.
    const border = document.createElement('span');
    border.setAttribute('class', 'switch-border');
    switcherWrapper.appendChild(border);

    headerContainer.after(switcherWrapper);
  };

  injectAccessibleSelect();
});
