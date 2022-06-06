import createComponent from '../editor_node/component.js';
import * as rangApi from '../operation/range_api.js';
import * as nodeApi from '../editor_node/node_api.js';

createComponent({
	name: 'mathjax',
	toJson(dom){
		if(dom.childNodes.length){
			let json = {
				type: 'mathjax',
				data: []
			}
			dom.childNodes.forEach((img)=>{
				json.data.push(img.getAttribute('tex'));
			});
			return json;
		}else{
			return {
				type: 'mathjax',
				data: dom.getAttribute("tex")
			}
		}
	},
	toDom(json){
		try{
			if(Array.isArray(json.data)){
				let node = nodeApi.createNode({
					nodeType: Node.ELEMENT_NODE,
					nodeName: 'span',
					attributes: {
						class: 'mathjax',
					}
				});
				json.data.forEach((tex)=>{
					node.appendChild(nodeApi.createNode({
						nodeType: Node.ELEMENT_NODE,
						nodeName: 'img',
						attributes: {
							tex: tex,
							src: "data:image/svg+xml;base64," + btoa( unescape(encodeURIComponent( new XMLSerializer().serializeToString( MathJax.tex2svg(tex).childNodes[0] ))) ),
							leaf: true
						}
					}));
				});
				return node;
			}else{
				return nodeApi.createNode({
					nodeType: Node.ELEMENT_NODE,
					nodeName: 'img',
					attributes: {
						class: 'mathjax',
						tex: json.data,
						src: "data:image/svg+xml;base64," + btoa( unescape(encodeURIComponent( new XMLSerializer().serializeToString( MathJax.tex2svg(json.data).childNodes[0] ))) ),
						leaf: true
					}
				});
			}
		}catch(e){
			console.log(json, 'e:', e);
			return new Error(e)
		}
	}
});