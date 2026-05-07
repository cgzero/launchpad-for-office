import { APPS } from './apps.js';

const container = document.getElementById('apps');

container.innerHTML = APPS.map(({ text, href, icon, icon_dark, icon_hover }) => `
    <a class="app" href="${href}" target="_blank">
        <span class="icon-container">
            <picture>
                ${icon_dark ? `<source srcset="src/img/${icon_dark}" media="(prefers-color-scheme: dark)">` : ''}
                <img class="icon" src="src/img/${icon}" alt="${text}">
            </picture>
            ${icon_hover ? `<img class="icon icon-hover" src="src/img/${icon_hover}" alt="${text}">` : ''}
        </span>
        <span class="label">${text}</span>
    </a>
`).join('');
