import createComponent, { getComponent } from '../editor_node/component.js';
import * as rangApi from '../event/operation/range_api.js';
import * as nodeApi from '../editor_node/node_api.js';

createComponent({
	name: 'header',
	alias: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
	toJson(dom){
		let json = {
			type: dom.nodeName.toLowerCase()
		};
		if(dom.childNodes.length > 1){
			json.data = [];
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
		}else{
			json.data = dom.innerText;
		}
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
				block: 'true',
				container: 'true'
			}
		});
		if(Array.isArray(json.data)){
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
		}else{
			node.innerText = json.data;
		}
		if(json.alignment){
			node.style['text-align'] = json.alignment;
		}
		return node;
	}
});