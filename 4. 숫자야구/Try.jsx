import React, { memo, useState } from 'react';

// class Try extends Component {
// 	render() {
// 		const { value } = this.props;
// 		return (
// 			<>
// 				<li>
// 					<div>{value.try}</div>
// 					<div>{value.result}</div>
// 				</li>
// 			</>
// 		);
// 	}
// }

const Try = ({ value }) => {
	//부모로부터 할당받은 props(value)값은 변경하면 안됨
	//변경하기 위해선 부모에서 변경
	//만약 자식에서 props를 바꾸려면 useState로 변경
	// const [result, setResult] = useState(value.result);

	// const onClick = () => {
	// 	setResult('1');
	// };
	//onClick={onClick}
	return (
		<>
			<li>
				<div>{value.try}</div>
				<div>{value.result}</div>
			</li>
		</>
	);
};

export default memo(Try);
