import React, { useState, useRef, useEffect, memo, useLayoutEffect } from 'react';

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

//						result		imgCoord	score
//componentDidMount
//componentDidUpdate
//componentwillMount

// 함수 컴포넌트는 랜더링이 될 때마다 함수의 모든부분이 다시 실행됨
// 그래서 랜더링이 다시 실행될 때 마다 useEffect부분이 계속 실행됨
// (함수내부 부분과 retune 부분)
// Hooks는 컴포넌드디드마운트, 컴포넌트윌마운트와 달리 반복적으로 실행됨
// (두 번째 인자로 넣은 배열(imgCoord)이 바뀔 때마다 실행)
const RSPHooks = memo(() => {
	const [result, setResult] = useState('');
	const [imgCoord, setImgCoord] = useState(0);
	const [score, setScore] = useState(0);

	const Interval = useRef();

	useEffect(() => {
		//componentDidMount, componentDidUpdate, 역할
		// Interval.current = setInterval(changehand, 500);
		return () => {
			//componentwillMount 역할
			clearInterval(Interval.current);
		};
		// 아래 배열: 클로저 문제를 해결하기 위한 배열, 바뀌는 스테이트를 입력
		// 여러 개 가능 (한 개: componentDidMount, 여러 개: componentDidUpdate)
	}, [imgCoord]);

	// useLayoutEffect: 화면을 리사이징할때 사용 (잘 안씀)
	// useEffect: 리자이징 전에 실행됨

	const changehand = () => {
		if (imgCoord == rspCoords.바위) {
			setImgCoord(rspCoords.가위);
		} else if (imgCoord == rspCoords.가위) {
			setImgCoord(rspCoords.보);
		} else if (imgCoord == rspCoords.보) {
			setImgCoord(rspCoords.바위);
		}
	};

	const onClickBtn = (choice) => {
		clearInterval(Interval.current);

		const myScore = scores[choice];
		const cpuScore = scores[computerChoice(imgCoord)];
		const diff = myScore - cpuScore;

		if (diff == 0) {
			setResult('비겼습니다.');
		} else if ([-1, 2].includes(diff)) {
			setResult('졌습니다.');
			setScore((prevScore) => {
				return prevScore - 1;
			});
		} else {
			setResult('이겼습니다.');
			setScore((prevScore) => {
				return prevScore + 1;
			});
		}
		// setTimeout(() => {
		// 	Interval.current = setInterval(changehand, 1000);
		// }, 500);
	};

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
						onClickBtn('바위');
					}}
				>
					바위
				</button>
				<button
					id="scissor"
					className="btu"
					onClick={() => {
						onClickBtn('가위');
					}}
				>
					가위
				</button>
				<button
					id="paper"
					className="btu"
					onClick={() => {
						onClickBtn('보');
					}}
				>
					보
				</button>
			</div>
			<div>{result}</div>
			<div>score: {score}</div>
		</>
	);
});

export default memo(RSPHooks);
