import { i as __toESM } from "../_runtime.mjs";
import { o as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-on-screen-C9ufTnJQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useOnScreen(threshold = .15) {
	const ref = (0, import_react.useRef)(null);
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(([e]) => {
			if (e.isIntersecting) {
				setVisible(true);
				io.disconnect();
			}
		}, { threshold });
		io.observe(el);
		return () => io.disconnect();
	}, [threshold]);
	return {
		ref,
		visible
	};
}
//#endregion
export { useOnScreen as t };
