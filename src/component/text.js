export default {
	type: 'text',
	toDom(obj = {
			type: "text",
		}){
		if( !obj.data ){
			console.error('text必须要有data数据');
		}
		return this.nodeApi.createTextNode(obj.data);
	},
	toObj(dom){
		return {
			type: "text",
			data: child.nodeValue
		}
	}
}