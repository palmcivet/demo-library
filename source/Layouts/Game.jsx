import React from "react";
import { Button, notification } from "antd";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { NavBar } from "./NavBar";
import { ChatBox } from "../Containers/ChatBox";
import { Console } from "../Containers/Console";
import { selector as authSelector } from "../Data/modules/auth";

const openNotification = () => {
	notification.open({
		message: "Notification Title",
		description: "This is the content of the notification.",
		onClick: () => {
			console.log("Notification Clicked!");
		},
		placement: "bottomRight",
		bottom: 24,
		style: {
			width: 200,
			marginLeft: 384 - 200,
		},
	});
};

const Notify = (props) => (
	<Button type="primary" onClick={openNotification}>
		Open Box
	</Button>
);

const GameView = (props) => {
	const { location } = props;

	if (props.id === null) {
		return <Redirect to={{ pathname: "/auth", state: { from: location } }} />;
	}

	return (
		<>
			<NavBar location={location} />
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1.3fr, 0.9fr 150px",
					gridTemplateRows: "1fr",
					gridColumnGap: "0px",
					gridRowGap: "0px",
					placeContent: "space-between space-between",
					placeItems: "center center",
				}}
			>
				<main
					style={{
						gridArea: "1 / 1 / 2 / 2",
						height: "auto",
						placeSelf: "center",
					}}
				>
					<Console />
				</main>
				<aside
					style={{
						gridArea: "1 / 2 / 2 / 3",
						height: "auto",
						placeSelf: "stretch end",
					}}
				>
					<ChatBox />
				</aside>
				<div
					style={{
						gridArea: "1 / 3 / 2 / 4",
						height: "auto",
						placeSelf: "center",
					}}
				>
					<Notify />
					<label />
				</div>
			</div>
		</>
	);
};

const mapStateToProps = (state, props) => {
	return {
		id: authSelector.getID(state),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

const Game = connect(mapStateToProps, mapDispatchToProps)(GameView);

export { Game };