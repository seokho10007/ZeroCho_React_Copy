import React, { useContext, memo } from 'react';
import Tr2 from './Tr2';
import { TableContext } from './mineSearch';

const Table = memo(() => {
	const { tableData } = useContext(TableContext);

	return (
		<table>
			<tbody>
				{Array(tableData.l
				ength)
					.fill()
					.map((tr, i) => (
						<Tr2 rowIndex={i} key={i + `${i}`} />
					))}
			</tbody>
		</table>
	);
});

export default Table;
