import { resetListLabel } from '../list.js';

export default function deleteForwardOnStart(node, offset){
	console.log('%c执行 deleteForwardOnStart', 'color: #000000; background-color: #ffffff');
	console.log('node:', node, '\noffset:', offset);

	let { rangeApi, nodeApi } = this,
			container = nodeApi.getContainer(node);

	if( isLabel(container) ){
		console.log('在 label 中');
		let li = container.parentNode,
				index = nodeApi.getNodeIndexOf(li);
		console.log('是 list 中的第', index + 1 ,'个 li');
		if( index === 0 ){

			mergeLiToPreBlock.call(this, li);
		}else{
			let preLiContent = li.previousSibling.childNodes[1],
					liContent = container.nextSibling;

			mergeTwoLi.call(this, preLiContent, liContent);
		}
	}else if( isLiContent(container) ){
		console.log('在 li_content 中');
		let li = container.parentNode,
				index = nodeApi.getNodeIndexOf(li);
		console.log('是 list 中的第', index + 1 ,'个 li');
		if( index === 0 ){

			mergeLiToPreBlock.call(this, li);
		}else{
			let preLiContent = li.previousSibling.childNodes[1],
					liContent = container;

			mergeTwoLi.call(this, preLiContent, liContent);
		}
	}

}

export function mergeLiToPreBlock(li){
	console.log('%c执行 mergeLiToPreBlock, 将第一个 li 与 前一个 block 合并', 'color: #000000; background-color: #ffffff');
	console.log('li:', li);
	let { rangeApi, nodeApi } = this,
			block = nodeApi.getBlock(li),
			preBlock = nodeApi.getPreBlock(block);

	if( preBlock ){
		console.log('存在前一个 block');
		if( preBlock.childNodes.length > 0 ){
			console.log('前一个 block 存在内容节点');
			rangeApi.setRangeOfNodeEnd(preBlock);

			let	preEnd = preBlock.childNodes[preBlock.childNodes.length - 1],
					nextStart = li.childNodes[1].childNodes[0];

			nodeApi.appendChildren(preBlock, li.childNodes[1].childNodes);
			nodeApi.mergeTwoNodes(preEnd, nextStart);
			nodeApi.removeNode(li);
			resetListLabel(block);
		}else{
			console.log('前一个 block 为空, 直接删除');
			nodeApi.removeNode(preBlock);
		}
	}else{
		console.log('前一个 block 不存在, 无操作');
	}
}

export function mergeTwoLi(preLiContent, liContent){
	console.log('%c执行 mergeTwoLi, 合并两个 li', 'color: #000000; background-color: #ffffff');
	console.log('preLiContent:', preLiContent, 'liContent:', liContent);
	let { rangeApi, nodeApi } = this,
			block = nodeApi.getBlock(preLiContent)

	if( preLiContent.childNodes.length > 0 ){
		console.log('前一个 li 的 li_content 存在内容节点');
		if( liContent.childNodes.length > 0 ){
			console.log('当前 li 的 li_content 存在内容节点');
			let	preEnd = preLiContent.childNodes[preLiContent.childNodes.length - 1],
					nextStart = liContent.childNodes[0];

			rangeApi.setRangeOfNodeEnd( preLiContent );
			nodeApi.appendChildren(preLiContent, liContent.childNodes);
			nodeApi.mergeTwoNodes(preEnd, nextStart);
			nodeApi.removeNode(liContent.parentNode);

			resetListLabel(block);
		}else{
			console.log('当前 li 的 li_content 为空');

			rangeApi.setRangeOfNodeEnd( preLiContent );
			nodeApi.removeNode(liContent.parentNode);
		}
	}else{
		console.log('前一个 li 的 li_content 为空');
		if( liContent.childNodes.length > 0 ){
			console.log('当前 li 的 li_content 存在内容节点');

			// rangeApi.setCollapsedRange(preLiContent, 0);
			nodeApi.appendChildren(preLiContent, liContent.childNodes);
			rangeApi.setRangeOfNodeStart(preLiContent);

			nodeApi.removeNode(liContent.parentNode);
		}else{
			console.log('当前 li 的 li_content 为空');

			rangeApi.setCollapsedRange(preLiContent, 0);
			nodeApi.removeNode(liContent.parentNode);
		}
	}
}

export function isLabel(container){
	return container.className === 'label';
}

export function isLiContent(container){
	return container.className === 'li_content';
}