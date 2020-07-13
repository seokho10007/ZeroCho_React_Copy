import React, { useContext, memo } from 'react';
import Td2 from './Td2';
import { TableContext } from './mineSearch';

const Tr = memo(({ rowIndex }) => {
	const { tableData } = useContext(TableContext);

	return (
		<tr>
			{Array(tableData[0].length)
				.fill()
				.map((tr, i) => (
					<Td2 rowIndex={rowIndex} cellIndex={i} key={i} />
				))}
		</tr>
	);
});

export default memo(Tr);
