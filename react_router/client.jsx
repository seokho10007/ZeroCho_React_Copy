// react 설정을 불러옴
import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, HashRouter } from 'react-router-dom';

// // 틱택토
// import TicTacTo from './TicTacTo';
// const Hot = hot(TicTacTo);

// 틱택토
import Games from './Games';
const Hot = hot(Games);

ReactDOM.render(<Hot />, document.querySelector('#root'));
