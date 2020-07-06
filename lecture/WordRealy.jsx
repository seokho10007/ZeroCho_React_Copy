// //필요한 패키지나 라이브러리 호출
// const React = require('react');
// const { useState, useRef } = React;

// const WordRealy = () => {
// 	const [word, setWord] = useState('제로초');
// 	const [value, setValue] = useState('');
// 	const [result, setResult] = useState('');
// 	const inputRef = useRef(null);

// 	const onSubmitForm = (e) => {
// 		e.preventDefault();

// 		if (word[word.length - 1] === value[0]) {
// 			setResult('정답');
// 			setWord(value);
// 			setValue('');
// 			inputRef.current.focus();
// 		} else {
// 			setResult('오답');
// 			setValue('');
// 			inputRef.current.focus();
// 		}
// 	};

// 	const onChangeInput = (e) => {
// 		setValue(e.target.value);
// 	};

// 	return (
// 		<>
// 			<div>{word}</div>
// 			<form onSubmit={onSubmitForm}>
// 				<input ref={inputRef} value={value} onChange={onChangeInput} />
// 				<button>클릭!!</button>
// 			</form>
// 			<div>{result}</div>
// 		</>
// 	);
// };

/*
class WordRealy extends Component {
	state = {
		word: '제로초',
		value: '',
		result: '',
	};

	onSubmitForm = (e) => {
		e.preventDefault();

		if (word[word.length - 1] === value[0]) {
			this.setState({ result: '정답', word: value, value: '' });
			this.input.focus();
		} else {
			this.setState({ result: '오답', value: '' });
			this.input.focus();
		}
	};

	onChangeInput = (e) => {
		this.setState({ value: e.currentTarget.value });
	};

	input;

	onRefInput = (c) => {
		this.input = c;
	};

	render() {
		return (
			<>
				<div>{word}</div>
				<form onSubmit={this.onSubmitForm}>
					<input ref={this.onRefInput} value={value} onChange={this.onChangeInput} type="text" />
					<button>클릭</button>
					<h2></h2>
				</form>
				<div>{this.state.result}</div>
			</>
		);
	}
}
*/

//// 컴포넌트 외부 저장
// module.exports = WordRealy;

import React, { PureComponent } from 'react';

class Test extends PureComponent {
	state = {
		counter: 0,
		string: 'Hello',
		number: 1,
		boolean: true,
		object: {},
		arr: [],
	};

	onClick = () => {
		this.setState({
			arr: [...this.state.arr, 1],
		});
	};

	render() {
		console.log('랜더링', this.state);
		return (
			<>
				<div>
					<button onClick={this.onClick}>클릭</button>
					<div>1</div>
					<div>2</div>
					<div>3</div>
					<div>4</div>
				</div>
				<div>2</div>
				<div>3</div>
				<div>4</div>
			</>
		);
	}
}

export default Test;
