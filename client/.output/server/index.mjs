globalThis.__nitro_main__ = import.meta.url;
import { a as toEventHandler, c as NodeResponse, i as defineLazyEventHandler, l as serve, n as HTTPError, r as defineHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/_app.admin-DU2tLRsD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"db5-CgiZd5Dl1gJRjJ4hYp5PoWrAnYQ\"",
		"mtime": "2026-08-28T20:26:52.989Z",
		"size": 3509,
		"path": "../public/assets/_app.admin-DU2tLRsD.js"
	},
	"/assets/_app.index-Da5r_JYZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ae6-VQRLP+Hni0qgUW8xlMvi7jil5z8\"",
		"mtime": "2026-08-28T20:26:52.989Z",
		"size": 6886,
		"path": "../public/assets/_app.index-Da5r_JYZ.js"
	},
	"/assets/_id-BAL6KB2Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"659-Fpr3Iye/nbWrvPFUZVa66g3athk\"",
		"mtime": "2026-08-28T20:26:52.989Z",
		"size": 1625,
		"path": "../public/assets/_id-BAL6KB2Z.js"
	},
	"/assets/_id-DrFRyaE1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33b-+Weo3gnQSZpDV3YeJYsH/P7Nck4\"",
		"mtime": "2026-08-28T20:26:52.989Z",
		"size": 827,
		"path": "../public/assets/_id-DrFRyaE1.js"
	},
	"/assets/about-BDe5Vc_w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"39d-HHJUc8BWbIh7VL9htulwFuXBJJE\"",
		"mtime": "2026-08-28T20:26:52.989Z",
		"size": 925,
		"path": "../public/assets/about-BDe5Vc_w.js"
	},
	"/assets/all-news-Byfsg0d-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"234-DeX1l6ivi4n8EslAmn+jgDCCCcU\"",
		"mtime": "2026-08-28T20:26:52.989Z",
		"size": 564,
		"path": "../public/assets/all-news-Byfsg0d-.js"
	},
	"/assets/index-DUwfE0fA.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"508c-PaJsLjTZUJ5jb5hO16Ogc7bAcqk\"",
		"mtime": "2026-08-28T20:26:52.990Z",
		"size": 20620,
		"path": "../public/assets/index-DUwfE0fA.css"
	},
	"/assets/index-DNs73ujz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"47822-2gHB/NJyMNtwPUVB1J9bNzp2fxE\"",
		"mtime": "2026-08-28T20:26:52.987Z",
		"size": 292898,
		"path": "../public/assets/index-DNs73ujz.js"
	},
	"/assets/jsx-runtime-CU3EbJiN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1dde-MC16PitL1hbOfJR/R5PHIiQQTSM\"",
		"mtime": "2026-08-28T20:26:52.990Z",
		"size": 7646,
		"path": "../public/assets/jsx-runtime-CU3EbJiN.js"
	},
	"/assets/login-D7rWcYYS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"882-axJReOrhl9Z0PFr6/IoeSVOzh6A\"",
		"mtime": "2026-08-28T20:26:52.990Z",
		"size": 2178,
		"path": "../public/assets/login-D7rWcYYS.js"
	},
	"/assets/products-Cf_etVsT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2fa-kC1IdlmYkQ1Y7iLefCgROIJ6AjU\"",
		"mtime": "2026-08-28T20:26:52.990Z",
		"size": 762,
		"path": "../public/assets/products-Cf_etVsT.js"
	},
	"/assets/profile-ZCEhi4S0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c64-7kxFj1qa6RUNth367rZE41dV0RM\"",
		"mtime": "2026-08-28T20:26:52.990Z",
		"size": 3172,
		"path": "../public/assets/profile-ZCEhi4S0.js"
	},
	"/assets/news-list-CRMQ7vWL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d6f-etwbtVTjdpW5h6gGE/maZFU2TSE\"",
		"mtime": "2026-08-28T20:26:52.990Z",
		"size": 11631,
		"path": "../public/assets/news-list-CRMQ7vWL.js"
	},
	"/assets/services-BFlO7VpG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"31d-Fq4WcRxPPNzJo91/2tXY117Ku08\"",
		"mtime": "2026-08-28T20:26:52.990Z",
		"size": 797,
		"path": "../public/assets/services-BFlO7VpG.js"
	},
	"/assets/use-on-screen-B0fxvbjU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16c-sh4D+YfQUnA1JwZ3ac7jdAX5urs\"",
		"mtime": "2026-08-28T20:26:52.990Z",
		"size": 364,
		"path": "../public/assets/use-on-screen-B0fxvbjU.js"
	},
	"/assets/use-page-title-BP0Nov1B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b0-9ilWVUfjbcw/iCwF/wOYUR4YeZE\"",
		"mtime": "2026-08-28T20:26:52.990Z",
		"size": 176,
		"path": "../public/assets/use-page-title-BP0Nov1B.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_g0peZQ = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_g0peZQ
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
