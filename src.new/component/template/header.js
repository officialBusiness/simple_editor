
export default {
	type: 'header',
	toDom(obj){
		return this.nodeApi.createComonentDom({
			nodeName: obj.level,
			attributes: {
				class: 'header',
				block: true,
				mergeBlock: true,
				container: true,
			},
			created: (header)=>{
				if(Array.isArray(obj.data)){
					obj.data.forEach((child)=>{
						let childDom = this.getComponentDom(child);
						if( childDom ){
							header.appendChild( childDom );
						}else{
							console.error('组件 dom 读取解析失败:', child);
						}
					});
				}else if( typeof obj.data === 'string' ){
					header.innerText = obj.data;
				}else{
					console.error('生产 header 组件 dom 是遇到的不知道的特殊情况:', 'obj:', obj);
				}
			}
		});
	},
	toObj(dom){
		
	}
}