import React, { memo, PureComponent } from 'react';

// 클래스의 경우
//    constructor -> render -> Ref -> componentDidMount
// -> (setState/props) 바뀔 때 -> shouldComponentUpdate -> render -> componentDidUpdate
// -> 부모가 자식 컴포넌트를 없앴을 때 -> componentWillUnMount -> 소멸

const rspCoords = {
	바위: '0',
	가위: '-142px',
	보: '-284px',
};

const scores = {
	바위: 1,
	가위: 0,
	보: -1,
};

const computerChoice = (imgCoord) => {
	return Object.entries(rspCoords).find(function (v) {
		return v[1] === imgCoord;
	})[0];
};

///

class RSP extends PureComponent {
	state = {
		result: '',
		imgCoord: 0,
		score: 0,
	};

	Interval;

	// 라이프 사이클 (컴포넌트의 일생)
	// 리액트를 통해 컴포넌트가 돔에 실행될 때 특정한 동작을 실행시킴
	// componentDidMount: render가 처음 실행될때 만 실행 -> 비동기 요청을 주로 사용
	componentDidMount() {
		this.Interval = setInterval(this.changehand, 100);
	}

	// componentDidUpdate: 리랜더링이 발생할 때 실행
	//componentDidUpdate() {}
	// componentWillUmMount: 컴포넌트가 제거되기 직전에 실행, 비동기 요청 정리를 주로 사용
	componentWillUnMount() {
		clearInterval(this.Interval);
	}

	changehand = () => {
		const { imgCoord } = this.state;
		if (imgCoord == rspCoords.바위) {
			this.setState({
				imgCoord: rspCoords.가위,
			});
		} else if (imgCoord == rspCoords.가위) {
			this.setState({
				imgCoord: rspCoords.보,
			});
		} else if (imgCoord == rspCoords.보) {
			this.setState({
				imgCoord: rspCoords.바위,
			});
		}
	};

	onClickBtn = (choice) => {
		const { result, score, imgCoord } = this.state;
		const myScore = scores[choice];
		const cpuScore = scores[computerChoice(imgCoord)];
		const diff = myScore - cpuScore;

		clearInterval(this.Interval);

		if (diff == 0) {
			this.setState({
				result: '비겼습니다.',
			});
		} else if ([-1, 2].includes(diff)) {
			this.setState((prevState) => {
				return {
					result: ' 졌습니다',
					score: prevState.score - 1,
				};
			});
		} else {
			this.setState((prevState) => {
				return {
					result: '이겼습니다.',
					score: prevState.score + 1,
				};
			});
		}
		setTimeout(() => (this.Interval = setInterval(this.changehand, 100)), 2000);
	};

	render() {
		const { result, score, imgCoord } = this.state;
		return (
			<>
				<div
					id="computer"
					style={{
						background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
					}}
				/>
				<div>
					<button
						id="rock"
						className="btu"
						onClick={() => {
							this.onClickBtn('바위');
						}}
					>
						바위
					</button>
					<button
						id="scissor"
						className="btu"
						onClick={() => {
							this.onClickBtn('가위');
						}}
					>
						가위
					</button>
					<button
						id="paper"
						className="btu"
						onClick={() => {
							this.onClickBtn('보');
						}}
					>
						보
					</button>
				</div>
				<div>{result}</div>
				<div>score: {score}</div>
			</>
		);
	}
}

export default RSP;
