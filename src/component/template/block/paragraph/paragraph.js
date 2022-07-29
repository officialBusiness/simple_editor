import paragraphEvent from './event/paragraph_event.js';

export default {
	type: 'paragraph',
	event: paragraphEvent,
	toDom(obj){
		return this.nodeApi.createDom({
			nodeName: 'div',
			attributes: {
				class: 'paragraph',
				[this.nodeLabel.block]: true,
				[this.nodeLabel.container]: true,
			},
			created: (paragraph)=>{
				if(Array.isArray(obj.data)){
					obj.data.forEach((child, index, array)=>{
						if( array[index + 1] && array[index + 1].type === child.type && child.type === 'text' ){
							console.error(child, array[index + 1]);
							throw new Error('存在两个连续的 text');
						}
						let childDom = this.objToDom(child);
						if( childDom ){
							this.nodeApi.appendChild(paragraph, childDom);
						}else{
							console.error(child);
							throw new Error('组件读取解析失败');
						}
					});
				}
			}
		});
	},
	toObj(dom){
		let obj = {
			type: "paragraph",
			data: []
		};
		dom.childNodes.forEach((child, index, array)=>{
			obj.data.push(this.domToObj(child));
		});
		return obj;
	},
	helpEvent: {
		getFirstContainer(paragraph){
			return paragraph;
		},
		getLastContainer(paragraph){
			return paragraph;
		},
		getMergeContainer(paragraph){
			return paragraph;
		},
		getMergedNodes(paragraph){
			return paragraph.childNodes;
		},
		mergedDeleteNode(paragraph){
			return paragraph;
		}
	}
}