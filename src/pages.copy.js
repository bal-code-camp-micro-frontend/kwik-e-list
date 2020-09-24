import singleSpaHtml from 'single-spa-html';

class ListPages extends HTMLElement {
    connectedCallback() {
        this.innerHTML = 'Hello World'
    }
}

customElements.define('l-pages', ListPages);

const htmlLifecycles = singleSpaHtml({
    template: '<l-pages></l-pages>',
})

console.log('htmlLifecycles', htmlLifecycles)
export const bootstrap = htmlLifecycles.bootstrap;
export const mount = htmlLifecycles.mount;
export const unmount = htmlLifecycles.unmount;
