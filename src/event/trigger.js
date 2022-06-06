
import * as rangApi from '../operation/range_api.js';
import * as nodeApi from '../editor_node/node_api.js';
import { deleteOne, deleteRange } from '../operation/delete/delete.js';
import { editorEvent } from './init_event.js';

export default function trigger(eventType){
	let range = rangApi.getRange(),
			{ collapsed, startOffset, startContainer, endContainer, endOffset } = range;

	switch(eventType){
		case editorEvent.backspace:
			if(collapsed){
				deleteOne(startContainer, startOffset);
			}else{
				deleteRange(startContainer, startOffset, endContainer, endOffset);
			}
			break;

	}
}