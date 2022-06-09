import createComponent, { getComponent } from '../editor_node/component.js';
import * as rangApi from '../operation/range_api.js';
import * as nodeApi from '../editor_node/node_api.js';

// function 

createComponent({
	name: 'list',
	toJson(dom){

	},
	toDom(json){
		// console.log('json:', json);
		let { title, data } = json,
				getLabel;

		if( title === 'english' ){
			getLabel = (index)=>{
				return String.fromCharCode(97 + index) + '.';
			}
		}else if( title === 'English' ){
			getLabel = (index)=>{
				return String.fromCharCode(65 + index) + '.';
			}
		}else if( title === 'number' ){
			getLabel = (index)=>{
				return 1 + index + '.';
			}
		}else if( Array.isArray(title) ){
			getLabel = (index)=>{
				return title[index];
			}
		}else if( title === void 0 ){
			getLabel = (index)=>{
				return ;
			}
		}

		let list = nodeApi.createNode({
			nodeType: Node.ELEMENT_NODE,
			nodeName: 'div',
			attributes: {
				class: 'list',
				block: 'true'
			}
		});
		data.forEach((item, index)=>{
			let li = nodeApi.createNode({
								nodeType: Node.ELEMENT_NODE,
								nodeName: 'div',
								attributes: {
									class: 'li',
								}
							}),
					label = nodeApi.createNode({
								nodeType: Node.ELEMENT_NODE,
								nodeName: 'div',
								attributes: {
									class: 'label',
									contenteditable: false
								}
							}),
					container = nodeApi.createNode({
								nodeType: Node.ELEMENT_NODE,
								nodeName: 'div',
								attributes: {
									class: 'container',
									container: true
								}
							});
			label.innerText = getLabel(index); 

			li.appendChild(label);
			li.appendChild(container);
			list.appendChild(li);

			item.forEach((child)=>{
				switch(child.type){
					case 'text':
						container.appendChild(nodeApi.createTextNode(child.data));
						break;
					default:
						if( getComponent(child.type) ){
							container.appendChild(getComponent(child.type).toDom(child));
						}
						break;
				}
			});
		});
		return list;
	}
})