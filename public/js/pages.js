import './header.component.js';
import './footer.component.js';

const listPagesTemplate = document.createElement('template');
listPagesTemplate.innerHTML = `
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
<link href="/l/css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection" />

<l-header></l-header>
<h1>welcome with the header</h1>
<a href="/product/1">Product 1</a>
<l-footer></l-footer>
`;

class ListPages extends HTMLElement {

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(listPagesTemplate.content.cloneNode(true));
    }
}

customElements.define('l-pages', ListPages);