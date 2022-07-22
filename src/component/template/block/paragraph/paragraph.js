import paragraphOperation from './operation/operation.js';

export default {
	type: 'paragraph',
	event: [
		paragraphOperation
	],
	toDom(obj){
		return this.nodeApi.createComonentDom({
			nodeName: 'div',
			attributes: {
				class: 'paragraph',
				event: paragraphOperation.name,
				[this.nodeLabel.block]: true,
				[this.nodeLabel.container]: true,
			},
			created: (paragraph)=>{
				if(Array.isArray(obj.data)){
					obj.data.forEach((child, index, array)=>{
						if( array[index + 1] && array[index + 1].type === child.type && child.type === 'text' ){
							console.error('存在两个连续的 text', child, array[index + 1]);
						}
						let childDom = this.getComponentDom(child);
						if( childDom ){
							paragraph.appendChild( childDom );
						}else{
							console.error('组件读取解析失败:', child);
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
			obj.data.push(this.getComponentObj(child));
		});
		return obj;
	},
	supportOperation: {
		getLastContainer(paragraph){
			return paragraph;
		}
	}
}