import React, { Component } from 'react';
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

class Lotto extends Component {
	state = {
		winnumbers: getWinNumber(), // 당첨숫자들
		winBalls: [],
		bonus: null, //보너스공
		redo: false,
	};

	timeOuts = [];

	componentDidMount() {
		this.reStart();
	}

	reStart = () => {
		const { winnumbers } = this.state;
		for (let i = 0; i < winnumbers.length - 1; i++) {
			this.timeOuts[i] = setTimeout(() => {
				this.setState((prevState) => {
					return {
						winBalls: [...prevState.winBalls, winnumbers[i]],
					};
				});
			}, (i + 1) * 1000);
		}

		this.timeOuts[6] = setTimeout(() => {
			this.setState({
				bonus: winnumbers[6],
				redo: true,
			});
		}, 7000);
	};

	componentDidUpdate(prevProps, prevState) {
		if (this.state.winBalls.length === 0) {
			this.reStart();
		}
	}

	componentWillMount() {
		this.timeOuts.forEach((x) => {
			clearTimeout(x);
		});
	}

	onClickRedo = () => {
		this.setState({
			winnumbers: getWinNumber(), // 당첨숫자들
			winBalls: [],
			bonus: null, //보너스공
			redo: false,
		});
		this.timeOuts = [];
	};

	render() {
		const { winBalls, bonus, redo } = this.state;
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
				{redo && <button onClick={this.onClickRedo}>한번더!</button>}
			</>
		);
	}
}

export default Lotto;
