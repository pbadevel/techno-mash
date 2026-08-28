import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as auth } from "./router-Bc0pDRHy.mjs";
import { t as usePageTitle } from "./use-page-title-BS2daD0F.mjs";
import { t as useOnScreen } from "./use-on-screen-C9ufTnJQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-BK9_NdE9.js
var import_jsx_runtime = require_jsx_runtime();
var mockLog = [
	{
		time: "Сегодня, 14:22",
		action: "Вход в систему"
	},
	{
		time: "Вчера, 10:05",
		action: "Добавлена новость «Производство ЖРД для «Ангары»»"
	},
	{
		time: "25.08.2026",
		action: "Обновлён профиль"
	}
];
function ProfilePage() {
	usePageTitle("Профиль");
	const navigate = useNavigate();
	const role = auth.getRole();
	const { ref, visible } = useOnScreen();
	const handleLogout = () => {
		auth.logout();
		navigate({ to: "/" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: `mx-auto max-w-4xl px-6 pt-40 pb-24 transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-[0.4em] text-accent",
				children: "Личный кабинет"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-4xl font-bold uppercase md:text-5xl",
				children: "Профиль"
			}),
			role === "guest" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 border border-line bg-panel p-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg",
					children: "Вы не авторизованы."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					className: "mt-6 inline-block bg-accent px-7 py-3 font-mono text-xs uppercase tracking-[0.25em] text-white transition hover:bg-[#ff8142]",
					children: "Войти"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 grid gap-6 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-line bg-panel p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs uppercase tracking-[0.3em] text-muted",
							children: "Данные"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-6 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted",
									children: "Имя"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-lg",
									children: "Администратор Техномаша"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-lg",
									children: "admin@tmnpo.ru"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted",
									children: "Роль"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-lg uppercase tracking-wider text-accent",
									children: role
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex gap-3",
							children: [role === "admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin",
								className: "bg-accent px-5 py-2 font-mono text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#ff8142]",
								children: "В админку"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleLogout,
								className: "border border-line px-5 py-2 font-mono text-xs uppercase tracking-[0.2em] transition hover:border-accent hover:text-accent",
								children: "Выйти"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-line bg-panel p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-[0.3em] text-muted",
						children: "Журнал действий"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-6 divide-y divide-line",
						children: mockLog.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-baseline justify-between gap-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: e.action
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
								className: "shrink-0 font-mono text-xs text-muted",
								children: e.time
							})]
						}, i))
					})]
				})]
			})
		]
	});
}
//#endregion
export { ProfilePage as component };
