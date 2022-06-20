
export default function initMathjax(editor){
	let
		mathjaxButton = document.getElementById('mathjaxButton'),
		mathjaxContainer = document.getElementById('mathjaxContainer'),
		mathjaxImg = document.getElementById('mathjaxImg'),
		mathjaxTex = document.getElementById('mathjaxTex'),
		comfirm = document.getElementById('comfirm'),
		cancel = document.getElementById('cancel')


	mathjaxButton.onmousedown = showMathjax;

	mathjaxTex.oninput = function(e){
		mathjaxImg.src = getBase64(mathjaxTex.value)
	}
	mathjaxTex.onkeydown = function(e){
		// console.log('e:', e);
		if( e.key === 'Enter' ){
			e.preventDefault();
			comfirmMathJax();
		}else if( e.key === 'Escape' ){
			hiddenMathjax();
		}
	}
	cancel.onclick = hiddenMathjax
	comfirm.onclick = comfirmMathJax

	function comfirmMathJax(){
		hiddenMathjax();
		if( mathjaxTex.value && mathjaxTex.value.trim() ){
			let range = editor.getRange();
			editor.insertElement( editor.getComponentDom({
				type: 'mathjax',
				data: mathjaxTex.value
			}), range.startContainer, range.startOffset );
		}
	}

	function showMathjax(){
		mathjaxContainer.style.display = 'flex';
		setTimeout(()=>{
			mathjaxTex.focus();
		}, 0);
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