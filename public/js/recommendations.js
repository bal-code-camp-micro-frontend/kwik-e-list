class Recommendations extends HTMLElement {
    render(data) {
        var result = `
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="/l/css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection" />
        <link href="/l/css/style.css" type="text/css" rel="stylesheet" media="screen,projection" />

        <h4>Recommendations</h4>
            <div class="row">`

        for (var product of data) {
            result = result + `
                    <div class="col s12 m6 l4 xl3">
                        <div class="card medium" style="display: block;">
                            <a href="/product/${product.id}" class="card-image" style="max-height: 50%; display:block;">
                                <img src="${product.imageUrl}" />
                            </a>
                            <a href="/product/${product.id}" class="card-content" style="display:block;">
                                <span class="card-title grey-text text-darken-3" style="font-size: 21px;">${product.name}</span>
                                <p class="grey-text text-darken-3">CHF ${product.price}</p><br>
                            </a>
                            <div class="card-action">
                                <c-add-to-cart-button product-id="${product.id}"></c-add-to-cart-button>
                            </div>
                        </div>
                    </div>
                `
        }
        result = result + `</div>`;

        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = result;
    }

    connectedCallback() {
        const id = this.getAttribute("productId");
        fetch('/l/api/recommendations/' + id)
            .then(response => response.json())
            .then(data => this.render(data));

        const allAnchors = this.shadowRoot.querySelectorAll("a");
        const href = "/product/" + id;
        allAnchors.forEach(function (anchor) {
            anchor.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                window.dispatchEvent(new CustomEvent('a:location:changed', {
                    bubbles: true,
                    composed: true,
                    detail: { href: href }
                }));
            });
        });
    }

    disconnectedCallback() {
    }
}

window.customElements.define("l-recommendations", Recommendations);