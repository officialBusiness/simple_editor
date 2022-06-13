
import * as nodeApi from '../editor_node/node_api.js';
import * as rangApi from './operation/range_api.js';
import { deleteOne, deleteRange } from './operation/delete.js';
import { pasteOne, pasteRange } from './operation/paste.js';
import { editorEvent } from './init_event.js';

export default function trigger(eventType, message){
	let range = rangApi.getRange();
	if( !range ){
		return ;
	}
	let	{ collapsed, startOffset, startContainer, endContainer, endOffset } = range;
	switch(eventType){
		case editorEvent.backspace:
			if(collapsed){
				deleteOne(startContainer, startOffset);
			}else{
				deleteRange(startContainer, startOffset, endContainer, endOffset);
			}
			break;
		case editorEvent.paste:
			if(collapsed){
				pasteOne(message, startContainer, startOffset);
			}else{
				pasteRange(message, startContainer, startOffset, endContainer, endOffset);
			}
			break;
	}
}