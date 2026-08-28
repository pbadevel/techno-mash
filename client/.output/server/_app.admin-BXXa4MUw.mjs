import { i as __toESM } from "./_runtime.mjs";
import { a as require_jsx_runtime, i as useQueryClient, o as require_react, t as useMutation } from "./_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as newsStore, r as auth } from "./_ssr/router-Bc0pDRHy.mjs";
import { t as NewsList } from "./_ssr/news-list-CSL6mS42.mjs";
import { t as usePageTitle } from "./_ssr/use-page-title-BS2daD0F.mjs";
import { t as useOnScreen } from "./_ssr/use-on-screen-C9ufTnJQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.admin-BXXa4MUw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminPage() {
	usePageTitle("Админ-панель");
	const navigate = useNavigate();
	const qc = useQueryClient();
	const [title, setTitle] = (0, import_react.useState)("");
	const [summary, setSummary] = (0, import_react.useState)("");
	const { ref, visible } = useOnScreen();
	const add = useMutation({
		mutationFn: async () => newsStore.add(title, summary),
		onSuccess: () => {
			setTitle("");
			setSummary("");
			qc.invalidateQueries({ queryKey: ["news"] });
		}
	});
	if (auth.getRole() !== "admin") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-6 pt-40 pb-24 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-bold",
			children: "Доступ запрещён"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => navigate({ to: "/login" }),
			className: "mt-6 bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white",
			children: "Войти"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: `mx-auto max-w-5xl px-6 pt-40 pb-24 transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-[0.4em] text-accent",
				children: "Администрирование"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-4xl font-bold uppercase md:text-5xl",
				children: "Управление новостями"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					if (title.trim()) add.mutate();
				},
				className: "mt-10 border border-line bg-panel p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-[0.3em] text-muted",
						children: "Добавить новость"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-6 block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs uppercase tracking-[0.2em] text-muted",
							children: "Заголовок *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							value: title,
							onChange: (e) => setTitle(e.target.value),
							placeholder: "Например: Запуск нового изделия",
							className: "mt-2 w-full border border-line bg-space px-4 py-3 text-ink outline-none transition focus:border-accent"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs uppercase tracking-[0.2em] text-muted",
							children: "Краткое описание"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: summary,
							onChange: (e) => setSummary(e.target.value),
							rows: 3,
							className: "mt-2 w-full resize-none border border-line bg-space px-4 py-3 text-ink outline-none transition focus:border-accent"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: add.isPending || !title.trim(),
							className: "bg-accent px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.25em] text-white transition hover:bg-[#ff8142] disabled:cursor-not-allowed disabled:opacity-50",
							children: add.isPending ? "Отправка…" : "Опубликовать"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								newsStore.reset();
								qc.invalidateQueries({ queryKey: ["news"] });
							},
							className: "border border-line px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] transition hover:border-accent hover:text-accent",
							children: "Сбросить к исходным"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-mono text-xs uppercase tracking-[0.4em] text-muted",
						children: "Текущие новости"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs text-muted",
						children: "Режим редактирования"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsList, { admin: true })
				})]
			})
		]
	});
}
//#endregion
export { AdminPage as component };
