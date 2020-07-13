import React, { Component } from 'react';
import ResponseCheck from '../lecture/ResponseCheck';
import RSP from '../lecture/RSP';
import Lotto from '../lecture/Lotto';

class GameMatcher extends Component {
	render() {
		// new URLSearchParams:
		console.log(this.props.location.search.slice(1));
		let urlSearchParms = new URLSearchParams(this.props.location.search.slice(1));
		console.log(urlSearchParms);
		console.log(urlSearchParms.get('hello'));

		if (this.props.match.params.name === 'ResponseCheck') {
			return <ResponseCheck />;
		} else if (this.props.match.params.name === 'rock-scissors-paper') {
			return <RSP />;
		} else if (this.props.match.params.name === 'lotto-generator') {
			return <Lotto />;
		}
		// history
		// 페이지를 넘나든 내역, 함수들이 저장되어 있어 여러 함수를 호출 가능
		// 실제로 페이지가 바뀌는 것이 아닌 눈속임을 하는 것이기 때문에
		// 리엗트 라우터가 제공하는 페이지 이동 컴포넌트를 사용해야함
		// 따라서 history API를 통해 페이지 주소를 변경해야함 (라우터의 API)

		// match
		// 실제 주소와, params가 존재 (가상주소의 뒷 부분)

		// location
		// 주소와 search, hash 존재

		return <div>일치하는 게임이 없습니다.</div>;
	}
}
export default GameMatcher;
