import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as usePageTitle } from "./use-page-title-BS2daD0F.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-DR7_AgdM.js
var import_jsx_runtime = require_jsx_runtime();
function ProductsPage() {
	usePageTitle("Продукция");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-6 pt-40 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-[0.4em] text-accent",
				children: "Каталог"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-4xl font-bold uppercase md:text-5xl",
				children: "Продукция"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 max-w-2xl text-lg text-muted",
				children: "Специальные станки, намоточное оборудование, установки для пайки и сварки, испытательные комплексы. Каталог в разработке."
			})
		]
	});
}
//#endregion
export { ProductsPage as component };
