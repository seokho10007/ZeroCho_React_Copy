import React, { useCallback, useEffect, useRef, memo } from 'react';
import { CLICK_CELL } from './TicTacTo';

const Td = memo(({ rowIndex, cellIndex, cellData, dispatch }) => {
	console.log('td rendered');

	const ref = useRef([]);
	useEffect(() => {
		ref.current = [rowIndex, cellIndex, dispatch, cellData];
	}, [rowIndex, cellIndex, dispatch, cellData]);

	const onClicktd = useCallback(() => {
		if (cellData) {
			return;
		}

		dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
	}, [cellData]);

	return (
		<>
			<td onClick={onClicktd}>{cellData}</td>
		</>
	);
});

export default Td;
