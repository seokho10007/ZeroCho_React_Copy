import React, { Component } from 'react';

class Try extends Component {
	render() {
		const { value } = this.props;
		return (
			<>
				<li>
					<div>{value.try}</div>
					<div>{value.result}</div>
				</li>
			</>
		);
	}
}

export default Try;
