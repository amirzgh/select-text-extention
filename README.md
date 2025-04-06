# Occurrence Highlighter - `content.js`

The `content.js` file is the core script for the **Occurrence Highlighter** Chrome extension. It is responsible for detecting user-selected text on a webpage and highlighting all occurrences of that text throughout the document. Additionally, it provides functionality to remove highlights when necessary.

## Features

1. **Highlight Selected Text**:
   - When the user selects text on a webpage, all occurrences of the selected text are highlighted across the entire document.

2. **Remove Highlights**:
   - Highlights are removed when the user clicks outside the highlighted text or presses the `Escape` key.

3. **Recursive DOM Traversal**:
   - The script processes all elements in the DOM, ensuring that occurrences of the selected text are highlighted in all visible text nodes.

4. **Exclusions**:
   - The script skips `SCRIPT` and `STYLE` elements to avoid unnecessary processing.

## How It Works

1. **Text Selection**:
   - The script listens for the `mouseup` event to detect when the user selects text on the page.
   - If text is selected, the script highlights all occurrences of the selected text.

2. **Highlighting Logic**:
   - The `highlightSelected` function traverses the DOM starting from `document.body`.
   - It uses a regular expression to match occurrences of the selected text in text nodes.
   - Matches are wrapped in a `<mark>` element with the class `highlighted_ext`.

3. **Removing Highlights**:
   - The `removeHighlighter` function removes all `<mark>` elements with the class `highlighted_ext` and restores the original text content.

4. **Keyboard Interaction**:
   - Pressing the `Escape` key removes all highlights.

## Event Listeners

- **`mouseup`**:
  - Detects text selection and highlights occurrences of the selected text.
  - Removes highlights if the user clicks outside highlighted text and no text is selected.

- **`keydown`**:
  - Removes all highlights when the `Escape` key is pressed.

## Code Overview

### `removeHighlighter()`
- Removes all `<mark>` elements with the class `highlighted_ext`.
- Restores the original text content and merges adjacent text nodes.

### `highlightSelected(node)`
- Traverses the DOM recursively, starting from the given node.
- Highlights all occurrences of the selected text in text nodes.

### Event Handlers
- **`mouseup`**:
  - Handles text selection and triggers highlighting.
  - Removes highlights when clicking outside highlighted text.
- **`keydown`**:
  - Removes highlights when the `Escape` key is pressed.

## Usage

1. Install the Chrome extension.
2. Navigate to any webpage.
3. Select text to highlight all occurrences of the selected text.
4. Click outside the highlighted text or press `Escape` to remove highlights.

## Limitations

- The script does not process text inside `SCRIPT` or `STYLE` elements.
- It only works on visible text nodes.


## License

This project is licensed under the MIT License.