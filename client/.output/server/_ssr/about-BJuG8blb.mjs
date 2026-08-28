import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as usePageTitle } from "./use-page-title-BS2daD0F.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-BJuG8blb.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	usePageTitle("О предприятии");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-6 pt-40 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-[0.4em] text-accent",
				children: "О предприятии"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-4xl font-bold uppercase md:text-5xl",
				children: "АО «НПО «Техномаш» им. С. А. Афанасьева"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 max-w-3xl text-lg leading-relaxed text-muted",
				children: "Главное научно-исследовательское предприятие Госкорпорации «Роскосмос» по технологическому обеспечению создания ракетно-космической техники. Основано в 1938 году."
			})
		]
	});
}
//#endregion
export { AboutPage as component };
