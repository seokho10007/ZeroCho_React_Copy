import React, { useState, useRef, useEffect, memo, useMemo, useCallback } from 'react';
import Ball from './Ball';

function getWinNumber() {
	console.log('getWillNumber');

	const candidate = Array(45)
		.fill()
		.map((v, i) => i + 1);
	const shuffle = [];

	while (candidate.length > 0) {
		shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
	}
	const bonusNumber = shuffle[shuffle.length - 1];
	const winnumbers = shuffle.slice(0, 6).sort((a, b) => a - b);
	return [...winnumbers, bonusNumber];
}

const LottoHooks = memo(() => {
	// 아래처럼 코딩 시 만약 getWinNumbers 가 10초씩 걸리는 함수일 경우 문제발생
	// const [winnumbers, setWinnumbers] = useState(getWinNumber());
	// Hooks는 랜더링 시 전체 샐행되기 때문에 반복적으로 함수가 실행된다.
	// 따라서 useMemo 메소드를 통해 해당함수의 결과값을 기억(저장) 한다.

	// useMemo: 복잡한 함수 결과 값을 기억
	// useRef: 일반 값을 기억
	// useCallback: 함수 자체를 기억

	// useMemo는 두번째 배열에 입력된 값이 바뀌기 전까지 함수의 반환 값을 기억
	const LottoNumbers = useMemo(() => getWinNumber(), []);
	const [winnumbers, setWinnumbers] = useState(LottoNumbers);
	const [winBalls, setWinBalls] = useState([]);
	const [bonus, setBonus] = useState(null);
	const [redo, setRedo] = useState(false);
	const timeOuts = useRef([]);

	// Hooks Tip!
	// Hooks의 setState는 조건문안에 절대로 넣어선 안되며 반복문또한 웬만하면 사용하지 않는다.
	// 또한 useEffect 등에서도 useState를 넣어선 안된다.

	// class 문법에서 componentdidupdate에서 조건문을 통해 실행하는 것을
	// Hooks 문법에선 useEffect를 여러번 사용하여 실행한다.

	useEffect(() => {
		console.log('useEffect');
		for (let i = 0; i < winnumbers.length - 1; i++) {
			// 아래 코드는 timeOut.current가 바뀌는 것이 아닌
			// 내부에 있는 배열데이터를 바꾸는 것
			// 만약 timeOut.current = [] 이면 이것은 직접 current에 접근한 것
			timeOuts.current[i] = setTimeout(() => {
				setWinBalls((prevBalls) => {
					return [...prevBalls, winnumbers[i]];
				});
			}, (i + 1) * 1000);
		}

		timeOuts.current[6] = setTimeout(() => {
			setBonus(winnumbers[6]);
			setRedo(true);
		}, 7000);

		return () => {
			timeOuts.current.forEach((x) => {
				clearTimeout(x);
			});
		};
	}, [timeOuts.current]); //빈 배열이면 componentdidmount 만 실행
	// 배열에 요소가 있으면 componentdidmount와 componentdidupdate를 모두 실행
	// 배열 내부에 선언된 값이 바뀔경우에 실행

	useEffect(() => {
		console.log('리랜더링 시 실행되지 않습니다.');
	}, []);

	useEffect(() => {
		console.log('숫자를 변경합니다.');
	}, [winnumbers]);

	// // 만약 componentdidmount를 실행하지않고 componentdidupdate만 실행하고 싶을때
	// const noMount = useRef(false);
	// useEffect(() => {
	// 	if (!noMount.current) {
	// 		noMount.current = true;
	//      //처음한번 실행될때 아무것고 실행하지 않음
	//     }else{
	//      //ajax
	//     }
	// },[바뀌는 값]);

	// useCallback으로 함수를 감쌀경우 함수자체를 기억해둬서
	// 리랜더링 시 함수컴포넌트가 재실행되도 함수가 재생성되지 않음(메모리 사용량 감소)
	// 단, 첫번째 기억값이 저장됨, 특정값이 바뀔때마다 재실행되어야 한다면
	// 마지막 배열에 인자로 바뀌는 값을 입력
	// useCallback을 필수로 사용해야될 때 : 자식 컴포넌트에 함수를 넘길 때
	// 자식 컴포넌트는 부모의 함수값이 바뀔경우 반복적을 랜더링을 실행(메모리 사용량 증가)
	// 따라서, useCallback을 통해 함수값을 변경하지않고 고정시킴
	const onClickRedo = useCallback(() => {
		console.log(winnumbers);
		setWinnumbers(getWinNumber());
		setWinBalls([]);
		setBonus(null);
		setRedo(false);

		timeOuts.current = [];
	}, [winnumbers]); //조건, 배열내부에 값이 바뀔경우 (조건이 맞을경우) 재실행

	return (
		<>
			<div>당첨숫자들</div>
			<div id="result">
				{winBalls.map((x) => (
					<Ball key={x} number={x} />
				))}
			</div>
			<div>보너스</div>
			{bonus && <Ball number={bonus} />}
			{redo && <button onClick={onClickRedo}>한번더!</button>}
		</>
	);
});

export default LottoHooks;
