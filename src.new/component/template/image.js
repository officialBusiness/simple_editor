
export default {
	type: 'image',
	toDom(obj){
		return this.nodeApi.createComonentDom({
			nodeName: 'div',
			attributes: {
				class: 'image',
				block: true,
				singleBlock: true,
				container: true
			},
			style: {
				'text-align': obj.alignment
			},
			children: [
				{
					nodeName: 'img',
					attributes: {
						src: obj.src
					},
					style: {
						width: obj.width
					}
				},
				{
					if: !!obj.title,
					nodeName: 'div',
					attributes: {
						class: 'image_title',
						container: true,
					},
					children: obj.title
				}
			]
		});
	},
	toObj(dom){

	}
}