import createComponent from '../editor_node/component.js';
import * as rangApi from '../operation/range_api.js';
import * as nodeApi from '../editor_node/node_api.js';

createComponent({
	name: 'header',
	alias: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
	toJson(dom){
		let json = {
			type: dom.nodeName.toLowerCase(),
			data: dom.innerText
		};
		if(dom.style['text-align']){
			json.alignment = dom.style['text-align'];
		}
		return json;
	},
	toDom(json){
		let node = nodeApi.createNode({
			nodeType: Node.ELEMENT_NODE,
			nodeName: json.type,
			attributes: {
				class: 'header',
				isBlock: true,
			}
		});
		if(json.alignment){
			node.style['text-align'] = json.alignment;
		}
		node.innerText = json.data;
		return node;
	}
});