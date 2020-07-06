import React, { useState, useRef, memo } from 'react';
import Try from './Try';

//숫자 4개를 랜덤하게 뽑는 함수 (겹치지않음)
function getNumbers() {
	const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const arr = [];

	for (let i = 0; i < 4; i++) {
		const candi = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
		arr.push(candi);
	}
	return arr;
}

const NumberBaseball = () => {
	const [result, setResult] = useState('');
	const [value, setValue] = useState('');
	const [answer, setAnswer] = useState(getNumbers());
	const [tries, setTries] = useState([]);
	const inputEl = useRef(null);

	const onSubmitForm = (e) => {
		e.preventDefault();
		if (value == answer.join('')) {
			//답이 맞았을 경우
			setResult('홈런');

			//[...arr1, (인자)] : 에전 배열을 앞쪽에 복사 후 새로운 인자 push
			setTries((prevTries) => {
				return [...prevTries, { try: value, result: '홈런' }];
			});

			alert('게임을 다시 시작');

			//초기화
			setValue('');
			setAnswer(getNumbers);
			setTries([]);
			inputEl.current.focus();
		} else {
			//답이 틀렸을 경우
			const answerArr = value.split('').map((x) => {
				return parseInt(x);
			});
			let strike = 0;
			let ball = 0;

			if (tries.length >= 9) {
				//배열 tries의 길이가 10일 경우 (10번 시도)
				setResult(`10번 넘었습니다. 실패 답은 ${answer.join('')} 였습니다.`);

				alert('게임을 다시 시작');

				//초기화
				setValue('');
				setAnswer(getNumbers);
				setTries([]);
				inputEl.current.focus();
			} else {
				answer.forEach((x, y, arr) => {
					if (answerArr[y] === Number(x)) {
						strike += 1;
					} else if (arr.join('').includes(answerArr[y])) {
						ball += 1;
					}
					console.log(arr);
				});

				setTries((prevTries) => {
					return [...prevTries, { try: value, result: `${strike} 스트라이크 ${ball} 볼` }];
				});
				setValue('');
				inputEl.current.focus();
			}
		}
	};

	return (
		<>
			<h1>{result}</h1>
			<form onSubmit={onSubmitForm}>
				<input
					maxLength={4}
					value={value}
					onChange={(e) => {
						setValue(e.target.value);
					}}
					ref={inputEl}
				/>
				<button>클릭</button>
			</form>
			<div>시도: {tries.length}</div>
			<ul>
				{tries.map((x, y) => {
					return (
						//리액트 내부 반복문의 최상위 태그는 고유한 key값을 가져야함
						<Try value={x} key={`${y + 1} 차시도: ${x.try}`} />
					);
				})}
			</ul>
		</>
	);
};

export default memo(NumberBaseball);
