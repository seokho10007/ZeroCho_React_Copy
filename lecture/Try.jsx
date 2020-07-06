import React, { memo, Component } from 'react';

class Try extends Component {
	render() {
		const { value } = this.props;
		return value.length === 0 ? null : (
			<>
				<div>평균시간: {Math.floor(value.reduce((a, c) => a + c) / value.length)}ms</div>
				<button onClick={this.onReset}>초기화</button>
			</>
		);
	}
}

export default memo(Try);
