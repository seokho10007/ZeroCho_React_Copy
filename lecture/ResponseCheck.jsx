import React, { memo, PureComponent } from 'react';

class ResponseCheck extends PureComponent {
	state = {
		state: 'waiting',
		msg: '클릭해서 시작하세요',
		result: [],
	};

	timeOut;
	startTime;
	endTime;

	onClickScreen = () => {
		const { state } = this.state;

		if (state === 'waiting') {
			this.setState({
				state: 'ready',
				msg: '초록색이되면 클릭하세요.',
			});

			this.timeOut = setTimeout(() => {
				this.setState({
					state: 'now',
					msg: '지금클릭',
				});
				this.startTime = new Date();
			}, Math.floor(Math.random() * 1000) + 2000);
		} else if (state === 'ready') {
			this.setState({
				state: 'waiting',
				msg: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.',
			});
			clearTimeout(this.timeOut);
		} else {
			this.endTime = new Date();
			this.setState((prevState) => {
				return {
					state: 'waiting',
					result: [...prevState.result, this.endTime - this.startTime],
					msg: '클릭해서 시작하세요.',
				};
			});
		}
	};

	onReset = () => {
		this.setState({
			result: [],
		});
	};

	// 함수 대신 Try 클래스 사용
	renderAverage = () => {
		const { result } = this.state;
		return result.length === 0 ? null : (
			<>
				<div>평균시간: {Math.floor(result.reduce((a, c) => a + c) / result.length)}ms</div>
				<button onClick={this.onReset}>초기화</button>
			</>
		);
	};

	render() {
		const { result, state, msg } = this.state;

		return (
			<>
				<div id="screen" className={state} onClick={this.onClickScreen}>
					{msg}
				</div>
				{this.renderAverage()}
			</>
		);
	}
}

export default memo(ResponseCheck);
