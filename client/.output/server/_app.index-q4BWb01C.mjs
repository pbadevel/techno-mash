import { a as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { _ as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as NewsList } from "./_ssr/news-list-CSL6mS42.mjs";
import { t as usePageTitle } from "./_ssr/use-page-title-BS2daD0F.mjs";
import { t as useOnScreen } from "./_ssr/use-on-screen-C9ufTnJQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.index-q4BWb01C.js
var import_jsx_runtime = require_jsx_runtime();
var directions = [
	{
		num: "01",
		to: "/services",
		title: "Технологический аудит",
		text: "Комплексный аудит предприятий РКП, в том числе зарубежных"
	},
	{
		num: "02",
		to: "/services",
		title: "Расчёты и моделирование",
		text: "Инженерные расчёты, цифровые двойники изделий РКТ"
	},
	{
		num: "03",
		to: "/services",
		title: "Неразрушающий контроль",
		text: "Лаборатория НК, диагностика станков и механизмов"
	},
	{
		num: "04",
		to: "/products",
		title: "Опытное производство",
		text: "Специальные станки и оборудование под задачи заказчика"
	},
	{
		num: "05",
		to: "/products",
		title: "Аддитивные технологии",
		text: "Перспективные технологии и оборудование РКП"
	}
];
var stats = [
	{
		value: "1938",
		label: "год основания"
	},
	{
		value: "88",
		label: "лет истории"
	},
	{
		value: "500+",
		label: "технологий в каталоге"
	},
	{
		value: "05",
		label: "направлений деятельности"
	}
];
function FadeIn({ children, delay = 0, className = "" }) {
	const { ref, visible } = useOnScreen();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		style: { transitionDelay: `${delay}ms` },
		className: `transition-all duration-700 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${className}`,
		children
	});
}
function HomePage() {
	usePageTitle("Главная");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "hero-gradient relative overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "stars absolute inset-0",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "glow absolute inset-0",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-6xl px-6 pb-28 pt-40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FadeIn, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs uppercase tracking-[0.4em] text-accent",
							children: "С 1938 года · Роскосмос"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FadeIn, {
							delay: 100,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-8 max-w-4xl text-4xl font-bold uppercase leading-[1.05] tracking-tight md:text-6xl",
								children: "Главное предприятие по технологическому обеспечению РКП"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FadeIn, {
							delay: 200,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-8 max-w-2xl text-lg leading-relaxed text-muted",
								children: "АО «НПО «Техномаш» им. С. А. Афанасьева — разработка, производство и испытания высокотехнологичных изделий ракетно-космической техники."
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FadeIn, {
							delay: 300,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-12 flex flex-wrap gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/services",
									className: "bg-accent px-7 py-3 font-mono text-xs font-bold uppercase tracking-[0.25em] text-white transition hover:bg-[#ff8142]",
									children: "Наша деятельность"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/about",
									className: "border border-line px-7 py-3 font-mono text-xs uppercase tracking-[0.25em] transition hover:border-accent hover:text-accent",
									children: "О предприятии"
								})]
							})
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-line bg-panel",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-6xl grid-cols-2 divide-x divide-line md:grid-cols-4",
				children: stats.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FadeIn, {
					delay: i * 100,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-6 py-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-3xl font-bold md:text-4xl",
							children: s.value
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs uppercase tracking-[0.2em] text-muted",
							children: s.label
						})]
					})
				}, s.label))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "activity",
			className: "mx-auto max-w-6xl px-6 py-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FadeIn, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-mono text-xs uppercase tracking-[0.4em] text-muted",
					children: "Наша деятельность"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs text-muted",
					children: "01 / 05"
				})]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-10 border-t border-line",
				children: directions.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FadeIn, {
					delay: i * 80,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: d.to,
						className: "group grid gap-3 border-b border-line py-8 transition hover:bg-panel md:grid-cols-[80px_1fr_auto] md:items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-sm text-muted",
								children: d.num
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-2xl font-semibold uppercase tracking-tight transition group-hover:text-accent md:text-3xl",
								children: d.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-2 block text-sm text-muted",
								children: d.text
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden text-2xl text-muted transition group-hover:translate-x-2 group-hover:text-accent md:block",
								children: "→"
							})
						]
					})
				}) }, d.num))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "news",
			className: "border-t border-line bg-panel/50",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-6 py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FadeIn, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-mono text-xs uppercase tracking-[0.4em] text-muted",
						children: "Новости"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/all-news",
						className: "font-mono text-xs uppercase tracking-[0.2em] text-accent hover:underline",
						children: "Больше новостей →"
					})]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsList, {})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "about",
			className: "mx-auto max-w-6xl px-6 py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FadeIn, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 md:grid-cols-[240px_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-[0.4em] text-muted",
					children: "О предприятии"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-3xl text-2xl font-semibold leading-snug md:text-3xl",
						children: "Многопрофильное главное предприятие ракетно-космической отрасли — от получения заготовок до сборки и функциональных испытаний."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-2xl leading-relaxed text-muted",
						children: "Мы разработали технологическую основу для «Энергии-Буран», ракет-носителей «Зенит», «Протон», «Союз», «Ангара» и космических аппаратов различного назначения."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/about",
						className: "mt-10 inline-block border border-accent px-7 py-3 font-mono text-xs uppercase tracking-[0.25em] text-accent transition hover:bg-accent hover:text-white",
						children: "Узнать больше"
					})
				] })]
			}) })
		})
	] });
}
//#endregion
export { HomePage as component };
