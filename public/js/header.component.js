const listHeaderTemplate = document.createElement('template');
listHeaderTemplate.innerHTML = `
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
<link href="/l/css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection" />

<nav class="light-blue lighten-1" role="navigation">
    <div class="nav-wrapper container">
        <a id="logo-container" href="/" class="brand-logo">
            <img src="/l/images/banner.svg" alt="logo" style="height: 65px" />
        </a>
        <ul class="right hide-on-med-and-down">
            <li>
                <c-shopping-cart id="{{this.id}}"></c-shopping-cart>
            </li>
        </ul>

        <ul id="nav-mobile" class="sidenav">
            <li><a href="#">Navbar Link</a></li>
        </ul>
        <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    </div>
</nav>`;

class ListHeaderComponent extends HTMLElement {

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(listHeaderTemplate.content.cloneNode(true));
    }
}

customElements.define('l-header', ListHeaderComponent);
console.log('defined l-header')
