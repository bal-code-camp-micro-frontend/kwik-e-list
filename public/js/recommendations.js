class Recommendations extends HTMLElement {
    connectedCallback() {
        const id = this.getAttribute("productId");
        this.innerHTML = `
      <div> Test ${id}</div>
    `;
    }
    disconnectedCallback() {
    }
}
window.customElements.define("l-recommendations", Recommendations);