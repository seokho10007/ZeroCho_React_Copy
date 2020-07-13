// react 설정을 불러옴
import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

// 로또추첨기
// import Lotto from './Lotto';
import Lotto from './LottoHooks';

const Hot = hot(Lotto);

ReactDOM.render(<Hot />, document.querySelector('#root'));
