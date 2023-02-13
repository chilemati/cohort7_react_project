import { useState } from "react";
import "../notify/notify_class.scss";
export class Diagbox {
	constructor({ title, msg, ask, view, setView, clicked, setClicked }) {
		this.diag_title = title ? title : "Notification";
		this.diag_msg = msg ? msg : "A message from Diagbox";
		this.diag_ask = ask ? ask : false;
		this._diag_view = view ? view : "";
		this._setView = setView;
		this._clicked = clicked;
		this._setClicked = setClicked;
	}

	hides() {
		this._setView("hide");
	}
	shows() {
		this._setClicked(false);
		this._setView("show");
	}

	determine(x) {
		this._setClicked(x);
		this.hides();
	}

	res() {
		let x = this.clicked;

		return new Promise((resolve, reject) => {
			if (x === "yes") {
				resolve(true);
			} else if (x === "no") {
				resolve(false);
			} else {
				reject("Invalid Input");
			}
		});
	}

	diag() {
		// function hide() {
		//     setView('hide');
		// }

		return (
			<div
				className="diag"
				id={this._diag_view}>
				<div className="diag_content">
					<div className="header">
						<h2 className="title"> {this.diag_title} </h2>
						<button
							className="cancel"
							onClick={() => this.hides()}>
							{" "}
							X{" "}
						</button>
					</div>
					<div className="diag_body">
						<p className="msg"> {this.diag_msg}</p>
					</div>
					{this.diag_ask && (
						<div className="btn">
							<button
								className="no"
								onClick={() => this.determine(false)}>
								{" "}
								No{" "}
							</button>
							<button
								className="yes"
								onClick={() => this.determine(true)}>
								{" "}
								Yes{" "}
							</button>
						</div>
					)}
				</div>
			</div>
		);
	}
}
