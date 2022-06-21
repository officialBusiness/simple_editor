
export default function initMathjax(editorEnglish, editorChinese){
	let
		mathjaxButton = document.getElementById('mathjaxButton'),
		mathjaxContainer = document.getElementById('mathjaxContainer'),
		imgConatienr = mathjaxContainer.getElementsByClassName('img')[0],
		// mathjaxImg = document.getElementById('mathjaxImg'),
		mathjaxTexContainer = document.getElementById('mathjaxTexContainer'),
		// mathjaxTex = document.getElementById('mathjaxTex'),
		comfirmMathjaxButton = document.getElementById('comfirmMathjaxButton'),
		cancelMathjaxButton = document.getElementById('cancelMathjaxButton'),
		addMathjaxButton = document.getElementById('addMathjaxButton'),
		reduceMathjaxButton = document.getElementById('reduceMathjaxButton');


	mathjaxButton.onmousedown = showMathjax;

	cancelMathjaxButton.onclick = hiddenMathjax
	comfirmMathjaxButton.onclick = comfirmMathjax
	addMathjaxButton.onclick = ()=>{
		addMathjaxTex();
	}
	reduceMathjaxButton.onclick = ()=>{
		mathjaxTexContainer.removeChild(
			mathjaxTexContainer.childNodes[mathjaxTexContainer.childNodes.length - 1]
		)
		initMathjaxTexImage();
	}

	editorEnglish.addComponentEvent('mathjax', 'imgMousedown', (edtior, mathjaxObj)=>{
		if( edtior === editorEnglish ){
			showMathjax();
			// console.log('mathjaxObj.data:', Array.isArray(mathjaxObj.data));
			if( Array.isArray(mathjaxObj.data) ){
				initMathjaxTex(mathjaxObj.data.length);
				for( let i = 0, len = mathjaxObj.data.length; i < len; i++ ){
					// console.log('mathjaxTexContainer.childNodes[i]:', mathjaxTexContainer.childNodes[i]);
					mathjaxTexContainer.childNodes[i].value = mathjaxObj.data[i];
				}
			}else{
				mathjaxTexContainer.childNodes[0].value = mathjaxObj.data;
			}
			initMathjaxTexImage();
		}
	});

	function initMathjaxTexImage(){
		editorEnglish.nodeApi.emptyAllChild(imgConatienr);
		// console.log('imgConatienr:', imgConatienr);
		imgConatienr.appendChild(editorChinese.getComponentDom({
			type: 'mathjax',
			data: getMathjaxTexValue()
		}));
	}

	function initMathjaxTex(num = 1){
		editorEnglish.nodeApi.emptyAllChild(mathjaxTexContainer);
		for( let i = 0; i < num; i++ ){
			addMathjaxTex();
		}
	}

	function addMathjaxTex(){
		let mathjaxTex = document.createElement('textarea');
		mathjaxTex.className = 'mathjaxTex';

		mathjaxTex.oninput = function(e){
			initMathjaxTexImage();
		}
		mathjaxTex.onkeydown = function(e){
			// console.log('e:', e);
			if( e.key === 'Enter' ){
				e.preventDefault();
				comfirmMathjax();
			}else if( e.key === 'Escape' ){
				hiddenMathjax();
			}
		}
		mathjaxTexContainer.appendChild(mathjaxTex);
		setTimeout(()=>{
			mathjaxTex.focus();
		}, 0);
	}

	function getMathjaxTexValue(){
		let tex ;
		if( mathjaxTexContainer.childNodes.length > 1 ){
			tex = [];
			for( let i = 0, len = mathjaxTexContainer.childNodes.length; i < len; i++ ){
				let mathjaxTex = mathjaxTexContainer.childNodes[i];
				if( mathjaxTex.value && mathjaxTex.value.trim() ){
					tex.push(mathjaxTex.value);
				}
			}
		}else{
			tex = mathjaxTexContainer.childNodes[0].value;
		}
		return tex;
	}

	function comfirmMathjax(){
		hiddenMathjax();
		let tex = getMathjaxTexValue();
		if( tex ){
			let range = editorChinese.getRange();
			editorChinese.insertElement( editorChinese.getComponentDom({
				type: 'mathjax',
				data: tex
			}), range.startContainer, range.startOffset );
		}
	}

	function showMathjax(){
		mathjaxContainer.style.display = 'flex';
		initMathjaxTex(1);
	}

	function hiddenMathjax(){
		mathjaxContainer.style.display = 'none';
	}

	function getBase64(tex){
		try{
			var svgData = new XMLSerializer().serializeToString( MathJax.tex2svg(tex).childNodes[0] );
			return "data:image/svg+xml;base64," + btoa( unescape(encodeURIComponent(svgData)) );
		}catch(e){
			return new Error(e)
		}
	}
}