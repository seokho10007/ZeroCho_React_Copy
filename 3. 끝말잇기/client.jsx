// react 설정을 불러옴
const React = require('react');
const ReactDOM = require('react-dom');
const { hot } = require('react-hot-loader/root');

const WordRealy = require('./WordRealy');
const Hot = hot(WordRealy);

ReactDOM.render(<Hot />, document.querySelector('#root'));
