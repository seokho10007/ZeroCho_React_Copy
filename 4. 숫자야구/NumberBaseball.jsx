import React, { Component } from 'react';
import Try from './Try';

//숫자 4개를 랜덤하게 뽑는 함수 (겹치지않음)
function getNumbers() {
	const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const arr = [];

	for (let i = 0; i < 4; i++) {
		const candi = candidate.splice(Math.floor(Math.random() * (9 - i)), 1);
		arr.push(candi);
	}
	return arr;
}

class NumberBaseball extends Component {
	state = {
		result: '',
		value: '',
		answer: getNumbers(),
		tries: [], //push
	};

	onSubmitForm = (e) => {
		e.preventDefault();
		if (this.state.value == this.state.answer.join('')) {
			//답이 맞았을 경우
			this.setState({
				result: '홈런!',
				// [...arr1, (인자)] : 에전 배열을 앞쪽에 복사 후 새로운 인자 push
				tries: [...this.state.tries, { try: this.state.value, result: '홈런!' }],
			});

			alert('게임을 다시 시작');

			//초기화
			this.setState({
				value: '',
				answer: getNumbers(),
				tries: [],
			});
		} else {
			//답이 틀렸을 경우
			const answerArr = this.state.value.split('').map((x) => {
				return parseInt(x);
			});
			let strike = 0;
			let ball = 0;

			if (this.state.tries.length >= 9) {
				//배열 tries의 길이가 10일 경우 (10번 시도)
				this.setState({
					result: `10번 넘었습니다. 실패 답은 ${this.state.answer.join('')} 였습니다.`,
				});

				alert('게임을 다시 시작');

				//초기화
				this.setState({
					value: '',
					answer: getNumbers(),
					tries: [],
				});
			} else {
				for (let i = 0; i < 4; i++) {
					if (answerArr[i] === Number(this.state.answer[i])) {
						//입력한 값과 저장된 값의 위치가 같을 경우
						strike += 1;
					} else if (this.state.answer.join('').includes(answerArr[i])) {
						//저장된 배열내부에 입력한 값이 존재할 경우
						ball += 1;
					}
				}
				this.setState({
					tries: [...this.state.tries, { try: this.state.value, result: `${strike} 스트라이크 ${ball} 볼` }],
					value: '',
				});
			}
		}
	};

	onChangeInput = (e) => {
		this.setState({ value: e.target.value });
	};

	render() {
		const { result, value, tries } = this.state;
		return (
			<>
				<h1>{result}</h1>
				<form onSubmit={this.onSubmitForm}>
					<input maxLength={4} value={value} onChange={this.onChangeInput} />
					<button>클릭</button>
				</form>
				<div>시도: {tries.length}</div>
				<ul>
					{tries.map((x, y) => {
						return (
							//리액트 내부 반복문의 최상위 태그는 고유한 key값을 가져야함
							<Try value={x} key={`${y + 1} 차시도: `} />
						);
					})}
				</ul>
			</>
		);
	}
}

export default NumberBaseball;
