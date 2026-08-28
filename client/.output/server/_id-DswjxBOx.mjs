import { a as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { _ as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as newsStore, n as Route } from "./_ssr/router-Bc0pDRHy.mjs";
import { t as usePageTitle } from "./_ssr/use-page-title-BS2daD0F.mjs";
import { t as useOnScreen } from "./_ssr/use-on-screen-C9ufTnJQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-DswjxBOx.js
var import_jsx_runtime = require_jsx_runtime();
function NewsDetailPage() {
	const item = Route.useLoaderData();
	usePageTitle(item.title);
	const { ref, visible } = useOnScreen();
	const others = newsStore.list().filter((n) => n.id !== item.id).slice(0, 2);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		ref,
		className: `mx-auto max-w-3xl px-6 pt-40 pb-24 transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/all-news",
				className: "font-mono text-xs uppercase tracking-[0.2em] text-muted transition hover:text-accent",
				children: "← Все новости"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
				className: "mt-10 block font-mono text-xs uppercase tracking-[0.2em] text-accent",
				children: item.date
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-3xl font-bold leading-tight md:text-5xl",
				children: item.title
			}),
			item.summary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 border-l-2 border-accent pl-6 text-lg text-muted",
				children: item.summary
			}),
			others.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "mt-16 border-t border-line pt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-[0.4em] text-muted",
					children: "Другие новости"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-line",
					children: others.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/news/$id",
						params: { id: n.id },
						className: "group flex items-baseline gap-6 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
							className: "shrink-0 font-mono text-xs text-muted",
							children: n.date
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium transition group-hover:text-accent",
							children: n.title
						})]
					}) }, n.id))
				})]
			})
		]
	});
}
//#endregion
export { NewsDetailPage as component };
