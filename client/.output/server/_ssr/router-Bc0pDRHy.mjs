import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { L as notFound, _ as Link, f as createRouter, g as createRootRouteWithContext, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as setupRouterSsrQueryIntegration } from "../_libs/@tanstack/react-router-ssr-query+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/news-store-Cttd5iKm.js
var KEY$1 = "tmnpo:news:v2";
var SEED = [
	{
		id: "n1",
		date: "05.02.2025",
		title: "Открыто производство ЖРД для ракет-носителей «Ангара»",
		summary: "Современная производственная площадка запущена на предприятии «Протон-ПМ» в Перми.",
		body: "Госкорпорация «Роскосмос» запустила производственную площадку для выпуска жидкостных ракетных двигателей семейства РД-191.\nПлощадка оснащена специальным станочным оборудованием, разработанным при участии специалистов НПО «Техномаш».",
		createdAt: Date.now() - 2592e6
	},
	{
		id: "n2",
		date: "30.10.2024",
		title: "Второй радиолокационный спутник «Кондор-ФКА» выведен на орбиту",
		summary: "Аппарат предназначен для дистанционного зондирования Земли.",
		body: "С космодрома успешно выполнен пуск ракеты-носителя с радиолокационным спутником «Кондор-ФКА».\nАппарат обеспечит круглосуточное наблюдение поверхности Земли в любых метеоусловиях.",
		createdAt: Date.now() - 10368e6
	},
	{
		id: "n3",
		date: "11.04.2024",
		title: "С космодрома Восточный успешно стартовала «Ангара-А5»",
		createdAt: Date.now() - 1728e7
	}
];
function read() {
	try {
		const raw = localStorage.getItem(KEY$1);
		if (!raw) {
			localStorage.setItem(KEY$1, JSON.stringify(SEED));
			return SEED;
		}
		return JSON.parse(raw);
	} catch {
		return SEED;
	}
}
function write(items) {
	localStorage.setItem(KEY$1, JSON.stringify(items));
}
var newsStore = {
	list: read,
	add: (title, summary = "") => {
		const items = read();
		const item = {
			id: `n${Date.now()}`,
			date: (/* @__PURE__ */ new Date()).toLocaleDateString("ru-RU"),
			title,
			summary,
			createdAt: Date.now()
		};
		write([item, ...items]);
		return item;
	},
	remove: (id) => {
		write(read().filter((i) => i.id !== id));
	},
	reset: () => write(SEED)
};
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-Bc0pDRHy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var KEY = "tmnpo:auth:v1";
var auth = {
	getRole() {
		if (typeof window === "undefined") return "guest";
		return localStorage.getItem(KEY) || "guest";
	},
	login(role = "admin") {
		if (typeof window !== "undefined") localStorage.setItem(KEY, role);
	},
	logout() {
		if (typeof window !== "undefined") localStorage.removeItem(KEY);
	}
};
var STORAGE_KEY = "tmnpo:theme";
function useTheme() {
	const [theme, setTheme] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return "dark";
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) return stored;
		return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	});
	(0, import_react.useEffect)(() => {
		const root = document.documentElement;
		if (theme === "dark") root.classList.add("dark");
		else root.classList.remove("dark");
		localStorage.setItem(STORAGE_KEY, theme);
	}, [theme]);
	(0, import_react.useEffect)(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handler = (e) => {
			if (!localStorage.getItem(STORAGE_KEY)) setTheme(e.matches ? "dark" : "light");
		};
		mediaQuery.addEventListener("change", handler);
		return () => mediaQuery.removeEventListener("change", handler);
	}, []);
	return {
		theme,
		toggle: (0, import_react.useCallback)(() => {
			setTheme((t) => t === "dark" ? "light" : "dark");
		}, [])
	};
}
function useScrolled(threshold = 12) {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > threshold);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, [threshold]);
	return scrolled;
}
function cn(...classes) {
	return classes.filter(Boolean).join(" ");
}
var nav = [
	{
		to: "/",
		label: "Главная"
	},
	{
		to: "/about",
		label: "О предприятии"
	},
	{
		to: "/products",
		label: "Продукция"
	},
	{
		to: "/services",
		label: "Услуги"
	},
	{
		to: "/all-news",
		label: "Новости"
	}
];
function Layout({ children }) {
	const role = auth.getRole();
	const { theme, toggle } = useTheme();
	const scrolled = useScrolled(12);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-bg text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: cn("fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md", "transition-[background-color,border-color] duration-300", scrolled ? "border-line bg-bg/80" : "border-transparent bg-bg/50"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center justify-between px-6 py-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "font-mono text-sm font-bold uppercase tracking-[0.3em] transition hover:text-accent",
							children: "НПО «Техномаш»"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "hidden items-center gap-6 font-mono text-xs uppercase tracking-[0.2em] text-muted md:flex",
							children: [nav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: n.to,
								activeProps: { className: "text-accent" },
								className: "transition hover:text-ink",
								children: n.label
							}, n.to)), role === "admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin",
								activeProps: { className: "text-accent" },
								className: "transition hover:text-ink",
								children: "Админ"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: toggle,
								"aria-label": theme === "dark" ? "Переключить на светлую тему" : "Переключить на тёмную тему",
								className: "border border-line px-3 py-2 font-mono text-xs uppercase tracking-[0.15em] transition hover:border-accent hover:text-accent",
								children: theme === "dark" ? "☀" : "☾"
							}), role === "guest" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								className: "border border-line px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] transition hover:border-accent hover:text-accent",
								children: "Вход"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/profile",
								className: "border border-line px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] transition hover:border-accent hover:text-accent",
								children: "Профиль"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "border-t border-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs uppercase tracking-[0.3em] text-muted",
								children: "Контакты"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-lg font-semibold",
								children: "8 (495) 689-50-66"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: "127018, Москва, 3-й проезд Марьиной Рощи, д. 40"
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs uppercase tracking-[0.3em] text-muted",
							children: "Предприятие"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-2 text-sm text-muted",
							children: nav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: n.to,
								className: "transition hover:text-accent",
								children: n.label
							}) }, n.to))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs uppercase tracking-[0.3em] text-muted",
							children: "Госкорпорация"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-muted",
							children: "Входит в состав Госкорпорации «Роскосмос»"
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-line py-6 text-center font-mono text-xs tracking-[0.2em] text-muted",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" АО «НПО «Техномаш» им. С. А. Афанасьева"
					]
				})]
			})
		]
	});
}
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container",
		style: {
			padding: "80px 0",
			textAlign: "center"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			style: { color: "var(--color-primary)" },
			children: "404"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Страница не найдена или перемещена." })]
	});
}
var seo = ({ title, description, keywords, image }) => {
	return [
		{ title },
		{
			name: "description",
			content: description
		},
		{
			name: "keywords",
			content: keywords
		},
		{
			name: "twitter:title",
			content: title
		},
		{
			name: "twitter:description",
			content: description
		},
		{
			name: "twitter:creator",
			content: "@apelsynca"
		},
		{
			name: "twitter:site",
			content: "@apelsynca"
		},
		{
			name: "og:type",
			content: "website"
		},
		{
			name: "og:title",
			content: title
		},
		{
			name: "og:description",
			content: description
		},
		...image ? [
			{
				name: "twitter:image",
				content: image
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "og:image",
				content: image
			}
		] : []
	];
};
var styles_default = "/assets/index-DUwfE0fA.css";
var Route$9 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1.0"
			},
			...seo({
				title: "Роскосмос",
				description: "Роскосмос"
			})
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	component: RootComponent,
	notFoundComponent: NotFound
});
function RootComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RootDocument, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) });
}
function RootDocument({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "ru",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('tmnpo:theme');
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })()
            ` } })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			id: "root",
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})]
		})]
	});
}
var $$splitComponentImporter$8 = () => import("./about-BJuG8blb.mjs");
var Route$8 = createFileRoute("/about")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./all-news-BA5Exv7F.mjs");
var Route$7 = createFileRoute("/all-news")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./login-DYhKJeI0.mjs");
var Route$6 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./products-DR7_AgdM.mjs");
var Route$5 = createFileRoute("/products")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./profile-BK9_NdE9.mjs");
var Route$4 = createFileRoute("/profile")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./services-TmjmWxwe.mjs");
var Route$3 = createFileRoute("/services")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("../_app.index-q4BWb01C.mjs");
var Route$2 = createFileRoute("/_app/")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("../_app.admin-BXXa4MUw.mjs");
var Route$1 = createFileRoute("/_app/admin")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	beforeLoad: () => {
		if (auth.getRole() !== "admin") throw new Error("Доступ только для администраторов");
	}
});
var $$splitNotFoundComponentImporter = () => import("../_id-D1vpbtse.mjs");
var $$splitComponentImporter = () => import("../_id-DswjxBOx.mjs");
var Route = createFileRoute("/news/$id")({
	loader: ({ params }) => {
		const item = newsStore.list().find((n) => n.id === params.id);
		if (!item) throw notFound();
		return item;
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
var AboutRoute = Route$8.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$9
});
var AllNewsRoute = Route$7.update({
	id: "/all-news",
	path: "/all-news",
	getParentRoute: () => Route$9
});
var LoginRoute = Route$6.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$9
});
var ProductsRoute = Route$5.update({
	id: "/products",
	path: "/products",
	getParentRoute: () => Route$9
});
var ProfileRoute = Route$4.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => Route$9
});
var ServicesRoute = Route$3.update({
	id: "/services",
	path: "/services",
	getParentRoute: () => Route$9
});
var AppIndexRoute = Route$2.update({
	id: "/_app/",
	path: "/",
	getParentRoute: () => Route$9
});
var rootRouteChildren = {
	AboutRoute,
	AllNewsRoute,
	LoginRoute,
	ProductsRoute,
	ProfileRoute,
	ServicesRoute,
	AppAdminRoute: Route$1.update({
		id: "/_app/admin",
		path: "/admin",
		getParentRoute: () => Route$9
	}),
	NewsIdRoute: Route.update({
		id: "/news/$id",
		path: "/news/$id",
		getParentRoute: () => Route$9
	}),
	AppIndexRoute
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	const queryClient = new QueryClient();
	const router = createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		scrollRestorationBehavior: "smooth",
		defaultPreload: "intent"
	});
	setupRouterSsrQueryIntegration({
		router,
		queryClient
	});
	return router;
}
//#endregion
export { newsStore as i, Route as n, auth as r, router_exports as t };
