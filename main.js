function highlightSelected(node){
    let selectedText = document.getSelection().toString().trim()
    if (!selectedText) return;

    let regex = new RegExp(`\\b${selectedText}\\b`, "g");

    if (node.nodeType === Node.TEXT_NODE && regex.test(node.nodeValue)) {
        let span = document.createElement('span')
        span.innerHTML = node.nodeValue.replace(regex, `<mark>$&</mark>`);
        span.className = 'highlighted_ext'
        node.replaceWith(span)        
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        node.childNodes.forEach(highlightSelected)
    }else console.log('no match!');
}

document.addEventListener('mouseup', ()=> {
    highlightSelected(document.body)
})
