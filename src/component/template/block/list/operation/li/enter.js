
import { cloneContainerAfterStartNode } from '../../../paragraph/operation/enter.js';

import { createLiDomObj } from '../../list.js';


function createNewLi(block, index){
	let title = block.getAttribute('title');
	return createLiDomObj.call(this, title, index);
}


export default function enter(node, offset){

	let { rangeApi, nodeApi } = this;

	console.log('执行 enter:', node, offset);
	if( node.nodeType === Node.TEXT_NODE ){
		if( offset === node.length && nodeApi.isEndInContainer(node) ){
			console.log('在末端');
			let block = nodeApi.getBlock(node),
					container = nodeApi.getContainer(node),
					li = container.parentNode,
					index = nodeApi.getNodeIndexOf(li),
					newBlock = this.getComponentDom('');

			if( index === block.childNodes.length - 1 ){
				console.log('在 list 最后一个 li');
				let newLi = this.nodeApi.createComonentDom( createNewLi.call(this, block, index + 1) );
				nodeApi.insertAfter( newLi, li );
				rangeApi.setCollapsedRange(newLi.childNodes[1], 0);
			}else{
				console.log('在 list 不是最后一个的 li');
				console.error('待完善');
			}
			// nodeApi.insertAfter( newBlock, block );
			// rangeApi.setCollapsedRange(newBlock, 0);
		}else if( offset === 0 && nodeApi.isStartInContainer(node) ){
			console.log('在头部');
			let block = nodeApi.getBlock(node),
					newBlock = block.cloneNode();
			// nodeApi.insertBefore( newBlock, block );
			// rangeApi.setCollapsedRange(node, offset);
			console.error('待完善');
		}else{
			console.log('需要拆分 node 节点');
			let block = nodeApi.getBlock(node),
					startNode;

			if( offset === node.length ){
				startNode = nodeApi.getNextNodeInContainer(node);
			}else{
				node.splitText(offset);
				startNode = node.nextSibling;
			}

			let startNodeParentClone = cloneContainerAfterStartNode.call(this, block, startNode);
			// this.nodeApi.insertAfter( startNodeParentClone, block );
			// this.rangeApi.setRangeOfNodeStart(startNodeParentClone);
			console.error('待完善');
		}
	}else if( node.nodeType === Node.ELEMENT_NODE ){
		if( offset === 0 && node.childNodes.length === 0 && nodeApi.isContainer(node) ){
			console.log('li container 为空');
			let block = nodeApi.getBlock(node),
					li = nodeApi.getContainer(node).parentNode,
					index = nodeApi.getNodeIndexOf(li);
			
			if( index === block.childNodes.length - 1 ){
				console.log('在 list 最后一个 li');
				let newBlock = this.getComponentDom(this.defualtBlockObj);
				nodeApi.insertAfter( newBlock, block );
				rangeApi.setCollapsedRange(newBlock, 0);
				nodeApi.removeNode(li);
			}else{
				console.log('在 list 不是最后一个的 li');
				console.error('待完善');
			}
		}else if( offset === node.childNodes.length && nodeApi.isEndInContainer(node) ){
			console.log('在 li 在末端');
			let block = nodeApi.getBlock(node),
					newBlock = this.getComponentDom(this.defualtBlockObj);
			// nodeApi.insertAfter( newBlock, block );
			// rangeApi.setCollapsedRange(newBlock, 0);
		}else if( offset === 0 && nodeApi.isStartInContainer(node) ){
			console.log('在 li 头部');
			let block = nodeApi.getBlock(node),
					newBlock = block.cloneNode();
			// nodeApi.insertBefore( newBlock, block );
			// rangeApi.setCollapsedRange(node, offset);
			console.error('待完善');
		}else{
			console.log('需要拆分 node 节点');
			let block = nodeApi.getBlock(node),
					startNode = offset === node.childNodes.length ? this.nodeApi.getNextNodeInContainer(node.childNodes[offset - 1]) : 
												node.childNodes[offset];

			let startNodeParentClone = cloneContainerAfterStartNode.call(this, block, startNode);
			// this.nodeApi.insertAfter( startNodeParentClone, block );
			// this.rangeApi.setRangeOfNodeStart(startNodeParentClone);
			console.error('待完善');
		}
	}else{
		console.error('不知道的特殊情况');
	}
}
