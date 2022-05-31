import createComponent, { getComponent } from '../editor_node/component.js';
import * as rangApi from '../operation/range_api.js';
import * as nodeApi from '../editor_node/node_api.js';
import { deleteOne, deleteRange } from '../operation/delete.js';

createComponent({
	name: 'paragraph',
	init(container){
		let node = nodeApi.createNode({
			nodeType: Node.ELEMENT_NODE,
			nodeName: 'p',
			attributes: {
				class: 'paragraph',
			}
		});
		container.appendChild(node);
		rangApi.setCollapsedRange(node, 0);
		return node;
	},
	backspace(){//	默认选区在一个节点中
		let range = rangApi.getRange(),
				{ collapsed, startContainer, startOffset } = range;
		if( collapsed ){//	光标首位重叠
			// console.log('startContainer:', startContainer);
			// if( startContainer.nodeType === Node.TEXT_NODE ){//	是 text
			// 	let text = startContainer;
			// 	if( startOffset === 1 ){//	光标还差一个偏移量就到文字的头部
			// 		if( text.length === 1 ){// 文字就剩一个字符的情况
			// 			let node = text,
			// 					parentNode = text.parentNode;
			// 			// 一直向上
			// 			while(parentNode.childNodes.length === 1	// 父节点只有一个元素
			// 					&& nodeApi.isNotBlock(parentNode)) {//	不是块元素(即组件元素的顶点元素)
			// 				node = parentNode;
			// 				parentNode = node.parentNode;
			// 			}
			// 			let preNode = node.previousSibling,
			// 					nextNode = node.nextSibling;
			// 			if(preNode){//	存在前一个节点
			// 				if( preNode.nodeType === Node.TEXT_NODE ){//	前一个节点是文字
			// 					rangApi.setCollapsedRange(preNode, preNode.length);
			// 					nodeApi.removeNode(node);
			// 					if( nextNode.nodeType === Node.TEXT_NODE ){//	合并两段文字
			// 						parentNode.normalize();
			// 					}
			// 					return;
			// 				}else if( preNode.nodeType === Node.ELEMENT_NODE ){//	前一个节点是元素
			// 					if(preNode.childNodes.length > 0){//	内部存在节点
			// 						//	让光标位于节点的最后一个位置
			// 						while(preNode.childNodes && preNode.childNodes.length > 0){
			// 							preNode = preNode.childNodes[preNode.childNodes.length - 1];
			// 						}
			// 						rangApi.setCollapsedRange(preNode, preNode.childNodes.length);
			// 					}else{//	内部不存在节点
			// 						let index = nodeApi.getNodeIndexOf(preNode);
			// 						rangApi.setCollapsedRange(parentNode, index + 1);
			// 					}
			// 					nodeApi.removeNode(node);
			// 					return;
			// 				}
			// 			}else if(nextNode){// 不存在前一个节点但存在后一个节点
			// 				if( nextNode.nodeType === Node.TEXT_NODE ){
			// 					rangApi.setCollapsedRange(nextNode, 0);
			// 					nodeApi.removeNode(node);
			// 					return;
			// 				}else if(nextNode.nodeType === Node.ELEMENT_NODE){
			// 					if(nextNode.childNodes.length > 0){//	内部存在节点
			// 						//	让光标位于节点的第一个位置
			// 						while(nextNode.childNodes && nextNode.childNodes.length > 0){
			// 							nextNode = nextNode.childNodes[0];
			// 						}
			// 						rangApi.setCollapsedRange(nextNode, 0);
			// 					}else{//	内部不存在节点
			// 						rangApi.setCollapsedRange(parentNode, 0);
			// 					}
			// 					nodeApi.removeNode(node);
			// 					return;
			// 				}
			// 			}else{// 不存在前一个节点和后一个节点
			// 				rangApi.setCollapsedRange(parentNode, 0);
			// 				nodeApi.removeNode(node);
			// 				return;
			// 			}
			// 		}else{// 一般情况，文字还有字符
			// 			rangApi.setCollapsedRange(text, startOffset - 1);
			// 			text.deleteData(startOffset - 1, 1);
			// 			return;
			// 		}
			// 	}else if( startOffset === 0 ){// 光标在文字的头部
			// 		// 文字一般都是大于 0,等于 0 的情况在上面已经进行了处理

			// 	}else{//	一般情况，光标不在文字的头部
			// 		rangApi.setCollapsedRange(text, startOffset - 1);
			// 		text.deleteData(startOffset - 1, 1);
			// 		return;
			// 	}
			// }else if( startContainer.nodeType === Node.ELEMENT_NODE ){//	是独立元素或者块元素(即组件元素的顶点元素)
			// 	if( nodeApi.isBlock(startContainer) ){//	是块元素(即组件元素的顶点元素)
			// 		if( nodeApi.isStartBlock(startContainer) ){//	如果是第一个的话，就不做操作
			// 		}else{//	到上一个块级元素的后面，并删除这个块级元素
			// 			let preBlockNode = startContainer.previousSibling,
			// 					node;
			// 			while(preBlockNode.childNodes && preBlockNode.childNodes.length > 0){
			// 				preBlockNode = preBlockNode.childNodes[preBlockNode.childNodes.length - 1];
			// 			}
			// 			node = preBlockNode;
			// 			if( node.nodeType === Node.ELEMENT_NODE ){
			// 				rangApi.setCollapsedRange(node.parentNode, node.parentNode.childNodes.length);
			// 			}else if(node.nodeType === Node.TEXT_NODE ){
			// 				rangApi.setCollapsedRange(node, node.length);
			// 			}
			// 			nodeApi.removeNode(startContainer);
			// 		}
			// 	}else{//	是p内展示的独立元素
			// 		let element = startContainer.childNodes[startOffset - 1];
			// 		nodeApi.removeNode(element);
			// 	}
			// }
			deleteOne(startContainer, startOffset);
		}else{

		}
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
				container: 'true'
			}
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