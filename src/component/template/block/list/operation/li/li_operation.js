
import insertText from '../../../paragraph/operation/insert_text.js';
import enter from './enter.js';
import deleteForward from '../../../paragraph/operation/delete_forward.js';
import insertElement from '../../../paragraph/operation/insert_element.js';


export default {
	name: 'liOperation',
	operation: {
		insertText,
		insertElement,
		// enterFragment,
		enter,
		// deleteFragment,
		// deleteForwardOnStart,
		deleteForward,
		// deleteBackward,
	}
}