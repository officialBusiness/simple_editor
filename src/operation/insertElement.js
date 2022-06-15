// 在 container 内插入元素
export default function insertElement(node, start, offset){
	if( start.nodeType === Node.TEXT_NODE ){
		if( offset % start.length === 0 ){
			let singleNode = this.nodeApi.getSingleNodeInContainer(start),
					index = this.nodeApi.getNodeIndexOf(singleNode);
			if( offset === 0 ){
				singleNode.parentNode.insertBefore(node, singleNode);
				this.rangeApi.setNewCollapsedRange(singleNode.parentNode, index + 1);
			}else if( offset === start.length ){
				this.nodeApi.insertAfter(node, singleNode);
				this.rangeApi.setNewCollapsedRange(singleNode.parentNode, index + 2);
			}
		}else{
			console.info('待完善');
		}
	}else if( start.nodeType === Node.ELEMENT_NODE ){
		if( offset === 0 ){
			start.appendChild(node);
			this.rangeApi.setNewCollapsedRange(start, 1);
		}else{
			this.nodeApi.insertAfter(node, start.childNodes[offset - 1]);
			this.rangeApi.setNewCollapsedRange(start, offset + 1);
		}
	}

	return this;
}