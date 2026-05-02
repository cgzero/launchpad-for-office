import { APPS } from './apps.js';

const container = document.getElementById('apps');

container.innerHTML = APPS.map(({ text, href, icon, icon_dark }) => `
    <a class="app" href="${href}" target="_blank">
        <span class="icon-container">
            <picture>
                ${icon_dark ? `<source srcset="src/img/${icon_dark}" media="(prefers-color-scheme: dark)">` : ''}
                <img class="icon" src="src/img/${icon}" alt="${text}">
            </picture>
        </span>
        <span class="label">${text}</span>
    </a>
`).join('');
