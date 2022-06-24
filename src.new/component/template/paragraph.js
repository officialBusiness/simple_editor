
export default {
	type: 'paragraph',
	toDom(obj){
		return this.nodeApi.createComonentDom({
			nodeName: 'div',
			attributes: {
				class: 'paragraph',
				block: true,
				mergeBlock: true,
				container: true,
			},
			created: (paragraph)=>{
				if(Array.isArray(obj.data)){
					obj.data.forEach((child)=>{
						let childDom = this.getComponentDom(child);
						if( childDom ){
							paragraph.appendChild( childDom );
						}else{
							console.error('组件 dom 读取解析失败:', child);
						}
					});
				}else{
					console.error('生产 paragraph 组件 dom 是遇到的不知道的特殊情况:', 'obj:', obj);
				}
			}
		});
	},
	toObj(dom){
		
	}
}