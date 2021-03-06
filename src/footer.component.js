const listFooterTemplate = document.createElement('template');
listFooterTemplate.innerHTML = `
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
<link href="/l/css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection" />

<footer class="page-footer orange">
    <div class="container">
        <div class="row">
            <div class="col l9 s12">
                <h5 class="white-text">
                    <img src="/l/images/banner.svg" alt="logo" style="height: 120px" />
                </h5>
                <p class="grey-text text-lighten-4">
                    See our GitHub orga
                    <a class="orange-text text-lighten-3"
                        href="https://github.com/bal-code-camp-micro-frontend">bal-code-camp-micro-frontend</a>
                </p>
            </div>
            <div class="col l3 s12">
                <h5 class="white-text">Team Repositories</h5>
                <ul>
                    <li>
                        <a class="white-text"
                            href="https://github.com/bal-code-camp-micro-frontend/kwik-e-proxy">kwik-e-proxy</a>
                    </li>
                    <li>
                        <a class="white-text"
                            href="https://github.com/bal-code-camp-micro-frontend/kwik-e-list">kwik-e-list</a>
                    </li>
                    <li>
                        <a class="white-text"
                            href="https://github.com/bal-code-camp-micro-frontend/kwik-e-detail">kwik-e-detail</a>
                    </li>
                    <li>
                        <a class="white-text"
                            href="https://github.com/bal-code-camp-micro-frontend/kwik-e-checkout">kwik-e-checkout</a>
                    </li>
                    <li>
                        <a class="white-text"
                            href="https://github.com/bal-code-camp-micro-frontend/okd4-deployment">okd4-deployment</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="footer-copyright">
        <div class="container">
            Made by
            <a class="orange-text text-lighten-3" href="https://github.com/kullmanp">Peter</a>,
            <a class="orange-text text-lighten-3" href="https://github.com/hirsch88">Gery</a>,
            <a class="orange-text text-lighten-3" href="https://github.com/mateuszbaloise">Mateusz</a>
            &amp;
            <a class="orange-text text-lighten-3" href="https://github.com/christiansiegel">Christian</a>
            with ❤️
            <br />
            Product images from
            <a class="orange-text text-lighten-3" href="https://simpsonswiki.com/">simpsonswiki.com</a>
        </div>
    </div>
</footer>`;

class ListFooterComponent extends HTMLElement {

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(listFooterTemplate.content.cloneNode(true));
    }
}

customElements.define('l-footer', ListFooterComponent);
