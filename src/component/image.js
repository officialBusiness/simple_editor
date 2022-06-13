import createComponent from '../editor_node/component.js';
import * as rangApi from '../operation/range_api.js';
import * as nodeApi from '../editor_node/node_api.js';

createComponent({
	name: 'image',
	toJson(dom){
		let
			imgDom = dom.childNodes[0],
			titleDom = dom.childNodes[1],
			json = {
				type: 'image',
				src: imgDom.src
			};
		if( dom.id ){
			json.id = dom.id;
		}
		if(imgDom.style.width){
			json.width = imgDom.style.width;
		}
		if(dom.style['text-align']){
			json.alignment =  dom.style['text-align'];
		}
		if( titleDom ){
			json.title = titleDom.innerText;
		}
		return json;
	},
	toDom(json){
		let 
			node = nodeApi.createNode({
				nodeType: Node.ELEMENT_NODE,
				nodeName: 'div',
				attributes: {
					class: 'image',
					block: 'true',
					container: 'true'
				}
			}),
			img = nodeApi.createNode({
				nodeType: Node.ELEMENT_NODE,
				nodeName: 'img',
				attributes: {
					src: json.src,
				}
			});
		node.appendChild(img);
		if( json.id ){
			node.id = json.id;
		}
		if(json.width){
			img.style.width = json.width;
		}
		if(json.alignment){
			node.style['text-align'] = json.alignment;
		}

		if( json.title ){
			let title = nodeApi.createNode({
						nodeType: Node.ELEMENT_NODE,
						nodeName: 'div',
						attributes: {
							class: 'image_title',
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
});