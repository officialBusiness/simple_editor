
export default {
	type: 'text',
	toDom(obj){
		return this.nodeApi.createTextNode(obj.data);
	},
	toObj(dom){
		return {
			type: "text",
			data: dom.nodeValue
		}
	}
}