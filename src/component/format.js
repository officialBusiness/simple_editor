import createComponent from '../editor_node/component.js';
import * as rangApi from '../operation/range_api.js';
import * as nodeApi from '../editor_node/node_api.js';

createComponent({
	name: 'format',
	alias: ['link', 'tab'],
	toJson(dom){
		return {
			type: dom.getAttribute('class'),
			data: dom.innerText
		}
	},
	toDom(json){
		let node = nodeApi.createNode({
			nodeType: Node.ELEMENT_NODE,
			nodeName: 'span',
			attributes: {
				class: json.type,
			}
		});
		node.innerText = json.data;
		// switch(){

		// }
		return node;
	}
});