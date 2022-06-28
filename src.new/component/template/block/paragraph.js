
export default {
	type: 'paragraph',
	toDom(obj){
		return this.nodeApi.createComonentDom({
			nodeName: 'div',
			attributes: {
				class: 'paragraph',
				[this.nodeLabel.block]: true,
				[this.nodeLabel.container]: true,
			},
			on: {
				[this.operationType.deleteForward]: this.operation.deleteForward,
				[this.operationType.deleteForwardOnStart]: this.operation.deleteForwardOnStart,
			},
			created: (paragraph)=>{
				if(Array.isArray(obj.data)){
					obj.data.forEach((child)=>{
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
		dom.childNodes.forEach((child)=>{
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