
export default {
	type: 'mathjax',
	toDom(obj){
		return this.nodeApi.createComonentDom({
			nodeName: 'img',
			attributes: {
				class: 'mathjax',
				tex: obj.data,
				src: "data:image/svg+xml;base64," + 
					btoa( unescape(encodeURIComponent(
						new XMLSerializer().serializeToString(
							MathJax.tex2svg(obj.data).childNodes[0] 
						)
					) )	),
			},
		})
		// return this.nodeApi.createComonentDom({
		// 	nodeName: 'span',
		// 	attributes: {
		// 		class: 'mathjax'
		// 	},
		// 	children: Array.isArray(obj.data) ?
		// 		obj.data.map((tex)=>{
		// 			return {
		// 				nodeName: 'img',
		// 				attributes: {
		// 					class: 'mathjax',
		// 					tex,
		// 					src: "data:image/svg+xml;base64," + 
		// 						btoa( unescape(encodeURIComponent( 
		// 							new XMLSerializer().serializeToString(
		// 								MathJax.tex2svg(tex).childNodes[0]
		// 							)
		// 						) ) )
		// 				}
		// 			}
		// 		}) : 
		// 		{
		// 			nodeName: 'img',
		// 			attributes: {
		// 				class: 'mathjax',
		// 				tex: obj.data,
		// 				src: "data:image/svg+xml;base64," + 
		// 					btoa( unescape(encodeURIComponent(
		// 						new XMLSerializer().serializeToString(
		// 							MathJax.tex2svg(obj.data).childNodes[0] 
		// 						)
		// 					) )	),
		// 			},
		// 		}
		// });
	},
	toObj(dom){
		return {
			type: 'mathjax',
			data: dom.getAttribute("tex")
		}
	}
}