import hljs from 'highlight.js';
import { JSDOM } from 'jsdom';

const convertToHtml = (htmlString) => {
    const dom = new JSDOM(htmlString);
    setCodeHighlight(dom.window.document.querySelectorAll('pre code'));
    setLazyLoad(dom.window.document.querySelectorAll('img'));
    return dom.window.document.body.innerHTML;
}

function setLazyLoad(elements) {
elements.forEach((element) => {
    element.classList.add('lazyload');
    element.setAttribute('data-src', element.src);
    element.src = '';
});
}

function setCodeHighlight(elements) {
    elements.forEach((element) => {
        element.innerHTML = hljs.highlightAuto(element.textContent ?? '').value;
        element.classList.add('hljs');
    });
}

export default convertToHtml;