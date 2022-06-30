
import insertText from './insert_text.js';
import insertElement from './insert_element.js';
import enterFragment from './enter_fragment.js';
import enter from './enter.js';
import deleteFragment from './delete_fragment.js';
import deleteForwardOnStart from './delete_forward_on_start.js';
import deleteForward from './delete_forward.js';
import deleteBackward from './delete_backward.js';

export default {
	name: 'paragraph',
	operation: {
		insertText,
		insertElement,
		enterFragment,
		enter,
		deleteFragment,
		deleteForwardOnStart,
		deleteForward,
		deleteBackward,
	}
}