
import * as rangApi from '../operation/range_api.js';
import * as nodeApi from '../editor_node/node_api.js';
import { findNodeComponent } from '../editor_node/component.js';

export default function backspace(){
	let range = rangApi.getRange(),
			{ collapsed, startOffset, startContainer, endContainer } = range;
	if( startContainer === endContainer ){
		findNodeComponent(startContainer).backspace();
	}else{

	}
}

