export const original = {
	blocks: [
		{
			type: 'h1',
			data: 'Simple and Efficient Bilayer Cross Counting'
		},
		{
			type: 'h2',
			data: 'Abstract',
			alignment: 'center'
		},
		{
			type: 'paragraph',
			data: [
				'We consider the problem of counting the interior edge crossings when a bipartite graph ',
				{
					type: 'mathjax',
					data: 'G=(V,E)'
				},
				' with node set ',
				{
					type: 'mathjax',
					data: 'V'
				},
				' and edge set ',
				{
					type: 'mathjax',
					data: 'E'
				},
				' is drawn such that the nodes of the two shores of the bipartition are drawn as distinct points on two parallel lines and the edges as straight line segments. The efficient solution of this problem is important in layered graph drawing. Our main observation is that it can be reduced to counting the inversions of a certain sequence. This leads directly to an ',
				{
					type: 'mathjax',
					data: 'O(\\left \\vert E \\right \\vert \\log \\left \\vert V \\right \\vert)'
				},
				' algorithm based on merge sorting. We present an even simpler ',
				{
					type: 'mathjax',
					data: 'O(\\left \\vert E \\right \\vert \\log \\left \\vert V_{small} \\right \\vert)',
				},
				' algorithm, where ',
				{
					type: 'mathjax',
					data: 'V_{small}'
				},
				' is the smaller cardinality node set in the bipartition of the node set ',
				{
					type: 'mathjax',
					data: 'V'
				},
				' of the graph. This algorithm is very easy to implement. Our computational experiments on a large collection of instances show that it performs well in comparison to previously published algorithms, which are much more complicated to understand and implement.'
			]
		},
		{
			type: 'h2',
			data: '1 Introduction'
		},
		{
			type: 'paragraph',
			data: [
				'Let ',
				{
					type: 'mathjax',
					data: 'G=(N,S,E)'
				},
				' be a bipartite graph with disjoint node sets ',
				{
					type: 'mathjax',
					data: 'N'
				},
				' and ',
				{
					type: 'mathjax',
					data: 'S'
				},
				' and let all edges in ',
				{
					type: 'mathjax',
					data: 'E'
				},
				' have one end node in '
			]
		}
	]
}