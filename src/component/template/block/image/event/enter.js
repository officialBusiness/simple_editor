import { isImgContainer, isImgTitle } from './delete_forward.js';
import { getImageTitleDom } from '../image.js';

export default function enter(node, offset){
	console.log('%c执行 enter', 'color: #000000; background-color: #ffffff');
	console.log('node:', node, '\noffset:', offset);

	let { rangeApi, nodeApi } = this,
			block = nodeApi.getBlock(node),
			nextBlock = nodeApi.getNextBlock(block),
			container = nodeApi.getContainer(node);

	if( isImgContainer(container) ){
		console.log('在 img_container 中');
		if( container.nextSibling ){
			console.log('image_title 存在');
			if( offset === 0 ){
				rangeApi.setRangeOfNodeStart(container.nextSibling);
			}else if( offset === 1 ){
				rangeApi.setRangeOfNodeEnd(container.nextSibling);
			}else{
				throw new Error('offset 应该是 0 或者 1');
			}
		}else{
			console.log('image_title 不存在, 生产 image_title');
			let imageTitle = getImageTitleDom.call(this);
			nodeApi.appendChild(block, imageTitle);
			rangeApi.setCollapsedRange(imageTitle, 0);
		}
	}else if( isImgTitle(container) ){
		console.log('在 image_title 中');
		let firstContainer = this.executeHelpEvent(nextBlock, this.helpEventType.getLastContainer, [nextBlock]);
		rangeApi.setRangeOfNodeStart(firstContainer);
	}else{
		throw new Error('image 内不应该有别的类型 container');
	}
}
