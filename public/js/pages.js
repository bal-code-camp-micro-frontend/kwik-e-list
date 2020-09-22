const listPagesTemplate = document.createElement('template');
listPagesTemplate.innerHTML = `
<h1>hello list</h1>`;

class ListPages extends HTMLElement {

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(listPagesTemplate.content.cloneNode(true));
    }
}
    
customElements.define('l-pages', ListPages);