import './header.component.js';
import './footer.component.js';
import './recommendations.js';
import './product-card.js';

const listPagesTemplate = document.createElement('template');
listPagesTemplate.innerHTML = `
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
<link href="/l/css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection" />

<l-header></l-header>
<div class="container">
    <h1>Our Products</h1>
    
    <div class="card-list">
        <div class="row">
            <div class="col s12 m6 l4 xl3">
                <div class="card medium grey lighten-3"></div>
            </div>
            <div class="col s12 m6 l4 xl3">
                <div class="card medium grey lighten-3"></div>
            </div>
            <div class="col s12 m6 l4 xl3">
                <div class="card medium grey lighten-3"></div>
            </div>
            <div class="col s12 m6 l4 xl3">
                <div class="card medium grey lighten-3"></div>
            </div>
        </div>
    </div>
</div>

<a href="/product/1">Product 1</a>
<l-footer></l-footer>
`;

class ListPages extends HTMLElement {

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(listPagesTemplate.content.cloneNode(true));

        fetch('/l/api/product')
            .then(r => r.json())
            .then(d => this.renderCardItems(d))
            .catch(e => console.error(e))
    }

    renderCardItems(list) {
        const listHtml = list.map(item => {
            return `<div class="col s12 m6 l4 xl3"><l-product-card product-id="${item.id}" product-image-url="${item.imageUrl}"  product-name="${item.name}" product-prce="">${item.price}</l-product-card></div>`
        })

        this.shadowRoot.querySelector('div.card-list .row').innerHTML = listHtml.join("");

    }
}

customElements.define('l-pages', ListPages);