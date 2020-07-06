import React, { useRef, useState } from 'react';

const ResponseCheck = () => {
	const [state, setState] = useState('waiting');
	const [msg, setMsg] = useState('클릭해서 시작하세요');
	const [result, setResult] = useState([]);

	const timeOut = useRef(null);
	const startTime = useRef();
	const endTime = useRef();

	//useRef가 DOM을 대신해서 사용할 때 작동하지만 화면에는 영향을 끼치지 않을 때

	const onReset = () => {
		setResult([]);
	};

	const onClickScreen = () => {
		if (state === 'waiting') {
			setState('ready');
			setMsg('초록색이 되면 클릭하세요');

			timeOut.current = setTimeout(() => {
				setState('now');
				setMsg('지금 클릭!');
				startTime.current = new Date();
			}, Math.floor(Math.random() * 1000) + 2000);
		} else if (state === 'ready') {
			setState('waiting');
			setMsg('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
			clearTimeout(timeOut.current);
		} else {
			endTime.current = new Date();
			setState('waiting');
			setMsg('클릭해서 시작하세요!');

			setResult((prevResult) => {
				return [...prevResult, endTime.current - startTime.current];
			});
		}
	};

	const renderAverage = () => {
		return result.length === 0 ? null : (
			<>
				<div>평균시간: {Math.ceil(result.reduce((a, c) => a + c) / result.length)}ms</div>
				<button onClick={onReset}>Reset</button>
			</>
		);
	};

	return (
		<>
			<div id="screen" className={state} onClick={onClickScreen}>
				{msg}
			</div>

			{/* return 내부에서 if문이나 for문을 사용할 때는 다음과 같이 사용*/}
			{/* (리엑트에선 기본적으로 사용할 수 없지만 함수에서는 사용가능한 점을 이용) */}
			{/* 즉시실행 함수로 사용 */}
			{(() => {
				if (result.length === 0) {
					return null;
				} else {
					return result.length === 0 ? null : (
						<>
							<div>
								평균시간:{' '}
								{Math.ceil(result.reduce((a, c) => a + c) / result.length)}ms
							</div>
							<button onClick={onReset}>Reset</button>
						</>
					);
				}
			})()}
			{/* {renderAverage()} */}
		</>
	);
};

export default ResponseCheck;
