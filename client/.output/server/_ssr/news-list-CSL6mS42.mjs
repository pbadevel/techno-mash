import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as newsStore } from "./router-Bc0pDRHy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/news-list-CSL6mS42.js
var import_jsx_runtime = require_jsx_runtime();
function NewsList({ admin = false }) {
	const qc = useQueryClient();
	const { data, isLoading } = useQuery({
		queryKey: ["news"],
		queryFn: () => newsStore.list()
	});
	const remove = useMutation({
		mutationFn: async (id) => newsStore.remove(id),
		onMutate: async (id) => {
			await qc.cancelQueries({ queryKey: ["news"] });
			const prev = qc.getQueryData(["news"]) ?? [];
			qc.setQueryData(["news"], prev.filter((i) => i.id !== id));
			return { prev };
		},
		onError: (_err, _id, ctx) => {
			if (ctx?.prev) qc.setQueryData(["news"], ctx.prev);
		},
		onSettled: () => qc.invalidateQueries({ queryKey: ["news"] })
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "font-mono text-sm text-muted",
		children: "Загрузка новостей…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
		className: "divide-y divide-line border-y border-line",
		children: [data?.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "group grid gap-2 py-6 md:grid-cols-[160px_1fr_auto] md:items-baseline",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
					className: "font-mono text-xs uppercase tracking-[0.15em] text-muted",
					children: n.date
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/news/$id",
					params: { id: n.id },
					className: "text-lg font-medium transition group-hover:text-accent",
					children: n.title
				}),
				admin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => remove.mutate(n.id),
					disabled: remove.isPending,
					className: "font-mono text-xs uppercase tracking-[0.15em] text-muted transition hover:text-accent disabled:opacity-50",
					children: "Удалить"
				})
			]
		}) }, n.id)), data?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			className: "py-12 text-center font-mono text-sm text-muted",
			children: "Новостей пока нет"
		})]
	});
}
//#endregion
export { NewsList as t };
