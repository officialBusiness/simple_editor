import * as rangApi from '../operation/range_api.js';
import * as nodeApi from '../editor_node/node_api.js';

export function pasteOne(message, node, offset){
	// console.log('message:', message, 'node:', node,  'offset:', offset );
	// 目前暂时默认只存放字符串
	if( node.nodeType === Node.TEXT_NODE ){
		node.insertData(offset, message);
		rangApi.setCollapsedRange(node, offset + message.length);
	}else if( node.nodeType === Node.ELEMENT_NODE ){
		let text = nodeApi.createTextNode(message)
		node.appendChild(text);
		rangApi.setCollapsedRange(text, text.length);
	}
}


export function pasteRange(){

}