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
                        <div class="card medium">
                            <div class="card-image" style="max-height: 50%">
                                <img src="${product.imageUrl}" />
                            </div>
                            <div class="card-content">
                                <span class="card-title" style="font-size: 21px; ">${product.name}</span>
                                <p>CHF ${product.price}</p><br>
                                <p><a href="/d/product/${product.id}">Detail</a></p>
                            </div>
                            <div class="card-action">
                                <c-add-to-cart-button product-id="${product.id}"></c-add-to-cart-button>
                            </div>
                        </div>
                    </div>
                `
        }
        result = result + `</div>

        <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
        <script src="/l/js/materialize.js"></script>`;

        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = result;
    }

    connectedCallback() {
        const id = this.getAttribute("productId");
        fetch('/l/api/recommendations/' + id)
            .then(response => response.json())
            .then(data => this.render(data));
    }

    disconnectedCallback() {
    }
}

window.customElements.define("l-recommendations", Recommendations);