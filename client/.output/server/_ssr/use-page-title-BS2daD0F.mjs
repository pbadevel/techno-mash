import { i as __toESM } from "../_runtime.mjs";
import { o as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-page-title-BS2daD0F.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function usePageTitle(title) {
	(0, import_react.useEffect)(() => {
		document.title = `${title} — НПО «Техномаш»`;
	}, [title]);
}
//#endregion
export { usePageTitle as t };
