import createComponent, { getComponent } from '../editor_node/component.js';
import * as rangApi from '../event/operation/range_api.js';
import * as nodeApi from '../editor_node/node_api.js';
import { customEvents } from '../event/init_event.js';

createComponent({
	name: 'paragraph',
	init(container){
		let node = nodeApi.createNode({
			nodeType: Node.ELEMENT_NODE,
			nodeName: 'p',
			attributes: {
				class: 'paragraph',
				block: 'true',
				container: 'true'
			}
		});
		container.appendChild(node);
		rangApi.setNewCollapsedRange(node, 0);
		return node;
	},
	toJson(dom){
		let json = {
			type: "paragraph",
			data: []
		};
		dom.childNodes.forEach((child)=>{
			switch(child.nodeType){
				case Node.TEXT_NODE:
					json.data.push({
						type: "text",
						data: child.nodeValue
					})
					break;
				case Node.ELEMENT_NODE:
					json.data.push(getComponent(child.className).toJson(child));
					break;
			}
		});
		return json;
	},
	toDom(json){
		let node = nodeApi.createNode({
			nodeType: Node.ELEMENT_NODE,
			nodeName: 'p',
			attributes: {
				class: 'paragraph',
				container: 'true',
				block: 'true'
			}
		});

		node.addEventListener('backspaceOnStart', function(e){
			console.log('backspaceOnStart:', e);
		});
		json.data.forEach((child)=>{
			switch(child.type){
				case 'text':
					node.appendChild(nodeApi.createTextNode(child.data));
					break;
				default:
					if( getComponent(child.type) ){
						node.appendChild(getComponent(child.type).toDom(child));
					}
					break;
			}
		});
		return node;
	}
});