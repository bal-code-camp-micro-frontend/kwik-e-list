class Recommendations extends HTMLElement {
    render(data) {
            var result = `<h4>Recommendations</h4>
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
                                <a href="#">
                                    <i class="material-icons left">add_shopping_cart</i>
                                    Add to cart
                                </a>
                            </div>
                        </div>
                    </div>
                `
            }
            result = result  + `</div>`;
            this.innerHTML = result;
    }

    connectedCallback() {
        const id = this.getAttribute("productId");
        this.innerHTML = `
         <div> Loading ... </div>
        `;
        fetch('/l/api/recommendations/'+id)
            .then(response => response.json())
            .then(data => this.render(data));
    }

    disconnectedCallback() {
    }
}
window.customElements.define("l-recommendations", Recommendations);