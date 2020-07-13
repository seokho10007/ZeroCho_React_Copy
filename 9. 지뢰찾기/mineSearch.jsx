import React, { useReducer, createContext, useMemo, useEffect, memo } from 'react';
import Table2 from './Table2';
import Form from './Form';

export const CODE = {
	OPENED: 0, // 0 이상이면 OPENED
	NORMAL: -1, // 안 누른 상태
	QUESTION: -2, // 물음표
	FLAG: -3, // 깃발
	QUESTION_MINE: -4, // 물음푠데 지뢰
	FLAG_MINE: -5, // 깃발인데 지뢰
	CLICKED_MINE: -6, // 클릭했는데 지뢰
	MINE: -7, // 지뢰
};

//context API : 순차적으로 값을 넘겨주는 것이 아닌 원하는 곳에 바로 할당 가능
export const TableContext = createContext({
	tableData: [
		// -1: 지뢰X 	-7: 지뢰O
	],
	dispatch: () => {},
	halted: true,
});

const initialState = {
	tableData: [],
	timer: 0,
	result: '',
	halted: true,
	openedCount: 0,
	data: {
		row: 0,
		cell: 0,
		mine: 0,
	},
};

const plantMine = (row, cell, mine) => {
	const candidate = Array(row * cell)
		.fill()
		.map((arr, i) => {
			return i;
		});
	const shuffle = [];
	while (candidate.length > row * cell - mine) {
		const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
		shuffle.push(chosen);
	}
	const data = [];
	for (let i = 0; i < row; i++) {
		const rowData = [];
		data.push(rowData);
		for (let j = 0; j < cell; j++) {
			rowData.push(CODE.NORMAL);
		}
	}

	for (let k = 0; k < shuffle.length; k++) {
		const ver = Math.floor(shuffle[k] / cell);
		const hor = shuffle[k] % cell;
		data[ver][hor] = CODE.MINE;
	}

	return data;
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const reducer = (state, action) => {
	switch (action.type) {
		case START_GAME:
			return {
				...state,
				data: { row: action.row, cell: action.cell, mine: action.mine },
				tableData: plantMine(action.row, action.cell, action.mine),
				halted: false,
				openedCount: 0,
				timer: 0,
				result: '',
			};
		case OPEN_CELL: {
			const tableData = [...state.tableData];
			tableData.forEach((row, i) => {
				tableData[i] = [...row];
			});
			const checked = [];
			let openedCount = 0;

			const checkAround = (row, cell) => {
				if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) {
					return;
				} // 상하좌우 없는칸은 안 열기
				if (
					[
						CODE.OPENED,
						CODE.FLAG,
						CODE.FLAG_MINE,
						CODE.QUESTION_MINE,
						CODE.QUESTION,
					].includes(tableData[row][cell])
				) {
					return;
				} // 닫힌 칸만 열기
				if (checked.includes(row + '/' + cell)) {
					return;
				} else {
					checked.push(row + '/' + cell);
				} // 한 번 연칸은 무시하기

				let around = [tableData[row][cell - 1], tableData[row][cell + 1]];
				if (tableData[row - 1]) {
					around = around.concat([
						tableData[row - 1][cell - 1],
						tableData[row - 1][cell],
						tableData[row - 1][cell + 1],
					]);
				}
				if (tableData[row + 1]) {
					around = around.concat([
						tableData[row + 1][cell - 1],
						tableData[row + 1][cell],
						tableData[row + 1][cell + 1],
					]);
				}
				const count = around.filter(function (v) {
					return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
				}).length;
				if (count === 0) {
					// 주변칸 오픈
					if (row > -1) {
						const near = [];
						if (row - 1 > -1) {
							near.push([row - 1, cell - 1]);
							near.push([row - 1, cell]);
							near.push([row - 1, cell + 1]);
						}
						near.push([row, cell - 1]);
						near.push([row, cell + 1]);
						if (row + 1 < tableData.length) {
							near.push([row + 1, cell - 1]);
							near.push([row + 1, cell]);
							near.push([row + 1, cell + 1]);
						}
						near.forEach((n) => {
							if (tableData[n[0]][n[1]] !== CODE.OPENED) {
								checkAround(n[0], n[1]);
							}
						});
					}
				}
				tableData[row][cell] === CODE.NORMAL && (openedCount += 1);
				tableData[row][cell] = count;
			};
			checkAround(action.row, action.cell);
			let halted = false;
			let result = '';

			if (
				state.data.row * state.data.cell - state.data.mine ===
				state.openedCount + openedCount
			) {
				//승리조건
				halted = true;
				result = `${state.timer}초만에 승리`;
			}

			return {
				...state,
				tableData,
				openedCount: state.openedCount + openedCount,
				halted,
				result,
			};
		}
		case CLICK_MINE: {
			const tableData = [...state.tableData];
			tableData[action.row] = [...state.tableData[action.row]];
			tableData[action.row][action.cell] = CODE.CLICKED_MINE;

			return {
				...state,
				tableData,
				halted: true,
			};
		}
		case FLAG_CELL: {
			const tableData = [...state.tableData];
			tableData[action.row] = [...state.tableData[action.row]];

			if (tableData[action.row][action.cell] === CODE.MINE) {
				tableData[action.row][action.cell] = CODE.FLAG_MINE;
			} else {
				tableData[action.row][action.cell] = CODE.FLAG;
			}
			return {
				...state,
				tableData,
			};
		}
		case QUESTION_CELL: {
			const tableData = [...state.tableData];
			tableData[action.row] = [...state.tableData[action.row]];

			if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
				tableData[action.row][action.cell] = CODE.QUESTION_MINE;
			} else {
				tableData[action.row][action.cell] = CODE.QUESTION;
			}
			return {
				...state,
				tableData,
			};
		}
		case NORMALIZE_CELL: {
			const tableData = [...state.tableData];
			tableData[action.row] = [...state.tableData[action.row]];

			if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
				tableData[action.row][action.cell] = CODE.MINE;
			} else {
				tableData[action.row][action.cell] = CODE.NORMAL;
			}
			return {
				...state,
				tableData,
			};
		}
		case INCREMENT_TIMER: {
			return {
				...state,
				timer: state.timer + 1,
			};
		}

		default:
			return state;
	}
};

const mineSearch = memo(() => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { tableData, halted, timer, result } = state;

	// context API를 사용할 때는 꼭 usememo나 다른 기능을 이용해
	// 캐싱을 해주어야 한다.
	const value = useMemo(() => ({ tableData: tableData, dispatch, halted: halted }), [
		tableData,
		halted,
	]);

	useEffect(() => {
		let timer;

		if (!halted) {
			timer = setInterval(() => {
				dispatch({ type: INCREMENT_TIMER });
			}, 1000);
		}

		return () => {
			clearInterval(timer);
		};
	}, [halted]);

	return (
		// TableContext.Provider: context API를 사용하기위한 초석
		// value에 넘겨줄 값을 입력
		// 문제 최적화하기 힘듦 (랜더링될 때마다 객체가 계속 생성됨)
		<TableContext.Provider value={value}>
			<Form />
			<div>{timer}</div>
			<Table2 />
			<div>{result}</div>
		</TableContext.Provider>
	);
});

export default mineSearch;
