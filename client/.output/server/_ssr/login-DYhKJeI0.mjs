import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as auth } from "./router-Bc0pDRHy.mjs";
import { t as usePageTitle } from "./use-page-title-BS2daD0F.mjs";
import { t as useOnScreen } from "./use-on-screen-C9ufTnJQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DYhKJeI0.js
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	usePageTitle("Вход");
	const navigate = useNavigate();
	const { ref, visible } = useOnScreen();
	const submit = (role) => (e) => {
		e.preventDefault();
		auth.login(role);
		navigate({ to: "/profile" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: `mx-auto max-w-md px-6 pt-40 pb-24 transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-[0.4em] text-accent",
				children: "Авторизация"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-4xl font-bold uppercase md:text-5xl",
				children: "Вход для сотрудников"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted",
				children: "Все действия фиксируются в журнале безопасности."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-10 border border-line bg-panel p-8",
				onSubmit: submit("editor"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs uppercase tracking-[0.2em] text-muted",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							defaultValue: "admin@tmnpo.ru",
							className: "mt-2 w-full border border-line bg-space px-4 py-3 text-ink outline-none transition focus:border-accent"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs uppercase tracking-[0.2em] text-muted",
							children: "Пароль"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							defaultValue: "demo",
							className: "mt-2 w-full border border-line bg-space px-4 py-3 text-ink outline-none transition focus:border-accent"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 grid gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "bg-accent px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.25em] text-white transition hover:bg-[#ff8142]",
							children: "Войти как редактор"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: submit("admin"),
							className: "border border-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] text-accent transition hover:bg-accent hover:text-white",
							children: "Войти как админ"
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { LoginPage as component };
