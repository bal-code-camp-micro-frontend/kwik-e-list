import './header.component.js';
import './footer.component.js';
import './product-card.js';

const listPagesTemplate = document.createElement('template');
listPagesTemplate.innerHTML = `
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
<link href="/l/css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection" />

<l-header></l-header>
<div class="container">
    <h1>Our Products</h1>

    <div class="search-list row">
        <div class="col s12">
            <div class="row">
                <div class="input-field col s6">
                    <i class="material-icons prefix">search</i>
                    <input name="search" type="text" placeholder="Search your products" />
                </div>
                <div class="input-field col s6">
                    <button class="waves-effect waves-light btn orange">Search</button>
                </div>
            </div>
        </div>
    </div>
    
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

<l-footer></l-footer>
`;

class ListPages extends HTMLElement {

    get searchInputElement() {
        return this.shadowRoot.querySelector('.search-list input')
    }

    get searchButtonElement() {
        return this.shadowRoot.querySelector('.search-list button')
    }

    get searchTerm() {
        const queryParams = location.search.replace('?', '').split('&')
        const queryParamsMap = new Map()
        queryParams.forEach(p => queryParamsMap.set(p.split('=')[0], p.split('=')[1]))
        return queryParamsMap.get('search')
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(listPagesTemplate.content.cloneNode(true));
        this.loadList()
        this.searchButtonElement.addEventListener('click', () => this.loadList())
        this.searchInputElement.addEventListener('input', (e) => this.onInputChange(e))
        this.searchInputElement.addEventListener('keyup', (e) => this.onKeyUp(e))
    }

    onKeyUp(event) {
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault()
            // Trigger the button element with a click
            this.searchButtonElement.click()
        }
    }

    onInputChange(event) {
        const searchTerm = event.target.value
        window.history.replaceState(null, null, `?search=${searchTerm}`);
    }

    loadList() {
        let queryParams = ""
        if (this.searchTerm && this.searchTerm.length > 0) {
            queryParams = `?search=${this.searchTerm}`
        }
        fetch('/l/api/product' + queryParams)
            .then(r => r.json())
            .then(d => this.renderCardItems(d))
            .catch(e => console.error(e))
    }

    renderCardItems(list) {
        const listHtml = list.map(item => {
            return `<div class="col s12 m6 l4 xl3"><l-product-card product-id="${item.id}" product-image-url="${item.imageUrl}"  product-name="${item.name}" product-price="${item.price}"></l-product-card></div>`
        })

        this.shadowRoot.querySelector('div.card-list .row').innerHTML = listHtml.join("");

    }
}

customElements.define('l-pages', ListPages);

import singleSpaHtml from 'single-spa-html';
const htmlLifecycles = singleSpaHtml({
    template: '<l-pages></l-pages>',
})
export const bootstrap = htmlLifecycles.bootstrap;
export const mount = htmlLifecycles.mount;
export const unmount = htmlLifecycles.unmount;
