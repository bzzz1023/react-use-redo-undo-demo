import { useEffect, useState } from "react";
import "./index.less";
export default (props: any) => {
	const scrollTo = (id: number) => {
		const dom = document.getElementById(`ques-card-${id}`);
		if (dom) {
			dom.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	};
	return (
		<div className="ques-thumbnail-container">
			{props.items.map((item: any, index: number) => {
				return (
					<div
						className="ques-item"
						key={item.id}
						onClick={() => {
							scrollTo(item.id);
						}}
					>
						<div>{index + 1}、</div>
						<div className="ques-content" dangerouslySetInnerHTML={{ __html: item.ques_desc.substring(0, 100) }}></div>
					</div>
				);
			})}
		</div>
	);
};
