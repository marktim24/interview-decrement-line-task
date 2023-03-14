import { useEffect, useState } from 'react'
import './App.css'

function App() {
	const [itemLine, setItemLine] = useState<number | undefined>(0)
	const [lines, setLines] = useState([[1, 2, 3], [2], [3], [1], [5]])

	const sendToLine = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (itemLine === undefined) return
		let leastLineSum: number[] | undefined = undefined,
			leastItem = 1e6 // 1 000 000
		for (let line of lines) {
			const sumInLine = line.reduce((sum, value) => sum + value, 0)
			if (sumInLine < leastItem) {
				leastItem = sumInLine
				leastLineSum = line
			}
		}
		if (!leastLineSum) return
		setLines(prevLines =>
			prevLines.map(line =>
				line === leastLineSum ? [...line, itemLine] : line
			)
		)
	}

	useEffect(() => {
		const interval = setInterval(() => {
			setLines(prevLines =>
				prevLines.map(line =>
					[line[0] - 1, ...line.slice(1)].filter(value => value > 0)
				)
			)
		}, 1000)
		return () => {
			clearInterval(interval)
		}
	})

	return (
		<div className='App'>
			<form onSubmit={sendToLine}>
				<input
					required
					type='number'
					placeholder='Add Number'
					value={itemLine}
					onChange={e => {
						setItemLine(e.currentTarget.valueAsNumber)
					}}
				/>
				<button>Send</button>
			</form>
			<div className='lines'>
				{lines.map((line, idx) => (
					<div className='line' key={idx}>
						{line.map(item, lineIdx => (
							<div key={lineIdx}>{item}</div>
						))}
					</div>
				))}
			</div>
		</div>
	)
}

export default App
