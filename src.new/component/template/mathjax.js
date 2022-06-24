
export default {
	type: 'mathjax',
	toDom(obj){
		if(Array.isArray(obj.data)){
			return this.nodeApi.createComonentDom({
				nodeName: 'span',
				attributes: {
					class: 'mathjax'
				},
				children: obj.data.map((tex)=>{
					return {
						nodeName: 'img',
						attributes: {
							class: 'mathjax',
							tex,
							src: "data:image/svg+xml;base64," + 
								btoa( unescape(encodeURIComponent( 
									new XMLSerializer().serializeToString(
										MathJax.tex2svg(tex).childNodes[0]
									)
								) ) )
						}
					}
				})
			});
		}else if(typeof obj.data === 'string'){
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
			});
		}
	},
	toObj(dom){
		
	}
}