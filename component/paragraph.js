import createComponent from '../editor_node/component.js';
import * as rangApi from '../operation/range_api.js';
import * as nodeApi from '../editor_node/node_api.js';

createComponent({
	name: 'paragraph',
	init(container){
		let node = nodeApi.createNode({
			nodeType: Node.ELEMENT_NODE,
			nodeName: 'p',
			attributes: {
				class: 'paragraph',
				allowEmpty: true,
				isBlock: true,
			}
		});
		container.appendChild(node);
		rangApi.setCollapsedRange(node, 0);
		return node;
	},
	backspace(){
		let range = rangApi.getRange(),
				{ collapsed, startOffset, startContainer } = range;
		if( collapsed ){
			if( startContainer.nodeType === Node.TEXT_NODE ){
				let
					text = startContainer,
					newCursor = startOffset - 1 > 0 ? startOffset - 1 : 0;
					rangApi.setCollapsedRange(text, newCursor);
					text.deleteData(newCursor, 1);
			}else if( startContainer.nodeType === Node.ELEMENT_NODE ){
				if( nodeApi.isBlock(startContainer) ){
					if( nodeApi.isStartBlock(startContainer) ){
					}else{
						startContainer.parentNode.removeChild(startContainer);
					}
				}else{
					let element = startContainer.childNodes[startOffset - 1];
					element.parentNode.removeChild(element);
				}
			}
		}else{

		}
	},
	toJson(dom){

	},
});