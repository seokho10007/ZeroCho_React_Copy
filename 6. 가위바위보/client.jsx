// react 설정을 불러옴
import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

//가위바위보
import RSP from './RSPHooks';
// import RSP from './RSP';
const Hot = hot(RSP);

ReactDOM.render(<Hot />, document.querySelector('#root'));
