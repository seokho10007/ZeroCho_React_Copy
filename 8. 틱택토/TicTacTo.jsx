import React, { useState, useReducer, useContext, useCallback, useEffect } from 'react';
import Table from './Table';

// 현재 TicTacTo는 Td와 멀리 떨어진 관계이다. (TicTacTo > Table > Tr > Td)
// 따라서 Td에게 TicTacTo의 state를 상속하기 위해선 특정한 방법이 필요한데
// useReducer란 메소

//	const [winner, setWinner] = useState('');
//	const [turn, setTurn] = useState('0');
//	const [tableData, setTableData] = useState([
//		['', '', ''],
//		['', '', ''],
//  	['', '', ''],
//]);

const initialState = {
	winner: '',
	turn: 'O',
	tableData: [
		['', '', ''],
		['', '', ''],
		['', '', ''],
	],
	recentCell: [-1, -1],
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
const RESET_GAME = 'RESET_GAME';

//reducer 내부에서 type에 따라 state를 어떻게 바꿀 것인지 정의
const reducer = (state, action) => {
	switch (action.type) {
		case SET_WINNER: {
			// state.winner = action.winner 이렇게 하면 안됨
			// 기존 스테이트를 직접 바꾸는 것이 아니라 새로운 스테이트를 생성해 변경(불변성)
			// 항상 새로운 객체를 생성해 바뀐 값을 입력
			return {
				...state,
				winner: action.winner,
			};
		}

		case CLICK_CELL: {
			//얕은 복사를 통해 불변성을 지켜줌
			const tableData = [...state.tableData];
			tableData[action.row] = [...tableData[action.row]];
			tableData[action.row][action.cell] = state.turn;
			return {
				...state,
				tableData,
				recentCell: [action.row, action.cell],
			};
		}

		case CHANGE_TURN: {
			return {
				...state,
				turn: state.turn === 'O' ? 'X' : 'O',
			};
		}

		case RESET_GAME: {
			return {
				...state,
				turn: 'O',
				tableData: [
					['', '', ''],
					['', '', ''],
					['', '', ''],
				],
				recentCell: [-1, -1],
			};
		}
		default:
			return state;
	}
};

const TicTacTo = () => {
	// 스테이트가 많아지면 관리가 힘들어지고 자식 컴포넌트에 넘겨줄때도 제한되는데
	// useReducer를 통해 해결 가능하다.
	const [state, dispatch] = useReducer(reducer, initialState);
	const { winner, turn, tableData, recentCell } = state;

	/*
	const onClickTable = useCallback(() => {
		// dispatch 부분안에 있는 동작을 action 이라 함
		// action이 실행 될때마다 실행되는 것을 reducer 라 부름
		dispatch({ type: SET_WINNER, winner: 'O' });
	}, []);
    */

	useEffect(() => {
		const [row, cell] = recentCell;
		let win = false;

		if (row < 0) {
			return;
		}

		if (
			//가로줄
			tableData[row][0] === turn &&
			tableData[row][1] === turn &&
			tableData[row][2] === turn
		) {
			win = true;
		}
		if (
			//세로줄
			tableData[0][cell] === turn &&
			tableData[1][cell] === turn &&
			tableData[2][cell] === turn
		) {
			win = true;
		}

		//대각선
		if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
			win = true;
		}

		//반대 대각선
		if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
			win = true;
		}
		if (win) {
			dispatch({ type: SET_WINNER, winner: turn });
			dispatch({ type: RESET_GAME });
		} else {
			//무승부
			let all = true; //all 이 true 면 무승부
			tableData.forEach((row) => {
				row.forEach((cell) => {
					if (!cell) {
						all = false;
					}
				});
			});
			if (all) {
				dispatch({ type: RESET_GAME });
			} else {
				dispatch({ type: CHANGE_TURN });
			}
		}
	}, [recentCell]);

	return (
		<>
			<Table tableData={tableData} dispatch={dispatch} />
			{winner && <div>{winner} 님의 승리</div>}
		</>
	);
};

export default TicTacTo;

// 기존 initialState 가 존재
// 클릭(이벤트) 시 스테이트를 직접 수정하는 것이 아닌
// action을 생성 후 dispatch 함
// action을 어떻게 처리할 것인지는 reducer가 실행
