import { html, render, nothing } from "lit-html";

/**
 * @public
 */
export type ToggleEvent = CustomEvent<{ value: boolean }>;

/**
 * Toggle web component.
 *
 * Emits a `CustomEvent` of type `toggle`.
 * @public
 */
export class Toggle extends HTMLElement {
	private _checked = false;
	private _renderRoot: ShadowRoot;

	constructor() {
		super();
		this._renderRoot = this.attachShadow({ mode: "open" });
		this._update();
	}

	private _handleToggle = (e: Event) => {
		e.preventDefault();
		this._checked = !this._checked;
		this._update();

		this.dispatchEvent(
			new CustomEvent("toggle", {
				bubbles: true,
				cancelable: false,
				composed: true,
				detail: { value: this._checked },
			})
		);
	};

	private _update() {
		render(this._template(), this._renderRoot, { host: this });
	}

	private _template() {
		const isTouchDevice = "ontouchstart" in document.documentElement;

		return html`
			<style>
				button {
					position: relative;
					display: inline-flex;
					flex-shrink: 0;

					width: 2.75rem;
					height: 1.5rem;

					background-color: var(--secondary-fg-color);

					border-radius: 9999px;
					border-width: 2px;
					border-style: solid;
					border-color: transparent;

					padding: 0;

					cursor: pointer;

					transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
					transition-property: background-color;
					transition-duration: 0.2s;
				}

				button:focused {
					outline: 2px solid transparent;
					outline-offset: 2px;
				}

				button:disabled {
					background-color: var(--light-gray);
					border-color: var(--medium-gray);
				}

				button:hover:not([disabled]) {
					color: var(--dark-blue);
				}

				button:active:not([disabled]) {
					color: var(--dark-blue);
					background-color: var(--dark-violet);
				}

				button > span.toggle {
					width: 1.25rem;
					height: 1.25rem;

					background-color: var(--white);

					border-radius: 9999px;

					transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
					transition-property: transform;
					transition-duration: 0.2s;
				}

				button.checked {
					background-color: var(--primary);
				}

				button.checked > span.toggle {
					transform: translateX(1.25rem);
				}

				.sr-only {
					position: absolute;
					width: 1px;
					height: 1px;
					padding: 0;
					margin: -1px;
					overflow: hidden;
					clip: rect(0, 0, 0, 0);
					white-space: nowrap;
					border-width: 0;
				}
			</style>
			<button
				role="switch"
				type="button"
				@click=${isTouchDevice ? nothing : this._handleToggle}
				@touchstart=${isTouchDevice ? this._handleToggle : nothing}
				aria-checked=${this._checked}
				class="${this._checked ? "checked" : nothing}"
			>
				<span class="sr-only"></span>
				<span class="toggle" aria-hidden="true"></span>
			</button>
		`;
	}
}
