import createComponent, { getComponent } from '../editor_node/component.js';
import * as rangApi from '../operation/range_api.js';
import * as nodeApi from '../editor_node/node_api.js';

// function 

createComponent({
	name: 'code',
	toJson(dom){

	},
	toDom(json){
		console.log('json:', json);
		let node = nodeApi.createNode({
					nodeType: Node.ELEMENT_NODE,
					nodeName: 'div',
					attributes: {
						class: 'code',
						block: 'true'
					}
				}),
				code_container = nodeApi.createNode({
					nodeType: Node.ELEMENT_NODE,
					nodeName: 'div',
					attributes: {
						class: 'code_container'
					}
				}),
				code = nodeApi.createNode({
					nodeType: Node.ELEMENT_NODE,
					nodeName: 'code',
					attributes: {
						container: true,
					}
				});
		if( json.id ){
			node.id = json.id;
		}
		if(json.width){
			code.style.width = json.width;
		}
		code.innerText = json.data;
		code_container.appendChild(code);
		node.appendChild(code_container);

		if( json.title ){
			let title = nodeApi.createNode({
						nodeType: Node.ELEMENT_NODE,
						nodeName: 'div',
						attributes: {
							class: 'code_title',
							// container: 'true'
							contenteditable: false
						}
					}),
					text = nodeApi.createNode({
						nodeType: Node.TEXT_NODE,
						nodeValue: json.title
					});

			node.appendChild(title);
			title.appendChild(text);
		}
		return node;
	}
})