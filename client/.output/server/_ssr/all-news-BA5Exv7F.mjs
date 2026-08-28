import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as NewsList } from "./news-list-CSL6mS42.mjs";
import { t as usePageTitle } from "./use-page-title-BS2daD0F.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/all-news-BA5Exv7F.js
var import_jsx_runtime = require_jsx_runtime();
function NewsPage() {
	usePageTitle("Новости");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-6 pt-40 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-[0.4em] text-accent",
				children: "Архив"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-4xl font-bold uppercase md:text-5xl",
				children: "Все новости"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsList, {})
			})
		]
	});
}
//#endregion
export { NewsPage as component };
