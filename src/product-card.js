const procuctCardTemplate = document.createElement('template');
procuctCardTemplate.innerHTML = `
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <link href="/l/css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection" />
    
    <div class="card medium">
        <a href="" class="card-image" style="max-height: 50%; display:block;">
            <img src="" /> 
        </a>
        <a href="" class="card-content" style="display:block;">
            <span class="card-title grey-text text-darken-3" style="font-size: 21px;"></span>
            <p class="grey-text text-darken-3"></p><br>
        </a>
        <div class="card-action">
            <c-add-to-cart-button></c-add-to-cart-button>
        </div>
    </div>
    `;

class ProductCard extends HTMLElement {

    get productId() {
        return this.getAttribute('product-id');
    }

    get productName() {
        return this.getAttribute('product-name');
    }

    get productPrice() {
        return this.getAttribute('product-price');
    }

    get productImageUrl() {
        return this.getAttribute('product-image-url');
    }

    fillAnchorWithUrl(item, productId) {
        item.setAttribute("href", "/product/" + productId);
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(procuctCardTemplate.content.cloneNode(true));
        this.shadowRoot.querySelector(".card-title").innerHTML = this.productName;
        this.shadowRoot.querySelector("p").innerHTML = "CHF " + this.productPrice;
        this.shadowRoot.querySelector("img").setAttribute("src", this.productImageUrl);
        this.shadowRoot.querySelector("c-add-to-cart-button").setAttribute("product-id", this.productId);
        const allAnchors = this.shadowRoot.querySelectorAll("a");
        const href = "/product/" + this.productId;
        allAnchors.forEach(function (anchor) {
            anchor.setAttribute("href", href);
            anchor.addEventListener("click", (e) => {
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

customElements.define('l-product-card', ProductCard);