//필요한 패키지나 라이브러리 호출
const React = require('react');
const { Component } = React;

class WordRealy extends Component {
	state = {
		text: 'Hello Webpack',
	};

	render() {
		return <h1>{this.state.text}</h1>;
	}
}

// 컴포넌트 외부 저장
module.exports = WordRealy;
