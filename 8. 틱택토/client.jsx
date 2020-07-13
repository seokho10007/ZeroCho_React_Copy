// react 설정을 불러옴
import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

// 틱택토
import TicTacTo from './TicTacTo';
const Hot = hot(TicTacTo);

ReactDOM.render(<Hot />, document.querySelector('#root'));
