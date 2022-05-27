import createComponent from '../editor_node/component.js';
import * as rangApi from '../operation/range_api.js';
import * as nodeApi from '../editor_node/node_api.js';

createComponent({
	name: 'mathjax',
	toJson(dom){
		return {
			type: 'mathjax',
			tex: img.getAttribute("tex")
		}
	},
	toDom(json){
		try{
			var
				img = document.createElement( "img" ),
				tex = json.data,
				svgData = new XMLSerializer().serializeToString( MathJax.tex2svg(tex).childNodes[0] ),
				base64 = "data:image/svg+xml;base64," + btoa( unescape(encodeURIComponent(svgData)) );

			img.setAttribute( "class", 'mathjax' );
			img.setAttribute( "tex", tex );
			img.setAttribute( "src", base64 );
			return img;
		}catch(e){
			console.log('e:', e);
			return new Error(e)
		}
	}
});