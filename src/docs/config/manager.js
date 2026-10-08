import { addons } from 'storybook/manager-api';
import theme from './theme.js';

addons.setConfig({
  enableShortcuts: false,
  theme,
});

const version = process.env.VERSION;
const injectedVersions = document
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

    if (injectedVersions?.length) {
      // Prod deployment with injected legacy versions

      let optionsHtml = `<option value="latest">v${version} (latest)</option>`;
      injectedVersions.forEach((v) => {
        optionsHtml += `<option value="${v}">v${v}</option>`;
      });

      const select = document.createElement('select');
      select.ariaLabel = 'Switch to version';
      select.innerHTML = optionsHtml;
      switcherWrapper.appendChild(select);

      select.addEventListener('change', (e) => {
        // With preventDefault() we avoid a real selection.
        // In that case, when browsing back to the current deployment, it doesn't show an selection of a legacy version.
        e.preventDefault();
        const target = e.target;
        const version = target.value;

        if (version !== 'latest') {
          window.location.href = `https://lyne-elements-v${version}.app.sbb.ch/`;
        }
      });
    } else if (version) {
      // Dev environment or previews

      const span = document.createElement('span');

      // Shas are cut, so adding a title gives an easy way to see the version
      span.title = version;
      span.textContent = version;
      switcherWrapper.appendChild(span);
    } else {
      // Local environment
      return;
    }

    // Border around the box
    const border = document.createElement('span');
    border.setAttribute('class', 'switch-border');
    switcherWrapper.appendChild(border);

    headerContainer.after(switcherWrapper);
  };

  injectAccessibleSelect();
});
