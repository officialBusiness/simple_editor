
// node-type

/*
	ELEMENT_NODE
		nodeName
		attributes
		childNodes
	TEXT_NODE
		nodeValue
*/

export function toDom(node){
	let dom;
	switch(node.nodeType){
		case Node.ELEMENT_NODE:
			dom = document.createElement(node.nodeName);
			if(node.attributes){
				Object.keys(node.attributes).forEach((key)=>{
					dom.setAttribute(key, node.attributes[key]);
				});
			}
			if( node.childNodes ){
				node.childNodes.forEach((childNode)=>{
					dom.appendChild(toDom(childNode));
				});
			}
			break;
		case Node.TEXT_NODE:
			dom = document.createTextNode(node.nodeValue);
			break;
		default:
			break;
	}
	return dom;
}

export function toNode(dom){
	let node = {};
	node.nodeType = dom.nodeType;
	switch(node.nodeType){
		case Node.ELEMENT_NODE:
			node.nodeName = dom.nodeName;
			if( dom.attributes.length ){
				node.attributes = {};
				for(let attr of dom.attributes ){
					node.attributes[attr.nodeName] = attr.nodeValue;
				}
			}
			if( dom.childNodes ){
				node.childNodes = [];
				for(let node of dom.childNodes ){
					node.childNodes.push(toNode(node));
				}
			}
			break;
		case Node.TEXT_NODE:
			node.nodeValue = dom.nodeValue;
			break;
		default:
			break;
	}
	return node;
}

