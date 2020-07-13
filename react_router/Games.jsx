import React from 'react';
import { BrowserRouter, HashRouter, Route, Link, Switch } from 'react-router-dom';
import ResponseCheck from '../lecture/ResponseCheck';
import RSP from '../lecture/RSP';
import Lotto from '../lecture/Lotto';
import GameMatcher from './GameMatcher';

// BrowserRouter
// 실무에 적합하지만 세팅할 것이 많다.
// 단점: 새로고침시 오류

// HashRouter: 주소의 #을 웹에서는 해시라 부름
// 장점: 새로고침을 해도 화면이 정상적으로 진행 (해시를 통해 서버가 해시 뒤쪽을 알지 못함),
//       디플로이할 때 편함
// 단점: 검색엔진에 불이익 (검색엔진은 브라우저를 검색하는 것이 아닌 서버를 검색하는 것)
// 때문에 실무에선 해시라우터를 잘 쓰지 않음

const Games = () => {
	return (
		<BrowserRouter>
			{/* Link: a 태그와 같은 기능 이지만 리액트 라우터를 사용할때는 Link 사용 */}
			{/* Route를 불러주는 기능 */}
			<div>
				{/* 쿼리스팅 (문법 : 주소?{key}=값&*/}
				{/* &: 데이터 쌍이 여러 개일 경우 구분 */}
				{/* 주소에 대한 부가적인 데이터를 저장  */}
				{/* location에 search 부분에 저장됨 */}
				<button>
					<Link to="/game/ResponseCheck?query=10&hello=Ji&bye=react">반응속도 체크</Link>
				</button>
				&nbsp;
				<button>
					<Link to="/game/rock-scissors-paper">가위바위보</Link>
				</button>
				&nbsp;
				<button>
					<Link to="/game/lotto-generator">로또 추첨기</Link>
				</button>
				&nbsp;
				<button>
					<Link to="/game/index">게임매처</Link>
				</button>
			</div>
			<div>
				{/* path = 가상의 페이지 주소  component : 페이지에 들어갈 주소 */}
				{/* 프론트 엔트에서만 동작 */}
				{/* <Route path="/ResponseCheck" component={ResponseCheck} />
				<Route path="/rock-scissors-paper" component={RSP} />
				<Route path="/lotto-generator" component={Lotto} /> */}

				{/* 동적 라우트 매칭 */}
				{/* : = 파라미터 동적으로 변경됨  */}
				{/* 이것을 통해 라우트가 늘어나는 것을 하나로 압축가능 */}
				{/* GameMacher에서 각 링크를 연결 */}

				{/* 값 넘기기 */}
				{/*  <GameMatcher props={변수}/> */}
				{/* render={(props) => <GameMatcher props={props.변수} />} */}
				<Switch>
					{/* Switch: 첫번째로 일치하는 태그만 랜더링 실행*/}
					{/* 동시에 여러 라우터가 실행되는 것을 방지 */}
					<Route exact path="/" render={(props) => <GameMatcher {...props} />} />
					<Route path="/game/:name" render={(props) => <GameMatcher {...props} />} />
				</Switch>
			</div>
		</BrowserRouter>
	);
};

export default Games;
