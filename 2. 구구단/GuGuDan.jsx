const React = require('react');
const { useState, useRef } = React;

const GuGuDan = () => {
	//Hooks의 state 설정
	const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
	const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
	const [value, setValue] = useState('');
	const [result, setResult] = useState('');
	const inputRef = useRef(null);

	const onChangeInput = (e) => {
		setValue(e.target.value);
	};

	const onSubmitForm = (e) => {
		e.preventDefault();

		if (first * second == value) {
			setResult((prevResult) => {
				return '정답: ' + value;
			});

			setFirst(Math.ceil(Math.random() * 9));
			setSecond(Math.ceil(Math.random() * 9));
			setValue('');
			inputRef.current.focus();
		} else {
			setResult('오답: ' + value);
			setValue('');
			inputRef.current.focus();
		}
	};
	return (
		<>
			<div>
				{first} 곱하기 {second} 는?{' '}
			</div>
			<form onSubmit={onSubmitForm}>
				<input ref={inputRef} onChange={onChangeInput} type="number" value={value} />
				<button className="s">입력</button>
			</form>
			<div id="result">{result}</div>
		</>
	);
};

module.exports = GuGuDan;
