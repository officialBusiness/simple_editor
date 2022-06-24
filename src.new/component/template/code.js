
export default {
	type: 'code',
	toDom(obj){
		return this.nodeApi.createComonentDom({
			nodeName: 'div',
			attributes: {
				class: 'code',
				block: true,
				singleBlock: true
			},
			children: [
				{
					nodeName: 'div',
					attributes: {
						class: 'code_container'
					},
					children: {
						nodeName: 'code',
						attributes: {
							container: true,
						},
						style: {
							width: obj.width
						},
						children: obj.data
					}
				},
				{
					nodeName: 'div',
					if: !!obj.title,
					attributes: {
						class: 'code_title',
						container: true
					},
					children: obj.title
				}
			]
		});
	},
	toObj(dom){
		
	}
}