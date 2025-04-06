function removeHighlighter() {
    document.querySelectorAll('.highlighted_ext').forEach(node => {
        const parent = node.parentNode;
        const textNode = document.createTextNode(node.textContent);
        parent.replaceChild(textNode, node);
        parent.normalize();
    });
}

function highlightSelected(node) {
    const selectedText = document.getSelection().toString().trim();
    if (selectedText.length < 1) return;
    console.log(`Selected text: ${selectedText}`);
    
    removeHighlighter();

    const escapedText = selectedText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedText, 'gi');

    if (node.nodeType === Node.TEXT_NODE) {
        const matches = [...node.nodeValue.matchAll(regex)];
        if (!matches.length) return;

        const frag = document.createDocumentFragment();
        let lastIndex = 0;

        matches.forEach(match => {
            const before = node.nodeValue.slice(lastIndex, match.index);
            const highlight = document.createElement('mark');
            highlight.textContent = match[0];
            highlight.className = 'highlighted_ext';

            frag.append(before, highlight);
            lastIndex = match.index + match[0].length;
        });

        frag.append(node.nodeValue.slice(lastIndex));
        node.replaceWith(frag);
    } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
        node.childNodes.forEach(highlightSelected);
    }
}


let lastSelectedText = '';

document.addEventListener('mouseup', (e) => {
    const selectedText = document.getSelection().toString().trim();

    // If no selection and clicked outside highlighted text => remove
    if (!selectedText && !e.target.closest('.highlighted_ext')) {
        removeHighlighter();
        lastSelectedText = '';
        return;
    }

    // New selection => highlight it
    if (selectedText && selectedText !== lastSelectedText) {
        lastSelectedText = selectedText;
        highlightSelected(document.body);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        removeHighlighter();
        lastSelectedText = '';
    }
});

