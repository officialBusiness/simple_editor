export default {
	type: 'text',
	toDom(obj){
		if( !obj.data ){
			console.error('text必须要有data数据');
		}
		return this.nodeApi.createTextNode(obj.data);
	},
	toObj(dom){
		if( !child.nodeValue ){
			return null;
		}
		return {
			type: "text",
			data: child.nodeValue
		}
	}
}