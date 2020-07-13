import React, { memo, useMemo } from 'react';
import Td from './Td';

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
	console.log('tr rendered');
	return (
		<>
			<tr>
				{Array(rowData.length)
					.fill()
					.map((td, i) =>
						useMemo(
							() => (
								<Td
									dispatch={dispatch}
									key={i + `${i}`}
									cellIndex={i}
									cellData={rowData[i]}
									rowIndex={rowIndex}
								>
									{''}
								</Td>
							),
							[rowData[i]],
						),
					)}
			</tr>
		</>
	);
});

export default Tr;
