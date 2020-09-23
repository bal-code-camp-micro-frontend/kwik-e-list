const listPagesTemplate = document.createElement('template');
listPagesTemplate.innerHTML = `
<h1>welcome</h1>
<a href="/product/1">Product 1</a>`;

class ListPages extends HTMLElement {

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(listPagesTemplate.content.cloneNode(true));
    }
}
    
customElements.define('l-pages', ListPages);