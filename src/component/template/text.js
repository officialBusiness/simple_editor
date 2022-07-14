
export default {
	type: 'text',
	toDom(obj){
		if( obj.data.indexOf('\\n') > -1 ){
			console.error('text内存在换行', obj.data)
		}
		return this.nodeApi.createTextNode(obj.data);
	},
	toObj(dom){
		return {
			type: "text",
			data: dom.nodeValue
		}
	}
}