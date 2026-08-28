import { i as __toESM, r as __require, t as __commonJSMin } from "../../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../react+tanstack__react-query.mjs";
import { r as parseHref } from "../tanstack__history.mjs";
import { PassThrough, Readable } from "node:stream";
import { ReadableStream } from "node:stream/web";
//#region node_modules/@tanstack/router-core/dist/esm/not-found.js
/**
* Create a not-found error object recognized by TanStack Router.
*
* Throw this from loaders/actions to trigger the nearest `notFoundComponent`.
* Use `routeId` to target a specific route's not-found boundary. If `throw`
* is true, the error is thrown instead of returned.
*
* @param options Optional settings including `routeId`, `headers`, and `throw`.
* @returns A not-found error object that can be thrown or returned.
* @link https://tanstack.com/router/latest/docs/router/framework/react/api/router/notFoundFunction
*/
function notFound(options = {}) {
	options.isNotFound = true;
	if (options.throw) throw options;
	return options;
}
/** Determine if a value is a TanStack Router not-found error. */
function isNotFound(obj) {
	return obj?.isNotFound === true;
}
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/root.js
/** Stable identifier used for the root route in a route tree. */
var rootRouteId = "__root__";
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/redirect.js
/**
* Create a redirect Response understood by TanStack Router.
*
* Use from route `loader`/`beforeLoad` or server functions to trigger a
* navigation. If `throw: true` is set, the redirect is thrown instead of
* returned. When an absolute `href` is supplied and `reloadDocument` is not
* set, a full-document navigation is inferred.
*
* @param opts Options for the redirect. Common fields:
* - `href`: absolute URL for external redirects; infers `reloadDocument`.
* - `statusCode`: HTTP status code to use (defaults to 307).
* - `headers`: additional headers to include on the Response.
* - Standard navigation options like `to`, `params`, `search`, `replace`,
*   and `reloadDocument` for internal redirects.
* @returns A Response augmented with router navigation options.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/redirectFunction
*/
function redirect(opts) {
	opts.statusCode = opts.statusCode || opts.code || 307;
	if (!opts.reloadDocument && typeof opts.href === "string") try {
		new URL(opts.href);
		opts.reloadDocument = true;
	} catch {}
	const headers = new Headers(opts.headers);
	if (opts.href && headers.get("Location") === null) headers.set("Location", opts.href);
	const response = new Response(null, {
		status: opts.statusCode,
		headers
	});
	response.options = opts;
	if (opts.throw) throw response;
	return response;
}
/** Check whether a value is a TanStack Router redirect Response. */
/** Check whether a value is a TanStack Router redirect Response. */
function isRedirect(obj) {
	return obj instanceof Response && !!obj.options;
}
/** True if value is a redirect with a resolved `href` location. */
/** True if value is a redirect with a resolved `href` location. */
function isResolvedRedirect(obj) {
	return isRedirect(obj) && !!obj.options.href;
}
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/ssr/ssr-match-id.js
function dehydrateSsrMatchId(id) {
	return id.replaceAll("~", "~~").replaceAll("\0", "~0").replaceAll("�", "~r").replaceAll("/", "\0");
}
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/utils.js
/**
* Return the last element of an array.
* Intended for non-empty arrays used within router internals.
*/
function last(arr) {
	return arr[arr.length - 1];
}
/**
* Apply a value-or-updater to a previous value.
* Accepts either a literal value or a function of the previous value.
*/
function functionalUpdate(updater, previous) {
	if (typeof updater === "function") return updater(previous);
	return updater;
}
var hasOwn = Object.prototype.hasOwnProperty;
function hasKeys(obj) {
	for (const key in obj) if (hasOwn.call(obj, key)) return true;
	return false;
}
var createNull = () => Object.create(null);
var nullReplaceEqualDeep = (prev, next) => replaceEqualDeep(prev, next, createNull);
/**
* This function returns `prev` if `_next` is deeply equal.
* If not, it will replace any deeply equal children of `b` with those of `a`.
* This can be used for structural sharing between immutable JSON values for example.
* Do not use this with signals
*/
function replaceEqualDeep(prev, _next, _makeObj = () => ({}), _depth = 0) {
	return _next;
}
function isPlainObject(o) {
	if (!hasObjectPrototype(o)) return false;
	const ctor = o.constructor;
	if (typeof ctor === "undefined") return true;
	const prot = ctor.prototype;
	if (!hasObjectPrototype(prot)) return false;
	if (!prot.hasOwnProperty("isPrototypeOf")) return false;
	return true;
}
function hasObjectPrototype(o) {
	return Object.prototype.toString.call(o) === "[object Object]";
}
/**
* Perform a deep equality check with options for partial comparison and
* ignoring `undefined` values. Optimized for router state comparisons.
*/
function deepEqual(a, b, opts) {
	if (a === b) return true;
	if (typeof a !== typeof b) return false;
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return false;
		for (let i = 0, l = a.length; i < l; i++) if (!deepEqual(a[i], b[i], opts)) return false;
		return true;
	}
	if (isPlainObject(a) && isPlainObject(b)) {
		const ignoreUndefined = opts?.ignoreUndefined ?? true;
		if (opts?.partial) {
			for (const k in b) if (!ignoreUndefined || b[k] !== void 0) {
				if (!deepEqual(a[k], b[k], opts)) return false;
			}
			return true;
		}
		let aCount = 0;
		if (!ignoreUndefined) aCount = Object.keys(a).length;
		else for (const k in a) if (a[k] !== void 0) aCount++;
		let bCount = 0;
		for (const k in b) if (!ignoreUndefined || b[k] !== void 0) {
			bCount++;
			if (bCount > aCount || !deepEqual(a[k], b[k], opts)) return false;
		}
		return aCount === bCount;
	}
	return false;
}
/**
* Heuristically detect dynamic import "module not found" errors
* across major browsers for lazy route component handling.
*/
function isModuleNotFoundError(error) {
	if (typeof error?.message !== "string") return false;
	return error.message.startsWith("Failed to fetch dynamically imported module") || error.message.startsWith("error loading dynamically imported module") || error.message.startsWith("Importing a module script failed");
}
/**
* Re-encode characters that are unsafe in URL paths.
* Includes ASCII control characters (0x00-0x1F, 0x7F) and a subset of the
* WHATWG URL "path percent-encode set" (", <, >, `, {, }).
*
* Space (0x20) is intentionally excluded — decodeURI decodes %20 to space
* and the router stores decoded spaces in location.pathname. The existing
* encodePathLikeUrl already handles re-encoding spaces for outgoing URLs.
*
* These characters are decoded by decodeURI but must remain percent-encoded
* in paths to match how upstream layers (CDNs, edge middleware, browsers)
* interpret the URL, preventing infinite redirect loops and path mismatches.
*/
var PATH_UNSAFE_RE = /[\x00-\x1f\x7f"<>`{}]/g;
function sanitizePathSegment(segment) {
	return segment.replace(PATH_UNSAFE_RE, (ch) => "%" + ch.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0"));
}
function decodeSegment(segment) {
	let decoded;
	try {
		decoded = decodeURI(segment);
	} catch {
		decoded = segment.replaceAll(/%[0-9A-F]{2}/gi, (match) => {
			try {
				return decodeURI(match);
			} catch {
				return match;
			}
		});
	}
	return sanitizePathSegment(decoded);
}
/**
* Default list of URL protocols to allow in links, redirects, and navigation.
* Any absolute URL protocol not in this list is treated as dangerous by default.
*/
var DEFAULT_PROTOCOL_ALLOWLIST = [
	"http:",
	"https:",
	"mailto:",
	"tel:"
];
/**
* Check if a URL string uses a protocol that is not in the allowlist.
* Returns true for blocked protocols like javascript:, blob:, data:, etc.
*
* The URL constructor correctly normalizes:
* - Mixed case (JavaScript: → javascript:)
* - Whitespace/control characters (java\nscript: → javascript:)
* - Leading whitespace
*
* For relative URLs (no protocol), returns false (safe).
*
* @param url - The URL string to check
* @param allowlist - Set of protocols to allow
* @returns true if the URL uses a protocol that is not allowed
*/
function isDangerousProtocol(url, allowlist) {
	if (!url) return false;
	try {
		const parsed = new URL(url);
		return !allowlist.has(parsed.protocol);
	} catch {
		return false;
	}
}
var HTML_ESCAPE_LOOKUP = {
	"&": "\\u0026",
	">": "\\u003e",
	"<": "\\u003c",
	"\u2028": "\\u2028",
	"\u2029": "\\u2029"
};
var HTML_ESCAPE_REGEX = /[&><\u2028\u2029]/g;
/**
* Escape HTML special characters in a string to prevent XSS attacks
* when embedding strings in script tags during SSR.
*
* This is essential for preventing XSS vulnerabilities when user-controlled
* content is embedded in inline scripts.
*/
function escapeHtml(str) {
	return str.replace(HTML_ESCAPE_REGEX, (match) => HTML_ESCAPE_LOOKUP[match]);
}
function decodePath(path) {
	if (!path) return {
		path,
		handledProtocolRelativeURL: false
	};
	if (!/[%\\\x00-\x1f\x7f]/.test(path) && !path.startsWith("//")) return {
		path,
		handledProtocolRelativeURL: false
	};
	const re = /%25|%5C/gi;
	let cursor = 0;
	let result = "";
	let match;
	while (null !== (match = re.exec(path))) {
		result += decodeSegment(path.slice(cursor, match.index)) + match[0];
		cursor = re.lastIndex;
	}
	result = result + decodeSegment(cursor ? path.slice(cursor) : path);
	let handledProtocolRelativeURL = false;
	if (result.startsWith("//")) {
		handledProtocolRelativeURL = true;
		result = "/" + result.replace(/^\/+/, "");
	}
	return {
		path: result,
		handledProtocolRelativeURL
	};
}
/**
* Encodes a path the same way `new URL()` would, but without the overhead of full URL parsing.
*
* This function encodes:
* - Whitespace characters (spaces → %20, tabs → %09, etc.)
* - Non-ASCII/Unicode characters (emojis, accented characters, etc.)
*
* It preserves:
* - Already percent-encoded sequences (won't double-encode %2F, %25, etc.)
* - ASCII special characters valid in URL paths (@, $, &, +, etc.)
* - Forward slashes as path separators
*
* Used to generate proper href values for SSR without constructing URL objects.
*
* @example
* encodePathLikeUrl('/path/file name.pdf') // '/path/file%20name.pdf'
* encodePathLikeUrl('/path/日本語') // '/path/%E6%97%A5%E6%9C%AC%E8%AA%9E'
* encodePathLikeUrl('/path/already%20encoded') // '/path/already%20encoded' (preserved)
*/
function encodePathLikeUrl(path) {
	if (!/\s|[^\u0000-\u007F]/.test(path)) return path;
	return path.replace(/\s|[^\u0000-\u007F]/gu, encodeURIComponent);
}
function arraysEqual(a, b) {
	if (a === b) return true;
	if (a.length !== b.length) return false;
	for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
	return true;
}
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/lru-cache.js
function createLRUCache(max) {
	const cache = /* @__PURE__ */ new Map();
	let oldest;
	let newest;
	const touch = (entry) => {
		if (!entry.next) return;
		if (!entry.prev) {
			entry.next.prev = void 0;
			oldest = entry.next;
			entry.next = void 0;
			if (newest) {
				entry.prev = newest;
				newest.next = entry;
			}
		} else {
			entry.prev.next = entry.next;
			entry.next.prev = entry.prev;
			entry.next = void 0;
			if (newest) {
				newest.next = entry;
				entry.prev = newest;
			}
		}
		newest = entry;
	};
	return {
		get(key) {
			const entry = cache.get(key);
			if (!entry) return void 0;
			touch(entry);
			return entry.value;
		},
		set(key, value) {
			if (cache.size >= max && oldest) {
				const toDelete = oldest;
				cache.delete(toDelete.key);
				if (toDelete.next) {
					oldest = toDelete.next;
					toDelete.next.prev = void 0;
				}
				if (toDelete === newest) newest = void 0;
			}
			const existing = cache.get(key);
			if (existing) {
				existing.value = value;
				touch(existing);
			} else {
				const entry = {
					key,
					value,
					prev: newest
				};
				if (newest) newest.next = entry;
				newest = entry;
				if (!oldest) oldest = entry;
				cache.set(key, entry);
			}
		},
		clear() {
			cache.clear();
			oldest = void 0;
			newest = void 0;
		}
	};
}
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/invariant.js
function invariant() {
	throw new Error("Invariant failed");
}
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/new-process-route-tree.js
var SEGMENT_TYPE_INDEX = 4;
var SEGMENT_TYPE_PATHLESS = 5;
/**
* Populates the `output` array with the parsed representation of the given `segment` string.
*
* Usage:
* ```ts
* let output
* let cursor = 0
* while (cursor < path.length) {
*   output = parseSegment(path, cursor, output)
*   const end = output[5]
*   cursor = end + 1
* ```
*
* `output` is stored outside to avoid allocations during repeated calls. It doesn't need to be typed
* or initialized, it will be done automatically.
*/
function parseSegment(path, start, output = /* @__PURE__ */ new Uint16Array(6)) {
	const next = path.indexOf("/", start);
	const end = next === -1 ? path.length : next;
	const part = path.substring(start, end);
	if (!part || !part.includes("$")) {
		output[0] = 0;
		output[1] = start;
		output[2] = start;
		output[3] = end;
		output[4] = end;
		output[5] = end;
		return output;
	}
	if (part === "$") {
		const total = path.length;
		output[0] = 2;
		output[1] = start;
		output[2] = start;
		output[3] = total;
		output[4] = total;
		output[5] = total;
		return output;
	}
	if (part.charCodeAt(0) === 36) {
		output[0] = 1;
		output[1] = start;
		output[2] = start + 1;
		output[3] = end;
		output[4] = end;
		output[5] = end;
		return output;
	}
	const openBrace = part.indexOf("{");
	let closeBrace;
	if (openBrace !== -1 && openBrace + 1 < part.length && (closeBrace = part.indexOf("}", openBrace)) !== -1) {
		const firstChar = part.charCodeAt(openBrace + 1);
		if (firstChar === 45) {
			if (openBrace + 2 < part.length && part.charCodeAt(openBrace + 2) === 36) {
				const paramStart = openBrace + 3;
				const paramEnd = closeBrace;
				if (paramStart < paramEnd) {
					output[0] = 3;
					output[1] = start + openBrace;
					output[2] = start + paramStart;
					output[3] = start + paramEnd;
					output[4] = start + closeBrace + 1;
					output[5] = end;
					return output;
				}
			}
		} else if (firstChar === 36) {
			const dollarPos = openBrace + 1;
			const afterDollar = openBrace + 2;
			if (afterDollar === closeBrace) {
				output[0] = 2;
				output[1] = start + openBrace;
				output[2] = start + dollarPos;
				output[3] = start + afterDollar;
				output[4] = start + closeBrace + 1;
				output[5] = path.length;
				return output;
			}
			output[0] = 1;
			output[1] = start + openBrace;
			output[2] = start + afterDollar;
			output[3] = start + closeBrace;
			output[4] = start + closeBrace + 1;
			output[5] = end;
			return output;
		}
	}
	output[0] = 0;
	output[1] = start;
	output[2] = start;
	output[3] = end;
	output[4] = end;
	output[5] = end;
	return output;
}
/**
* Recursively parses the segments of the given route tree and populates a segment trie.
*
* @param data A reusable Uint16Array for parsing segments. (non important, we're just avoiding allocations)
* @param route The current route to parse.
* @param start The starting index for parsing within the route's full path.
* @param node The current segment node in the trie to populate.
* @param onRoute Callback invoked for each route processed.
*/
function parseSegments(defaultCaseSensitive, data, route, start, node, depth, dynamicListsToSort, onRoute) {
	onRoute?.(route);
	let cursor = start;
	{
		const path = route.fullPath ?? route.from;
		const options = route.options;
		const length = path.length;
		const caseSensitive = options?.caseSensitive ?? defaultCaseSensitive;
		const parseParams = options?.params?.parse ?? options?.parseParams;
		while (cursor < length) {
			const segment = parseSegment(path, cursor, data);
			let nextNode;
			const start = cursor;
			const end = segment[5];
			cursor = end + 1;
			depth++;
			const kind = segment[0];
			switch (kind) {
				case 0: {
					const value = path.substring(segment[2], segment[3]);
					let name = value;
					let staticChildren;
					if (caseSensitive) staticChildren = node.static ??= /* @__PURE__ */ new Map();
					else {
						name = value.toLowerCase();
						staticChildren = node.staticInsensitive ??= /* @__PURE__ */ new Map();
					}
					const existingNode = staticChildren.get(name);
					if (existingNode) nextNode = existingNode;
					else {
						const next = createStaticNode(path);
						next.parent = node;
						next.depth = depth;
						nextNode = next;
						staticChildren.set(name, next);
					}
					break;
				}
				case 1:
				case 3:
				case 2: {
					let prefix = path.substring(start, segment[1]);
					let suffix = path.substring(segment[4], end);
					const actuallyCaseSensitive = caseSensitive && !!(prefix || suffix);
					if (!caseSensitive) {
						prefix = prefix.toLowerCase();
						suffix = suffix.toLowerCase();
					}
					const siblings = kind === 1 ? node.dynamic : kind === 3 ? node.optional : node.wildcard;
					const existingNode = kind !== 2 && !parseParams && siblings?.find((s) => !s.parse && s.caseSensitive === actuallyCaseSensitive && s.prefix === prefix && s.suffix === suffix);
					if (existingNode) nextNode = existingNode;
					else {
						const next = createDynamicNode(kind, path, actuallyCaseSensitive, prefix, suffix);
						nextNode = next;
						next.parent = node;
						next.depth = depth;
						let nodes;
						if (kind === 1) nodes = node.dynamic ??= [];
						else if (kind === 3) nodes = node.optional ??= [];
						else nodes = node.wildcard ??= [];
						nodes.push(next);
						if (nodes.length === 2) dynamicListsToSort?.push(nodes);
					}
					break;
				}
			}
			node = nextNode;
		}
		if (parseParams && route.children && !route.isRoot && route.id && route.id.charCodeAt(route.id.lastIndexOf("/") + 1) === 95) {
			const pathlessNode = createStaticNode(path);
			pathlessNode.kind = SEGMENT_TYPE_PATHLESS;
			pathlessNode.parent = node;
			depth++;
			pathlessNode.depth = depth;
			node.pathless ??= [];
			node.pathless.push(pathlessNode);
			node = pathlessNode;
		}
		const isLeaf = (route.path || !route.children) && !route.isRoot;
		if (isLeaf && path.endsWith("/")) {
			const indexNode = createStaticNode(path);
			indexNode.kind = SEGMENT_TYPE_INDEX;
			indexNode.parent = node;
			depth++;
			indexNode.depth = depth;
			node.index = indexNode;
			node = indexNode;
		}
		node.parse = parseParams ?? null;
		node.priority = options?.params?.priority ?? 0;
		if (isLeaf && !node.route) {
			node.route = route;
			node.fullPath = path;
		}
	}
	if (route.children) for (const child of route.children) parseSegments(defaultCaseSensitive, data, child, cursor, node, depth, dynamicListsToSort, onRoute);
}
function sortDynamic(a, b) {
	if (a.parse && !b.parse) return -1;
	if (!a.parse && b.parse) return 1;
	if (a.parse && b.parse && (a.priority || b.priority)) return b.priority - a.priority;
	if (a.prefix && b.prefix && a.prefix !== b.prefix) {
		if (a.prefix.startsWith(b.prefix)) return -1;
		if (b.prefix.startsWith(a.prefix)) return 1;
	}
	if (a.suffix && b.suffix && a.suffix !== b.suffix) {
		if (a.suffix.endsWith(b.suffix)) return -1;
		if (b.suffix.endsWith(a.suffix)) return 1;
	}
	if (a.prefix && !b.prefix) return -1;
	if (!a.prefix && b.prefix) return 1;
	if (a.suffix && !b.suffix) return -1;
	if (!a.suffix && b.suffix) return 1;
	if (a.caseSensitive && !b.caseSensitive) return -1;
	if (!a.caseSensitive && b.caseSensitive) return 1;
	return 0;
}
function createStaticNode(fullPath) {
	return {
		kind: 0,
		depth: 0,
		pathless: null,
		index: null,
		static: null,
		staticInsensitive: null,
		dynamic: null,
		optional: null,
		wildcard: null,
		route: null,
		fullPath,
		parent: null,
		parse: null,
		priority: 0
	};
}
/**
* Keys must be declared in the same order as in `SegmentNode` type,
* to ensure they are represented as the same object class in the engine.
*/
function createDynamicNode(kind, fullPath, caseSensitive, prefix, suffix) {
	return {
		kind,
		depth: 0,
		pathless: null,
		index: null,
		static: null,
		staticInsensitive: null,
		dynamic: null,
		optional: null,
		wildcard: null,
		route: null,
		fullPath,
		parent: null,
		parse: null,
		priority: 0,
		caseSensitive,
		prefix,
		suffix
	};
}
function processRouteMasks(routeList, processedTree) {
	const segmentTree = createStaticNode("/");
	const data = /* @__PURE__ */ new Uint16Array(6);
	const dynamicListsToSort = [];
	for (const route of routeList) parseSegments(false, data, route, 1, segmentTree, 0, dynamicListsToSort);
	for (const nodes of dynamicListsToSort) nodes.sort(sortDynamic);
	processedTree.masksTree = segmentTree;
	processedTree.flatCache = createLRUCache(1e3);
}
/**
* Take an arbitrary list of routes, create a tree from them (if it hasn't been created already), and match a path against it.
*/
function findFlatMatch(path, processedTree) {
	path ||= "/";
	const cached = processedTree.flatCache.get(path);
	if (cached !== void 0) return cached;
	const result = findMatch(path, processedTree.masksTree);
	processedTree.flatCache.set(path, result);
	return result;
}
/**
* @deprecated keep until v2 so that `router.matchRoute` can keep not caring about the actual route tree
*/
function findSingleMatch(from, caseSensitive, fuzzy, path, processedTree) {
	from ||= "/";
	path ||= "/";
	const key = caseSensitive ? `case\0${from}` : from;
	let tree = processedTree.singleCache.get(key);
	if (!tree) {
		tree = createStaticNode("/");
		parseSegments(caseSensitive, /* @__PURE__ */ new Uint16Array(6), { from }, 1, tree, 0);
		processedTree.singleCache.set(key, tree);
	}
	return findMatch(path, tree, fuzzy);
}
function findRouteMatch(path, processedTree, fuzzy = false) {
	const key = fuzzy ? path : `nofuzz\0${path}`;
	const cached = processedTree.matchCache.get(key);
	if (cached !== void 0) return cached;
	path ||= "/";
	let result;
	try {
		result = findMatch(path, processedTree.segmentTree, fuzzy);
	} catch (err) {
		if (err instanceof URIError) result = null;
		else throw err;
	}
	if (result) result.branch = buildRouteBranch(result.route);
	processedTree.matchCache.set(key, result);
	return result;
}
/** Trim trailing slashes (except preserving root '/'). */
function trimPathRight$1(path) {
	return path === "/" ? path : path.replace(/\/{1,}$/, "");
}
/**
* Processes a route tree into a segment trie for efficient path matching.
* Also builds lookup maps for routes by ID and by trimmed full path.
*/
function processRouteTree(routeTree, caseSensitive = false, initRoute) {
	const segmentTree = createStaticNode(routeTree.fullPath);
	const data = /* @__PURE__ */ new Uint16Array(6);
	const dynamicListsToSort = [];
	const routesById = {};
	const routesByPath = {};
	let index = 0;
	parseSegments(caseSensitive, data, routeTree, 1, segmentTree, 0, dynamicListsToSort, (route) => {
		initRoute?.(route, index);
		if (route.id in routesById) invariant();
		routesById[route.id] = route;
		if (index !== 0 && route.path) {
			const trimmedFullPath = trimPathRight$1(route.fullPath);
			if (!routesByPath[trimmedFullPath] || route.fullPath.endsWith("/")) routesByPath[trimmedFullPath] = route;
		}
		index++;
	});
	for (const nodes of dynamicListsToSort) nodes.sort(sortDynamic);
	return {
		processedTree: {
			segmentTree,
			singleCache: createLRUCache(1e3),
			matchCache: createLRUCache(1e3),
			flatCache: null,
			masksTree: null
		},
		routesById,
		routesByPath
	};
}
function findMatch(path, segmentTree, fuzzy = false) {
	const parts = path.split("/");
	const leaf = getNodeMatch(path, parts, segmentTree, fuzzy);
	if (!leaf) return null;
	const [rawParams] = extractParams(path, parts, leaf);
	return {
		route: leaf.node.route,
		rawParams
	};
}
/**
* This function is "resumable":
* - the `leaf` input can contain `extract` and `rawParams` properties from a previous `extractParams` call
* - the returned `state` can be passed back as `extract` in a future call to continue extracting params from where we left off
*
* Inputs are *not* mutated.
*/
function extractParams(path, parts, leaf) {
	const list = buildBranch(leaf.node);
	let nodeParts = null;
	const rawParams = Object.create(null);
	/** which segment of the path we're currently processing */
	let partIndex = leaf.extract?.part ?? 0;
	/** which node of the route tree branch we're currently processing */
	let nodeIndex = leaf.extract?.node ?? 0;
	/** index of the 1st character of the segment we're processing in the path string */
	let pathIndex = leaf.extract?.path ?? 0;
	/** which fullPath segment we're currently processing */
	let segmentCount = leaf.extract?.segment ?? 0;
	for (; nodeIndex < list.length; partIndex++, nodeIndex++, pathIndex++, segmentCount++) {
		const node = list[nodeIndex];
		if (node.kind === SEGMENT_TYPE_INDEX) break;
		if (node.kind === SEGMENT_TYPE_PATHLESS) {
			segmentCount--;
			partIndex--;
			pathIndex--;
			continue;
		}
		const part = parts[partIndex];
		const currentPathIndex = pathIndex;
		if (part) pathIndex += part.length;
		if (node.kind === 1) {
			nodeParts ??= leaf.node.fullPath.split("/");
			const nodePart = nodeParts[segmentCount];
			const preLength = node.prefix.length;
			if (nodePart.charCodeAt(preLength) === 123) {
				const sufLength = node.suffix.length;
				const name = nodePart.substring(preLength + 2, nodePart.length - sufLength - 1);
				const value = part.substring(preLength, part.length - sufLength);
				rawParams[name] = decodeURIComponent(value);
			} else {
				const name = nodePart.substring(1);
				rawParams[name] = decodeURIComponent(part);
			}
		} else if (node.kind === 3) {
			if (leaf.skipped & 1 << nodeIndex) {
				partIndex--;
				pathIndex = currentPathIndex - 1;
				continue;
			}
			nodeParts ??= leaf.node.fullPath.split("/");
			const nodePart = nodeParts[segmentCount];
			const preLength = node.prefix.length;
			const sufLength = node.suffix.length;
			const name = nodePart.substring(preLength + 3, nodePart.length - sufLength - 1);
			const value = node.suffix || node.prefix ? part.substring(preLength, part.length - sufLength) : part;
			if (value) rawParams[name] = decodeURIComponent(value);
		} else if (node.kind === 2) {
			const n = node;
			const value = path.substring(currentPathIndex + n.prefix.length, path.length - n.suffix.length);
			const splat = decodeURIComponent(value);
			rawParams["*"] = splat;
			rawParams._splat = splat;
			break;
		}
	}
	if (leaf.rawParams) Object.assign(rawParams, leaf.rawParams);
	return [rawParams, {
		part: partIndex,
		node: nodeIndex,
		path: pathIndex,
		segment: segmentCount
	}];
}
function buildRouteBranch(route) {
	const list = [route];
	while (route.parentRoute) {
		route = route.parentRoute;
		list.push(route);
	}
	list.reverse();
	return list;
}
function buildBranch(node) {
	const list = Array(node.depth + 1);
	do {
		list[node.depth] = node;
		node = node.parent;
	} while (node);
	return list;
}
function getNodeMatch(path, parts, segmentTree, fuzzy) {
	if (path === "/" && segmentTree.index) return {
		node: segmentTree.index,
		skipped: 0
	};
	const trailingSlash = !last(parts);
	const pathIsIndex = trailingSlash && path !== "/";
	const partsLength = parts.length - (trailingSlash ? 1 : 0);
	const stack = [{
		node: segmentTree,
		index: 1,
		skipped: 0,
		statics: 0,
		dynamics: 0,
		optionals: 0
	}];
	let bestFuzzy = null;
	let bestMatch = null;
	while (stack.length) {
		const frame = stack.pop();
		const { node, index, skipped, statics, dynamics, optionals } = frame;
		let { extract, rawParams } = frame;
		if (node.kind === 2 && node.route && !isFrameMoreSpecific(bestMatch, frame)) continue;
		if (node.parse) {
			if (!validateParseParams(path, parts, frame)) continue;
			rawParams = frame.rawParams;
			extract = frame.extract;
		}
		if (fuzzy && node.route && node.kind !== SEGMENT_TYPE_INDEX && isFrameMoreSpecific(bestFuzzy, frame)) bestFuzzy = frame;
		const isBeyondPath = index === partsLength;
		if (isBeyondPath) {
			if (node.route && (!pathIsIndex || node.kind === SEGMENT_TYPE_INDEX || node.kind === 2) && isFrameMoreSpecific(bestMatch, frame)) bestMatch = frame;
			if (!node.optional && !node.wildcard && !node.index && !node.pathless) continue;
		}
		const part = isBeyondPath ? void 0 : parts[index];
		let lowerPart;
		if (isBeyondPath && node.index) {
			const indexFrame = {
				node: node.index,
				index,
				skipped,
				statics,
				dynamics,
				optionals,
				extract,
				rawParams
			};
			let indexValid = true;
			if (node.index.parse) {
				if (!validateParseParams(path, parts, indexFrame)) indexValid = false;
			}
			if (indexValid) {
				if (!dynamics && !optionals && !skipped && isPerfectStaticMatch(statics, partsLength)) return indexFrame;
				if (isFrameMoreSpecific(bestMatch, indexFrame)) bestMatch = indexFrame;
			}
		}
		if (node.wildcard) for (let i = node.wildcard.length - 1; i >= 0; i--) {
			const segment = node.wildcard[i];
			const { prefix, suffix } = segment;
			if (prefix) {
				if (isBeyondPath) continue;
				if (!(segment.caseSensitive ? part : lowerPart ??= part.toLowerCase()).startsWith(prefix)) continue;
			}
			if (suffix) {
				if (isBeyondPath) continue;
				const end = parts.slice(index).join("/");
				const suffixPart = end.slice(-suffix.length);
				if ((segment.caseSensitive ? suffixPart : suffixPart.toLowerCase()) !== suffix || end.length - suffix.length < prefix.length) continue;
			}
			stack.push({
				node: segment,
				index: partsLength,
				skipped,
				statics,
				dynamics,
				optionals,
				extract,
				rawParams
			});
		}
		if (node.optional) {
			const nextSkipped = skipped | 1 << node.depth + 1;
			for (let i = node.optional.length - 1; i >= 0; i--) {
				const segment = node.optional[i];
				stack.push({
					node: segment,
					index,
					skipped: nextSkipped,
					statics,
					dynamics,
					optionals,
					extract,
					rawParams
				});
			}
			if (!isBeyondPath) for (let i = node.optional.length - 1; i >= 0; i--) {
				const segment = node.optional[i];
				const { prefix, suffix } = segment;
				if (prefix || suffix) {
					const casePart = segment.caseSensitive ? part : lowerPart ??= part.toLowerCase();
					if (prefix && !casePart.startsWith(prefix)) continue;
					if (suffix && casePart.indexOf(suffix, casePart.length - suffix.length) < prefix.length) continue;
				}
				stack.push({
					node: segment,
					index: index + 1,
					skipped,
					statics,
					dynamics,
					optionals: optionals + segmentScore(partsLength, index),
					extract,
					rawParams
				});
			}
		}
		if (!isBeyondPath && node.dynamic && part) for (let i = node.dynamic.length - 1; i >= 0; i--) {
			const segment = node.dynamic[i];
			const { prefix, suffix } = segment;
			if (prefix || suffix) {
				const casePart = segment.caseSensitive ? part : lowerPart ??= part.toLowerCase();
				if (prefix && !casePart.startsWith(prefix)) continue;
				if (suffix && casePart.indexOf(suffix, casePart.length - suffix.length) < prefix.length) continue;
			}
			stack.push({
				node: segment,
				index: index + 1,
				skipped,
				statics,
				dynamics: dynamics + segmentScore(partsLength, index),
				optionals,
				extract,
				rawParams
			});
		}
		if (!isBeyondPath && node.staticInsensitive) {
			const match = node.staticInsensitive.get(lowerPart ??= part.toLowerCase());
			if (match) stack.push({
				node: match,
				index: index + 1,
				skipped,
				statics: statics + segmentScore(partsLength, index),
				dynamics,
				optionals,
				extract,
				rawParams
			});
		}
		if (!isBeyondPath && node.static) {
			const match = node.static.get(part);
			if (match) stack.push({
				node: match,
				index: index + 1,
				skipped,
				statics: statics + segmentScore(partsLength, index),
				dynamics,
				optionals,
				extract,
				rawParams
			});
		}
		if (node.pathless) for (let i = node.pathless.length - 1; i >= 0; i--) {
			const segment = node.pathless[i];
			stack.push({
				node: segment,
				index,
				skipped,
				statics,
				dynamics,
				optionals,
				extract,
				rawParams
			});
		}
	}
	if (bestMatch) return bestMatch;
	if (fuzzy && bestFuzzy) {
		let sliceIndex = bestFuzzy.index;
		for (let i = 0; i < bestFuzzy.index; i++) sliceIndex += parts[i].length;
		const splat = sliceIndex === path.length ? "/" : path.slice(sliceIndex);
		bestFuzzy.rawParams ??= Object.create(null);
		bestFuzzy.rawParams["**"] = decodeURIComponent(splat);
		return bestFuzzy;
	}
	return null;
}
function segmentScore(partsLength, index) {
	return 2 ** (partsLength - index - 1);
}
function isPerfectStaticMatch(statics, partsLength) {
	return statics === 2 ** (partsLength - 1) - 1;
}
function validateParseParams(path, parts, frame) {
	let rawParams;
	let state;
	try {
		[rawParams, state] = extractParams(path, parts, frame);
	} catch {
		return null;
	}
	frame.rawParams = rawParams;
	frame.extract = state;
	if (!frame.node.parse) return true;
	try {
		if (frame.node.parse(rawParams) === false) return null;
	} catch {}
	return true;
}
function isFrameMoreSpecific(prev, next) {
	if (!prev) return true;
	return next.statics > prev.statics || next.statics === prev.statics && (next.dynamics > prev.dynamics || next.dynamics === prev.dynamics && (next.optionals > prev.optionals || next.optionals === prev.optionals && ((next.node.kind === SEGMENT_TYPE_INDEX) > (prev.node.kind === SEGMENT_TYPE_INDEX) || next.node.kind === SEGMENT_TYPE_INDEX === (prev.node.kind === SEGMENT_TYPE_INDEX) && next.node.depth > prev.node.depth)));
}
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/path.js
/** Join path segments, cleaning duplicate slashes between parts. */
function joinPaths(paths) {
	return cleanPath(paths.filter((val) => {
		return val !== void 0;
	}).join("/"));
}
/** Remove repeated slashes from a path string. */
function cleanPath(path) {
	return path.replace(/\/{2,}/g, "/");
}
/** Trim leading slashes (except preserving root '/'). */
function trimPathLeft(path) {
	return path === "/" ? path : path.replace(/^\/{1,}/, "");
}
/** Trim trailing slashes (except preserving root '/'). */
function trimPathRight(path) {
	const len = path.length;
	return len > 1 && path[len - 1] === "/" ? path.replace(/\/{1,}$/, "") : path;
}
/** Trim both leading and trailing slashes. */
function trimPath(path) {
	return trimPathRight(trimPathLeft(path));
}
/** Remove a trailing slash from value when appropriate for comparisons. */
function removeTrailingSlash(value, basepath) {
	if (value?.endsWith("/") && value !== "/" && value !== `${basepath}/`) return value.slice(0, -1);
	return value;
}
/**
* Compare two pathnames for exact equality after normalizing trailing slashes
* relative to the provided `basepath`.
*/
function exactPathTest(pathName1, pathName2, basepath) {
	return removeTrailingSlash(pathName1, basepath) === removeTrailingSlash(pathName2, basepath);
}
/**
* Resolve a destination path against a base, honoring trailing-slash policy
* and supporting relative segments (`.`/`..`) and absolute `to` values.
*/
function resolvePath({ base, to, trailingSlash = "never", cache }) {
	if (to.includes("//")) to = cleanPath(to);
	if (to.startsWith("/")) {
		if (to.length === 1 || trailingSlash === "preserve") return to;
		if (trailingSlash === "always") return to.endsWith("/") ? to : `${to}/`;
		return to.endsWith("/") ? to.slice(0, -1) : to;
	}
	const isBase = to === ".";
	let key;
	if (cache) {
		key = isBase ? base : base + "\0" + to;
		const cached = cache.get(key);
		if (cached) return cached;
	}
	let baseSegments;
	if (isBase) baseSegments = base.split("/");
	else {
		if (base.includes("//")) base = cleanPath(base);
		baseSegments = base.split("/");
		while (baseSegments.length > 1 && last(baseSegments) === "") baseSegments.pop();
		const toSegments = to.split("/");
		for (let index = 0, length = toSegments.length; index < length; index++) {
			const value = toSegments[index];
			if (value === "") {
				if (!index) baseSegments = [value];
				else if (index === length - 1) baseSegments.push(value);
			} else if (value === "..") if (baseSegments.length > 1) baseSegments.pop();
			else baseSegments = [""];
			else if (value === ".") {} else baseSegments.push(value);
		}
	}
	if (baseSegments.length > 1) {
		if (last(baseSegments) === "") {
			if (trailingSlash === "never") baseSegments.pop();
		} else if (trailingSlash === "always") baseSegments.push("");
	}
	const joined = baseSegments.join("/");
	const result = (isBase ? cleanPath(joined) : joined) || "/";
	if (key && cache) cache.set(key, result);
	return result;
}
/**
* Create a pre-compiled decode config from allowed characters.
* This should be called once at router initialization.
*/
function compileDecodeCharMap(pathParamsAllowedCharacters) {
	const charMap = new Map(pathParamsAllowedCharacters.map((char) => [encodeURIComponent(char), char]));
	const pattern = Array.from(charMap.keys()).map((key) => key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
	const regex = new RegExp(pattern, "g");
	return (encoded) => encoded.replace(regex, (match) => charMap.get(match) ?? match);
}
function encodeParam(key, params, decoder) {
	const value = params[key];
	if (typeof value !== "string") return value;
	if (key === "_splat") {
		if (/^[a-zA-Z0-9\-._~!/]*$/.test(value)) return value;
		return value.split("/").map((segment) => encodePathParam(segment, decoder)).join("/");
	} else return encodePathParam(value, decoder);
}
/**
* Interpolate params and wildcards into a route path template.
*
* - Encodes params safely (configurable allowed characters)
* - Supports `{-$optional}` segments, `{prefix{$id}suffix}` and `{$}` wildcards
*/
function interpolatePath({ path, params, decoder, ...rest }) {
	let isMissingParams = false;
	const usedParams = Object.create(null);
	if (!path || path === "/") return {
		interpolatedPath: "/",
		usedParams,
		isMissingParams
	};
	if (!path.includes("$")) return {
		interpolatedPath: path,
		usedParams,
		isMissingParams
	};
	if (path.indexOf("{") === -1) {
		const length = path.length;
		let cursor = 0;
		let joined = "";
		while (cursor < length) {
			while (cursor < length && path.charCodeAt(cursor) === 47) cursor++;
			if (cursor >= length) break;
			const start = cursor;
			let end = path.indexOf("/", cursor);
			if (end === -1) end = length;
			cursor = end;
			const part = path.substring(start, end);
			if (!part) continue;
			if (part.charCodeAt(0) === 36) if (part.length === 1) {
				const splat = params._splat;
				usedParams._splat = splat;
				usedParams["*"] = splat;
				if (!splat) {
					isMissingParams = true;
					continue;
				}
				const value = encodeParam("_splat", params, decoder);
				joined += "/" + value;
			} else {
				const key = part.substring(1);
				if (!isMissingParams && !(key in params)) isMissingParams = true;
				usedParams[key] = params[key];
				const value = encodeParam(key, params, decoder) ?? "undefined";
				joined += "/" + value;
			}
			else joined += "/" + part;
		}
		if (path.endsWith("/")) joined += "/";
		return {
			usedParams,
			interpolatedPath: joined || "/",
			isMissingParams
		};
	}
	const length = path.length;
	let cursor = 0;
	let segment;
	let joined = "";
	while (cursor < length) {
		const start = cursor;
		segment = parseSegment(path, start, segment);
		const end = segment[5];
		cursor = end + 1;
		if (start === end) continue;
		const kind = segment[0];
		if (kind === 0) {
			joined += "/" + path.substring(start, end);
			continue;
		}
		if (kind === 2) {
			const splat = params._splat;
			usedParams._splat = splat;
			usedParams["*"] = splat;
			const prefix = path.substring(start, segment[1]);
			const suffix = path.substring(segment[4], end);
			if (!splat) {
				isMissingParams = true;
				if (prefix || suffix) joined += "/" + prefix + suffix;
				continue;
			}
			const value = encodeParam("_splat", params, decoder);
			joined += "/" + prefix + value + suffix;
			continue;
		}
		if (kind === 1) {
			const key = path.substring(segment[2], segment[3]);
			if (!isMissingParams && !(key in params)) isMissingParams = true;
			usedParams[key] = params[key];
			const prefix = path.substring(start, segment[1]);
			const suffix = path.substring(segment[4], end);
			const value = encodeParam(key, params, decoder) ?? "undefined";
			joined += "/" + prefix + value + suffix;
			continue;
		}
		if (kind === 3) {
			const key = path.substring(segment[2], segment[3]);
			const valueRaw = params[key];
			if (valueRaw == null) continue;
			usedParams[key] = valueRaw;
			const prefix = path.substring(start, segment[1]);
			const suffix = path.substring(segment[4], end);
			const value = encodeParam(key, params, decoder) ?? "";
			joined += "/" + prefix + value + suffix;
			continue;
		}
	}
	if (path.endsWith("/")) joined += "/";
	return {
		usedParams,
		interpolatedPath: joined || "/",
		isMissingParams
	};
}
function encodePathParam(value, decoder) {
	const encoded = encodeURIComponent(value);
	return decoder?.(encoded) ?? encoded;
}
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/scroll-restoration.js
function getSafeSessionStorage() {
	try {
		return sessionStorage;
	} catch {
		return;
	}
}
var storageKey = "tsr-scroll-restoration-v1_3";
getSafeSessionStorage();
/**
* The default `getKey` function for `useScrollRestoration`.
* It returns the `key` from the location state or the `href` of the location.
*
* The `location.href` is used as a fallback to support the use case where the location state is not available like the initial render.
*/
var defaultGetScrollRestorationKey = (location) => {
	return location.state.__TSR_key || location.href;
};
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/qss.js
/**
* Program is a reimplementation of the `qss` package:
* Copyright (c) Luke Edwards luke.edwards05@gmail.com, MIT License
* https://github.com/lukeed/qss/blob/master/license.md
*
* This reimplementation uses modern browser APIs
* (namely URLSearchParams) and TypeScript while still
* maintaining the original functionality and interface.
*
* Update: this implementation has also been mangled to
* fit exactly our use-case (single value per key in encoding).
*/
/**
* Encodes an object into a query string.
* @param obj - The object to encode into a query string.
* @param stringify - An optional custom stringify function.
* @returns The encoded query string.
* @example
* ```
* // Example input: encode({ token: 'foo', key: 'value' })
* // Expected output: "token=foo&key=value"
* ```
*/
function encode(obj, stringify = String) {
	const result = new URLSearchParams();
	for (const key in obj) {
		const val = obj[key];
		if (val !== void 0) result.set(key, stringify(val));
	}
	return result.toString();
}
/**
* Converts a string value to its appropriate type (string, number, boolean).
* @param mix - The string value to convert.
* @returns The converted value.
* @example
* // Example input: toValue("123")
* // Expected output: 123
*/
function toValue(str) {
	if (!str) return "";
	if (str === "false") return false;
	if (str === "true") return true;
	return +str * 0 === 0 && +str + "" === str ? +str : str;
}
/**
* Decodes a query string into an object.
* @param str - The query string to decode.
* @returns The decoded key-value pairs in an object format.
* @example
* // Example input: decode("token=foo&key=value")
* // Expected output: { "token": "foo", "key": "value" }
*/
function decode(str) {
	const searchParams = new URLSearchParams(str);
	const result = Object.create(null);
	for (const [key, value] of searchParams.entries()) {
		const previousValue = result[key];
		if (previousValue == null) result[key] = toValue(value);
		else if (Array.isArray(previousValue)) previousValue.push(toValue(value));
		else result[key] = [previousValue, toValue(value)];
	}
	return result;
}
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/searchParams.js
var jsonStart = /^(?:\s|["[{\d-]|fa|nu|tr)/;
/** Default `parseSearch` that strips leading '?' and JSON-parses values. */
var defaultParseSearch = parseSearchWith(JSON.parse);
/** Default `stringifySearch` using JSON.stringify for complex values. */
var defaultStringifySearch = stringifySearchWith(JSON.stringify, JSON.parse);
/**
* Build a `parseSearch` function using a provided JSON-like parser.
*
* The returned function strips a leading `?`, decodes values, and attempts to
* JSON-parse string values using the given `parser`.
*
* @param parser Function to parse a string value (e.g. `JSON.parse`).
* @returns A `parseSearch` function compatible with `Router` options.
* @link https://tanstack.com/router/latest/docs/framework/react/guide/custom-search-param-serialization
*/
function parseSearchWith(parser) {
	return (searchStr) => {
		if (searchStr[0] === "?") searchStr = searchStr.substring(1);
		const query = decode(searchStr);
		for (const key in query) {
			const value = query[key];
			if (typeof value === "string") try {
				query[key] = parser(value);
			} catch (_err) {}
		}
		return query;
	};
}
/**
* Build a `stringifySearch` function using a provided serializer.
*
* Non-primitive values are serialized with `stringify`. If a `parser` is
* supplied, string values that are parseable are re-serialized to ensure
* symmetry with `parseSearch`.
*
* @param stringify Function to serialize a value (e.g. `JSON.stringify`).
* @param parser Optional parser to detect parseable strings.
* @returns A `stringifySearch` function compatible with `Router` options.
* @link https://tanstack.com/router/latest/docs/framework/react/guide/custom-search-param-serialization
*/
function stringifySearchWith(stringify, parser) {
	const isJsonParser = parser === JSON.parse;
	function stringifyValue(val) {
		if (val && typeof val === "object") try {
			return stringify(val);
		} catch (_err) {}
		else if (parser && typeof val === "string") {
			if (isJsonParser && !jsonStart.test(val)) return val;
			try {
				parser(val);
				return stringify(val);
			} catch (_err) {}
		}
		return val;
	}
	return (search) => {
		const searchStr = encode(search, stringifyValue);
		return searchStr ? `?${searchStr}` : "";
	};
}
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/rewrite.js
/** Compose multiple rewrite pairs into a single in/out rewrite. */
function composeRewrites(rewrites) {
	return {
		input: ({ url }) => {
			for (const rewrite of rewrites) url = executeRewriteInput(rewrite, url);
			return url;
		},
		output: ({ url }) => {
			for (let i = rewrites.length - 1; i >= 0; i--) url = executeRewriteOutput(rewrites[i], url);
			return url;
		}
	};
}
/** Create a rewrite pair that strips/adds a basepath on input/output. */
function rewriteBasepath(opts) {
	const trimmedBasepath = trimPath(opts.basepath);
	const normalizedBasepath = `/${trimmedBasepath}`;
	const checkBasepath = opts.caseSensitive ? normalizedBasepath : normalizedBasepath.toLowerCase();
	const checkBasepathWithSlash = `${checkBasepath}/`;
	return {
		input: ({ url }) => {
			const pathname = opts.caseSensitive ? url.pathname : url.pathname.toLowerCase();
			if (pathname === checkBasepath) url.pathname = "/";
			else if (pathname.startsWith(checkBasepathWithSlash)) url.pathname = url.pathname.slice(normalizedBasepath.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = joinPaths([
				"/",
				trimmedBasepath,
				url.pathname
			]);
			return url;
		}
	};
}
/** Execute a location input rewrite if provided. */
function executeRewriteInput(rewrite, url) {
	const res = rewrite?.input?.({ url });
	if (res) {
		if (typeof res === "string") return new URL(res);
		else if (res instanceof URL) return res;
	}
	return url;
}
/** Execute a location output rewrite if provided. */
function executeRewriteOutput(rewrite, url) {
	const res = rewrite?.output?.({ url });
	if (res) {
		if (typeof res === "string") return new URL(res);
		else if (res instanceof URL) return res;
	}
	return url;
}
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/stores.js
/** SSR non-reactive createMutableStore */
function createNonReactiveMutableStore(initialValue) {
	let value = initialValue;
	return {
		get() {
			return value;
		},
		set(nextOrUpdater) {
			value = functionalUpdate(nextOrUpdater, value);
		}
	};
}
/** SSR non-reactive createReadonlyStore */
function createNonReactiveReadonlyStore(read) {
	return { get() {
		return read();
	} };
}
function createRouterStores(initialLocation, config) {
	const { createMutableStore, createReadonlyStore, batch } = config;
	const byRoute = /* @__PURE__ */ new Map();
	const status = createMutableStore("idle");
	const location = createMutableStore(initialLocation);
	const resolvedLocation = createMutableStore(void 0);
	const ids = createMutableStore([]);
	const matches = createReadonlyStore(() => ids.get().map((id) => byRoute.get(id).get()));
	const __store = createReadonlyStore(() => ({
		status: status.get(),
		isLoading: status.get() === "pending",
		matches: matches.get(),
		location: location.get(),
		resolvedLocation: resolvedLocation.get()
	}));
	function getMatchStore(routeId) {
		let matchStore = byRoute.get(routeId);
		if (!matchStore) {
			matchStore = createMutableStore(void 0);
			byRoute.set(routeId, matchStore);
		}
		return matchStore;
	}
	const store = {
		status,
		location,
		resolvedLocation,
		ids,
		matches,
		byRoute,
		__store,
		getMatchStore,
		setMatches
	};
	function setMatches(nextMatches) {
		const previousIds = ids.get();
		const nextIds = nextMatches.map((match) => match.routeId);
		batch(() => {
			if (!arraysEqual(previousIds, nextIds)) ids.set(nextIds);
			for (const id of previousIds) if (!nextIds.includes(id)) byRoute.get(id).set(() => void 0);
			for (const nextMatch of nextMatches) {
				const matchStore = getMatchStore(nextMatch.routeId);
				if (matchStore.get() !== nextMatch) matchStore.set(nextMatch);
			}
		});
	}
	return store;
}
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/router.js
function routeNeedsLoad(route) {
	return route.options.loader || route.options.beforeLoad || route.lazyFn || route.options.component?.preload || route.options.pendingComponent?.preload;
}
/**
* Compute whether path, href or hash changed between previous and current
* resolved locations.
*/
function getLocationChangeInfo(location, resolvedLocation) {
	return {
		fromLocation: resolvedLocation,
		toLocation: location,
		pathChanged: resolvedLocation?.pathname !== location.pathname,
		hrefChanged: resolvedLocation?.href !== location.href,
		hashChanged: resolvedLocation?.hash !== location.hash
	};
}
/**
* Return only state owned by the application, excluding volatile history
* bookkeeping. Mask payloads (`__tempLocation`/`__tempKey`) are kept: they
* distinguish otherwise-identical locations.
*/
function _getUserHistoryState({ key: _key, __TSR_key: _tsrKey, __TSR_index: _tsrIndex, __hashScrollIntoViewOptions: _hashScroll, ...state }) {
	return state;
}
/** Run route lifecycle callbacks in leave/enter/stay phases. */
function runRouteLifecycle(router, previous, matches, owner) {
	for (const match of previous) {
		if (owner && router._tx !== owner) return;
		if (!matches.some((candidate) => candidate.routeId === match.routeId)) router.routesById[match.routeId].options.onLeave?.(match);
	}
	for (const match of matches) {
		if (owner && router._tx !== owner) return;
		router.routesById[match.routeId].options[previous.some((candidate) => candidate.routeId === match.routeId) ? "onStay" : "onEnter"]?.(match);
	}
}
/**
* Core, framework-agnostic router engine that powers TanStack Router.
*
* Provides navigation, matching, loading, preloading, caching and event APIs
* used by framework adapters (React/Solid). Prefer framework helpers like
* `createRouter` in app code.
*
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/RouterType
*/
var RouterCore = class {
	/**
	* @deprecated Use the `createRouter` function instead
	*/
	constructor(options, getStoreConfig) {
		this.tempLocationKey = `${Math.round(Math.random() * 1e7)}`;
		this._scroll = { next: true };
		this.subscribers = /* @__PURE__ */ new Set();
		this._cache = /* @__PURE__ */ new Map();
		this._committed = [];
		this.routeBranchCache = /* @__PURE__ */ new WeakMap();
		this.lightweightCache = /* @__PURE__ */ new WeakMap();
		this.startTransition = async (fn) => {
			fn();
			return false;
		};
		this.update = (newOptions) => {
			const prevOptions = this.options;
			const prevBasepath = this.basepath ?? prevOptions?.basepath ?? "/";
			const basepathWasUnset = this.basepath === void 0;
			const prevRewriteOption = prevOptions?.rewrite;
			this.options = {
				...prevOptions,
				...newOptions
			};
			this.isServer = this.options.isServer ?? true ?? typeof document === "undefined";
			this.protocolAllowlist = new Set(this.options.protocolAllowlist);
			if (this.options.pathParamsAllowedCharacters) this.pathParamsDecoder = compileDecodeCharMap(this.options.pathParamsAllowedCharacters);
			if (!this.history || this.options.history && this.options.history !== this.history) if (!this.options.history) {} else this.history = this.options.history;
			this.origin = this.options.origin;
			if (!this.origin) this.origin = "http://localhost";
			if (this.history) this.updateLatestLocation();
			if (this.options.routeTree !== this.routeTree) {
				this.routeTree = this.options.routeTree;
				let processRouteTreeResult;
				if (globalThis.__TSR_CACHE__ && globalThis.__TSR_CACHE__.routeTree === this.routeTree) {
					const cached = globalThis.__TSR_CACHE__;
					this.resolvePathCache = cached.resolvePathCache;
					processRouteTreeResult = cached.processRouteTreeResult;
				} else {
					this.resolvePathCache = createLRUCache(1e3);
					processRouteTreeResult = this.buildRouteTree();
					if (globalThis.__TSR_CACHE__ === void 0) globalThis.__TSR_CACHE__ = {
						routeTree: this.routeTree,
						processRouteTreeResult,
						resolvePathCache: this.resolvePathCache
					};
				}
				this.setRoutes(processRouteTreeResult);
			}
			if (!this.stores && this.latestLocation) {
				const config = this.getStoreConfig(this);
				this.batch = config.batch;
				this.stores = createRouterStores(this.latestLocation, config);
			}
			const nextBasepath = this.options.basepath ?? "/";
			const nextRewriteOption = this.options.rewrite;
			if (basepathWasUnset || prevBasepath !== nextBasepath || prevRewriteOption !== nextRewriteOption) {
				this.basepath = nextBasepath;
				const rewrites = [];
				const trimmed = trimPath(nextBasepath);
				if (trimmed && trimmed !== "/") rewrites.push(rewriteBasepath({ basepath: nextBasepath }));
				if (nextRewriteOption) rewrites.push(nextRewriteOption);
				this.rewrite = rewrites.length === 0 ? void 0 : rewrites.length === 1 ? rewrites[0] : composeRewrites(rewrites);
				if (this.history) this.updateLatestLocation();
				if (this.stores) this.stores.location.set(this.latestLocation);
			}
		};
		this.updateLatestLocation = () => {
			this.latestLocation = this.parseLocation(this.history.location, this.latestLocation);
		};
		this.buildRouteTree = () => {
			const result = processRouteTree(this.routeTree, this.options.caseSensitive, (route, i) => {
				route.init({ originalIndex: i });
			});
			if (this.options.routeMasks) processRouteMasks(this.options.routeMasks, result.processedTree);
			return result;
		};
		this.subscribe = (eventType, fn) => {
			const listener = {
				eventType,
				fn
			};
			this.subscribers.add(listener);
			return () => {
				this.subscribers.delete(listener);
			};
		};
		this.emit = (routerEvent) => {
			for (const listener of this.subscribers) if (listener.eventType === routerEvent.type) try {
				listener.fn(routerEvent);
			} catch (e) {
				console.error(e);
			}
		};
		this.parseLocation = (locationToParse, previousLocation) => {
			const parse = ({ pathname, search, hash, href, state }) => {
				if (!this.rewrite && !/[ \x00-\x1f\x7f\u0080-\uffff]/.test(pathname)) {
					const parsedSearch = this.options.parseSearch(search);
					const searchStr = this.options.stringifySearch(parsedSearch);
					return {
						href: pathname + searchStr + hash,
						publicHref: pathname + searchStr + hash,
						pathname: decodePath(pathname).path,
						external: false,
						searchStr,
						search: nullReplaceEqualDeep(previousLocation?.search, parsedSearch),
						hash: decodePath(hash.slice(1)).path,
						state: replaceEqualDeep(previousLocation?.state, state)
					};
				}
				const fullUrl = new URL(href, this.origin);
				const url = executeRewriteInput(this.rewrite, fullUrl);
				const parsedSearch = this.options.parseSearch(url.search);
				const searchStr = this.options.stringifySearch(parsedSearch);
				url.search = searchStr;
				return {
					href: url.href.replace(url.origin, ""),
					publicHref: href,
					pathname: decodePath(url.pathname).path,
					external: !!this.rewrite && url.origin !== this.origin,
					searchStr,
					search: nullReplaceEqualDeep(previousLocation?.search, parsedSearch),
					hash: decodePath(url.hash.slice(1)).path,
					state: replaceEqualDeep(previousLocation?.state, state)
				};
			};
			const location = parse(locationToParse);
			const { __tempLocation, __tempKey } = location.state;
			if (__tempLocation && (!__tempKey || __tempKey === this.tempLocationKey)) {
				const parsedTempLocation = parse(__tempLocation);
				parsedTempLocation.state.key = location.state.key;
				parsedTempLocation.state.__TSR_key = location.state.__TSR_key;
				delete parsedTempLocation.state.__tempLocation;
				return {
					...parsedTempLocation,
					maskedLocation: location
				};
			}
			return location;
		};
		this.resolvePathWithBase = (from, path) => {
			return resolvePath({
				base: from,
				to: path,
				trailingSlash: this.options.trailingSlash,
				cache: this.resolvePathCache
			});
		};
		this.matchRoutes = (pathnameOrNext, locationSearchOrOpts, opts) => {
			if (typeof pathnameOrNext === "string") return this.matchRoutesInternal({
				pathname: pathnameOrNext,
				search: locationSearchOrOpts
			}, opts);
			return this.matchRoutesInternal(pathnameOrNext, locationSearchOrOpts);
		};
		this.getMatchedRoutes = (pathname) => {
			const rawParams = Object.create(null);
			const match = findRouteMatch(trimPathRight(pathname), this.processedTree, true);
			if (match) Object.assign(rawParams, match.rawParams);
			return [
				match?.branch || [this.routesById["__root__"]],
				rawParams,
				match?.route
			];
		};
		this.buildLocation = (opts) => {
			const build = (dest = {}) => {
				if (dest.href) {
					const parsed = parseHref(dest.href, {});
					dest = {
						...dest,
						to: executeRewriteInput(this.rewrite, new URL(parsed.pathname, this.origin)).pathname,
						search: this.options.parseSearch(parsed.search),
						hash: parsed.hash.slice(1)
					};
				}
				const currentLocation = dest._fromLocation || this._pendingLocation || this.latestLocation;
				const lightweightResult = this.matchRoutesLightweight(currentLocation);
				if (dest.from && false);
				const defaultedFromPath = dest.unsafeRelative === "path" ? currentLocation.pathname : dest.from ?? lightweightResult[1];
				const fromSearch = lightweightResult[2];
				const fromParams = lightweightResult[3];
				const nextTo = this.resolvePathWithBase(defaultedFromPath, dest.to ? `${dest.to}` : ".");
				let nextParams = resolveNextParams(dest.params, fromParams);
				const destRoute = this.routesByPath[trimPathRight(nextTo)];
				let destRoutes;
				if (destRoute) destRoutes = this.getRouteBranch(destRoute);
				else if (nextTo.includes("$")) destRoutes = [];
				else {
					const [matchedRoutes, rawParams, foundRoute] = this.getMatchedRoutes(nextTo);
					destRoutes = matchedRoutes;
					if (this.options.notFoundRoute && (!foundRoute || foundRoute.path !== "/" && rawParams["**"])) destRoutes = [...destRoutes, this.options.notFoundRoute];
				}
				if (destRoutes.length && hasKeys(nextParams)) for (const route of destRoutes) {
					const fn = route.options.params?.stringify ?? route.options.stringifyParams;
					if (fn) {
						if (nextParams === fromParams) nextParams = Object.assign(Object.create(null), nextParams);
						try {
							Object.assign(nextParams, fn(nextParams));
						} catch {}
					}
				}
				const nextPathname = opts.leaveParams ? nextTo : decodePath(interpolatePath({
					path: nextTo,
					params: nextParams,
					decoder: this.pathParamsDecoder,
					server: this.isServer
				}).interpolatedPath).path;
				let nextSearch = fromSearch;
				if (opts._includeValidateSearch && this.options.search?.strict) {
					const validatedSearch = {};
					destRoutes.forEach((route) => {
						if (route.options.validateSearch) try {
							Object.assign(validatedSearch, validateSearch(route.options.validateSearch, {
								...validatedSearch,
								...nextSearch
							}));
						} catch {}
					});
					nextSearch = validatedSearch;
				}
				nextSearch = applySearchMiddleware(nextSearch, dest, destRoutes, opts._includeValidateSearch);
				nextSearch = nullReplaceEqualDeep(fromSearch, nextSearch);
				const searchStr = this.options.stringifySearch(nextSearch);
				const hash = dest.hash === true ? currentLocation.hash : dest.hash ? functionalUpdate(dest.hash, currentLocation.hash) : void 0;
				const hashStr = hash ? `#${hash}` : "";
				let nextState = dest.state === true ? currentLocation.state : dest.state ? functionalUpdate(dest.state, currentLocation.state) : {};
				if (dest.state) nextState = replaceEqualDeep(currentLocation.state, nextState);
				const fullPath = `${nextPathname}${searchStr}${hashStr}`;
				let href;
				let publicHref;
				let external = false;
				if (this.rewrite) {
					const url = new URL(fullPath, this.origin);
					const rewrittenUrl = executeRewriteOutput(this.rewrite, url);
					href = url.href.replace(url.origin, "");
					if (rewrittenUrl.origin !== this.origin) {
						publicHref = rewrittenUrl.href;
						external = true;
					} else publicHref = rewrittenUrl.pathname + rewrittenUrl.search + rewrittenUrl.hash;
				} else {
					href = encodePathLikeUrl(fullPath);
					publicHref = href;
				}
				return {
					publicHref,
					href,
					pathname: nextPathname,
					search: nextSearch,
					searchStr,
					state: nextState,
					hash: hash ?? "",
					external,
					unmaskOnReload: dest.unmaskOnReload
				};
			};
			const next = build(opts);
			if (opts.mask) next.maskedLocation = build({
				from: opts.from,
				...opts.mask
			});
			else if (this.options.routeMasks) {
				const match = findFlatMatch(next.pathname, this.processedTree);
				if (match) {
					const params = Object.assign(Object.create(null), match.rawParams);
					const { from: _from, params: maskParams, ...maskProps } = match.route;
					const nextParams = resolveNextParams(maskParams, params);
					next.maskedLocation = build({
						from: opts.from,
						...maskProps,
						params: nextParams
					});
				}
			}
			return next;
		};
		this.commitLocation = async ({ viewTransition, ignoreBlocker, ...next }) => {
			let historyAction;
			const isSameLocation = trimPathRight(this.latestLocation.href) === trimPathRight(next.href) && deepEqual(_getUserHistoryState(next.state), _getUserHistoryState(this.latestLocation.state));
			const previousCommitPromise = this._commitPromise;
			let resolve;
			const commitPromise = new Promise((done) => {
				resolve = done;
			});
			commitPromise.resolve = () => {
				resolve();
				previousCommitPromise?.resolve();
			};
			this._commitPromise = commitPromise;
			if (isSameLocation) this.load();
			else {
				let { maskedLocation, hashScrollIntoView, ...nextHistory } = next;
				if (maskedLocation) {
					nextHistory = {
						...maskedLocation,
						state: {
							...maskedLocation.state,
							__tempKey: void 0,
							__tempLocation: {
								...nextHistory,
								search: nextHistory.searchStr,
								state: {
									...nextHistory.state,
									__tempKey: void 0,
									__tempLocation: void 0,
									__TSR_key: void 0,
									key: void 0
								}
							}
						}
					};
					if (nextHistory.unmaskOnReload ?? this.options.unmaskOnReload ?? false) nextHistory.state.__tempKey = this.tempLocationKey;
				}
				nextHistory.state.__hashScrollIntoViewOptions = hashScrollIntoView ?? this.options.defaultHashScrollIntoView ?? true;
				this.shouldViewTransition = viewTransition;
				historyAction = next.replace ? "REPLACE" : "PUSH";
				this.history[historyAction === "REPLACE" ? "replace" : "push"](nextHistory.publicHref, nextHistory.state, { ignoreBlocker });
				if (!this.history.subscribers.size) this.load({ action: { type: historyAction } });
			}
			this._scroll.next = next.resetScroll ?? true;
			return this._commitPromise;
		};
		this.buildAndCommitLocation = ({ replace, resetScroll, hashScrollIntoView, viewTransition, ignoreBlocker, ...rest } = {}) => {
			const location = this.buildLocation({
				...rest,
				_includeValidateSearch: true
			});
			this._pendingLocation = location;
			const commitPromise = this.commitLocation({
				...location,
				viewTransition,
				replace,
				resetScroll,
				hashScrollIntoView,
				ignoreBlocker
			});
			queueMicrotask(() => {
				if (this._pendingLocation === location) this._pendingLocation = void 0;
			});
			return commitPromise;
		};
		this.navigate = async ({ to, reloadDocument, href, publicHref, ...rest }) => {
			let hrefIsUrl = false;
			if (href) try {
				new URL(`${href}`);
				hrefIsUrl = true;
			} catch {}
			if (hrefIsUrl && !reloadDocument) reloadDocument = true;
			if (reloadDocument) {
				if (to !== void 0 || !href) {
					const location = this.buildLocation({
						to,
						...rest
					});
					href = href ?? location.publicHref;
					publicHref = publicHref ?? location.publicHref;
				}
				const reloadHref = !hrefIsUrl && publicHref ? publicHref : href;
				if (isDangerousProtocol(reloadHref, this.protocolAllowlist)) return;
				if (!rest.ignoreBlocker) {
					const blockers = this.history.getBlockers?.() ?? [];
					for (const blocker of blockers) if (blocker?.blockerFn) {
						if (await blocker.blockerFn({
							currentLocation: this.latestLocation,
							nextLocation: this.latestLocation,
							action: "PUSH"
						})) return;
					}
				}
				if (rest.replace) window.location.replace(reloadHref);
				else window.location.href = reloadHref;
				return;
			}
			return this.buildAndCommitLocation({
				...rest,
				href,
				to,
				_isNavigate: true
			});
		};
		this.load = async (opts) => {
			return loadServerRoute(this, opts);
		};
		this.startViewTransition = (fn) => {
			this.shouldViewTransition ?? this.options.defaultViewTransition;
			this.shouldViewTransition = void 0;
			return fn();
		};
		this.invalidate = (opts) => {
			const committedMatches = this._committed;
			const filter = opts?.filter;
			const preloads = this._preloads;
			const invalidIds = new Set([
				...committedMatches,
				...this._cache.values(),
				...[...preloads?.values() ?? []].flat(),
				...this._tx?.[3] ?? []
			].filter((match) => !filter || filter(match)).map((match) => match.id));
			const discardedPreloads = [];
			for (const [controller, matches] of preloads ?? []) if (matches.some((match) => invalidIds.has(match.id))) {
				preloads.delete(controller);
				discardedPreloads.push(controller);
			}
			const invalidate = (d) => {
				if (invalidIds.has(d.id)) {
					const route = this.routesById[d.routeId];
					const next = {
						...d,
						invalid: true,
						...(opts?.forcePending || d.status === "error" || d.status === "notFound") && routeNeedsLoad(route) ? {
							status: "pending",
							error: void 0
						} : void 0
					};
					d._flight = void 0;
					return next;
				}
				return d;
			};
			this._committed = committedMatches.map(invalidate);
			for (const [id, match] of this._cache) if (invalidIds.has(id)) {
				match.invalid = true;
				if (opts?.forcePending) match.status = "pending";
			}
			for (const id of invalidIds) this._flights?.delete(id);
			for (const controller of discardedPreloads) controller.abort();
			this.shouldViewTransition = false;
			return this.load({ sync: opts?.sync });
		};
		this.resolveRedirect = (redirect) => {
			const locationHeader = redirect.headers.get("Location");
			if (!redirect.options.href) {
				const href = this.buildLocation(redirect.options).publicHref || "/";
				redirect.options.href = href;
				redirect.headers.set("Location", href);
			} else if (locationHeader) try {
				const url = new URL(locationHeader);
				if (this.origin && url.origin === this.origin) {
					const href = url.pathname + url.search + url.hash;
					redirect.options.href = href;
					redirect.headers.set("Location", href);
				}
			} catch {}
			if (redirect.options.href && isDangerousProtocol(redirect.options.href, this.protocolAllowlist)) throw new Error("Redirect blocked: unsafe protocol");
			if (!redirect.headers.get("Location")) redirect.headers.set("Location", redirect.options.href);
			return redirect;
		};
		this.clearCache = (opts) => {
			const cached = this._cache;
			const preloads = this._preloads;
			const filter = opts?.filter;
			const discarded = [];
			const discardedIds = [];
			for (const [id, match] of cached) if (!filter || filter(match)) {
				discardedIds.push(id);
				discarded.push(match);
			}
			const abort = [];
			for (const [controller, matches] of preloads ?? []) if (!filter || matches.some(filter)) {
				abort.push(controller);
				discarded.push(...matches);
			}
			for (const id of discardedIds) cached.delete(id);
			for (const controller of abort) preloads.delete(controller);
			for (const match of discarded) {
				const flight = match._flight;
				match._flight = void 0;
				if (flight && !--flight[2]) {
					if (this._flights?.get(match.id) === flight) this._flights.delete(match.id);
					abort.push(flight[1]);
				}
			}
			for (const controller of abort) controller.abort();
		};
		this.loadRouteChunk = loadRouteChunk;
		this.preloadRoute = (opts) => preloadClientRoute(this, opts);
		this.matchRoute = (location, opts) => {
			const matchLocation = {
				...location,
				to: location.to ? this.resolvePathWithBase(location.from || "", location.to) : void 0,
				params: location.params || {},
				leaveParams: true
			};
			const next = this.buildLocation(matchLocation);
			const isPending = this.stores.status.get() === "pending";
			if (opts?.pending && !isPending) return false;
			const baseLocation = opts?.pending ?? !isPending ? this.latestLocation : this.stores.resolvedLocation.get() || this.stores.location.get();
			const match = findSingleMatch(next.pathname, opts?.caseSensitive ?? false, opts?.fuzzy ?? false, baseLocation.pathname, this.processedTree);
			if (!match) return false;
			if (location.params) {
				if (!deepEqual(match.rawParams, location.params, { partial: true })) return false;
			}
			if (opts?.includeSearch ?? true) return deepEqual(baseLocation.search, next.search, { partial: true }) ? match.rawParams : false;
			return match.rawParams;
		};
		this.getStoreConfig = getStoreConfig;
		this.update({
			defaultPreloadDelay: 50,
			defaultPendingMs: 1e3,
			defaultPendingMinMs: 500,
			context: void 0,
			...options,
			caseSensitive: options.caseSensitive ?? false,
			notFoundMode: options.notFoundMode ?? "fuzzy",
			stringifySearch: options.stringifySearch ?? defaultStringifySearch,
			parseSearch: options.parseSearch ?? defaultParseSearch,
			protocolAllowlist: options.protocolAllowlist ?? DEFAULT_PROTOCOL_ALLOWLIST
		});
	}
	isShell() {
		return !!this.options.isShell;
	}
	get state() {
		return this.stores.__store.get();
	}
	setRoutes({ routesById, routesByPath, processedTree }) {
		this.routesById = routesById;
		this.routesByPath = routesByPath;
		this.processedTree = processedTree;
		const notFoundRoute = this.options.notFoundRoute;
		if (notFoundRoute) {
			notFoundRoute.init({ originalIndex: 99999999999 });
			this.routesById[notFoundRoute.id] = notFoundRoute;
		}
	}
	getRouteBranch(route) {
		let branch = this.routeBranchCache.get(route);
		if (!branch) {
			branch = buildRouteBranch(route);
			this.routeBranchCache.set(route, branch);
		}
		return branch;
	}
	matchRoutesInternal(next, opts) {
		const [initialMatchedRoutes, rawParams, foundRoute] = this.getMatchedRoutes(next.pathname);
		let matchedRoutes = initialMatchedRoutes;
		let isGlobalNotFound = false;
		if (foundRoute ? foundRoute.path !== "/" && rawParams["**"] : trimPathRight(next.pathname)) if (this.options.notFoundRoute) matchedRoutes = [...matchedRoutes, this.options.notFoundRoute];
		else isGlobalNotFound = true;
		const _notFoundRouteId = isGlobalNotFound ? findGlobalNotFoundRouteId(this.options.notFoundMode, matchedRoutes) : void 0;
		const matches = new Array(matchedRoutes.length);
		const committed = this._committed;
		const previousAt = (route, index) => {
			const match = committed[index];
			return match?.routeId === route.id ? match : route === this.options.notFoundRoute ? committed.find((candidate) => candidate.routeId === route.id) : void 0;
		};
		let strictParams;
		for (let index = 0; index < matchedRoutes.length; index++) {
			const route = matchedRoutes[index];
			const parentMatch = matches[index - 1];
			let preMatchSearch;
			let strictMatchSearch;
			let searchError;
			{
				const parentSearch = parentMatch?.search ?? next.search;
				const parentStrictSearch = parentMatch?._strictSearch ?? void 0;
				try {
					const strictSearch = validateSearch(route.options.validateSearch, { ...parentSearch }) ?? void 0;
					preMatchSearch = {
						...parentSearch,
						...strictSearch
					};
					strictMatchSearch = {
						...parentStrictSearch,
						...strictSearch
					};
				} catch (err) {
					let searchParamError = err;
					if (!(err instanceof SearchParamError)) searchParamError = new SearchParamError(err.message, { cause: err });
					if (opts?.throwOnError) throw searchParamError;
					preMatchSearch = parentSearch;
					strictMatchSearch = {};
					searchError = searchParamError;
				}
			}
			let loaderDeps = "";
			let loaderDepsHash = "";
			try {
				loaderDeps = route.options.loaderDeps?.({ search: preMatchSearch }) ?? "";
				loaderDepsHash = loaderDeps ? JSON.stringify(loaderDeps) || "" : "";
			} catch (cause) {
				if (opts?.throwOnError) throw cause;
				searchError ??= cause;
			}
			const { interpolatedPath, usedParams } = interpolatePath({
				path: route.fullPath,
				params: rawParams,
				decoder: this.pathParamsDecoder,
				server: this.isServer
			});
			const matchId = route.id + interpolatedPath + loaderDepsHash;
			const previousMatch = previousAt(route, index);
			const existingMatch = this._cache.get(matchId) ?? (previousMatch?.id === matchId ? previousMatch : void 0);
			strictParams = existingMatch?._strictParams ?? Object.assign(usedParams, strictParams);
			let paramsError;
			if (!existingMatch) try {
				extractStrictParams(route, strictParams);
			} catch (err) {
				if (isNotFound(err) || isRedirect(err)) paramsError = err;
				else paramsError = new PathParamError(err.message, { cause: err });
				if (opts?.throwOnError) throw paramsError;
			}
			const cause = previousMatch ? "stay" : "enter";
			let match;
			if (existingMatch) match = {
				...existingMatch,
				cause,
				search: previousMatch ? nullReplaceEqualDeep(previousMatch.search, preMatchSearch) : nullReplaceEqualDeep(existingMatch.search, preMatchSearch),
				_strictSearch: strictMatchSearch,
				searchError
			};
			else {
				const status = routeNeedsLoad(route) ? "pending" : "success";
				match = {
					id: matchId,
					ssr: void 0,
					index,
					routeId: route.id,
					params: previousMatch?.params ?? strictParams,
					_strictParams: strictParams,
					pathname: interpolatedPath,
					updatedAt: Date.now(),
					search: previousMatch ? nullReplaceEqualDeep(previousMatch.search, preMatchSearch) : preMatchSearch,
					_strictSearch: strictMatchSearch,
					searchError,
					status,
					isFetching: false,
					error: void 0,
					paramsError,
					context: {},
					abortController: opts?._controller ?? new AbortController(),
					cause,
					loaderDeps: previousMatch ? replaceEqualDeep(previousMatch.loaderDeps, loaderDeps) : loaderDeps,
					invalid: false,
					preload: false,
					staticData: route.options.staticData || {},
					fullPath: route.fullPath
				};
			}
			const _notFound = _notFoundRouteId === route.id;
			if (match._notFound && !_notFound) match.error = void 0;
			match._notFound = _notFound;
			matches[index] = match;
		}
		for (let index = 0; index < matches.length; index++) {
			const match = matches[index];
			match.params = match.cause === "stay" ? nullReplaceEqualDeep(match.params, strictParams) : strictParams;
			if (opts?._controller) match.context = {};
		}
		return matches;
	}
	/**
	* Lightweight route matching for buildLocation.
	* Only computes fullPath, accumulated search, and params - skipping expensive
	* operations like AbortController, loaderDeps, and full match objects.
	*/
	matchRoutesLightweight(location) {
		const lastRouteId = last(this.stores.ids.get());
		const lastStateMatch = lastRouteId ? this.stores.byRoute.get(lastRouteId).get() : void 0;
		const lastStateMatchId = lastStateMatch?.id;
		const cached = this.lightweightCache.get(location);
		if (cached && cached[0] === lastStateMatchId) return cached[1];
		const [matchedRoutes, rawParams] = this.getMatchedRoutes(location.pathname);
		const lastRoute = last(matchedRoutes);
		const accumulatedSearch = { ...location.search };
		for (const route of matchedRoutes) try {
			Object.assign(accumulatedSearch, validateSearch(route.options.validateSearch, accumulatedSearch));
		} catch {}
		const canReuseParams = lastStateMatch && lastStateMatch.routeId === lastRoute.id && lastStateMatch.pathname === location.pathname;
		let params;
		if (canReuseParams) params = lastStateMatch.params;
		else {
			const strictParams = Object.assign(Object.create(null), rawParams);
			for (const route of matchedRoutes) try {
				extractStrictParams(route, strictParams);
			} catch {}
			params = strictParams;
		}
		const result = [
			matchedRoutes,
			lastRoute.fullPath,
			accumulatedSearch,
			params
		];
		this.lightweightCache.set(location, [lastStateMatchId, result]);
		return result;
	}
};
/** Error thrown when search parameter validation fails. */
var SearchParamError = class extends Error {};
/** Error thrown when path parameter parsing/validation fails. */
var PathParamError = class extends Error {};
function validateSearch(validateSearch, input) {
	if (validateSearch == null) return {};
	if ("~standard" in validateSearch) {
		const result = validateSearch["~standard"].validate(input);
		if (result instanceof Promise) throw new SearchParamError("Async validation not supported");
		if (result.issues) throw new SearchParamError(JSON.stringify(result.issues, void 0, 2), { cause: result });
		return result.value;
	}
	if ("parse" in validateSearch) return validateSearch.parse(input);
	if (typeof validateSearch === "function") return validateSearch(input);
	return {};
}
function applySearchMiddleware(search, dest, destRoutes, includeValidateSearch) {
	const middlewares = [];
	for (const route of destRoutes) {
		const routeOptions = route.options;
		if ("search" in routeOptions) {
			if (routeOptions.search?.middlewares) middlewares.push(...routeOptions.search.middlewares);
		} else if (routeOptions.preSearchFilters || routeOptions.postSearchFilters) {
			const legacyMiddleware = ({ search, next }) => {
				const result = next(routeOptions.preSearchFilters ? routeOptions.preSearchFilters.reduce((prev, next) => next(prev), search) : search);
				return routeOptions.postSearchFilters ? routeOptions.postSearchFilters.reduce((prev, next) => next(prev), result) : result;
			};
			middlewares.push(legacyMiddleware);
		}
		const routeValidateSearch = routeOptions.validateSearch;
		if (includeValidateSearch && routeValidateSearch) {
			const validate = ({ search, next, meta }) => {
				const result = next(search);
				try {
					const validated = validateSearch(routeValidateSearch, result);
					if (meta && validated) {
						for (const key in validated) if (!(key in result)) (meta.defaulted ||= /* @__PURE__ */ new Map()).set(key, validated[key]);
					}
					return {
						...result,
						...validated
					};
				} catch {}
				return result;
			};
			middlewares.push(validate);
		}
	}
	const applyNext = (index, currentSearch, meta) => {
		if (index >= middlewares.length) {
			if (!dest.search) return {};
			if (dest.search === true) return currentSearch;
			const result = functionalUpdate(dest.search, currentSearch);
			if (meta) meta.explicit = result;
			return result;
		}
		const next = (newSearch, collectMeta) => {
			if (collectMeta) {
				const nextMeta = meta || {};
				return {
					search: applyNext(index + 1, newSearch, nextMeta),
					meta: nextMeta
				};
			}
			return applyNext(index + 1, newSearch, meta);
		};
		return middlewares[index]({
			search: currentSearch,
			next,
			meta
		});
	};
	return applyNext(0, search);
}
function findGlobalNotFoundRouteId(notFoundMode, routes) {
	if (notFoundMode !== "root") {
		let fallback;
		for (let i = routes.length - 1; i >= 0; i--) {
			const route = routes[i];
			if (route.options.notFoundComponent) return route.id;
			fallback ||= route.children && route.id;
		}
		if (fallback) return fallback;
	}
	return rootRouteId;
}
function resolveNextParams(spec, base) {
	if (spec === false || spec === null) return Object.create(null);
	if ((spec ?? true) === true) return base;
	const next = Object.assign(Object.create(null), base);
	return Object.assign(next, functionalUpdate(spec, next));
}
function extractStrictParams(route, accumulatedParams) {
	const parseParams = route.options.params?.parse ?? route.options.parseParams;
	if (parseParams) Object.assign(accumulatedParams, parseParams(accumulatedParams));
}
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/load-client.js
function preloadComponent(route, type) {
	return route.options[type]?.preload?.();
}
function loadComponents(route, onPendingReady) {
	const component = preloadComponent(route, "component");
	let pending = preloadComponent(route, "pendingComponent");
	if (onPendingReady) if (pending) pending = pending.then(onPendingReady);
	else onPendingReady();
	if (component && pending) return Promise.all([component, pending]).then(() => {});
	return component ?? pending;
}
function loadRouteChunk(route, componentType, onPendingReady) {
	const afterLazy = () => componentType === false ? void 0 : componentType ? preloadComponent(route, componentType) : loadComponents(route, onPendingReady);
	const current = route._lazy;
	if (current) return current === true ? afterLazy() : current.then(afterLazy);
	if (!route.lazyFn) return afterLazy();
	const promise = route.lazyFn().then((lazyRoute) => {
		{
			const { id: _id, ...options } = lazyRoute.options;
			Object.assign(route.options, options);
			route._lazy = true;
		}
	}, (error) => {
		route._lazy = void 0;
		throw error;
	});
	route._lazy = promise;
	return promise.then(afterLazy);
}
/** Return the structural lane through the first terminal render boundary. */
function _getRenderedMatches(matches) {
	const end = matches.findIndex((match) => match.status !== "success" || match._notFound) + 1;
	return end && end < matches.length ? matches.slice(0, end) : matches;
}
/** Return the lane whose document assets belong to the current presentation. */
function _getAssetMatches(matches) {
	let end = matches.length;
	for (let index = 0; index < end; index++) {
		const match = matches[index];
		if (match._assetEnd !== void 0) {
			end = Math.min(end, Math.max(index + 1, match._assetEnd));
			continue;
		}
		if (match.status !== "success" || match._notFound) {
			end = index + 1;
			break;
		}
	}
	return end < matches.length ? matches.slice(0, end) : matches;
}
var SUCCESS$1 = 0;
var ERROR$1 = 1;
var NOT_FOUND$1 = 2;
var REDIRECTED$1 = 3;
var CANCELED_OUTCOME = [4];
function isControl(result) {
	return typeof result[0] === "number";
}
function waitFor$1(value, signal) {
	if (signal.aborted) return Promise.race([Promise.reject(signal), value]);
	return new Promise((resolve, reject) => {
		const abort = () => reject(signal);
		signal.addEventListener("abort", abort, { once: true });
		Promise.resolve(value).then(resolve, reject).finally(() => signal.removeEventListener("abort", abort));
	});
}
function getRoute$1(router, match) {
	return router.routesById[match.routeId];
}
function normalize$1(value, rejected, routeId) {
	if (isRedirect(value)) return [REDIRECTED$1, value];
	if (isNotFound(value)) {
		value.routeId ||= routeId;
		return [NOT_FOUND$1, value];
	}
	if (!rejected) return [SUCCESS$1, value];
	if (typeof value?.then === "function") value = new Error("A Promise was thrown", { cause: value });
	return [ERROR$1, value];
}
function normalizeError$1(route, cause) {
	let outcome = normalize$1(cause, true, route.id);
	if (outcome[0] !== ERROR$1) return outcome;
	try {
		route.options.onError?.(outcome[1]);
	} catch (onErrorCause) {
		outcome = normalize$1(onErrorCause, true, route.id);
	}
	return outcome;
}
function normalizeLaneError(router, lane, route, cause, options) {
	if (options[0].signal.aborted) return CANCELED_OUTCOME;
	return materializeRedirect$1(router, lane, route, normalizeError$1(route, cause), options);
}
async function contextualize$1(router, lane, options, end, planSuccessfulLane, retainedEnd) {
	const [location, matches] = lane;
	const signal = options[0].signal;
	const preload = !!options[3];
	for (let index = options[6] ?? 0; index < end; index++) {
		const match = matches[index];
		const route = getRoute$1(router, match);
		match.abortController = options[0];
		const parentContext = matches[index - 1]?.context ?? router.options.context ?? {};
		const common = {
			params: match.params,
			location,
			navigate: (opts) => router.navigate({
				...opts,
				_fromLocation: location
			}),
			buildLocation: router.buildLocation,
			cause: preload ? "preload" : match.cause,
			abortController: options[0],
			preload,
			matches,
			routeId: route.id
		};
		try {
			const routeContext = match._ctx ||= route.options.context ? route.options.context({
				...common,
				deps: match.loaderDeps,
				context: parentContext
			}) || {} : void 0;
			match.context = {
				...parentContext,
				...routeContext
			};
		} catch (cause) {
			releaseFlight(router, match);
			return [index, normalizeLaneError(router, lane, route, cause, options)];
		}
		if (signal.aborted) return [index, CANCELED_OUTCOME];
		const validationError = match.paramsError ?? match.searchError;
		if (validationError !== void 0) {
			releaseFlight(router, match);
			return [index, normalizeLaneError(router, lane, route, validationError, options)];
		}
		const beforeLoad = route.options.beforeLoad;
		if (!beforeLoad) continue;
		const previousStatus = match.status;
		if (index >= retainedEnd) {
			match.status = "pending";
			options[7]?.();
		}
		try {
			setFetching(router, match, "beforeLoad", options[0]);
			const result = await waitFor$1(beforeLoad({
				...common,
				search: match.search,
				context: match.context,
				...router.options.additionalContext
			}), signal);
			if (signal.aborted) return [index, CANCELED_OUTCOME];
			const outcome = materializeRedirect$1(router, lane, route, normalize$1(result, false, route.id), options);
			if (outcome[0] !== SUCCESS$1) {
				releaseFlight(router, match);
				return [index, outcome];
			}
			match.context = {
				...match.context,
				...result
			};
		} catch (cause) {
			releaseFlight(router, match);
			return [index, normalizeLaneError(router, lane, route, cause, options)];
		} finally {
			match.status = previousStatus;
			setFetching(router, match, false, options[0]);
		}
	}
	planSuccessfulLane();
}
function releaseOwnedFlight(router, match, flight) {
	if (!flight || --flight[2]) return;
	if (router._flights?.get(match.id) === flight) {
		const current = router._tx;
		if (current && !current[0].signal.aborted && !current[3].includes(match) && current[3].some((candidate) => candidate.id === match.id) && current[3].some((candidate) => candidate.isFetching === "beforeLoad")) return;
		router._flights.delete(match.id);
	}
	return flight[1];
}
function releaseFlight(router, match) {
	const flight = match._flight;
	match._flight = void 0;
	releaseOwnedFlight(router, match, flight)?.abort();
}
/**
* Not passing in a `next` ownership recipient
* is equivalent to discarding the match resources
*/
function transferMatchResources(router, previous, next, deferSameIdFlight) {
	const abort = [];
	for (const match of previous) if (!next?.includes(match)) {
		const flight = match._flight;
		match._flight = void 0;
		if (deferSameIdFlight && flight?.[2] === 1 && router._flights?.get(match.id) === flight && next?.some((candidate) => candidate.id === match.id)) flight[2] = 0;
		else {
			const controller = releaseOwnedFlight(router, match, flight);
			if (controller) abort.push(controller);
		}
	}
	for (const controller of abort) controller.abort();
}
function acquireMatchResources(matches) {
	for (const match of matches) {
		const flight = match._flight;
		if (flight) flight[2]++;
	}
}
function setFetching(router, match, value, owner) {
	match.isFetching = value;
	if (owner && router._tx?.[0] !== owner) return;
	const store = router.stores.byRoute.get(match.routeId);
	const presented = store?.get();
	if (presented?.id === match.id) store.set({
		...presented,
		isFetching: value
	});
}
function getLoaderContext$1(router, lane, match, route, controller, parentMatchPromise, preload) {
	const location = lane[0];
	return {
		params: match.params,
		location,
		navigate: (opts) => router.navigate({
			...opts,
			_fromLocation: location
		}),
		cause: preload ? "preload" : match.cause,
		abortController: controller,
		preload,
		deps: match.loaderDeps,
		parentMatchPromise,
		context: match.context,
		route,
		...router.options.additionalContext
	};
}
async function loadResource(router, lane, match, route, loader, parentMatchPromise, options) {
	const owner = options[0];
	const signal = owner.signal;
	if (signal.aborted) return CANCELED_OUTCOME;
	if (!loader) return [SUCCESS$1, void 0];
	let flight = match._flight;
	setFetching(router, match, "loader", owner);
	try {
		if (!flight) {
			const controller = new AbortController();
			flight = [
				Promise.resolve().then(() => loader(getLoaderContext$1(router, lane, match, route, controller, parentMatchPromise, !!options[3]))).then((value) => normalize$1(value, false, route.id), (cause) => normalize$1(cause, true, route.id)).then((result) => {
					if (result[0] !== SUCCESS$1 && router._flights?.get(match.id) === flight) {
						router._flights.delete(match.id);
						if (!flight[2]) controller.abort();
					}
					return result[0] === ERROR$1 && flight[2] ? normalizeError$1(route, result[1]) : result;
				}),
				controller,
				1
			];
			(router._flights ??= /* @__PURE__ */ new Map()).set(match.id, flight);
		}
		match._flight = flight;
		match.abortController = flight[1];
		return materializeRedirect$1(router, lane, route, await waitFor$1(flight[0], signal), options);
	} catch (cause) {
		if (cause !== signal || !signal.aborted) throw cause;
		releaseFlight(router, match);
		return CANCELED_OUTCOME;
	} finally {
		setFetching(router, match, false, owner);
	}
}
function settleInto(match, result, preload) {
	if (result[0] === REDIRECTED$1) return;
	match.status = "success";
	match.error = void 0;
	if (result[0] === SUCCESS$1) {
		match.loaderData = result[1];
		match.invalid = false;
		match.updatedAt = Date.now();
		match.preload = preload;
	} else match.invalid = true;
}
function cacheLoaderMatch(router, match, planned) {
	const current = router._cache.get(match.id);
	if (current !== planned || router._committed.some((candidate) => candidate.id === match.id && candidate._flight === match._flight)) return;
	const cached = {
		...match,
		_notFound: void 0,
		context: {}
	};
	if (cached._flight) cached._flight[2]++;
	router._cache.set(match.id, cached);
	if (current) releaseFlight(router, current);
}
function getParentSnapshot(match, outcome) {
	if (outcome[0] === ERROR$1 || outcome[0] === NOT_FOUND$1) return {
		...match,
		status: outcome[0] === ERROR$1 ? "error" : "notFound",
		error: outcome[1],
		_flight: void 0
	};
	return match;
}
function createLoaderTask$1(router, lane, index, tasks, semanticParent, options, retainedEnd) {
	const match = lane[1][index];
	const route = getRoute$1(router, match);
	const preload = !!options[3];
	const plannedCacheMatch = router._cache.get(match.id);
	let configured;
	let reload = false;
	let reloadFailure;
	try {
		if (match.status === "success") {
			configured = route.options.shouldReload;
			if (typeof configured === "function") configured = configured(getLoaderContext$1(router, lane, match, route, options[0], semanticParent, preload));
			if (options[0].signal.aborted) reloadFailure = CANCELED_OUTCOME;
		}
		if (!reloadFailure) if (match.status !== "success") reload = true;
		else {
			const staleAge = preload || match.preload ? route.options.preloadStaleTime ?? router.options.defaultPreloadStaleTime ?? 3e4 : route.options.staleTime ?? router.options.defaultStaleTime ?? 0;
			reload = !!(match.invalid || configured || configured === void 0 && Date.now() - match.updatedAt >= staleAge && (options[5] || match.cause === "enter" || options[2].some((candidate) => candidate.routeId === match.routeId && candidate.id !== match.id)));
		}
	} catch (cause) {
		match.invalid = true;
		releaseFlight(router, match);
		reloadFailure = normalizeLaneError(router, lane, route, cause, options);
	}
	const routeLoader = route.options.loader;
	const isLoaderFn = typeof routeLoader === "function";
	const loader = isLoaderFn ? routeLoader : routeLoader?.handler;
	const preloadable = !preload || route.options.preload !== false;
	let donor = preloadable && routeLoader && true ? router._flights?.get(match.id) : void 0;
	if (donor === match._flight || reloadFailure) donor = void 0;
	else if (donor && !reload && !preload && configured === void 0) reload = true;
	else if (!reload) donor = void 0;
	const background = !!(routeLoader && reload && match.status === "success" && !preload && !options[4] && ((isLoaderFn ? void 0 : routeLoader.staleReloadMode) ?? router.options.defaultStaleReloadMode) !== "blocking");
	const loaded = reload && preloadable;
	const blocking = loaded && !background && (match.status !== "success" || !!routeLoader);
	const onReady = index >= retainedEnd ? options[7] : void 0;
	const onLazyReady = route.lazyFn && route._lazy !== true ? onReady : void 0;
	if (loaded && !routeLoader) {
		match.invalid = false;
		match.updatedAt = Date.now();
	}
	if (donor) donor[2]++;
	if (blocking) {
		const acceptedFlight = match._flight;
		match._flight = donor;
		releaseOwnedFlight(router, match, acceptedFlight)?.abort();
		if (index >= retainedEnd) match.status = "pending";
		onReady?.();
	}
	if (!loaded) match.isFetching = false;
	const outcome = (reloadFailure ? Promise.resolve(reloadFailure) : !blocking ? Promise.resolve([SUCCESS$1, match.loaderData]) : loadResource(router, lane, match, route, loader, semanticParent, options)).then((result) => {
		if (blocking) {
			settleInto(match, result, preload);
			if (result[0] === SUCCESS$1) {
				if (routeLoader && !options[0].signal.aborted) cacheLoaderMatch(router, match, plannedCacheMatch);
				if (index >= retainedEnd) match.status = "pending";
			}
		}
		return result;
	});
	const chunkFailure = waitFor$1(Promise.resolve().then(() => loadRouteChunk(route, void 0, onLazyReady)), options[0].signal).then(() => void 0, (cause) => lane[1].some((candidate, candidateIndex) => candidateIndex <= index && (candidate.status === "error" || candidate.status === "notFound" || candidate._notFound)) ? void 0 : [index, normalizeLaneError(router, lane, route, cause, options)]).then((failure) => outcome.then((result) => {
		if (blocking && !failure && result[0] === SUCCESS$1 && match.status === "pending" && !options[0].signal.aborted) {
			match.status = "success";
			onReady?.();
		}
		return failure;
	}));
	tasks.push([
		index,
		outcome,
		chunkFailure
	]);
	if (!background) return outcome.then((result) => getParentSnapshot(match, result));
	const candidate = {
		...match,
		status: "pending",
		preload: false,
		_flight: donor
	};
	match.invalid = false;
	match.isFetching = "loader";
	const backgroundOutcome = loadResource(router, lane, candidate, route, loader, semanticParent, options).then((result) => {
		match.isFetching = false;
		settleInto(candidate, result, false);
		return result;
	});
	(lane[2] ??= []).push([
		index,
		backgroundOutcome,
		chunkFailure,
		candidate
	]);
	return backgroundOutcome.then((result) => getParentSnapshot(candidate, result));
}
async function getNotFoundBoundary$1(router, matches, indexed, signal, fallback = 0) {
	const cause = indexed?.[1][1];
	let index = cause?.routeId ? matches.findIndex((match) => match.routeId === cause.routeId) : indexed?.[0] ?? matches.length - 1;
	if (index < 0) index = 0;
	for (let i = index; i >= 0; i--) {
		const route = getRoute$1(router, matches[i]);
		try {
			const loading = loadRouteChunk(route, false);
			if (loading) await waitFor$1(loading, signal);
		} catch (cause) {
			if (cause === signal && signal.aborted) throw cause;
		}
		if (route.options.notFoundComponent) return i;
	}
	return cause?.routeId ? index : fallback;
}
function discardBackground(router, lane) {
	if (lane[2]) {
		transferMatchResources(router, lane[2].map((task) => task[3]));
		lane[2] = void 0;
	}
}
async function settleTasks(tasks, serialFailure, redirectTasks, gate) {
	let loaderFailure;
	try {
		await Promise.all(tasks.map((task) => task[1].then(async (outcome) => {
			const taskIndex = task[0];
			if (gate && taskIndex >= await gate) return;
			if (outcome[0] >= REDIRECTED$1) throw [taskIndex, outcome];
			if (!loaderFailure && outcome[0] !== SUCCESS$1) {
				loaderFailure = [taskIndex, outcome];
				await Promise.all((redirectTasks ?? []).map((nextTask) => {
					if (nextTask[0] <= taskIndex) return;
					return nextTask[1].then((nextOutcome) => {
						if (nextOutcome[0] === REDIRECTED$1) throw [nextTask[0], nextOutcome];
					});
				}));
			}
		})));
	} catch (cause) {
		return cause;
	}
	return serialFailure ?? loaderFailure;
}
function materializeRedirect$1(router, lane, route, outcome, options, failed) {
	while (outcome[0] === REDIRECTED$1) {
		const redirect = outcome[1];
		const redirectOptions = redirect.options;
		if (redirectOptions.reloadDocument ? options[3] : options[1] >= 20) return outcome;
		try {
			if (redirectOptions.href && redirectOptions.reloadDocument) {
				router.resolveRedirect(redirect);
				return outcome;
			}
			return [
				REDIRECTED$1,
				redirect,
				router.buildLocation({
					...redirectOptions,
					_fromLocation: lane[0],
					_includeValidateSearch: true
				})
			];
		} catch (cause) {
			outcome = failed ? [ERROR$1, cause] : normalizeError$1(route, cause);
			failed = true;
		}
	}
	return outcome;
}
async function reduceLane(router, lane, tasks, controller, settlement, onReady) {
	const matches = lane[1];
	let failure = await settlement;
	let redirectLimitExceeded = false;
	const plannedBoundary = matches.findIndex((match) => match._notFound);
	const boundaryOf = (found) => found[1][0] === NOT_FOUND$1 ? getNotFoundBoundary$1(router, matches, found, controller.signal) : found[0];
	let readinessEnd = plannedBoundary < 0 ? matches.length : plannedBoundary;
	if ((failure?.[1][0] ?? 0) >= REDIRECTED$1) readinessEnd = 0;
	else if (failure) {
		readinessEnd = failure[2] ??= await boundaryOf(failure);
		for (const task of tasks) {
			if (task[0] >= readinessEnd) break;
			const outcome = await task[1];
			if (outcome[0] !== SUCCESS$1 && outcome[0] < REDIRECTED$1 && !("loaderData" in matches[task[0]])) {
				failure = [task[0], outcome];
				readinessEnd = failure[2] = await boundaryOf(failure);
				break;
			}
		}
	}
	for (const task of tasks) {
		if (task[0] >= readinessEnd) break;
		const chunkFailure = await task[2];
		if (!chunkFailure) continue;
		failure = chunkFailure;
		break;
	}
	if ((failure?.[1][0] ?? 0) >= REDIRECTED$1) {
		const outcome = failure[1];
		if (outcome[0] !== REDIRECTED$1 || outcome[1].options.reloadDocument || outcome[2]) {
			discardBackground(router, lane);
			return outcome;
		}
		redirectLimitExceeded = true;
		failure = [0, [ERROR$1, /* @__PURE__ */ new Error("Too many redirects")]];
	}
	const boundary = failure ? failure[2] ?? await boundaryOf(failure) : plannedBoundary;
	if (boundary >= 0) {
		const outcome = failure?.[1];
		const kind = outcome?.[0];
		const match = matches[boundary];
		const cause = outcome?.[1];
		const install = () => {
			if (outcome) {
				match._notFound = void 0;
				if (kind === ERROR$1) match.status = "error";
				else {
					cause.routeId = match.routeId;
					if (match.routeId === router.routeTree.id) {
						match.status = "success";
						match._notFound = true;
					} else match.status = "notFound";
				}
				match.error = cause;
				match.isFetching = false;
			}
		};
		install();
		if (!outcome) onReady?.();
		const route = getRoute$1(router, match);
		try {
			await waitFor$1(outcome ? Promise.resolve().then(() => loadRouteChunk(route, kind === ERROR$1 ? "errorComponent" : "notFoundComponent")) : Promise.all([loadRouteChunk(route), loadRouteChunk(route, "notFoundComponent")]), controller.signal);
		} catch (cause) {
			if (cause === controller.signal && controller.signal.aborted) {
				discardBackground(router, lane);
				return CANCELED_OUTCOME;
			}
		}
		if (!outcome) match.status = "success";
		else if (redirectLimitExceeded) {
			controller.abort();
			await Promise.all([
				...tasks.map((task) => task[1]),
				...tasks.map((task) => task[2]),
				...(lane[2] ?? []).map((task) => task[1])
			]);
			discardBackground(router, lane);
			transferMatchResources(router, matches);
			install();
		}
	}
	return lane;
}
async function projectLane$1(router, lane, signal, start = 0, end = lane[1].length) {
	const matches = lane[1];
	for (let index = start; index < end; index++) {
		const match = matches[index];
		const routeOptions = getRoute$1(router, match).options;
		if (routeOptions.head || routeOptions.scripts) try {
			const context = {
				ssr: router.options.ssr,
				matches,
				match,
				params: match.params,
				loaderData: match.loaderData
			};
			const [head, scripts] = await waitFor$1(Promise.all([routeOptions.head?.(context), routeOptions.scripts?.(context)]), signal);
			match.meta = head?.meta;
			match.links = head?.links;
			match.headScripts = head?.scripts;
			match.styles = head?.styles;
			match.scripts = scripts;
		} catch (cause) {
			if (cause === signal && signal.aborted) break;
			console.error(cause);
		}
		if (match.status !== "success" || match._notFound) break;
	}
	return lane;
}
async function executeClientLane(router, location, matches, options) {
	const matched = [location, matches];
	const signal = options[0].signal;
	let reduced;
	try {
		const presented = router.stores.matches.get();
		let plannedBoundary = matches.findIndex((match) => match._notFound);
		if (router.options.notFoundMode !== "root" && plannedBoundary >= 0) {
			const boundary = await getNotFoundBoundary$1(router, matches, void 0, signal, plannedBoundary);
			matches[plannedBoundary]._notFound = void 0;
			matches[boundary]._notFound = true;
			plannedBoundary = boundary;
		}
		let end = plannedBoundary < 0 ? matches.length : plannedBoundary + 1;
		let retainedEnd = 0;
		while (retainedEnd < end && retainedEnd !== plannedBoundary) {
			const match = matches[retainedEnd];
			const committed = options[2][retainedEnd];
			const visible = presented[retainedEnd];
			if (committed?.id !== match.id || committed.status !== "success" || committed._notFound || match.preload || visible?.id !== match.id || visible.status !== "success" || visible._notFound) break;
			retainedEnd++;
		}
		const tasks = [];
		const start = options[6] ?? 0;
		let semanticParent = start ? Promise.resolve(matches[start - 1]) : void 0;
		const planSuccessfulLane = () => {
			for (let index = start; index < end; index++) {
				if (signal.aborted) break;
				semanticParent = createLoaderTask$1(router, matched, index, tasks, semanticParent, options, retainedEnd);
			}
		};
		const failure = await contextualize$1(router, matched, options, end, planSuccessfulLane, retainedEnd);
		if (failure) {
			options[4] = true;
			end = failure[0];
			if (failure[1][0] === NOT_FOUND$1) {
				const boundary = await getNotFoundBoundary$1(router, matches, failure, signal);
				failure[2] = boundary;
				end = Math.min(end, boundary + 1);
			} else if (failure[1][0] >= REDIRECTED$1) end = 0;
			planSuccessfulLane();
		}
		if (!signal.aborted && !options[3]) {
			const abort = [];
			for (const [id, flight] of router._flights ?? []) if (!flight[2]) {
				router._flights.delete(id);
				abort.push(flight[1]);
			}
			for (const controller of abort) controller.abort();
		}
		const reduction = reduceLane(router, matched, tasks, options[0], settleTasks(tasks, failure, matched[2]), options[7]);
		if (matched[2]?.length) matched[3] = settleTasks(matched[2], void 0, void 0, reduction.then((foreground) => isControl(foreground) ? 0 : _getRenderedMatches(matches).length, () => 0));
		reduced = await reduction;
	} catch (cause) {
		discardBackground(router, matched);
		if (cause === signal && signal.aborted) return CANCELED_OUTCOME;
		throw cause;
	}
	if (isControl(reduced)) return reduced;
	return projectLane$1(router, reduced, signal, options[6] === matches.length ? options[6] : 0);
}
async function preloadClientRoute(router, opts) {
	let location = router.buildLocation(opts);
	for (let redirects = 0;; redirects++) {
		const base = router._committed;
		const controller = new AbortController();
		let matches;
		let active;
		let result;
		try {
			try {
				matches = router.matchRoutes(location, { _controller: controller });
				acquireMatchResources(matches);
				active = (router._preloads ??= /* @__PURE__ */ new Map()).set(controller, matches);
				result = await executeClientLane(router, location, matches, [
					controller,
					redirects,
					base,
					true
				]);
			} finally {
				if (active) {
					active = active.delete(controller);
					transferMatchResources(router, matches);
				}
				controller.abort();
			}
			if (!isControl(result)) return result[1];
			if (!active || result.length < 3 || false) return;
			location = result[2];
		} catch (cause) {
			if (!isNotFound(cause)) console.error(cause);
			return;
		}
	}
}
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/await-signal.js
function waitForReason(value, signal, onLate) {
	const promise = Promise.resolve(value);
	if (signal.aborted) {
		if (!onLate) return Promise.race([Promise.reject(signal.reason), promise]);
		promise.then(onLate, () => {});
		return Promise.reject(signal.reason);
	}
	return new Promise((resolve, reject) => {
		const abort = () => reject(signal.reason);
		signal.addEventListener("abort", abort, { once: true });
		promise.then((result) => {
			if (signal.aborted) onLate?.(result);
			else resolve(result);
		}, reject).finally(() => signal.removeEventListener("abort", abort));
	});
}
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/load-server.js
var SUCCESS = 0;
var ERROR = 1;
var NOT_FOUND = 2;
var REDIRECTED = 3;
var SKIPPED = 4;
function getRoute(router, match) {
	return router.routesById[match.routeId];
}
function normalize(value, rejected) {
	if (isRedirect(value)) return [REDIRECTED, value];
	if (isNotFound(value)) return [NOT_FOUND, value];
	if (rejected && typeof value?.then === "function") value = new Error("A Promise was thrown", { cause: value });
	return rejected ? [ERROR, value] : [SUCCESS, value];
}
function normalizeError(router, lane, route, cause, signal, notify = true) {
	signal?.throwIfAborted();
	let outcome = normalize(cause, true);
	if (outcome[0] !== ERROR) return materializeRedirect(router, lane, route, outcome, signal, notify);
	try {
		route.options.onError?.(outcome[1]);
	} catch (onErrorCause) {
		outcome = normalize(onErrorCause, true);
	}
	signal?.throwIfAborted();
	return materializeRedirect(router, lane, route, outcome, signal, notify);
}
function materializeRedirect(router, lane, route, outcome, signal, notify = true) {
	if (outcome[0] !== REDIRECTED) return outcome;
	signal?.throwIfAborted();
	try {
		outcome[1].options._fromLocation = lane.location;
		router.resolveRedirect(outcome[1]);
		signal?.throwIfAborted();
		return outcome;
	} catch (cause) {
		signal?.throwIfAborted();
		return notify ? normalizeError(router, lane, route, cause, signal, false) : [ERROR, cause];
	}
}
function maybe(value, cause) {
	if (cause !== void 0) return {
		status: "error",
		error: cause
	};
	return {
		status: "success",
		value
	};
}
function navigateFrom(router, location) {
	return (options) => router.navigate({
		...options,
		_fromLocation: location
	});
}
function waitFor(value, signal) {
	return signal ? waitForReason(value, signal) : value;
}
async function resolveSsr(router, lane, index) {
	const match = lane.matches[index];
	const route = getRoute(router, match);
	const parentSsr = lane.matches[index - 1]?.ssr;
	if (router.isShell()) return route.id === rootRouteId;
	if (parentSsr === false) return false;
	const inherit = (value) => {
		return value === true && parentSsr === "data-only" ? "data-only" : value;
	};
	const defaultSsr = router.options.defaultSsr ?? true;
	const inheritedDefault = inherit(defaultSsr);
	match.ssr = inheritedDefault;
	const option = route.options.ssr;
	if (option === void 0) return inheritedDefault;
	if (typeof option !== "function") return inherit(option);
	return inherit(await option({
		search: maybe(match.search, match.searchError),
		params: maybe(match.params, match.paramsError),
		location: lane.location,
		matches: lane.matches.map((candidate) => ({
			index: candidate.index,
			pathname: candidate.pathname,
			fullPath: candidate.fullPath,
			staticData: candidate.staticData,
			id: candidate.id,
			routeId: candidate.routeId,
			search: maybe(candidate.search, candidate.searchError),
			params: maybe(candidate.params, candidate.paramsError),
			ssr: candidate.ssr
		}))
	}) ?? defaultSsr);
}
function stampNotFound(match, outcome) {
	if (outcome[0] === NOT_FOUND && !outcome[1].routeId) outcome[1].routeId = match.routeId;
	return outcome;
}
async function contextualize(router, lane, signal) {
	const globalBoundary = lane.matches.findIndex((match) => match._notFound);
	let end = globalBoundary < 0 ? lane.matches.length : globalBoundary + 1;
	let failure;
	let parentContext = { ...router.options.context ?? {} };
	for (let index = 0; index < end; index++) {
		const match = lane.matches[index];
		const route = getRoute(router, match);
		try {
			match.ssr = await resolveSsr(router, lane, index);
		} catch (cause) {
			signal?.throwIfAborted();
			failure = [index, stampNotFound(match, normalizeError(router, lane, route, cause, signal))];
			end = index;
		}
		signal?.throwIfAborted();
		if (failure?.[1][0] === REDIRECTED) break;
		match.__beforeLoadContext = void 0;
		let context = parentContext;
		try {
			let routeContext;
			if (route.options.context) {
				const routeContextOptions = {
					deps: match.loaderDeps,
					params: match.params,
					context: parentContext,
					location: lane.location,
					navigate: navigateFrom(router, lane.location),
					buildLocation: router.buildLocation,
					cause: match.cause,
					abortController: match.abortController,
					preload: false,
					matches: lane.matches,
					routeId: route.id
				};
				routeContext = route.options.context(routeContextOptions) ?? void 0;
			}
			context = {
				...parentContext,
				...routeContext
			};
			match.context = context;
		} catch (cause) {
			signal?.throwIfAborted();
			if (!failure) failure = [index, stampNotFound(match, normalizeError(router, lane, route, cause, signal))];
			end = index;
			break;
		}
		signal?.throwIfAborted();
		if (failure) break;
		const validationError = match.paramsError ?? match.searchError;
		if (validationError !== void 0) {
			failure = [index, stampNotFound(match, normalizeError(router, lane, route, validationError, signal))];
			end = index;
			break;
		}
		signal?.throwIfAborted();
		if (match.ssr === false || !route.options.beforeLoad) {
			parentContext = context;
			continue;
		}
		const abortController = match.abortController;
		const options = {
			search: match.search,
			abortController,
			params: match.params,
			preload: false,
			context,
			location: lane.location,
			navigate: navigateFrom(router, lane.location),
			buildLocation: router.buildLocation,
			cause: match.cause,
			matches: lane.matches,
			routeId: route.id,
			...router.options.additionalContext
		};
		try {
			const beforeLoadContext = await route.options.beforeLoad(options);
			signal?.throwIfAborted();
			const outcome = stampNotFound(match, materializeRedirect(router, lane, route, normalize(beforeLoadContext, false), signal));
			if (outcome[0] !== SUCCESS) {
				failure = [index, outcome];
				end = index;
				break;
			}
			match.__beforeLoadContext = beforeLoadContext;
			match.context = {
				...context,
				...beforeLoadContext
			};
			parentContext = match.context;
		} catch (cause) {
			signal?.throwIfAborted();
			failure = [index, stampNotFound(match, normalizeError(router, lane, route, cause, signal))];
			end = index;
			break;
		}
	}
	return {
		location: lane.location,
		matches: lane.matches,
		end,
		failure
	};
}
function getLoaderContext(router, lane, match, route, index, tasks) {
	return {
		params: match.params,
		deps: match.loaderDeps,
		preload: false,
		parentMatchPromise: tasks[index - 1]?.match,
		abortController: match.abortController,
		context: match.context,
		location: lane.location,
		navigate: navigateFrom(router, lane.location),
		cause: match.cause,
		route,
		...router.options.additionalContext
	};
}
function createLoaderTask(router, lane, index, tasks, signal) {
	const match = lane.matches[index];
	const route = getRoute(router, match);
	let outcome;
	if (match.ssr === false) outcome = Promise.resolve([SKIPPED]);
	else {
		const routeLoader = route.options.loader;
		const loader = typeof routeLoader === "function" ? routeLoader : routeLoader?.handler;
		if (!loader) outcome = Promise.resolve([SUCCESS, void 0]);
		else outcome = Promise.resolve().then(() => loader(getLoaderContext(router, lane, match, route, index, tasks))).then((result) => normalize(result, false), (cause) => normalize(cause, true)).then((result) => {
			if (signal?.aborted || match.abortController.signal.reason === lane) return [SKIPPED];
			if (result[0] === ERROR) result = normalizeError(router, lane, route, result[1], signal);
			else result = materializeRedirect(router, lane, route, result, signal);
			return stampNotFound(match, result);
		});
	}
	const parentMatch = outcome.then((result) => {
		const snapshot = { ...match };
		if (result[0] === SUCCESS) {
			snapshot.loaderData = result[1];
			snapshot.status = "success";
			snapshot.error = void 0;
			snapshot.invalid = false;
			snapshot.isFetching = false;
		} else if (result[0] === ERROR) {
			snapshot.status = "error";
			snapshot.error = result[1];
		} else if (result[0] === NOT_FOUND) {
			snapshot.status = "notFound";
			snapshot.error = result[1];
		}
		return snapshot;
	});
	return {
		index,
		outcome,
		match: parentMatch
	};
}
async function getNotFoundBoundary(router, matches, indexed, signal, fallback = 0) {
	const cause = indexed?.[1][1];
	let index = cause?.routeId ? matches.findIndex((match) => match.routeId === cause.routeId) : indexed?.[0] ?? matches.length - 1;
	if (index < 0) index = 0;
	for (let candidate = index; candidate >= 0; candidate--) {
		const route = getRoute(router, matches[candidate]);
		try {
			const loading = loadRouteChunk(route, false);
			if (loading) await loading;
		} catch {
			signal?.throwIfAborted();
		}
		signal?.throwIfAborted();
		if (route.options.notFoundComponent) return candidate;
	}
	return cause?.routeId ? index : fallback;
}
function abortMatches(matches, start = 0, reason) {
	for (let index = start; index < matches.length; index++) matches[index].abortController.abort(reason);
}
async function applyFailure(router, lane, indexed, signal) {
	if (!indexed) {
		const boundary = lane.matches.findIndex((match) => match._notFound);
		if (boundary >= 0) {
			abortMatches(lane.matches, boundary + 1);
			return {
				status: 404,
				boundary,
				kind: NOT_FOUND
			};
		}
		return { status: 200 };
	}
	const [index, outcome] = indexed;
	if (outcome[0] === ERROR) {
		const match = lane.matches[index];
		match._notFound = void 0;
		match.status = "error";
		match.error = outcome[1];
		match.isFetching = false;
		abortMatches(lane.matches, index + 1);
		return {
			status: 500,
			boundary: index,
			kind: ERROR
		};
	}
	const boundary = indexed[2] ?? await getNotFoundBoundary(router, lane.matches, indexed, signal);
	const match = lane.matches[boundary];
	const cause = outcome[1];
	cause.routeId = match.routeId;
	match._notFound = void 0;
	if (match.routeId === router.routeTree.id) {
		match.status = "success";
		match._notFound = true;
		match.error = cause;
	} else {
		match.status = "notFound";
		match.error = cause;
	}
	match.isFetching = false;
	abortMatches(lane.matches, boundary + 1);
	return {
		status: 404,
		boundary,
		kind: NOT_FOUND
	};
}
async function loadNormalChunks(router, lane, end, signal) {
	const chunks = [];
	for (let index = 0; index < lane.matches.length; index++) {
		const match = lane.matches[index];
		if (index >= end || match.ssr !== true || match.status !== "success") continue;
		const route = getRoute(router, match);
		try {
			const loading = loadRouteChunk(route);
			if (loading) {
				const chunk = loading.then(() => {
					signal?.throwIfAborted();
				}, (cause) => {
					signal?.throwIfAborted();
					return [index, stampNotFound(match, normalizeError(router, lane, route, cause, signal))];
				});
				chunk.catch(() => {});
				chunks.push(chunk);
			}
		} catch (cause) {
			signal?.throwIfAborted();
			chunks.push([index, stampNotFound(match, normalizeError(router, lane, route, cause, signal))]);
		}
	}
	for (const chunk of chunks) {
		const indexed = Array.isArray(chunk) ? chunk : await chunk;
		if (indexed) return indexed;
	}
}
async function projectLane(router, lane, signal) {
	for (const match of lane.matches) {
		const routeOptions = getRoute(router, match).options;
		if (routeOptions.head || routeOptions.scripts || routeOptions.headers) {
			const context = {
				ssr: router.options.ssr,
				matches: lane.matches,
				match,
				params: match.params,
				loaderData: match.loaderData
			};
			try {
				const [head, scripts, headers] = await Promise.all([
					routeOptions.head?.(context),
					routeOptions.scripts?.(context),
					routeOptions.headers?.(context)
				]);
				signal?.throwIfAborted();
				match.meta = head?.meta;
				match.links = head?.links;
				match.headScripts = head?.scripts;
				match.styles = head?.styles;
				match.scripts = scripts;
				match.headers = headers;
			} catch (cause) {
				signal?.throwIfAborted();
				console.error(cause);
			}
		}
		if (match.ssr === false || match.status !== "success" || match._notFound) break;
	}
}
async function executeServerLane(router, location, matchedMatches, signal) {
	const matched = {
		location,
		matches: matchedMatches.map((match) => ({
			...match,
			__beforeLoadContext: void 0,
			context: {},
			isFetching: false,
			abortController: new AbortController()
		}))
	};
	const abortLane = () => abortMatches(matched.matches, 0, signal?.reason);
	if (signal?.aborted) {
		abortLane();
		signal.throwIfAborted();
	}
	signal?.addEventListener("abort", abortLane, { once: true });
	try {
		const plannedGlobalBoundary = matched.matches.findIndex((match) => match._notFound);
		if (router.options.notFoundMode !== "root" && plannedGlobalBoundary >= 0) {
			const boundary = await getNotFoundBoundary(router, matched.matches, void 0, signal, plannedGlobalBoundary);
			if (boundary !== plannedGlobalBoundary) {
				matched.matches[plannedGlobalBoundary]._notFound = void 0;
				matched.matches[boundary]._notFound = true;
			}
		}
		const lane = await contextualize(router, matched, signal);
		signal?.throwIfAborted();
		let loaderEnd = lane.end;
		if (lane.failure?.[1][0] === REDIRECTED) loaderEnd = 0;
		else if (lane.failure?.[1][0] === NOT_FOUND) {
			lane.failure[2] = await getNotFoundBoundary(router, lane.matches, lane.failure, signal);
			loaderEnd = Math.min(loaderEnd, lane.failure[2] + 1);
		}
		const tasks = [];
		for (let index = 0; index < loaderEnd; index++) {
			const task = createLoaderTask(router, lane, index, tasks, signal);
			tasks.push(task);
		}
		let loaderFailure;
		let control = lane.failure?.[1][0] === REDIRECTED ? lane.failure : void 0;
		try {
			await Promise.all(tasks.map((task) => task.outcome.then((loadedOutcome) => {
				const match = lane.matches[task.index];
				const outcome = loadedOutcome;
				if (outcome[0] === SUCCESS) {
					match.loaderData = outcome[1];
					match.status = "success";
					match.error = void 0;
					match.invalid = false;
					match.isFetching = false;
					match.updatedAt = Date.now();
				} else if (outcome[0] === REDIRECTED) {
					control = [task.index, outcome];
					throw control;
				} else {
					if (match.ssr !== false) {
						match.status = "success";
						match.error = void 0;
						match.invalid = true;
						match.isFetching = false;
					}
					if (!loaderFailure && outcome[0] !== SKIPPED) loaderFailure = [task.index, outcome];
				}
			})));
		} catch (cause) {
			if (!Array.isArray(cause)) throw cause;
			control = cause;
		}
		signal?.throwIfAborted();
		if (control?.[1][0] === REDIRECTED) {
			abortMatches(lane.matches, 0, lane);
			return {
				type: "redirect",
				redirect: control[1][1]
			};
		}
		let failure = lane.failure ?? loaderFailure;
		const plannedBoundary = lane.matches.findIndex((match) => match._notFound);
		let readinessEnd;
		if (failure) {
			const outcomeEnd = failure[2] ??= failure[1][0] === NOT_FOUND ? await getNotFoundBoundary(router, lane.matches, failure, signal) : failure[0];
			for (const task of tasks) {
				if (task.index >= outcomeEnd) break;
				const outcome = await task.outcome;
				if (outcome[0] !== SUCCESS && outcome[0] < REDIRECTED && !("loaderData" in lane.matches[task.index])) {
					failure = [task.index, outcome];
					failure[2] = outcome[0] === NOT_FOUND ? await getNotFoundBoundary(router, lane.matches, failure, signal) : task.index;
					break;
				}
			}
			readinessEnd = failure[2];
		} else readinessEnd = plannedBoundary < 0 ? lane.matches.length : plannedBoundary;
		const requiredFailure = await loadNormalChunks(router, lane, readinessEnd, signal);
		signal?.throwIfAborted();
		if (requiredFailure) {
			if (requiredFailure[1][0] === REDIRECTED) {
				abortMatches(lane.matches);
				return {
					type: "redirect",
					redirect: requiredFailure[1][1]
				};
			}
			failure = requiredFailure;
		}
		const terminal = await applyFailure(router, lane, failure, signal);
		if (terminal.boundary !== void 0) {
			const match = lane.matches[terminal.boundary];
			if (match.ssr === true) {
				const route = getRoute(router, match);
				try {
					if (terminal.kind === ERROR) await loadRouteChunk(route, "errorComponent");
					else if (match._notFound) await Promise.all([loadRouteChunk(route), loadRouteChunk(route, "notFoundComponent")]);
					else await loadRouteChunk(route, "notFoundComponent");
				} catch {}
				signal?.throwIfAborted();
			}
		}
		signal?.throwIfAborted();
		await projectLane(router, {
			location: lane.location,
			matches: lane.matches
		}, signal);
		signal?.throwIfAborted();
		router.serverSsr?.onCleanup(abortLane);
		return {
			type: "render",
			status: terminal.status,
			matches: lane.matches
		};
	} finally {
		signal?.removeEventListener("abort", abortLane);
	}
}
async function loadServerRoute(router, opts) {
	router.updateLatestLocation();
	const next = router.latestLocation;
	const previous = router._committed;
	let result;
	try {
		const canonical = router.buildLocation({
			to: next.pathname,
			search: true,
			params: true,
			hash: true,
			state: true,
			_includeValidateSearch: true
		});
		if (next.publicHref !== canonical.publicHref) throw redirect({ href: canonical.publicHref || "/" });
		const changeInfo = getLocationChangeInfo(next, router.stores.resolvedLocation.get());
		router.emit({
			type: "onBeforeNavigate",
			...changeInfo
		});
		router.emit({
			type: "onBeforeLoad",
			...changeInfo
		});
		opts?._signal?.throwIfAborted();
		result = await waitFor(executeServerLane(router, next, router.matchRoutes(next), opts?._signal), opts?._signal);
		opts?._signal?.throwIfAborted();
	} catch (cause) {
		opts?._signal?.throwIfAborted();
		if (!isRedirect(cause)) throw cause;
		cause.options._fromLocation = next;
		result = {
			type: "redirect",
			redirect: router.resolveRedirect(cause)
		};
	}
	router._serverResult = result;
	router.batch(() => {
		router.stores.location.set(next);
		router.stores.status.set("idle");
		if (result.type === "render") {
			router.stores.setMatches(result.matches);
			router.stores.resolvedLocation.set(next);
		}
	});
	if (result.type === "render") {
		router._committed = result.matches;
		runRouteLifecycle(router, previous, result.matches);
	}
	router._commitPromise?.resolve();
	router._commitPromise = void 0;
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/utils.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* React.use if available (React 19+), undefined otherwise.
* Use dynamic lookup to avoid Webpack compilation errors with React 18.
*/
var reactUse = import_react["use"];
var useLayoutEffect = import_react.useEffect;
/**
* React hook to take a `React.ForwardedRef` and returns a `ref` that can be used on a DOM element.
*
* @param ref - The forwarded ref
* @returns The inner ref returned by `useRef`
* @example
* ```tsx
* const MyComponent = React.forwardRef((props, ref) => {
*  const innerRef = useForwardedRef(ref)
*  return <div ref={innerRef} />
* })
* ```
*/
function useForwardedRef(ref) {
	const innerRef = import_react.useRef(null);
	import_react.useImperativeHandle(ref, () => innerRef.current, []);
	return innerRef;
}
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/manifest.js
function getAssetCrossOrigin(assetCrossOrigin, kind) {
	if (!assetCrossOrigin) return;
	if (typeof assetCrossOrigin === "string") return assetCrossOrigin;
	return assetCrossOrigin[kind];
}
function getManifestScriptFormat(manifest) {
	return manifest?.scriptFormat ?? "module";
}
function getScriptPreloadAttrs(manifest, link, assetCrossOrigin) {
	const preloadLink = resolveManifestAssetLink(link);
	const crossOrigin = getAssetCrossOrigin(assetCrossOrigin, "script") ?? preloadLink.crossOrigin;
	return {
		...getManifestScriptFormat(manifest) === "iife" ? {
			rel: "preload",
			as: "script"
		} : { rel: "modulepreload" },
		href: preloadLink.href,
		...crossOrigin ? { crossOrigin } : {}
	};
}
function resolveManifestAssetLink(link) {
	if (typeof link === "string") return {
		href: link,
		crossOrigin: void 0
	};
	return link;
}
function appendUniqueUserTags(target, tags) {
	if (tags.length === 0) return;
	if (tags.length === 1) {
		target.push(tags[0]);
		return;
	}
	const seen = /* @__PURE__ */ new Set();
	for (const tag of tags) {
		const key = JSON.stringify(tag);
		if (seen.has(key)) continue;
		seen.add(key);
		target.push(tag);
	}
}
function getStylesheetHref(asset) {
	return resolveManifestCssLink(asset).href;
}
function resolveManifestCssLink(link) {
	if (typeof link === "string") return {
		href: link,
		crossOrigin: void 0
	};
	return link;
}
function createInlineCssStyleAsset(css) {
	return {
		attrs: { suppressHydrationWarning: true },
		children: css
	};
}
function createInlineCssPlaceholderAsset() {
	return { attrs: { suppressHydrationWarning: true } };
}
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/route.js
var BaseRoute = class {
	get to() {
		return this._to;
	}
	get id() {
		return this._id;
	}
	get path() {
		return this._path;
	}
	get fullPath() {
		return this._fullPath;
	}
	constructor(options) {
		this.init = (opts) => {
			this.originalIndex = opts.originalIndex;
			const options = this.options;
			const isRoot = !options?.path && !options?.id;
			this.parentRoute = this.options.getParentRoute?.();
			if (isRoot) this._path = rootRouteId;
			else if (!this.parentRoute) invariant();
			let path = isRoot ? rootRouteId : options?.path;
			if (path && path !== "/") path = trimPathLeft(path);
			const customId = options?.id || path;
			let id = isRoot ? rootRouteId : joinPaths([this.parentRoute.id === "__root__" ? "" : this.parentRoute.id, customId]);
			if (path === "__root__") path = "/";
			if (id !== "__root__") id = joinPaths(["/", id]);
			const fullPath = id === "__root__" ? "/" : joinPaths([this.parentRoute.fullPath, path]);
			this._path = path;
			this._id = id;
			this._fullPath = fullPath;
			this._to = trimPathRight(fullPath);
		};
		this.addChildren = (children) => {
			return this._addFileChildren(children);
		};
		this._addFileChildren = (children) => {
			if (Array.isArray(children)) this.children = children;
			if (typeof children === "object" && children !== null) this.children = Object.values(children);
			return this;
		};
		this._addFileTypes = () => {
			return this;
		};
		this.updateLoader = (options) => {
			Object.assign(this.options, options);
			return this;
		};
		this.update = (options) => {
			Object.assign(this.options, options);
			return this;
		};
		this.lazy = (lazyFn) => {
			this.lazyFn = lazyFn;
			return this;
		};
		this.redirect = (opts) => redirect({
			from: this.fullPath,
			...opts
		});
		this.options = options || {};
		this.isRoot = !options?.getParentRoute;
		if (options?.id && options?.path) throw new Error(`Route cannot have both an 'id' and a 'path' option.`);
	}
};
var BaseRootRoute = class extends BaseRoute {
	constructor(options) {
		super(options);
	}
};
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/ssr/constants.js
var GLOBAL_TSR = "$_TSR";
var TSR_SCRIPT_BARRIER_ID = "$tsr-stream-barrier";
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/CatchBoundary.js
var import_jsx_runtime = require_jsx_runtime();
var CatchBoundary = class extends import_react.Component {
	constructor(..._args) {
		super(..._args);
		this.state = { error: null };
		this.reset = () => {
			this.setState({ error: null });
		};
	}
	static getDerivedStateFromProps(props, state) {
		const resetKey = props.getResetKey();
		if (state.error && state.resetKey !== resetKey) return {
			resetKey,
			error: null
		};
		return { resetKey };
	}
	static getDerivedStateFromError(error) {
		return { error };
	}
	componentDidCatch(error, errorInfo) {
		this.props.onCatch?.(error, errorInfo);
	}
	render() {
		const error = this.state.error;
		if (error) return import_react.createElement(this.props.errorComponent ?? ErrorComponent, {
			error,
			reset: this.reset
		});
		return this.props.children;
	}
};
function ErrorComponent({ error }) {
	const [show, setShow] = import_react.useState(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			padding: ".5rem",
			maxWidth: "100%"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					alignItems: "center",
					gap: ".5rem"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					style: { fontSize: "1rem" },
					children: "Something went wrong!"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					style: {
						appearance: "none",
						fontSize: ".6em",
						border: "1px solid currentColor",
						padding: ".1rem .2rem",
						fontWeight: "bold",
						borderRadius: ".25rem"
					},
					onClick: () => setShow((d) => !d),
					children: show ? "Hide Error" : "Show Error"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: ".25rem" } }),
			show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				style: {
					fontSize: ".7em",
					border: "1px solid red",
					borderRadius: ".25rem",
					padding: ".3rem",
					color: "red",
					overflow: "auto"
				},
				children: error.message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: error.message }) : null
			}) }) : null
		]
	});
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/ClientOnly.js
/**
* Render the children only after the JS has loaded client-side. Use an optional
* fallback component if the JS is not yet loaded.
*
* @example
* Render a Chart component if JS loads, renders a simple FakeChart
* component server-side or if there is no JS. The FakeChart can have only the
* UI without the behavior or be a loading spinner or skeleton.
*
* ```tsx
* return (
*   <ClientOnly fallback={<FakeChart />}>
*     <Chart />
*   </ClientOnly>
* )
* ```
*/
function ClientOnly({ children, fallback = null }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: useHydrated() ? children : fallback });
}
/**
* Return a boolean indicating if the JS has been hydrated already.
* When doing Server-Side Rendering, the result will always be false.
* When doing Client-Side Rendering, the result will always be false on the
* first render and true from then on. Even if a new component renders it will
* always start with true.
*
* @example
* ```tsx
* // Disable a button that needs JS to work.
* let hydrated = useHydrated()
* return (
*   <button type="button" disabled={!hydrated} onClick={doSomethingCustom}>
*     Click me
*   </button>
* )
* ```
* @returns True if the JS has been hydrated already, false otherwise.
*/
function useHydrated() {
	return import_react.useSyncExternalStore(subscribe, () => true, () => false);
}
function subscribe() {
	return () => {};
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/routerContext.js
var routerContext = import_react.createContext(null);
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/useRouter.js
/**
* Access the current TanStack Router instance from React context.
* Must be used within a `RouterProvider`.
*
* Options:
* - `warn`: Log a warning if no router context is found (default: true).
*
* @returns The registered router instance.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useRouterHook
*/
function useRouter(opts) {
	return import_react.useContext(routerContext);
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/matchContext.js
var matchContext = import_react.createContext(void 0);
var dummyMatchContext = import_react.createContext(void 0);
//#endregion
//#region node_modules/@tanstack/store/dist/esm/alien.js
var ReactiveFlags = /* @__PURE__ */ ((ReactiveFlags2) => {
	ReactiveFlags2[ReactiveFlags2["None"] = 0] = "None";
	ReactiveFlags2[ReactiveFlags2["Mutable"] = 1] = "Mutable";
	ReactiveFlags2[ReactiveFlags2["Watching"] = 2] = "Watching";
	ReactiveFlags2[ReactiveFlags2["RecursedCheck"] = 4] = "RecursedCheck";
	ReactiveFlags2[ReactiveFlags2["Recursed"] = 8] = "Recursed";
	ReactiveFlags2[ReactiveFlags2["Dirty"] = 16] = "Dirty";
	ReactiveFlags2[ReactiveFlags2["Pending"] = 32] = "Pending";
	return ReactiveFlags2;
})(ReactiveFlags || {});
// @__NO_SIDE_EFFECTS__
function createReactiveSystem({ update, notify, unwatched }) {
	return {
		link,
		unlink,
		propagate,
		checkDirty,
		shallowPropagate
	};
	function link(dep, sub, version) {
		const prevDep = sub.depsTail;
		if (prevDep !== void 0 && prevDep.dep === dep) return;
		const nextDep = prevDep !== void 0 ? prevDep.nextDep : sub.deps;
		if (nextDep !== void 0 && nextDep.dep === dep) {
			nextDep.version = version;
			sub.depsTail = nextDep;
			return;
		}
		const prevSub = dep.subsTail;
		if (prevSub !== void 0 && prevSub.version === version && prevSub.sub === sub) return;
		const newLink = sub.depsTail = dep.subsTail = {
			version,
			dep,
			sub,
			prevDep,
			nextDep,
			prevSub,
			nextSub: void 0
		};
		if (nextDep !== void 0) nextDep.prevDep = newLink;
		if (prevDep !== void 0) prevDep.nextDep = newLink;
		else sub.deps = newLink;
		if (prevSub !== void 0) prevSub.nextSub = newLink;
		else dep.subs = newLink;
	}
	function unlink(link2, sub = link2.sub) {
		const dep = link2.dep;
		const prevDep = link2.prevDep;
		const nextDep = link2.nextDep;
		const nextSub = link2.nextSub;
		const prevSub = link2.prevSub;
		if (nextDep !== void 0) nextDep.prevDep = prevDep;
		else sub.depsTail = prevDep;
		if (prevDep !== void 0) prevDep.nextDep = nextDep;
		else sub.deps = nextDep;
		if (nextSub !== void 0) nextSub.prevSub = prevSub;
		else dep.subsTail = prevSub;
		if (prevSub !== void 0) prevSub.nextSub = nextSub;
		else if ((dep.subs = nextSub) === void 0) unwatched(dep);
		return nextDep;
	}
	function propagate(link2) {
		let next = link2.nextSub;
		let stack;
		top: do {
			const sub = link2.sub;
			let flags = sub.flags;
			if (!(flags & 60)) sub.flags = flags | 32;
			else if (!(flags & 12)) flags = 0;
			else if (!(flags & 4)) sub.flags = flags & -9 | 32;
			else if (!(flags & 48) && isValidLink(link2, sub)) {
				sub.flags = flags | 40;
				flags &= 1;
			} else flags = 0;
			if (flags & 2) notify(sub);
			if (flags & 1) {
				const subSubs = sub.subs;
				if (subSubs !== void 0) {
					const nextSub = (link2 = subSubs).nextSub;
					if (nextSub !== void 0) {
						stack = {
							value: next,
							prev: stack
						};
						next = nextSub;
					}
					continue;
				}
			}
			if ((link2 = next) !== void 0) {
				next = link2.nextSub;
				continue;
			}
			while (stack !== void 0) {
				link2 = stack.value;
				stack = stack.prev;
				if (link2 !== void 0) {
					next = link2.nextSub;
					continue top;
				}
			}
			break;
		} while (true);
	}
	function checkDirty(link2, sub) {
		let stack;
		let checkDepth = 0;
		let dirty = false;
		top: do {
			const dep = link2.dep;
			const flags = dep.flags;
			if (sub.flags & 16) dirty = true;
			else if ((flags & 17) === 17) {
				if (update(dep)) {
					const subs = dep.subs;
					if (subs.nextSub !== void 0) shallowPropagate(subs);
					dirty = true;
				}
			} else if ((flags & 33) === 33) {
				if (link2.nextSub !== void 0 || link2.prevSub !== void 0) stack = {
					value: link2,
					prev: stack
				};
				link2 = dep.deps;
				sub = dep;
				++checkDepth;
				continue;
			}
			if (!dirty) {
				const nextDep = link2.nextDep;
				if (nextDep !== void 0) {
					link2 = nextDep;
					continue;
				}
			}
			while (checkDepth--) {
				const firstSub = sub.subs;
				const hasMultipleSubs = firstSub.nextSub !== void 0;
				if (hasMultipleSubs) {
					link2 = stack.value;
					stack = stack.prev;
				} else link2 = firstSub;
				if (dirty) {
					if (update(sub)) {
						if (hasMultipleSubs) shallowPropagate(firstSub);
						sub = link2.sub;
						continue;
					}
					dirty = false;
				} else sub.flags &= -33;
				sub = link2.sub;
				const nextDep = link2.nextDep;
				if (nextDep !== void 0) {
					link2 = nextDep;
					continue top;
				}
			}
			return dirty;
		} while (true);
	}
	function shallowPropagate(link2) {
		do {
			const sub = link2.sub;
			const flags = sub.flags;
			if ((flags & 48) === 32) {
				sub.flags = flags | 16;
				if ((flags & 6) === 2) notify(sub);
			}
		} while ((link2 = link2.nextSub) !== void 0);
	}
	function isValidLink(checkLink, sub) {
		let link2 = sub.depsTail;
		while (link2 !== void 0) {
			if (link2 === checkLink) return true;
			link2 = link2.prevDep;
		}
		return false;
	}
}
var queuedEffects = [];
var { link, unlink, propagate, checkDirty, shallowPropagate } = /* @__PURE__ */ createReactiveSystem({
	update(atom) {
		return atom._update();
	},
	notify(effect2) {
		queuedEffects[queuedEffectsLength++] = effect2;
		effect2.flags &= ~ReactiveFlags.Watching;
	},
	unwatched(atom) {
		if (atom.depsTail !== void 0) {
			atom.depsTail = void 0;
			atom.flags = ReactiveFlags.Mutable | ReactiveFlags.Dirty;
			purgeDeps(atom);
		}
	}
});
var queuedEffectsLength = 0;
function purgeDeps(sub) {
	const depsTail = sub.depsTail;
	let dep = depsTail !== void 0 ? depsTail.nextDep : sub.deps;
	while (dep !== void 0) dep = unlink(dep, sub);
}
//#endregion
//#region node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js
/**
* @license React
* use-sync-external-store-shim.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_use_sync_external_store_shim_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react();
	function is(x, y) {
		return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
	}
	var objectIs = "function" === typeof Object.is ? Object.is : is;
	var useState = React.useState;
	var useEffect = React.useEffect;
	var useLayoutEffect = React.useLayoutEffect;
	var useDebugValue = React.useDebugValue;
	function useSyncExternalStore$2(subscribe, getSnapshot) {
		var value = getSnapshot(), _useState = useState({ inst: {
			value,
			getSnapshot
		} }), inst = _useState[0].inst, forceUpdate = _useState[1];
		useLayoutEffect(function() {
			inst.value = value;
			inst.getSnapshot = getSnapshot;
			checkIfSnapshotChanged(inst) && forceUpdate({ inst });
		}, [
			subscribe,
			value,
			getSnapshot
		]);
		useEffect(function() {
			checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			return subscribe(function() {
				checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			});
		}, [subscribe]);
		useDebugValue(value);
		return value;
	}
	function checkIfSnapshotChanged(inst) {
		var latestGetSnapshot = inst.getSnapshot;
		inst = inst.value;
		try {
			var nextValue = latestGetSnapshot();
			return !objectIs(inst, nextValue);
		} catch (error) {
			return !0;
		}
	}
	function useSyncExternalStore$1(subscribe, getSnapshot) {
		return getSnapshot();
	}
	var shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
	exports.useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
}));
//#endregion
//#region node_modules/use-sync-external-store/shim/index.js
var require_shim = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_use_sync_external_store_shim_production();
}));
//#endregion
//#region node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js
/**
* @license React
* use-sync-external-store-shim/with-selector.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_with_selector_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react();
	var shim = require_shim();
	function is(x, y) {
		return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
	}
	var objectIs = "function" === typeof Object.is ? Object.is : is;
	var useSyncExternalStore = shim.useSyncExternalStore;
	var useRef = React.useRef;
	var useEffect = React.useEffect;
	var useMemo = React.useMemo;
	var useDebugValue = React.useDebugValue;
	exports.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
		var instRef = useRef(null);
		if (null === instRef.current) {
			var inst = {
				hasValue: !1,
				value: null
			};
			instRef.current = inst;
		} else inst = instRef.current;
		instRef = useMemo(function() {
			function memoizedSelector(nextSnapshot) {
				if (!hasMemo) {
					hasMemo = !0;
					memoizedSnapshot = nextSnapshot;
					nextSnapshot = selector(nextSnapshot);
					if (void 0 !== isEqual && inst.hasValue) {
						var currentSelection = inst.value;
						if (isEqual(currentSelection, nextSnapshot)) return memoizedSelection = currentSelection;
					}
					return memoizedSelection = nextSnapshot;
				}
				currentSelection = memoizedSelection;
				if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
				var nextSelection = selector(nextSnapshot);
				if (void 0 !== isEqual && isEqual(currentSelection, nextSelection)) return memoizedSnapshot = nextSnapshot, currentSelection;
				memoizedSnapshot = nextSnapshot;
				return memoizedSelection = nextSelection;
			}
			var hasMemo = !1, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
			return [function() {
				return memoizedSelector(getSnapshot());
			}, null === maybeGetServerSnapshot ? void 0 : function() {
				return memoizedSelector(maybeGetServerSnapshot());
			}];
		}, [
			getSnapshot,
			getServerSnapshot,
			selector,
			isEqual
		]);
		var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
		useEffect(function() {
			inst.hasValue = !0;
			inst.value = value;
		}, [value]);
		useDebugValue(value);
		return value;
	};
}));
(/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_with_selector_production();
})))();
/**
* Read and select the nearest or targeted route match.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useMatchHook
*/
function useMatch(opts) {
	const router = useRouter();
	const nearestRouteId = import_react.useContext(opts.from ? dummyMatchContext : matchContext);
	const routeId = opts.from ?? nearestRouteId;
	const matchStore = router.stores.getMatchStore(routeId);
	{
		const match = matchStore.get();
		if (!match) {
			if (opts.shouldThrow ?? true) invariant();
			return;
		}
		return opts.select ? opts.select(match) : match;
	}
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/useLoaderData.js
/**
* Read and select the current route's loader data with type‑safety.
*
* Options:
* - `from`/`strict`: Choose which route's data to read and strictness
* - `select`: Map the loader data to a derived value
* - `structuralSharing`: Enable structural sharing for stable references
*
* @returns The loader data (or selected value) for the matched route.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useLoaderDataHook
*/
function useLoaderData(opts) {
	return useMatch({
		from: opts.from,
		strict: opts.strict,
		structuralSharing: opts.structuralSharing,
		select: (match) => {
			return opts.select ? opts.select(match.loaderData) : match.loaderData;
		}
	});
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/useLoaderDeps.js
/**
* Read and select the current route's loader dependencies object.
*
* Options:
* - `from`: Choose which route's loader deps to read
* - `select`: Map the deps to a derived value
* - `structuralSharing`: Enable structural sharing for stable references
*
* @returns The loader deps (or selected value) for the matched route.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useLoaderDepsHook
*/
function useLoaderDeps(opts) {
	const { select, ...rest } = opts;
	return useMatch({
		...rest,
		select: (match) => {
			return select ? select(match.loaderDeps) : match.loaderDeps;
		}
	});
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/useParams.js
/**
* Access the current route's path parameters with type-safety.
*
* Options:
* - `from`/`strict`: Specify the matched route and whether to enforce strict typing
* - `select`: Project the params object to a derived value for memoized renders
* - `structuralSharing`: Enable structural sharing for stable references
* - `shouldThrow`: Throw if the route is not found in strict contexts
*
* @returns The params object (or selected value) for the matched route.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useParamsHook
*/
function useParams(opts) {
	return useMatch({
		from: opts.from,
		shouldThrow: opts.shouldThrow,
		structuralSharing: opts.structuralSharing,
		strict: opts.strict,
		select: (match) => {
			const params = opts.strict === false ? match.params : match._strictParams;
			return opts.select ? opts.select(params) : params;
		}
	});
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/useSearch.js
/**
* Read and select the current route's search parameters with type-safety.
*
* Options:
* - `from`/`strict`: Control which route's search is read and how strictly it's typed
* - `select`: Map the search object to a derived value for render optimization
* - `structuralSharing`: Enable structural sharing for stable references
* - `shouldThrow`: Throw when the route is not found (strict contexts)
*
* @returns The search object (or selected value) for the matched route.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useSearchHook
*/
function useSearch(opts) {
	return useMatch({
		from: opts.from,
		strict: opts.strict,
		shouldThrow: opts.shouldThrow,
		structuralSharing: opts.structuralSharing,
		select: (match) => {
			return opts.select ? opts.select(match.search) : match.search;
		}
	});
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/useNavigate.js
/**
* Imperative navigation hook.
*
* Returns a stable `navigate(options)` function to change the current location
* programmatically. Prefer the `Link` component for user-initiated navigation,
* and use this hook from effects, callbacks, or handlers where imperative
* navigation is required.
*
* Options:
* - `from`: Optional route base used to resolve relative `to` paths.
*
* @returns A function that accepts `NavigateOptions`.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useNavigateHook
*/
function useNavigate(_defaultOpts) {
	const router = useRouter();
	return import_react.useCallback((options) => {
		return router.navigate({
			...options,
			from: options.from ?? _defaultOpts?.from
		});
	}, [_defaultOpts?.from, router]);
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/useRouteContext.js
function useRouteContext(opts) {
	return useMatch({
		...opts,
		select: (match) => opts.select ? opts.select(match.context) : match.context
	});
}
/**
* Build anchor-like props for declarative navigation and preloading.
*
* Returns stable `href`, event handlers and accessibility props derived from
* router options and active state. Used internally by `Link` and custom links.
*
* Options cover `to`, `params`, `search`, `hash`, `state`, `preload`,
* `activeProps`, `inactiveProps`, and more.
*
* @returns React anchor props suitable for `<a>` or custom components.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useLinkPropsHook
*/
function useLinkProps(options, forwardedRef) {
	const router = useRouter();
	const innerRef = useForwardedRef(forwardedRef);
	const { activeProps, inactiveProps, activeOptions, to, preload: userPreload, preloadDelay: userPreloadDelay, preloadIntentProximity: _preloadIntentProximity, hashScrollIntoView, replace, startTransition, resetScroll, viewTransition, children, target, disabled, style, className, onClick, onBlur, onFocus, onMouseEnter, onMouseLeave, onTouchStart, ignoreBlocker, params: _params, search: _search, hash: _hash, state: _state, mask: _mask, reloadDocument: _reloadDocument, unsafeRelative: _unsafeRelative, from: _from, _fromLocation, ...propsSafeToSpread } = options;
	{
		const safeInternal = isSafeInternal(to);
		if (typeof to === "string" && !safeInternal && to.indexOf(":") > -1) try {
			new URL(to);
			if (isDangerousProtocol(to, router.protocolAllowlist)) return {
				...propsSafeToSpread,
				ref: innerRef,
				href: void 0,
				...children && { children },
				...target && { target },
				...disabled && { disabled },
				...style && { style },
				...className && { className }
			};
			return {
				...propsSafeToSpread,
				ref: innerRef,
				href: to,
				...children && { children },
				...target && { target },
				...disabled && { disabled },
				...style && { style },
				...className && { className }
			};
		} catch {}
		const next = router.buildLocation({
			...options,
			from: options.from
		});
		const hrefOption = getHrefOption(next.maskedLocation ? next.maskedLocation.publicHref : next.publicHref, next.maskedLocation ? next.maskedLocation.external : next.external, router.history, disabled);
		const externalLink = (() => {
			if (hrefOption?.external) {
				if (isDangerousProtocol(hrefOption.href, router.protocolAllowlist)) return;
				return hrefOption.href;
			}
			if (safeInternal) return void 0;
			if (typeof to === "string" && to.indexOf(":") > -1) try {
				new URL(to);
				if (isDangerousProtocol(to, router.protocolAllowlist)) return;
				return to;
			} catch {}
		})();
		const isActive = (() => {
			if (externalLink) return false;
			const currentLocation = router.stores.location.get();
			const exact = activeOptions?.exact ?? false;
			if (exact) {
				if (!exactPathTest(currentLocation.pathname, next.pathname, router.basepath)) return false;
			} else {
				const currentPathSplit = removeTrailingSlash(currentLocation.pathname, router.basepath);
				const nextPathSplit = removeTrailingSlash(next.pathname, router.basepath);
				if (!(currentPathSplit.startsWith(nextPathSplit) && (currentPathSplit.length === nextPathSplit.length || currentPathSplit[nextPathSplit.length] === "/"))) return false;
			}
			if (activeOptions?.includeSearch ?? true) {
				if (currentLocation.search !== next.search) {
					const currentSearchEmpty = !currentLocation.search || typeof currentLocation.search === "object" && !hasKeys(currentLocation.search);
					const nextSearchEmpty = !next.search || typeof next.search === "object" && !hasKeys(next.search);
					if (!(currentSearchEmpty && nextSearchEmpty)) {
						if (!deepEqual(currentLocation.search, next.search, {
							partial: !exact,
							ignoreUndefined: !activeOptions?.explicitUndefined
						})) return false;
					}
				}
			}
			if (activeOptions?.includeHash) return false;
			return true;
		})();
		if (externalLink) return {
			...propsSafeToSpread,
			ref: innerRef,
			href: externalLink,
			...children && { children },
			...target && { target },
			...disabled && { disabled },
			...style && { style },
			...className && { className }
		};
		const resolvedActiveProps = isActive ? functionalUpdate(activeProps, {}) ?? STATIC_ACTIVE_OBJECT : STATIC_EMPTY_OBJECT;
		const resolvedInactiveProps = isActive ? STATIC_EMPTY_OBJECT : functionalUpdate(inactiveProps, {}) ?? STATIC_EMPTY_OBJECT;
		const resolvedStyle = (() => {
			const baseStyle = style;
			const activeStyle = resolvedActiveProps.style;
			const inactiveStyle = resolvedInactiveProps.style;
			if (!baseStyle && !activeStyle && !inactiveStyle) return;
			if (baseStyle && !activeStyle && !inactiveStyle) return baseStyle;
			if (!baseStyle && activeStyle && !inactiveStyle) return activeStyle;
			if (!baseStyle && !activeStyle && inactiveStyle) return inactiveStyle;
			return {
				...baseStyle,
				...activeStyle,
				...inactiveStyle
			};
		})();
		const resolvedClassName = (() => {
			const baseClassName = className;
			const activeClassName = resolvedActiveProps.className;
			const inactiveClassName = resolvedInactiveProps.className;
			if (!baseClassName && !activeClassName && !inactiveClassName) return "";
			let out = "";
			if (baseClassName) out = baseClassName;
			if (activeClassName) out = out ? `${out} ${activeClassName}` : activeClassName;
			if (inactiveClassName) out = out ? `${out} ${inactiveClassName}` : inactiveClassName;
			return out;
		})();
		return {
			...propsSafeToSpread,
			...resolvedActiveProps,
			...resolvedInactiveProps,
			href: hrefOption?.href,
			ref: innerRef,
			disabled: !!disabled,
			target,
			...resolvedStyle && { style: resolvedStyle },
			...resolvedClassName && { className: resolvedClassName },
			...disabled && STATIC_DISABLED_PROPS,
			...isActive && STATIC_ACTIVE_PROPS
		};
	}
}
var STATIC_EMPTY_OBJECT = {};
var STATIC_ACTIVE_OBJECT = { className: "active" };
var STATIC_DISABLED_PROPS = {
	role: "link",
	"aria-disabled": true
};
var STATIC_ACTIVE_PROPS = {
	"data-status": "active",
	"aria-current": "page"
};
function getHrefOption(publicHref, external, history, disabled) {
	if (disabled) return void 0;
	if (external) return {
		href: publicHref,
		external: true
	};
	return {
		href: history.createHref(publicHref) || "/",
		external: false
	};
}
function isSafeInternal(to) {
	if (typeof to !== "string") return false;
	const zero = to.charCodeAt(0);
	if (zero === 47) return to.charCodeAt(1) !== 47;
	return zero === 46;
}
/**
* A strongly-typed anchor component for declarative navigation.
* Handles path, search, hash and state updates with optional route preloading
* and active-state styling.
*
* Props:
* - `preload`: Controls route preloading (eg. 'intent', 'render', 'viewport', true/false)
* - `preloadDelay`: Delay in ms before preloading on focus, hover, or viewport entry
* - `activeProps`/`inactiveProps`: Additional props merged when link is active/inactive
* - `resetScroll`/`hashScrollIntoView`: Control scroll behavior on navigation
* - `viewTransition`/`startTransition`: Use View Transitions/React transitions for navigation
* - `ignoreBlocker`: Bypass registered blockers
*
* @returns An anchor-like element that navigates without full page reloads.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/linkComponent
*/
var Link = import_react.forwardRef((props, ref) => {
	const { _asChild, ...rest } = props;
	const { type: _type, ...linkProps } = useLinkProps(rest, ref);
	const children = typeof rest.children === "function" ? rest.children({ isActive: linkProps["data-status"] === "active" }) : rest.children;
	if (!_asChild) {
		const { disabled: _, ...rest } = linkProps;
		return import_react.createElement("a", rest, children);
	}
	return import_react.createElement(_asChild, linkProps, children);
});
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/route.js
var Route = class extends BaseRoute {
	/**
	* @deprecated Use the `createRoute` function instead.
	*/
	constructor(options) {
		super(options);
		this.useMatch = (opts) => {
			return useMatch({
				select: opts?.select,
				from: this.id,
				structuralSharing: opts?.structuralSharing
			});
		};
		this.useRouteContext = (opts) => {
			return useRouteContext({
				...opts,
				from: this.id
			});
		};
		this.useSearch = (opts) => {
			return useSearch({
				select: opts?.select,
				structuralSharing: opts?.structuralSharing,
				from: this.id
			});
		};
		this.useParams = (opts) => {
			return useParams({
				select: opts?.select,
				structuralSharing: opts?.structuralSharing,
				from: this.id
			});
		};
		this.useLoaderDeps = (opts) => {
			return useLoaderDeps({
				...opts,
				from: this.id
			});
		};
		this.useLoaderData = (opts) => {
			return useLoaderData({
				...opts,
				from: this.id
			});
		};
		this.useNavigate = () => {
			return useNavigate({ from: this.fullPath });
		};
		this.Link = import_react.forwardRef((props, ref) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				ref,
				from: this.fullPath,
				...props
			});
		});
	}
};
/**
* Creates a non-root Route instance for code-based routing.
*
* Use this to define a route that will be composed into a route tree
* (typically via a parent route's `addChildren`). If you're using file-based
* routing, prefer `createFileRoute`.
*
* @param options Route options (path, component, loader, context, etc.).
* @returns A Route instance to be attached to the route tree.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/createRouteFunction
*/
function createRoute(options) {
	return new Route(options);
}
/**
* Creates a root route factory that requires a router context type.
*
* Use when your root route expects `context` to be provided to `createRouter`.
* The returned function behaves like `createRootRoute` but enforces a context type.
*
* @returns A factory function to configure and return a root route.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/createRootRouteWithContextFunction
*/
function createRootRouteWithContext() {
	return (options) => {
		return createRootRoute(options);
	};
}
var RootRoute = class extends BaseRootRoute {
	/**
	* @deprecated `RootRoute` is now an internal implementation detail. Use `createRootRoute()` instead.
	*/
	constructor(options) {
		super(options);
		this.useMatch = (opts) => {
			return useMatch({
				select: opts?.select,
				from: this.id,
				structuralSharing: opts?.structuralSharing
			});
		};
		this.useRouteContext = (opts) => {
			return useRouteContext({
				...opts,
				from: this.id
			});
		};
		this.useSearch = (opts) => {
			return useSearch({
				select: opts?.select,
				structuralSharing: opts?.structuralSharing,
				from: this.id
			});
		};
		this.useParams = (opts) => {
			return useParams({
				select: opts?.select,
				structuralSharing: opts?.structuralSharing,
				from: this.id
			});
		};
		this.useLoaderDeps = (opts) => {
			return useLoaderDeps({
				...opts,
				from: this.id
			});
		};
		this.useLoaderData = (opts) => {
			return useLoaderData({
				...opts,
				from: this.id
			});
		};
		this.useNavigate = () => {
			return useNavigate({ from: this.fullPath });
		};
		this.Link = import_react.forwardRef((props, ref) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				ref,
				from: this.fullPath,
				...props
			});
		});
	}
};
/**
* Creates a root Route instance used to build your route tree.
*
* Typically paired with `createRouter({ routeTree })`. If you need to require
* a typed router context, use `createRootRouteWithContext` instead.
*
* @param options Root route options (component, error, pending, etc.).
* @returns A root route instance.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/createRootRouteFunction
*/
function createRootRoute(options) {
	return new RootRoute(options);
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/fileRoute.js
/**
* Creates a file-based Route factory for a given path.
*
* Used by TanStack Router's file-based routing to associate a file with a
* route. The returned function accepts standard route options. In normal usage
* the `path` string is inserted and maintained by the `tsr` generator.
*
* @param path File path literal for the route (usually auto-generated).
* @returns A function that accepts Route options and returns a Route instance.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/createFileRouteFunction
*/
function createFileRoute(path) {
	return (options) => {
		const route = createRoute(options);
		route.isRoot = false;
		return route;
	};
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/lazyRouteComponent.js
/**
* Wrap a dynamic import to create a route component that supports
* `.preload()` and friendly reload-on-module-missing behavior.
*
* @param importer Function returning a module promise
* @param exportName Named export to use (default: `default`)
* @returns A lazy route component compatible with TanStack Router
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/lazyRouteComponentFunction
*/
function lazyRouteComponent(importer, exportName) {
	let loadPromise;
	let comp;
	let error;
	const load = () => {
		if (!loadPromise) {
			error = void 0;
			loadPromise = importer().then((res) => {
				comp = res[exportName ?? "default"];
			}).catch((err) => {
				loadPromise = void 0;
				error = err;
			});
		}
		return loadPromise;
	};
	const lazyComp = function Lazy(props) {
		if (error) {
			if (isModuleNotFoundError(error) && false);
			throw error;
		}
		if (!comp) if (reactUse) reactUse(load());
		else throw load();
		return import_react.createElement(comp, props);
	};
	lazyComp.preload = load;
	return lazyComp;
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/not-found.js
function CatchNotFound(props) {
	const router = useRouter();
	{
		const resetKey = `not-found-${router.stores.location.get().pathname}-${router.stores.status.get()}`;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CatchBoundary, {
			getResetKey: () => resetKey,
			onCatch: (error, errorInfo) => {
				if (isNotFound(error)) props.onCatch?.(error, errorInfo);
				else throw error;
			},
			errorComponent: ({ error }) => {
				if (isNotFound(error)) return props.fallback?.(error);
				else throw error;
			},
			children: props.children
		});
	}
}
function DefaultGlobalNotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Not Found" });
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/ScriptOnce.js
/**
* Server-only helper to emit a script tag exactly once during SSR.
*/
function ScriptOnce({ children }) {
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
		nonce: router.options.ssr?.nonce,
		dangerouslySetInnerHTML: { __html: children + ";document.currentScript.remove()" }
	});
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/SafeFragment.js
function SafeFragment(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: props.children });
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/renderRouteNotFound.js
/**
* Renders a not found component for a route when no matching route is found.
*
* @param router - The router instance containing the route configuration
* @param route - The route that triggered the not found state
* @param data - Additional data to pass to the not found component
* @returns The rendered not found component or a default fallback component
*/
function renderRouteNotFound(router, route, data) {
	if (!route.options.notFoundComponent) {
		if (router.options.defaultNotFoundComponent) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(router.options.defaultNotFoundComponent, { ...data });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefaultGlobalNotFound, {});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(route.options.notFoundComponent, { ...data });
}
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/scroll-restoration-inline.js
var scroll_restoration_inline_default = "function(a,f){let l;try{l=JSON.parse(sessionStorage.getItem(a)||\"{}\")}catch{return}const n=l?.[f||history.state?.__TSR_key];let c=!1;for(const t in n){const e=n[t],o=e?.scrollX,s=e?.scrollY;if(Number.isFinite(o)&&Number.isFinite(s)){if(t===\"window\")scrollTo(o,s),c=!0;else if(t)try{const r=document.querySelector(t);r&&(r.scrollLeft=o,r.scrollTop=s)}catch{}}}if(c)return;const i=location.hash.slice(1);if(i){const t=history.state?.__hashScrollIntoViewOptions??!0;if(t){const e=document.getElementById(i);e&&e.scrollIntoView(t)}return}scrollTo(0,0)}";
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/scroll-restoration-script/server.js
var defaultInlineScrollRestorationScript = `(${scroll_restoration_inline_default})(${escapeHtml(JSON.stringify(storageKey))})`;
function getScrollRestorationScript(key) {
	if (key === void 0) return defaultInlineScrollRestorationScript;
	return `(${scroll_restoration_inline_default})(${escapeHtml(JSON.stringify(storageKey))},${escapeHtml(JSON.stringify(key))})`;
}
function getScrollRestorationScriptForRouter(router) {
	if (typeof router.options.scrollRestoration === "function" && !router.options.scrollRestoration({ location: router.latestLocation })) return null;
	const getKey = router.options.getScrollRestorationKey;
	if (!getKey) return defaultInlineScrollRestorationScript;
	const location = router.latestLocation;
	const userKey = getKey(location);
	if (userKey === defaultGetScrollRestorationKey(location)) return defaultInlineScrollRestorationScript;
	return getScrollRestorationScript(userKey);
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/scroll-restoration.js
function ScrollRestoration() {
	const script = getScrollRestorationScriptForRouter(useRouter());
	if (!script) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScriptOnce, { children: script });
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/Match.js
function renderPending(router, route) {
	const PendingComponent = route?.options.pendingComponent ?? router.options.defaultPendingComponent;
	if (!PendingComponent) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PendingComponent, {});
}
var canWrapInSuspense = (router, route, ssr) => !route.isRoot || route.options.shellComponent || route.options.wrapInSuspense || ssr === false || ssr === "data-only" || false;
var Match = import_react.memo(function MatchImpl({ routeId }) {
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchView, {
		router,
		match: router.stores.byRoute.get(routeId).get()
	});
});
function MatchView({ router, match }) {
	const route = router.routesById[match.routeId];
	const pendingElement = renderPending(router, route);
	const routeErrorComponent = route.options.errorComponent ?? router.options.defaultErrorComponent;
	const routeOnCatch = route.options.onCatch ?? router.options.defaultOnCatch;
	const routeNotFoundComponent = route.isRoot ? route.options.notFoundComponent ?? router.options.notFoundRoute?.options.component : route.options.notFoundComponent;
	const resolvedNoSsr = match.ssr === false || match.ssr === "data-only";
	const ResolvedSuspenseBoundary = canWrapInSuspense(router, route, match.ssr) && (route.options.wrapInSuspense ?? pendingElement ?? (route.options.errorComponent?.preload || resolvedNoSsr)) ? import_react.Suspense : SafeFragment;
	const ResolvedCatchBoundary = routeErrorComponent ? CatchBoundary : SafeFragment;
	const ResolvedNotFoundBoundary = routeNotFoundComponent ? CatchNotFound : SafeFragment;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(route.isRoot ? route.options.shellComponent ?? SafeFragment : SafeFragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(matchContext.Provider, {
		value: match.routeId,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResolvedSuspenseBoundary, {
			fallback: pendingElement,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResolvedCatchBoundary, {
				getResetKey: () => match,
				errorComponent: routeErrorComponent,
				onCatch: (error, errorInfo) => {
					if (isNotFound(error)) {
						error.routeId ??= match.routeId;
						throw error;
					}
					routeOnCatch?.(error, errorInfo);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResolvedNotFoundBoundary, {
					fallback: (error) => {
						error.routeId ??= match.routeId;
						if (error.routeId !== match.routeId) throw error;
						return import_react.createElement(routeNotFoundComponent, error);
					},
					children: resolvedNoSsr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, {
						fallback: pendingElement,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchInner, { match })
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchInner, { match })
				})
			})
		})
	}), route.parentRoute?.id === "__root__" && router.options.scrollRestoration ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollRestoration, {}) : null] });
}
var MatchInner = import_react.memo(function MatchInnerImpl({ match }) {
	const router = useRouter();
	const routeId = match.routeId;
	const route = router.routesById[routeId];
	const key = import_react.useMemo(() => {
		const remountDeps = (route.options.remountDeps ?? router.options.defaultRemountDeps)?.({
			routeId,
			loaderDeps: match.loaderDeps,
			params: match._strictParams,
			search: match._strictSearch
		});
		return remountDeps ? JSON.stringify(remountDeps) : void 0;
	}, [
		routeId,
		match.loaderDeps,
		match._strictParams,
		match._strictSearch,
		route.options.remountDeps,
		router.options.defaultRemountDeps
	]);
	const out = import_react.useMemo(() => {
		const Comp = route.options.component ?? router.options.defaultComponent;
		return Comp ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comp, {}, key) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	}, [
		key,
		route.options.component,
		router.options.defaultComponent
	]);
	if (match.status === "pending") {
		if (router.ssr && !canWrapInSuspense(router, route, match.ssr)) return out;
		if (router._tx) throw router._tx[5];
		return renderPending(router, route);
	}
	if (match.status === "notFound") return renderRouteNotFound(router, route, match.error);
	if (match.status === "error") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)((route.options.errorComponent ?? router.options.defaultErrorComponent) || ErrorComponent, {
		error: match.error,
		reset: void 0,
		info: { componentStack: "" }
	});
	return out;
});
/**
* Render the next child match in the route tree. Typically used inside
* a route component to render nested routes.
*
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/outletComponent
*/
var Outlet = import_react.memo(function OutletImpl() {
	const router = useRouter();
	const routeId = import_react.useContext(matchContext);
	let parentGlobalNotFound;
	let parentNotFoundError;
	let childRouteId;
	{
		const matches = router.stores.matches.get();
		const parentIndex = matches.findIndex((match) => match.routeId === routeId);
		const parentMatch = matches[parentIndex];
		parentGlobalNotFound = !!parentMatch._notFound;
		parentNotFoundError = parentMatch.error;
		childRouteId = matches[parentIndex + 1]?.routeId;
	}
	if (parentGlobalNotFound) return renderRouteNotFound(router, router.routesById[routeId], parentNotFoundError);
	if (!childRouteId) return null;
	const nextMatch = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Match, { routeId: childRouteId });
	if (routeId === "__root__") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: renderPending(router),
		children: nextMatch
	});
	return nextMatch;
});
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/Transitioner.js
function settleOwner(owner, rendered) {
	const settle = owner[1];
	owner.length = 0;
	settle?.(rendered);
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/Matches.js
/**
* Internal component that renders the router's active match tree with
* suspense, error, and not-found boundaries. Rendered by `RouterProvider`.
*/
function Matches() {
	const router = useRouter();
	const rootRoute = router.routesById[rootRouteId];
	const pendingElement = renderPending(router, rootRoute);
	const ResolvedSuspense = SafeFragment;
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [false, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResolvedSuspense, {
		fallback: pendingElement,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchesInner, {})
	})] });
	return router.options.InnerWrap ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(router.options.InnerWrap, { children: inner }) : inner;
}
function MatchesInner() {
	const router = useRouter();
	const acknowledgement = router._rendered;
	const matches = router.stores.matches.get();
	const match = matches[0];
	const routeId = match?.routeId;
	useLayoutEffect(() => {
		if (acknowledgement[0] === matches) settleOwner(acknowledgement, true);
	}, [acknowledgement, matches]);
	const matchComponent = routeId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Match, { routeId }) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(matchContext.Provider, {
		value: routeId,
		children: router.options.disableGlobalCatchBoundary ? matchComponent : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CatchBoundary, {
			getResetKey: () => match,
			onCatch: void 0,
			children: matchComponent
		})
	});
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/routerStores.js
var getStoreFactory = (opts) => {
	return {
		createMutableStore: createNonReactiveMutableStore,
		createReadonlyStore: createNonReactiveReadonlyStore,
		batch: (fn) => fn()
	};
};
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/router.js
/**
* Creates a new Router instance for React.
*
* Pass the returned router to `RouterProvider` to enable routing.
* Notable options: `routeTree` (your route definitions) and `context`
* (required if the root route was created with `createRootRouteWithContext`).
*
* @param options Router options used to configure the router.
* @returns A Router instance to be provided to `RouterProvider`.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/createRouterFunction
*/
var createRouter = (options) => {
	return new Router(options);
};
var Router = class extends RouterCore {
	constructor(options) {
		super(options, getStoreFactory);
	}
};
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/RouterProvider.js
/**
* Low-level provider that places the router into React context and optionally
* updates router options from props. Most apps should use `RouterProvider`.
*/
function RouterContextProvider({ router, children, ...rest }) {
	if (hasKeys(rest)) router.update({
		...router.options,
		...rest,
		context: {
			...router.options.context,
			...rest.context
		}
	});
	const provider = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(routerContext.Provider, {
		value: router,
		children
	});
	if (router.options.Wrap) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(router.options.Wrap, { children: provider });
	return provider;
}
/**
* Renders the current match presentation and provides the router to the React
* tree via context.
*
* Accepts the same options as `createRouter` via props to update the router
* instance after creation.
*
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/createRouterFunction
*/
function RouterProvider({ router, ...rest }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouterContextProvider, {
		router,
		...rest,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Matches, {})
	});
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/Asset.js
var noopScriptHandler = () => {};
function setScriptAttrs(script, attrs) {
	if (!attrs) return;
	for (const [key, value] of Object.entries(attrs)) if (key !== "suppressHydrationWarning" && value !== void 0 && value !== false) script.setAttribute(key, typeof value === "boolean" ? "" : String(value));
}
function Asset(asset) {
	const { attrs, children, nonce, preventScriptHoist } = asset;
	switch (asset.tag) {
		case "title": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", {
			...attrs,
			suppressHydrationWarning: true,
			children
		});
		case "meta": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
			...attrs,
			suppressHydrationWarning: true
		});
		case "link": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("link", {
			...attrs,
			precedence: attrs?.precedence ?? (attrs?.rel === "stylesheet" ? "default" : void 0),
			nonce,
			suppressHydrationWarning: true
		});
		case "style":
			if (asset.inlineCss && false);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", {
				...attrs,
				dangerouslySetInnerHTML: { __html: children },
				nonce
			});
		case "script": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Script, {
			attrs,
			preventScriptHoist,
			children
		});
		default: return null;
	}
}
function Script({ attrs, children, preventScriptHoist }) {
	useRouter();
	useHydrated();
	const dataScript = typeof attrs?.type === "string" && attrs.type !== "" && attrs.type !== "text/javascript" && attrs.type !== "module";
	import_react.useEffect(() => {
		if (dataScript) return;
		if (attrs?.src) {
			const normSrc = (() => {
				try {
					const base = document.baseURI || window.location.href;
					return new URL(attrs.src, base).href;
				} catch {
					return attrs.src;
				}
			})();
			for (const el of document.querySelectorAll("script[src]")) if (el.src === normSrc) return;
			const script = document.createElement("script");
			setScriptAttrs(script, attrs);
			document.head.appendChild(script);
			return () => script.remove();
		}
		if (typeof children === "string") {
			const typeAttr = typeof attrs?.type === "string" ? attrs.type : "text/javascript";
			const nonceAttr = typeof attrs?.nonce === "string" ? attrs.nonce : void 0;
			for (const el of document.querySelectorAll("script:not([src])")) {
				if (!(el instanceof HTMLScriptElement)) continue;
				const sType = el.getAttribute("type") ?? "text/javascript";
				const sNonce = el.getAttribute("nonce") ?? void 0;
				if (el.textContent === children && sType === typeAttr && sNonce === nonceAttr) return;
			}
			const script = document.createElement("script");
			script.textContent = children;
			setScriptAttrs(script, attrs);
			document.head.appendChild(script);
			return () => script.remove();
		}
	}, [
		attrs,
		children,
		dataScript
	]);
	if (attrs?.src) {
		if (!preventScriptHoist) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
			...attrs,
			suppressHydrationWarning: true
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
			...attrs,
			onLoad: noopScriptHandler,
			suppressHydrationWarning: true
		});
	}
	if (typeof children === "string") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
		...attrs,
		dangerouslySetInnerHTML: { __html: children },
		suppressHydrationWarning: true
	});
	return null;
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/headContentUtils.js
function buildTagsFromMatches(router, nonce, matches, assetCrossOrigin) {
	matches = _getAssetMatches(matches);
	const routeMeta = matches.map((match) => match.meta).filter((meta) => meta !== void 0);
	const resultMeta = [];
	const metaByAttribute = {};
	let title;
	for (let i = routeMeta.length - 1; i >= 0; i--) {
		const metas = routeMeta[i];
		for (let j = metas.length - 1; j >= 0; j--) {
			const m = metas[j];
			if (!m) continue;
			if (m.title) {
				if (!title) title = {
					tag: "title",
					children: m.title
				};
			} else if ("script:ld+json" in m) try {
				const json = JSON.stringify(m["script:ld+json"]);
				resultMeta.push({
					tag: "script",
					attrs: { type: "application/ld+json" },
					children: escapeHtml(json)
				});
			} catch {}
			else {
				const attribute = m.name ?? m.property;
				if (attribute) if (metaByAttribute[attribute]) continue;
				else metaByAttribute[attribute] = true;
				resultMeta.push({
					tag: "meta",
					attrs: {
						...m,
						nonce
					}
				});
			}
		}
	}
	if (title) resultMeta.push(title);
	if (nonce) resultMeta.push({
		tag: "meta",
		attrs: {
			property: "csp-nonce",
			content: nonce
		}
	});
	resultMeta.reverse();
	const constructedLinks = matches.flatMap((match) => match.links ?? []).filter((link) => link !== void 0).map((link) => ({
		tag: "link",
		attrs: {
			...link,
			nonce
		}
	}));
	const manifest = router.ssr?.manifest;
	const manifestCssTags = [];
	if (manifest) {
		matches.forEach((match) => {
			(manifest.routes[match.routeId]?.css)?.forEach((link) => {
				const resolvedLink = resolveManifestCssLink(link);
				manifestCssTags.push({
					tag: "link",
					attrs: {
						rel: "stylesheet",
						...resolvedLink,
						crossOrigin: getAssetCrossOrigin(assetCrossOrigin, "stylesheet") ?? resolvedLink.crossOrigin,
						suppressHydrationWarning: true,
						nonce
					}
				});
			});
		});
		if (manifest.inlineStyle) manifestCssTags.push({
			tag: "style",
			attrs: {
				...manifest.inlineStyle.attrs,
				nonce
			},
			children: manifest.inlineStyle.children,
			inlineCss: true
		});
	}
	const preloadLinks = [];
	if (manifest) matches.forEach((match) => {
		manifest.routes[match.routeId]?.preloads?.forEach((preload) => {
			preloadLinks.push({
				tag: "link",
				attrs: {
					...getScriptPreloadAttrs(manifest, preload, assetCrossOrigin),
					nonce
				}
			});
		});
	});
	const styles = matches.flatMap((match) => match.styles ?? []).filter((style) => style !== void 0).map(({ children, ...attrs }) => ({
		tag: "style",
		attrs: {
			...attrs,
			nonce
		},
		children
	}));
	const headScripts = matches.flatMap((match) => match.headScripts ?? []).filter((script) => script !== void 0).map(({ children, ...script }) => ({
		tag: "script",
		attrs: {
			...script,
			nonce
		},
		children
	}));
	const tags = [];
	appendUniqueUserTags(tags, resultMeta);
	tags.push(...preloadLinks);
	appendUniqueUserTags(tags, constructedLinks);
	tags.push(...manifestCssTags);
	appendUniqueUserTags(tags, styles);
	appendUniqueUserTags(tags, headScripts);
	return tags;
}
/**
* Build the head/link/meta/script tags from the renderable presented prefix.
* Used internally by `HeadContent`.
*/
var useTags = (assetCrossOrigin) => {
	const router = useRouter();
	const nonce = router.options.ssr?.nonce;
	return buildTagsFromMatches(router, nonce, router.stores.matches.get(), assetCrossOrigin);
};
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/HeadContent.js
/**
* Render route-managed head tags (title, meta, links, styles, head scripts).
* Place inside the document head of your app shell.
* @link https://tanstack.com/router/latest/docs/framework/react/guide/document-head-management
*/
function HeadContent(props) {
	const tags = useTags(props.assetCrossOrigin);
	const nonce = useRouter().options.ssr?.nonce;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: tags.map((tag) => /* @__PURE__ */ (0, import_react.createElement)(Asset, {
		...tag,
		key: `tsr-meta-${JSON.stringify(tag)}`,
		nonce
	})) });
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/Scripts.js
/**
* Render body script tags collected from route matches and SSR manifests.
* Should be placed near the end of the document body.
*/
var Scripts = () => {
	const router = useRouter();
	const nonce = router.options.ssr?.nonce;
	const getScripts = (matches) => {
		matches = _getAssetMatches(matches);
		const scripts = matches.flatMap((match) => match.scripts ?? []).filter(Boolean).map(({ children, ...script }) => ({
			tag: "script",
			attrs: {
				...script,
				suppressHydrationWarning: true,
				nonce
			},
			children
		}));
		const manifest = router.ssr?.manifest;
		if (!manifest) return scripts;
		for (const match of matches) {
			const manifestScripts = manifest.routes[match.routeId]?.scripts;
			if (!manifestScripts) continue;
			for (const asset of manifestScripts) scripts.push({
				tag: "script",
				attrs: {
					...asset.attrs,
					nonce
				},
				children: asset.children,
				...typeof asset.attrs?.src === "string" ? { preventScriptHoist: true } : {}
			});
		}
		return scripts;
	};
	return renderScripts(router, getScripts(router.stores.matches.get()));
};
function renderScripts(router, scripts) {
	if (router.serverSsr) {
		const serverBufferedScript = router.serverSsr.takeBufferedScripts();
		if (serverBufferedScript) scripts.unshift(serverBufferedScript);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: scripts.map((asset, i) => /* @__PURE__ */ (0, import_react.createElement)(Asset, {
		...asset,
		key: `tsr-scripts-${asset.tag}-${i}`
	})) });
}
//#endregion
//#region node_modules/react-dom/cjs/react-dom-server-legacy.node.production.min.js
/**
* @license React
* react-dom-server-legacy.node.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_dom_server_legacy_node_production_min = /* @__PURE__ */ __commonJSMin(((exports) => {
	var ea = require_react();
	var fa = __require("stream");
	var n = Object.prototype.hasOwnProperty;
	var ha = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
	var ia = {};
	var ja = {};
	function ka(a) {
		if (n.call(ja, a)) return !0;
		if (n.call(ia, a)) return !1;
		if (ha.test(a)) return ja[a] = !0;
		ia[a] = !0;
		return !1;
	}
	function q(a, b, c, d, f, e, g) {
		this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
		this.attributeName = d;
		this.attributeNamespace = f;
		this.mustUseProperty = c;
		this.propertyName = a;
		this.type = b;
		this.sanitizeURL = e;
		this.removeEmptyString = g;
	}
	var r = {};
	"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
		r[a] = new q(a, 0, !1, a, null, !1, !1);
	});
	[
		["acceptCharset", "accept-charset"],
		["className", "class"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"]
	].forEach(function(a) {
		var b = a[0];
		r[b] = new q(b, 1, !1, a[1], null, !1, !1);
	});
	[
		"contentEditable",
		"draggable",
		"spellCheck",
		"value"
	].forEach(function(a) {
		r[a] = new q(a, 2, !1, a.toLowerCase(), null, !1, !1);
	});
	[
		"autoReverse",
		"externalResourcesRequired",
		"focusable",
		"preserveAlpha"
	].forEach(function(a) {
		r[a] = new q(a, 2, !1, a, null, !1, !1);
	});
	"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
		r[a] = new q(a, 3, !1, a.toLowerCase(), null, !1, !1);
	});
	[
		"checked",
		"multiple",
		"muted",
		"selected"
	].forEach(function(a) {
		r[a] = new q(a, 3, !0, a, null, !1, !1);
	});
	["capture", "download"].forEach(function(a) {
		r[a] = new q(a, 4, !1, a, null, !1, !1);
	});
	[
		"cols",
		"rows",
		"size",
		"span"
	].forEach(function(a) {
		r[a] = new q(a, 6, !1, a, null, !1, !1);
	});
	["rowSpan", "start"].forEach(function(a) {
		r[a] = new q(a, 5, !1, a.toLowerCase(), null, !1, !1);
	});
	var la = /[\-:]([a-z])/g;
	function ma(a) {
		return a[1].toUpperCase();
	}
	"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
		var b = a.replace(la, ma);
		r[b] = new q(b, 1, !1, a, null, !1, !1);
	});
	"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
		var b = a.replace(la, ma);
		r[b] = new q(b, 1, !1, a, "http://www.w3.org/1999/xlink", !1, !1);
	});
	[
		"xml:base",
		"xml:lang",
		"xml:space"
	].forEach(function(a) {
		var b = a.replace(la, ma);
		r[b] = new q(b, 1, !1, a, "http://www.w3.org/XML/1998/namespace", !1, !1);
	});
	["tabIndex", "crossOrigin"].forEach(function(a) {
		r[a] = new q(a, 1, !1, a.toLowerCase(), null, !1, !1);
	});
	r.xlinkHref = new q("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
	[
		"src",
		"href",
		"action",
		"formAction"
	].forEach(function(a) {
		r[a] = new q(a, 1, !1, a.toLowerCase(), null, !0, !0);
	});
	var t = {
		animationIterationCount: !0,
		aspectRatio: !0,
		borderImageOutset: !0,
		borderImageSlice: !0,
		borderImageWidth: !0,
		boxFlex: !0,
		boxFlexGroup: !0,
		boxOrdinalGroup: !0,
		columnCount: !0,
		columns: !0,
		flex: !0,
		flexGrow: !0,
		flexPositive: !0,
		flexShrink: !0,
		flexNegative: !0,
		flexOrder: !0,
		gridArea: !0,
		gridRow: !0,
		gridRowEnd: !0,
		gridRowSpan: !0,
		gridRowStart: !0,
		gridColumn: !0,
		gridColumnEnd: !0,
		gridColumnSpan: !0,
		gridColumnStart: !0,
		fontWeight: !0,
		lineClamp: !0,
		lineHeight: !0,
		opacity: !0,
		order: !0,
		orphans: !0,
		tabSize: !0,
		widows: !0,
		zIndex: !0,
		zoom: !0,
		fillOpacity: !0,
		floodOpacity: !0,
		stopOpacity: !0,
		strokeDasharray: !0,
		strokeDashoffset: !0,
		strokeMiterlimit: !0,
		strokeOpacity: !0,
		strokeWidth: !0
	};
	var na = [
		"Webkit",
		"ms",
		"Moz",
		"O"
	];
	Object.keys(t).forEach(function(a) {
		na.forEach(function(b) {
			b = b + a.charAt(0).toUpperCase() + a.substring(1);
			t[b] = t[a];
		});
	});
	var oa = /["'&<>]/;
	function u(a) {
		if ("boolean" === typeof a || "number" === typeof a) return "" + a;
		a = "" + a;
		var b = oa.exec(a);
		if (b) {
			var c = "", d, f = 0;
			for (d = b.index; d < a.length; d++) {
				switch (a.charCodeAt(d)) {
					case 34:
						b = "&quot;";
						break;
					case 38:
						b = "&amp;";
						break;
					case 39:
						b = "&#x27;";
						break;
					case 60:
						b = "&lt;";
						break;
					case 62:
						b = "&gt;";
						break;
					default: continue;
				}
				f !== d && (c += a.substring(f, d));
				f = d + 1;
				c += b;
			}
			a = f !== d ? c + a.substring(f, d) : c;
		}
		return a;
	}
	var pa = /([A-Z])/g;
	var qa = /^ms-/;
	var ra = Array.isArray;
	function v(a, b) {
		return {
			insertionMode: a,
			selectedValue: b
		};
	}
	function sa(a, b, c) {
		switch (b) {
			case "select": return v(1, null != c.value ? c.value : c.defaultValue);
			case "svg": return v(2, null);
			case "math": return v(3, null);
			case "foreignObject": return v(1, null);
			case "table": return v(4, null);
			case "thead":
			case "tbody":
			case "tfoot": return v(5, null);
			case "colgroup": return v(7, null);
			case "tr": return v(6, null);
		}
		return 4 <= a.insertionMode || 0 === a.insertionMode ? v(1, null) : a;
	}
	var ta = /* @__PURE__ */ new Map();
	function ua(a, b, c) {
		if ("object" !== typeof c) throw Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
		b = !0;
		for (var d in c) if (n.call(c, d)) {
			var f = c[d];
			if (null != f && "boolean" !== typeof f && "" !== f) {
				if (0 === d.indexOf("--")) {
					var e = u(d);
					f = u(("" + f).trim());
				} else {
					e = d;
					var g = ta.get(e);
					void 0 !== g ? e = g : (g = u(e.replace(pa, "-$1").toLowerCase().replace(qa, "-ms-")), ta.set(e, g), e = g);
					f = "number" === typeof f ? 0 === f || n.call(t, d) ? "" + f : f + "px" : u(("" + f).trim());
				}
				b ? (b = !1, a.push(" style=\"", e, ":", f)) : a.push(";", e, ":", f);
			}
		}
		b || a.push("\"");
	}
	function w(a, b, c, d) {
		switch (c) {
			case "style":
				ua(a, b, d);
				return;
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning": return;
		}
		if (!(2 < c.length) || "o" !== c[0] && "O" !== c[0] || "n" !== c[1] && "N" !== c[1]) {
			if (b = r.hasOwnProperty(c) ? r[c] : null, null !== b) {
				switch (typeof d) {
					case "function":
					case "symbol": return;
					case "boolean": if (!b.acceptsBooleans) return;
				}
				c = b.attributeName;
				switch (b.type) {
					case 3:
						d && a.push(" ", c, "=\"\"");
						break;
					case 4:
						!0 === d ? a.push(" ", c, "=\"\"") : !1 !== d && a.push(" ", c, "=\"", u(d), "\"");
						break;
					case 5:
						isNaN(d) || a.push(" ", c, "=\"", u(d), "\"");
						break;
					case 6:
						!isNaN(d) && 1 <= d && a.push(" ", c, "=\"", u(d), "\"");
						break;
					default: b.sanitizeURL && (d = "" + d), a.push(" ", c, "=\"", u(d), "\"");
				}
			} else if (ka(c)) {
				switch (typeof d) {
					case "function":
					case "symbol": return;
					case "boolean": if (b = c.toLowerCase().slice(0, 5), "data-" !== b && "aria-" !== b) return;
				}
				a.push(" ", c, "=\"", u(d), "\"");
			}
		}
	}
	function x(a, b, c) {
		if (null != b) {
			if (null != c) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
			if ("object" !== typeof b || !("__html" in b)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
			b = b.__html;
			null !== b && void 0 !== b && a.push("" + b);
		}
	}
	function va(a) {
		var b = "";
		ea.Children.forEach(a, function(a) {
			null != a && (b += a);
		});
		return b;
	}
	function wa(a, b, c, d) {
		a.push(z(c));
		var f = c = null, e;
		for (e in b) if (n.call(b, e)) {
			var g = b[e];
			if (null != g) switch (e) {
				case "children":
					c = g;
					break;
				case "dangerouslySetInnerHTML":
					f = g;
					break;
				default: w(a, d, e, g);
			}
		}
		a.push(">");
		x(a, f, c);
		return "string" === typeof c ? (a.push(u(c)), null) : c;
	}
	var xa = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
	var ya = /* @__PURE__ */ new Map();
	function z(a) {
		var b = ya.get(a);
		if (void 0 === b) {
			if (!xa.test(a)) throw Error("Invalid tag: " + a);
			b = "<" + a;
			ya.set(a, b);
		}
		return b;
	}
	function za(a, b, c, d, f) {
		switch (b) {
			case "select":
				a.push(z("select"));
				var e = null, g = null;
				for (l in c) if (n.call(c, l)) {
					var h = c[l];
					if (null != h) switch (l) {
						case "children":
							e = h;
							break;
						case "dangerouslySetInnerHTML":
							g = h;
							break;
						case "defaultValue":
						case "value": break;
						default: w(a, d, l, h);
					}
				}
				a.push(">");
				x(a, g, e);
				return e;
			case "option":
				g = f.selectedValue;
				a.push(z("option"));
				var k = h = null, m = null;
				var l = null;
				for (e in c) if (n.call(c, e)) {
					var p = c[e];
					if (null != p) switch (e) {
						case "children":
							h = p;
							break;
						case "selected":
							m = p;
							break;
						case "dangerouslySetInnerHTML":
							l = p;
							break;
						case "value": k = p;
						default: w(a, d, e, p);
					}
				}
				if (null != g) if (c = null !== k ? "" + k : va(h), ra(g)) {
					for (d = 0; d < g.length; d++) if ("" + g[d] === c) {
						a.push(" selected=\"\"");
						break;
					}
				} else "" + g === c && a.push(" selected=\"\"");
				else m && a.push(" selected=\"\"");
				a.push(">");
				x(a, l, h);
				return h;
			case "textarea":
				a.push(z("textarea"));
				l = g = e = null;
				for (h in c) if (n.call(c, h) && (k = c[h], null != k)) switch (h) {
					case "children":
						l = k;
						break;
					case "value":
						e = k;
						break;
					case "defaultValue":
						g = k;
						break;
					case "dangerouslySetInnerHTML": throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
					default: w(a, d, h, k);
				}
				null === e && null !== g && (e = g);
				a.push(">");
				if (null != l) {
					if (null != e) throw Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
					if (ra(l) && 1 < l.length) throw Error("<textarea> can only have at most one child.");
					e = "" + l;
				}
				"string" === typeof e && "\n" === e[0] && a.push("\n");
				null !== e && a.push(u("" + e));
				return null;
			case "input":
				a.push(z("input"));
				k = l = h = e = null;
				for (g in c) if (n.call(c, g) && (m = c[g], null != m)) switch (g) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error("input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
					case "defaultChecked":
						k = m;
						break;
					case "defaultValue":
						h = m;
						break;
					case "checked":
						l = m;
						break;
					case "value":
						e = m;
						break;
					default: w(a, d, g, m);
				}
				null !== l ? w(a, d, "checked", l) : null !== k && w(a, d, "checked", k);
				null !== e ? w(a, d, "value", e) : null !== h && w(a, d, "value", h);
				a.push("/>");
				return null;
			case "menuitem":
				a.push(z("menuitem"));
				for (var B in c) if (n.call(c, B) && (e = c[B], null != e)) switch (B) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error("menuitems cannot have `children` nor `dangerouslySetInnerHTML`.");
					default: w(a, d, B, e);
				}
				a.push(">");
				return null;
			case "title":
				a.push(z("title"));
				e = null;
				for (p in c) if (n.call(c, p) && (g = c[p], null != g)) switch (p) {
					case "children":
						e = g;
						break;
					case "dangerouslySetInnerHTML": throw Error("`dangerouslySetInnerHTML` does not make sense on <title>.");
					default: w(a, d, p, g);
				}
				a.push(">");
				return e;
			case "listing":
			case "pre":
				a.push(z(b));
				g = e = null;
				for (k in c) if (n.call(c, k) && (h = c[k], null != h)) switch (k) {
					case "children":
						e = h;
						break;
					case "dangerouslySetInnerHTML":
						g = h;
						break;
					default: w(a, d, k, h);
				}
				a.push(">");
				if (null != g) {
					if (null != e) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
					if ("object" !== typeof g || !("__html" in g)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
					c = g.__html;
					null !== c && void 0 !== c && ("string" === typeof c && 0 < c.length && "\n" === c[0] ? a.push("\n", c) : a.push("" + c));
				}
				"string" === typeof e && "\n" === e[0] && a.push("\n");
				return e;
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "img":
			case "keygen":
			case "link":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
				a.push(z(b));
				for (var C in c) if (n.call(c, C) && (e = c[C], null != e)) switch (C) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(b + " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
					default: w(a, d, C, e);
				}
				a.push("/>");
				return null;
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return wa(a, c, b, d);
			case "html": return 0 === f.insertionMode && a.push("<!DOCTYPE html>"), wa(a, c, b, d);
			default:
				if (-1 === b.indexOf("-") && "string" !== typeof c.is) return wa(a, c, b, d);
				a.push(z(b));
				g = e = null;
				for (m in c) if (n.call(c, m) && (h = c[m], null != h)) switch (m) {
					case "children":
						e = h;
						break;
					case "dangerouslySetInnerHTML":
						g = h;
						break;
					case "style":
						ua(a, d, h);
						break;
					case "suppressContentEditableWarning":
					case "suppressHydrationWarning": break;
					default: ka(m) && "function" !== typeof h && "symbol" !== typeof h && a.push(" ", m, "=\"", u(h), "\"");
				}
				a.push(">");
				x(a, g, e);
				return e;
		}
	}
	function Aa(a, b, c) {
		a.push("<!--$?--><template id=\"");
		if (null === c) throw Error("An ID must have been assigned before we can complete the boundary.");
		a.push(c);
		return a.push("\"></template>");
	}
	function Ba(a, b, c, d) {
		switch (c.insertionMode) {
			case 0:
			case 1: return a.push("<div hidden id=\""), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push("\">");
			case 2: return a.push("<svg aria-hidden=\"true\" style=\"display:none\" id=\""), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push("\">");
			case 3: return a.push("<math aria-hidden=\"true\" style=\"display:none\" id=\""), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push("\">");
			case 4: return a.push("<table hidden id=\""), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push("\">");
			case 5: return a.push("<table hidden><tbody id=\""), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push("\">");
			case 6: return a.push("<table hidden><tr id=\""), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push("\">");
			case 7: return a.push("<table hidden><colgroup id=\""), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push("\">");
			default: throw Error("Unknown insertion mode. This is a bug in React.");
		}
	}
	function Ca(a, b) {
		switch (b.insertionMode) {
			case 0:
			case 1: return a.push("</div>");
			case 2: return a.push("</svg>");
			case 3: return a.push("</math>");
			case 4: return a.push("</table>");
			case 5: return a.push("</tbody></table>");
			case 6: return a.push("</tr></table>");
			case 7: return a.push("</colgroup></table>");
			default: throw Error("Unknown insertion mode. This is a bug in React.");
		}
	}
	var Da = /[<\u2028\u2029]/g;
	function Ea(a) {
		return JSON.stringify(a).replace(Da, function(a) {
			switch (a) {
				case "<": return "\\u003c";
				case "\u2028": return "\\u2028";
				case "\u2029": return "\\u2029";
				default: throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
			}
		});
	}
	function Fa(a, b) {
		b = void 0 === b ? "" : b;
		return {
			bootstrapChunks: [],
			startInlineScript: "<script>",
			placeholderPrefix: b + "P:",
			segmentPrefix: b + "S:",
			boundaryPrefix: b + "B:",
			idPrefix: b,
			nextSuspenseID: 0,
			sentCompleteSegmentFunction: !1,
			sentCompleteBoundaryFunction: !1,
			sentClientRenderFunction: !1,
			generateStaticMarkup: a
		};
	}
	function Ga() {
		return {
			insertionMode: 1,
			selectedValue: null
		};
	}
	function Ha(a, b, c, d) {
		if (c.generateStaticMarkup) return a.push(u(b)), !1;
		"" === b ? a = d : (d && a.push("<!-- -->"), a.push(u(b)), a = !0);
		return a;
	}
	var A = Object.assign;
	var Ia = Symbol.for("react.element");
	var Ja = Symbol.for("react.portal");
	var Ka = Symbol.for("react.fragment");
	var La = Symbol.for("react.strict_mode");
	var Ma = Symbol.for("react.profiler");
	var Na = Symbol.for("react.provider");
	var Oa = Symbol.for("react.context");
	var Pa = Symbol.for("react.forward_ref");
	var Qa = Symbol.for("react.suspense");
	var Ra = Symbol.for("react.suspense_list");
	var Sa = Symbol.for("react.memo");
	var Ta = Symbol.for("react.lazy");
	var Ua = Symbol.for("react.scope");
	var Va = Symbol.for("react.debug_trace_mode");
	var Wa = Symbol.for("react.legacy_hidden");
	var Xa = Symbol.for("react.default_value");
	var Ya = Symbol.iterator;
	function Za(a) {
		if (null == a) return null;
		if ("function" === typeof a) return a.displayName || a.name || null;
		if ("string" === typeof a) return a;
		switch (a) {
			case Ka: return "Fragment";
			case Ja: return "Portal";
			case Ma: return "Profiler";
			case La: return "StrictMode";
			case Qa: return "Suspense";
			case Ra: return "SuspenseList";
		}
		if ("object" === typeof a) switch (a.$$typeof) {
			case Oa: return (a.displayName || "Context") + ".Consumer";
			case Na: return (a._context.displayName || "Context") + ".Provider";
			case Pa:
				var b = a.render;
				a = a.displayName;
				a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
				return a;
			case Sa: return b = a.displayName || null, null !== b ? b : Za(a.type) || "Memo";
			case Ta:
				b = a._payload;
				a = a._init;
				try {
					return Za(a(b));
				} catch (c) {}
		}
		return null;
	}
	var $a = {};
	function ab(a, b) {
		a = a.contextTypes;
		if (!a) return $a;
		var c = {}, d;
		for (d in a) c[d] = b[d];
		return c;
	}
	var D = null;
	function E(a, b) {
		if (a !== b) {
			a.context._currentValue2 = a.parentValue;
			a = a.parent;
			var c = b.parent;
			if (null === a) {
				if (null !== c) throw Error("The stacks must reach the root at the same time. This is a bug in React.");
			} else {
				if (null === c) throw Error("The stacks must reach the root at the same time. This is a bug in React.");
				E(a, c);
			}
			b.context._currentValue2 = b.value;
		}
	}
	function bb(a) {
		a.context._currentValue2 = a.parentValue;
		a = a.parent;
		null !== a && bb(a);
	}
	function cb(a) {
		var b = a.parent;
		null !== b && cb(b);
		a.context._currentValue2 = a.value;
	}
	function db(a, b) {
		a.context._currentValue2 = a.parentValue;
		a = a.parent;
		if (null === a) throw Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
		a.depth === b.depth ? E(a, b) : db(a, b);
	}
	function eb(a, b) {
		var c = b.parent;
		if (null === c) throw Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
		a.depth === c.depth ? E(a, c) : eb(a, c);
		b.context._currentValue2 = b.value;
	}
	function F(a) {
		var b = D;
		b !== a && (null === b ? cb(a) : null === a ? bb(b) : b.depth === a.depth ? E(b, a) : b.depth > a.depth ? db(b, a) : eb(b, a), D = a);
	}
	var fb = {
		isMounted: function() {
			return !1;
		},
		enqueueSetState: function(a, b) {
			a = a._reactInternals;
			null !== a.queue && a.queue.push(b);
		},
		enqueueReplaceState: function(a, b) {
			a = a._reactInternals;
			a.replace = !0;
			a.queue = [b];
		},
		enqueueForceUpdate: function() {}
	};
	function gb(a, b, c, d) {
		var f = void 0 !== a.state ? a.state : null;
		a.updater = fb;
		a.props = c;
		a.state = f;
		var e = {
			queue: [],
			replace: !1
		};
		a._reactInternals = e;
		var g = b.contextType;
		a.context = "object" === typeof g && null !== g ? g._currentValue2 : d;
		g = b.getDerivedStateFromProps;
		"function" === typeof g && (g = g(c, f), f = null === g || void 0 === g ? f : A({}, f, g), a.state = f);
		if ("function" !== typeof b.getDerivedStateFromProps && "function" !== typeof a.getSnapshotBeforeUpdate && ("function" === typeof a.UNSAFE_componentWillMount || "function" === typeof a.componentWillMount)) if (b = a.state, "function" === typeof a.componentWillMount && a.componentWillMount(), "function" === typeof a.UNSAFE_componentWillMount && a.UNSAFE_componentWillMount(), b !== a.state && fb.enqueueReplaceState(a, a.state, null), null !== e.queue && 0 < e.queue.length) if (b = e.queue, g = e.replace, e.queue = null, e.replace = !1, g && 1 === b.length) a.state = b[0];
		else {
			e = g ? b[0] : a.state;
			f = !0;
			for (g = g ? 1 : 0; g < b.length; g++) {
				var h = b[g];
				h = "function" === typeof h ? h.call(a, e, c, d) : h;
				null != h && (f ? (f = !1, e = A({}, e, h)) : A(e, h));
			}
			a.state = e;
		}
		else e.queue = null;
	}
	var hb = {
		id: 1,
		overflow: ""
	};
	function ib(a, b, c) {
		var d = a.id;
		a = a.overflow;
		var f = 32 - G(d) - 1;
		d &= ~(1 << f);
		c += 1;
		var e = 32 - G(b) + f;
		if (30 < e) {
			var g = f - f % 5;
			e = (d & (1 << g) - 1).toString(32);
			d >>= g;
			f -= g;
			return {
				id: 1 << 32 - G(b) + f | c << f | d,
				overflow: e + a
			};
		}
		return {
			id: 1 << e | c << f | d,
			overflow: a
		};
	}
	var G = Math.clz32 ? Math.clz32 : jb;
	var kb = Math.log;
	var lb = Math.LN2;
	function jb(a) {
		a >>>= 0;
		return 0 === a ? 32 : 31 - (kb(a) / lb | 0) | 0;
	}
	function mb(a, b) {
		return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
	}
	var nb = "function" === typeof Object.is ? Object.is : mb;
	var H = null;
	var ob = null;
	var I = null;
	var J = null;
	var K = !1;
	var L = !1;
	var M = 0;
	var N = null;
	var O = 0;
	function P() {
		if (null === H) throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
		return H;
	}
	function rb() {
		if (0 < O) throw Error("Rendered more hooks than during the previous render");
		return {
			memoizedState: null,
			queue: null,
			next: null
		};
	}
	function sb() {
		null === J ? null === I ? (K = !1, I = J = rb()) : (K = !0, J = I) : null === J.next ? (K = !1, J = J.next = rb()) : (K = !0, J = J.next);
		return J;
	}
	function tb() {
		ob = H = null;
		L = !1;
		I = null;
		O = 0;
		J = N = null;
	}
	function ub(a, b) {
		return "function" === typeof b ? b(a) : b;
	}
	function vb(a, b, c) {
		H = P();
		J = sb();
		if (K) {
			var d = J.queue;
			b = d.dispatch;
			if (null !== N && (c = N.get(d), void 0 !== c)) {
				N.delete(d);
				d = J.memoizedState;
				do
					d = a(d, c.action), c = c.next;
				while (null !== c);
				J.memoizedState = d;
				return [d, b];
			}
			return [J.memoizedState, b];
		}
		a = a === ub ? "function" === typeof b ? b() : b : void 0 !== c ? c(b) : b;
		J.memoizedState = a;
		a = J.queue = {
			last: null,
			dispatch: null
		};
		a = a.dispatch = wb.bind(null, H, a);
		return [J.memoizedState, a];
	}
	function xb(a, b) {
		H = P();
		J = sb();
		b = void 0 === b ? null : b;
		if (null !== J) {
			var c = J.memoizedState;
			if (null !== c && null !== b) {
				var d = c[1];
				a: if (null === d) d = !1;
				else {
					for (var f = 0; f < d.length && f < b.length; f++) if (!nb(b[f], d[f])) {
						d = !1;
						break a;
					}
					d = !0;
				}
				if (d) return c[0];
			}
		}
		a = a();
		J.memoizedState = [a, b];
		return a;
	}
	function wb(a, b, c) {
		if (25 <= O) throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
		if (a === H) if (L = !0, a = {
			action: c,
			next: null
		}, null === N && (N = /* @__PURE__ */ new Map()), c = N.get(b), void 0 === c) N.set(b, a);
		else {
			for (b = c; null !== b.next;) b = b.next;
			b.next = a;
		}
	}
	function yb() {
		throw Error("startTransition cannot be called during server rendering.");
	}
	function Q() {}
	var zb = {
		readContext: function(a) {
			return a._currentValue2;
		},
		useContext: function(a) {
			P();
			return a._currentValue2;
		},
		useMemo: xb,
		useReducer: vb,
		useRef: function(a) {
			H = P();
			J = sb();
			var b = J.memoizedState;
			return null === b ? (a = { current: a }, J.memoizedState = a) : b;
		},
		useState: function(a) {
			return vb(ub, a);
		},
		useInsertionEffect: Q,
		useLayoutEffect: function() {},
		useCallback: function(a, b) {
			return xb(function() {
				return a;
			}, b);
		},
		useImperativeHandle: Q,
		useEffect: Q,
		useDebugValue: Q,
		useDeferredValue: function(a) {
			P();
			return a;
		},
		useTransition: function() {
			P();
			return [!1, yb];
		},
		useId: function() {
			var a = ob.treeContext;
			var b = a.overflow;
			a = a.id;
			a = (a & ~(1 << 32 - G(a) - 1)).toString(32) + b;
			var c = R;
			if (null === c) throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component.");
			b = M++;
			a = ":" + c.idPrefix + "R" + a;
			0 < b && (a += "H" + b.toString(32));
			return a + ":";
		},
		useMutableSource: function(a, b) {
			P();
			return b(a._source);
		},
		useSyncExternalStore: function(a, b, c) {
			if (void 0 === c) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
			return c();
		}
	};
	var R = null;
	var Ab = ea.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
	function Bb(a) {
		console.error(a);
		return null;
	}
	function S() {}
	function Cb(a, b, c, d, f, e, g, h, k) {
		var m = [], l = /* @__PURE__ */ new Set();
		b = {
			destination: null,
			responseState: b,
			progressiveChunkSize: void 0 === d ? 12800 : d,
			status: 0,
			fatalError: null,
			nextSegmentId: 0,
			allPendingTasks: 0,
			pendingRootTasks: 0,
			completedRootSegment: null,
			abortableTasks: l,
			pingedTasks: m,
			clientRenderedBoundaries: [],
			completedBoundaries: [],
			partialBoundaries: [],
			onError: void 0 === f ? Bb : f,
			onAllReady: void 0 === e ? S : e,
			onShellReady: void 0 === g ? S : g,
			onShellError: void 0 === h ? S : h,
			onFatalError: void 0 === k ? S : k
		};
		c = T(b, 0, null, c, !1, !1);
		c.parentFlushed = !0;
		a = Db(b, a, null, c, l, $a, null, hb);
		m.push(a);
		return b;
	}
	function Db(a, b, c, d, f, e, g, h) {
		a.allPendingTasks++;
		null === c ? a.pendingRootTasks++ : c.pendingTasks++;
		var k = {
			node: b,
			ping: function() {
				var b = a.pingedTasks;
				b.push(k);
				1 === b.length && Eb(a);
			},
			blockedBoundary: c,
			blockedSegment: d,
			abortSet: f,
			legacyContext: e,
			context: g,
			treeContext: h
		};
		f.add(k);
		return k;
	}
	function T(a, b, c, d, f, e) {
		return {
			status: 0,
			id: -1,
			index: b,
			parentFlushed: !1,
			chunks: [],
			children: [],
			formatContext: d,
			boundary: c,
			lastPushedText: f,
			textEmbedded: e
		};
	}
	function U(a, b) {
		a = a.onError(b);
		if (null != a && "string" !== typeof a) throw Error("onError returned something with a type other than \"string\". onError should return a string and may return null or undefined but must not return anything else. It received something of type \"" + typeof a + "\" instead");
		return a;
	}
	function V(a, b) {
		var c = a.onShellError;
		c(b);
		c = a.onFatalError;
		c(b);
		null !== a.destination ? (a.status = 2, a.destination.destroy(b)) : (a.status = 1, a.fatalError = b);
	}
	function Fb(a, b, c, d, f) {
		H = {};
		ob = b;
		M = 0;
		for (a = c(d, f); L;) L = !1, M = 0, O += 1, J = null, a = c(d, f);
		tb();
		return a;
	}
	function Gb(a, b, c, d) {
		var f = c.render(), e = d.childContextTypes;
		if (null !== e && void 0 !== e) {
			var g = b.legacyContext;
			if ("function" !== typeof c.getChildContext) d = g;
			else {
				c = c.getChildContext();
				for (var h in c) if (!(h in e)) throw Error((Za(d) || "Unknown") + ".getChildContext(): key \"" + h + "\" is not defined in childContextTypes.");
				d = A({}, g, c);
			}
			b.legacyContext = d;
			W(a, b, f);
			b.legacyContext = g;
		} else W(a, b, f);
	}
	function Hb(a, b) {
		if (a && a.defaultProps) {
			b = A({}, b);
			a = a.defaultProps;
			for (var c in a) void 0 === b[c] && (b[c] = a[c]);
			return b;
		}
		return b;
	}
	function Ib(a, b, c, d, f) {
		if ("function" === typeof c) if (c.prototype && c.prototype.isReactComponent) {
			f = ab(c, b.legacyContext);
			var e = c.contextType;
			e = new c(d, "object" === typeof e && null !== e ? e._currentValue2 : f);
			gb(e, c, d, f);
			Gb(a, b, e, c);
		} else {
			e = ab(c, b.legacyContext);
			f = Fb(a, b, c, d, e);
			var g = 0 !== M;
			if ("object" === typeof f && null !== f && "function" === typeof f.render && void 0 === f.$$typeof) gb(f, c, d, e), Gb(a, b, f, c);
			else if (g) {
				d = b.treeContext;
				b.treeContext = ib(d, 1, 0);
				try {
					W(a, b, f);
				} finally {
					b.treeContext = d;
				}
			} else W(a, b, f);
		}
		else if ("string" === typeof c) {
			f = b.blockedSegment;
			e = za(f.chunks, c, d, a.responseState, f.formatContext);
			f.lastPushedText = !1;
			g = f.formatContext;
			f.formatContext = sa(g, c, d);
			Jb(a, b, e);
			f.formatContext = g;
			switch (c) {
				case "area":
				case "base":
				case "br":
				case "col":
				case "embed":
				case "hr":
				case "img":
				case "input":
				case "keygen":
				case "link":
				case "meta":
				case "param":
				case "source":
				case "track":
				case "wbr": break;
				default: f.chunks.push("</", c, ">");
			}
			f.lastPushedText = !1;
		} else {
			switch (c) {
				case Wa:
				case Va:
				case La:
				case Ma:
				case Ka:
					W(a, b, d.children);
					return;
				case Ra:
					W(a, b, d.children);
					return;
				case Ua: throw Error("ReactDOMServer does not yet support scope components.");
				case Qa:
					a: {
						c = b.blockedBoundary;
						f = b.blockedSegment;
						e = d.fallback;
						d = d.children;
						g = /* @__PURE__ */ new Set();
						var h = {
							id: null,
							rootSegmentID: -1,
							parentFlushed: !1,
							pendingTasks: 0,
							forceClientRender: !1,
							completedSegments: [],
							byteSize: 0,
							fallbackAbortableTasks: g,
							errorDigest: null
						}, k = T(a, f.chunks.length, h, f.formatContext, !1, !1);
						f.children.push(k);
						f.lastPushedText = !1;
						var m = T(a, 0, null, f.formatContext, !1, !1);
						m.parentFlushed = !0;
						b.blockedBoundary = h;
						b.blockedSegment = m;
						try {
							if (Jb(a, b, d), a.responseState.generateStaticMarkup || m.lastPushedText && m.textEmbedded && m.chunks.push("<!-- -->"), m.status = 1, X(h, m), 0 === h.pendingTasks) break a;
						} catch (l) {
							m.status = 4, h.forceClientRender = !0, h.errorDigest = U(a, l);
						} finally {
							b.blockedBoundary = c, b.blockedSegment = f;
						}
						b = Db(a, e, c, k, g, b.legacyContext, b.context, b.treeContext);
						a.pingedTasks.push(b);
					}
					return;
			}
			if ("object" === typeof c && null !== c) switch (c.$$typeof) {
				case Pa:
					d = Fb(a, b, c.render, d, f);
					if (0 !== M) {
						c = b.treeContext;
						b.treeContext = ib(c, 1, 0);
						try {
							W(a, b, d);
						} finally {
							b.treeContext = c;
						}
					} else W(a, b, d);
					return;
				case Sa:
					c = c.type;
					d = Hb(c, d);
					Ib(a, b, c, d, f);
					return;
				case Na:
					f = d.children;
					c = c._context;
					d = d.value;
					e = c._currentValue2;
					c._currentValue2 = d;
					g = D;
					D = d = {
						parent: g,
						depth: null === g ? 0 : g.depth + 1,
						context: c,
						parentValue: e,
						value: d
					};
					b.context = d;
					W(a, b, f);
					a = D;
					if (null === a) throw Error("Tried to pop a Context at the root of the app. This is a bug in React.");
					d = a.parentValue;
					a.context._currentValue2 = d === Xa ? a.context._defaultValue : d;
					a = D = a.parent;
					b.context = a;
					return;
				case Oa:
					d = d.children;
					d = d(c._currentValue2);
					W(a, b, d);
					return;
				case Ta:
					f = c._init;
					c = f(c._payload);
					d = Hb(c, d);
					Ib(a, b, c, d, void 0);
					return;
			}
			throw Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + ((null == c ? c : typeof c) + "."));
		}
	}
	function W(a, b, c) {
		b.node = c;
		if ("object" === typeof c && null !== c) {
			switch (c.$$typeof) {
				case Ia:
					Ib(a, b, c.type, c.props, c.ref);
					return;
				case Ja: throw Error("Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.");
				case Ta:
					var d = c._init;
					c = d(c._payload);
					W(a, b, c);
					return;
			}
			if (ra(c)) {
				Kb(a, b, c);
				return;
			}
			null === c || "object" !== typeof c ? d = null : (d = Ya && c[Ya] || c["@@iterator"], d = "function" === typeof d ? d : null);
			if (d && (d = d.call(c))) {
				c = d.next();
				if (!c.done) {
					var f = [];
					do
						f.push(c.value), c = d.next();
					while (!c.done);
					Kb(a, b, f);
				}
				return;
			}
			a = Object.prototype.toString.call(c);
			throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === a ? "object with keys {" + Object.keys(c).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
		}
		"string" === typeof c ? (d = b.blockedSegment, d.lastPushedText = Ha(b.blockedSegment.chunks, c, a.responseState, d.lastPushedText)) : "number" === typeof c && (d = b.blockedSegment, d.lastPushedText = Ha(b.blockedSegment.chunks, "" + c, a.responseState, d.lastPushedText));
	}
	function Kb(a, b, c) {
		for (var d = c.length, f = 0; f < d; f++) {
			var e = b.treeContext;
			b.treeContext = ib(e, d, f);
			try {
				Jb(a, b, c[f]);
			} finally {
				b.treeContext = e;
			}
		}
	}
	function Jb(a, b, c) {
		var d = b.blockedSegment.formatContext, f = b.legacyContext, e = b.context;
		try {
			return W(a, b, c);
		} catch (k) {
			if (tb(), "object" === typeof k && null !== k && "function" === typeof k.then) {
				c = k;
				var g = b.blockedSegment, h = T(a, g.chunks.length, null, g.formatContext, g.lastPushedText, !0);
				g.children.push(h);
				g.lastPushedText = !1;
				a = Db(a, b.node, b.blockedBoundary, h, b.abortSet, b.legacyContext, b.context, b.treeContext).ping;
				c.then(a, a);
				b.blockedSegment.formatContext = d;
				b.legacyContext = f;
				b.context = e;
				F(e);
			} else throw b.blockedSegment.formatContext = d, b.legacyContext = f, b.context = e, F(e), k;
		}
	}
	function Lb(a) {
		var b = a.blockedBoundary;
		a = a.blockedSegment;
		a.status = 3;
		Mb(this, b, a);
	}
	function Nb(a, b, c) {
		var d = a.blockedBoundary;
		a.blockedSegment.status = 3;
		null === d ? (b.allPendingTasks--, 2 !== b.status && (b.status = 2, null !== b.destination && b.destination.push(null))) : (d.pendingTasks--, d.forceClientRender || (d.forceClientRender = !0, d.errorDigest = b.onError(void 0 === c ? Error("The render was aborted by the server without a reason.") : c), d.parentFlushed && b.clientRenderedBoundaries.push(d)), d.fallbackAbortableTasks.forEach(function(a) {
			return Nb(a, b, c);
		}), d.fallbackAbortableTasks.clear(), b.allPendingTasks--, 0 === b.allPendingTasks && (a = b.onAllReady, a()));
	}
	function X(a, b) {
		if (0 === b.chunks.length && 1 === b.children.length && null === b.children[0].boundary) {
			var c = b.children[0];
			c.id = b.id;
			c.parentFlushed = !0;
			1 === c.status && X(a, c);
		} else a.completedSegments.push(b);
	}
	function Mb(a, b, c) {
		if (null === b) {
			if (c.parentFlushed) {
				if (null !== a.completedRootSegment) throw Error("There can only be one root segment. This is a bug in React.");
				a.completedRootSegment = c;
			}
			a.pendingRootTasks--;
			0 === a.pendingRootTasks && (a.onShellError = S, b = a.onShellReady, b());
		} else b.pendingTasks--, b.forceClientRender || (0 === b.pendingTasks ? (c.parentFlushed && 1 === c.status && X(b, c), b.parentFlushed && a.completedBoundaries.push(b), b.fallbackAbortableTasks.forEach(Lb, a), b.fallbackAbortableTasks.clear()) : c.parentFlushed && 1 === c.status && (X(b, c), 1 === b.completedSegments.length && b.parentFlushed && a.partialBoundaries.push(b)));
		a.allPendingTasks--;
		0 === a.allPendingTasks && (a = a.onAllReady, a());
	}
	function Eb(a) {
		if (2 !== a.status) {
			var b = D, c = Ab.current;
			Ab.current = zb;
			var d = R;
			R = a.responseState;
			try {
				var f = a.pingedTasks, e;
				for (e = 0; e < f.length; e++) {
					var g = f[e];
					var h = a, k = g.blockedSegment;
					if (0 === k.status) {
						F(g.context);
						try {
							W(h, g, g.node), h.responseState.generateStaticMarkup || k.lastPushedText && k.textEmbedded && k.chunks.push("<!-- -->"), g.abortSet.delete(g), k.status = 1, Mb(h, g.blockedBoundary, k);
						} catch (y) {
							if (tb(), "object" === typeof y && null !== y && "function" === typeof y.then) {
								var m = g.ping;
								y.then(m, m);
							} else {
								g.abortSet.delete(g);
								k.status = 4;
								var l = g.blockedBoundary, p = y, B = U(h, p);
								null === l ? V(h, p) : (l.pendingTasks--, l.forceClientRender || (l.forceClientRender = !0, l.errorDigest = B, l.parentFlushed && h.clientRenderedBoundaries.push(l)));
								h.allPendingTasks--;
								if (0 === h.allPendingTasks) {
									var C = h.onAllReady;
									C();
								}
							}
						}
					}
				}
				f.splice(0, e);
				null !== a.destination && Ob(a, a.destination);
			} catch (y) {
				U(a, y), V(a, y);
			} finally {
				R = d, Ab.current = c, c === zb && F(b);
			}
		}
	}
	function Y(a, b, c) {
		c.parentFlushed = !0;
		switch (c.status) {
			case 0:
				var d = c.id = a.nextSegmentId++;
				c.lastPushedText = !1;
				c.textEmbedded = !1;
				a = a.responseState;
				b.push("<template id=\"");
				b.push(a.placeholderPrefix);
				a = d.toString(16);
				b.push(a);
				return b.push("\"></template>");
			case 1:
				c.status = 2;
				var f = !0;
				d = c.chunks;
				var e = 0;
				c = c.children;
				for (var g = 0; g < c.length; g++) {
					for (f = c[g]; e < f.index; e++) b.push(d[e]);
					f = Z(a, b, f);
				}
				for (; e < d.length - 1; e++) b.push(d[e]);
				e < d.length && (f = b.push(d[e]));
				return f;
			default: throw Error("Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React.");
		}
	}
	function Z(a, b, c) {
		var d = c.boundary;
		if (null === d) return Y(a, b, c);
		d.parentFlushed = !0;
		if (d.forceClientRender) return a.responseState.generateStaticMarkup || (d = d.errorDigest, b.push("<!--$!-->"), b.push("<template"), d && (b.push(" data-dgst=\""), d = u(d), b.push(d), b.push("\"")), b.push("></template>")), Y(a, b, c), a = a.responseState.generateStaticMarkup ? !0 : b.push("<!--/$-->"), a;
		if (0 < d.pendingTasks) {
			d.rootSegmentID = a.nextSegmentId++;
			0 < d.completedSegments.length && a.partialBoundaries.push(d);
			var f = a.responseState;
			var e = f.nextSuspenseID++;
			f = f.boundaryPrefix + e.toString(16);
			d = d.id = f;
			Aa(b, a.responseState, d);
			Y(a, b, c);
			return b.push("<!--/$-->");
		}
		if (d.byteSize > a.progressiveChunkSize) return d.rootSegmentID = a.nextSegmentId++, a.completedBoundaries.push(d), Aa(b, a.responseState, d.id), Y(a, b, c), b.push("<!--/$-->");
		a.responseState.generateStaticMarkup || b.push("<!--$-->");
		c = d.completedSegments;
		if (1 !== c.length) throw Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
		Z(a, b, c[0]);
		a = a.responseState.generateStaticMarkup ? !0 : b.push("<!--/$-->");
		return a;
	}
	function Pb(a, b, c) {
		Ba(b, a.responseState, c.formatContext, c.id);
		Z(a, b, c);
		return Ca(b, c.formatContext);
	}
	function Qb(a, b, c) {
		for (var d = c.completedSegments, f = 0; f < d.length; f++) Rb(a, b, c, d[f]);
		d.length = 0;
		a = a.responseState;
		d = c.id;
		c = c.rootSegmentID;
		b.push(a.startInlineScript);
		a.sentCompleteBoundaryFunction ? b.push("$RC(\"") : (a.sentCompleteBoundaryFunction = !0, b.push("function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if(\"/$\"===d)if(0===e)break;else e--;else\"$\"!==d&&\"$?\"!==d&&\"$!\"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data=\"$\";a._reactRetry&&a._reactRetry()}};$RC(\""));
		if (null === d) throw Error("An ID must have been assigned before we can complete the boundary.");
		c = c.toString(16);
		b.push(d);
		b.push("\",\"");
		b.push(a.segmentPrefix);
		b.push(c);
		return b.push("\")<\/script>");
	}
	function Rb(a, b, c, d) {
		if (2 === d.status) return !0;
		var f = d.id;
		if (-1 === f) {
			if (-1 === (d.id = c.rootSegmentID)) throw Error("A root segment ID must have been assigned by now. This is a bug in React.");
			return Pb(a, b, d);
		}
		Pb(a, b, d);
		a = a.responseState;
		b.push(a.startInlineScript);
		a.sentCompleteSegmentFunction ? b.push("$RS(\"") : (a.sentCompleteSegmentFunction = !0, b.push("function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS(\""));
		b.push(a.segmentPrefix);
		f = f.toString(16);
		b.push(f);
		b.push("\",\"");
		b.push(a.placeholderPrefix);
		b.push(f);
		return b.push("\")<\/script>");
	}
	function Ob(a, b) {
		try {
			var c = a.completedRootSegment;
			if (null !== c && 0 === a.pendingRootTasks) {
				Z(a, b, c);
				a.completedRootSegment = null;
				var d = a.responseState.bootstrapChunks;
				for (c = 0; c < d.length - 1; c++) b.push(d[c]);
				c < d.length && b.push(d[c]);
			}
			var f = a.clientRenderedBoundaries, e;
			for (e = 0; e < f.length; e++) {
				var g = f[e];
				d = b;
				var h = a.responseState, k = g.id, m = g.errorDigest, l = g.errorMessage, p = g.errorComponentStack;
				d.push(h.startInlineScript);
				h.sentClientRenderFunction ? d.push("$RX(\"") : (h.sentClientRenderFunction = !0, d.push("function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data=\"$!\",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX(\""));
				if (null === k) throw Error("An ID must have been assigned before we can complete the boundary.");
				d.push(k);
				d.push("\"");
				if (m || l || p) {
					d.push(",");
					var B = Ea(m || "");
					d.push(B);
				}
				if (l || p) {
					d.push(",");
					var C = Ea(l || "");
					d.push(C);
				}
				if (p) {
					d.push(",");
					var y = Ea(p);
					d.push(y);
				}
				if (!d.push(")<\/script>")) {
					a.destination = null;
					e++;
					f.splice(0, e);
					return;
				}
			}
			f.splice(0, e);
			var aa = a.completedBoundaries;
			for (e = 0; e < aa.length; e++) if (!Qb(a, b, aa[e])) {
				a.destination = null;
				e++;
				aa.splice(0, e);
				return;
			}
			aa.splice(0, e);
			var ba = a.partialBoundaries;
			for (e = 0; e < ba.length; e++) {
				var pb = ba[e];
				a: {
					f = a;
					g = b;
					var ca = pb.completedSegments;
					for (h = 0; h < ca.length; h++) if (!Rb(f, g, pb, ca[h])) {
						h++;
						ca.splice(0, h);
						var qb = !1;
						break a;
					}
					ca.splice(0, h);
					qb = !0;
				}
				if (!qb) {
					a.destination = null;
					e++;
					ba.splice(0, e);
					return;
				}
			}
			ba.splice(0, e);
			var da = a.completedBoundaries;
			for (e = 0; e < da.length; e++) if (!Qb(a, b, da[e])) {
				a.destination = null;
				e++;
				da.splice(0, e);
				return;
			}
			da.splice(0, e);
		} finally {
			0 === a.allPendingTasks && 0 === a.pingedTasks.length && 0 === a.clientRenderedBoundaries.length && 0 === a.completedBoundaries.length && b.push(null);
		}
	}
	function Sb(a, b) {
		if (1 === a.status) a.status = 2, b.destroy(a.fatalError);
		else if (2 !== a.status && null === a.destination) {
			a.destination = b;
			try {
				Ob(a, b);
			} catch (c) {
				U(a, c), V(a, c);
			}
		}
	}
	function Tb(a, b) {
		try {
			var c = a.abortableTasks;
			c.forEach(function(c) {
				return Nb(c, a, b);
			});
			c.clear();
			null !== a.destination && Ob(a, a.destination);
		} catch (d) {
			U(a, d), V(a, d);
		}
	}
	function Ub() {}
	function Vb(a, b, c, d) {
		var f = !1, e = null, g = "", h = !1;
		a = Cb(a, Fa(c, b ? b.identifierPrefix : void 0), Ga(), Infinity, Ub, void 0, function() {
			h = !0;
		}, void 0, void 0);
		Eb(a);
		Tb(a, d);
		Sb(a, {
			push: function(a) {
				null !== a && (g += a);
				return !0;
			},
			destroy: function(a) {
				f = !0;
				e = a;
			}
		});
		if (f) throw e;
		if (!h) throw Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
		return g;
	}
	function Wb(a, b) {
		a.prototype = Object.create(b.prototype);
		a.prototype.constructor = a;
		a.__proto__ = b;
	}
	var Xb = function(a) {
		function b() {
			var b = a.call(this, {}) || this;
			b.request = null;
			b.startedFlowing = !1;
			return b;
		}
		Wb(b, a);
		var c = b.prototype;
		c._destroy = function(a, b) {
			Tb(this.request);
			b(a);
		};
		c._read = function() {
			this.startedFlowing && Sb(this.request, this);
		};
		return b;
	}(fa.Readable);
	function Yb() {}
	function Zb(a, b) {
		var c = new Xb(), d = Cb(a, Fa(!1, b ? b.identifierPrefix : void 0), Ga(), Infinity, Yb, function() {
			c.startedFlowing = !0;
			Sb(d, c);
		}, void 0, void 0);
		c.request = d;
		Eb(d);
		return c;
	}
	exports.renderToNodeStream = function(a, b) {
		return Zb(a, b);
	};
	exports.renderToStaticMarkup = function(a, b) {
		return Vb(a, b, !0, "The server used \"renderToStaticMarkup\" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to \"renderToPipeableStream\" which supports Suspense on the server");
	};
	exports.renderToStaticNodeStream = function(a, b) {
		return Zb(a, b);
	};
	exports.renderToString = function(a, b) {
		return Vb(a, b, !1, "The server used \"renderToString\" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to \"renderToPipeableStream\" which supports Suspense on the server");
	};
	exports.version = "18.3.1";
}));
//#endregion
//#region node_modules/react-dom/cjs/react-dom-server.node.production.min.js
/**
* @license React
* react-dom-server.node.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_dom_server_node_production_min = /* @__PURE__ */ __commonJSMin(((exports) => {
	var aa = __require("util");
	var ba = require_react();
	var k = null;
	var l = 0;
	var q = !0;
	function r(a, b) {
		if ("string" === typeof b) {
			if (0 !== b.length) if (2048 < 3 * b.length) 0 < l && (t(a, k.subarray(0, l)), k = /* @__PURE__ */ new Uint8Array(2048), l = 0), t(a, u.encode(b));
			else {
				var c = k;
				0 < l && (c = k.subarray(l));
				c = u.encodeInto(b, c);
				var d = c.read;
				l += c.written;
				d < b.length && (t(a, k), k = /* @__PURE__ */ new Uint8Array(2048), l = u.encodeInto(b.slice(d), k).written);
				2048 === l && (t(a, k), k = /* @__PURE__ */ new Uint8Array(2048), l = 0);
			}
		} else 0 !== b.byteLength && (2048 < b.byteLength ? (0 < l && (t(a, k.subarray(0, l)), k = /* @__PURE__ */ new Uint8Array(2048), l = 0), t(a, b)) : (c = k.length - l, c < b.byteLength && (0 === c ? t(a, k) : (k.set(b.subarray(0, c), l), l += c, t(a, k), b = b.subarray(c)), k = /* @__PURE__ */ new Uint8Array(2048), l = 0), k.set(b, l), l += b.byteLength, 2048 === l && (t(a, k), k = /* @__PURE__ */ new Uint8Array(2048), l = 0)));
	}
	function t(a, b) {
		a = a.write(b);
		q = q && a;
	}
	function w(a, b) {
		r(a, b);
		return q;
	}
	function ca(a) {
		k && 0 < l && a.write(k.subarray(0, l));
		k = null;
		l = 0;
		q = !0;
	}
	var u = new aa.TextEncoder();
	function x(a) {
		return u.encode(a);
	}
	var y = Object.prototype.hasOwnProperty;
	var da = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
	var ea = {};
	var fa = {};
	function ha(a) {
		if (y.call(fa, a)) return !0;
		if (y.call(ea, a)) return !1;
		if (da.test(a)) return fa[a] = !0;
		ea[a] = !0;
		return !1;
	}
	function z(a, b, c, d, f, e, g) {
		this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
		this.attributeName = d;
		this.attributeNamespace = f;
		this.mustUseProperty = c;
		this.propertyName = a;
		this.type = b;
		this.sanitizeURL = e;
		this.removeEmptyString = g;
	}
	var A = {};
	"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
		A[a] = new z(a, 0, !1, a, null, !1, !1);
	});
	[
		["acceptCharset", "accept-charset"],
		["className", "class"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"]
	].forEach(function(a) {
		var b = a[0];
		A[b] = new z(b, 1, !1, a[1], null, !1, !1);
	});
	[
		"contentEditable",
		"draggable",
		"spellCheck",
		"value"
	].forEach(function(a) {
		A[a] = new z(a, 2, !1, a.toLowerCase(), null, !1, !1);
	});
	[
		"autoReverse",
		"externalResourcesRequired",
		"focusable",
		"preserveAlpha"
	].forEach(function(a) {
		A[a] = new z(a, 2, !1, a, null, !1, !1);
	});
	"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
		A[a] = new z(a, 3, !1, a.toLowerCase(), null, !1, !1);
	});
	[
		"checked",
		"multiple",
		"muted",
		"selected"
	].forEach(function(a) {
		A[a] = new z(a, 3, !0, a, null, !1, !1);
	});
	["capture", "download"].forEach(function(a) {
		A[a] = new z(a, 4, !1, a, null, !1, !1);
	});
	[
		"cols",
		"rows",
		"size",
		"span"
	].forEach(function(a) {
		A[a] = new z(a, 6, !1, a, null, !1, !1);
	});
	["rowSpan", "start"].forEach(function(a) {
		A[a] = new z(a, 5, !1, a.toLowerCase(), null, !1, !1);
	});
	var ia = /[\-:]([a-z])/g;
	function ja(a) {
		return a[1].toUpperCase();
	}
	"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
		var b = a.replace(ia, ja);
		A[b] = new z(b, 1, !1, a, null, !1, !1);
	});
	"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
		var b = a.replace(ia, ja);
		A[b] = new z(b, 1, !1, a, "http://www.w3.org/1999/xlink", !1, !1);
	});
	[
		"xml:base",
		"xml:lang",
		"xml:space"
	].forEach(function(a) {
		var b = a.replace(ia, ja);
		A[b] = new z(b, 1, !1, a, "http://www.w3.org/XML/1998/namespace", !1, !1);
	});
	["tabIndex", "crossOrigin"].forEach(function(a) {
		A[a] = new z(a, 1, !1, a.toLowerCase(), null, !1, !1);
	});
	A.xlinkHref = new z("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
	[
		"src",
		"href",
		"action",
		"formAction"
	].forEach(function(a) {
		A[a] = new z(a, 1, !1, a.toLowerCase(), null, !0, !0);
	});
	var B = {
		animationIterationCount: !0,
		aspectRatio: !0,
		borderImageOutset: !0,
		borderImageSlice: !0,
		borderImageWidth: !0,
		boxFlex: !0,
		boxFlexGroup: !0,
		boxOrdinalGroup: !0,
		columnCount: !0,
		columns: !0,
		flex: !0,
		flexGrow: !0,
		flexPositive: !0,
		flexShrink: !0,
		flexNegative: !0,
		flexOrder: !0,
		gridArea: !0,
		gridRow: !0,
		gridRowEnd: !0,
		gridRowSpan: !0,
		gridRowStart: !0,
		gridColumn: !0,
		gridColumnEnd: !0,
		gridColumnSpan: !0,
		gridColumnStart: !0,
		fontWeight: !0,
		lineClamp: !0,
		lineHeight: !0,
		opacity: !0,
		order: !0,
		orphans: !0,
		tabSize: !0,
		widows: !0,
		zIndex: !0,
		zoom: !0,
		fillOpacity: !0,
		floodOpacity: !0,
		stopOpacity: !0,
		strokeDasharray: !0,
		strokeDashoffset: !0,
		strokeMiterlimit: !0,
		strokeOpacity: !0,
		strokeWidth: !0
	};
	var ka = [
		"Webkit",
		"ms",
		"Moz",
		"O"
	];
	Object.keys(B).forEach(function(a) {
		ka.forEach(function(b) {
			b = b + a.charAt(0).toUpperCase() + a.substring(1);
			B[b] = B[a];
		});
	});
	var la = /["'&<>]/;
	function F(a) {
		if ("boolean" === typeof a || "number" === typeof a) return "" + a;
		a = "" + a;
		var b = la.exec(a);
		if (b) {
			var c = "", d, f = 0;
			for (d = b.index; d < a.length; d++) {
				switch (a.charCodeAt(d)) {
					case 34:
						b = "&quot;";
						break;
					case 38:
						b = "&amp;";
						break;
					case 39:
						b = "&#x27;";
						break;
					case 60:
						b = "&lt;";
						break;
					case 62:
						b = "&gt;";
						break;
					default: continue;
				}
				f !== d && (c += a.substring(f, d));
				f = d + 1;
				c += b;
			}
			a = f !== d ? c + a.substring(f, d) : c;
		}
		return a;
	}
	var ma = /([A-Z])/g;
	var pa = /^ms-/;
	var qa = Array.isArray;
	var ra = x("<script>");
	var sa = x("<\/script>");
	var ta = x("<script src=\"");
	var ua = x("<script type=\"module\" src=\"");
	var va = x("\" async=\"\"><\/script>");
	var wa = /(<\/|<)(s)(cript)/gi;
	function xa(a, b, c, d) {
		return "" + b + ("s" === c ? "\\u0073" : "\\u0053") + d;
	}
	function G(a, b) {
		return {
			insertionMode: a,
			selectedValue: b
		};
	}
	function ya(a, b, c) {
		switch (b) {
			case "select": return G(1, null != c.value ? c.value : c.defaultValue);
			case "svg": return G(2, null);
			case "math": return G(3, null);
			case "foreignObject": return G(1, null);
			case "table": return G(4, null);
			case "thead":
			case "tbody":
			case "tfoot": return G(5, null);
			case "colgroup": return G(7, null);
			case "tr": return G(6, null);
		}
		return 4 <= a.insertionMode || 0 === a.insertionMode ? G(1, null) : a;
	}
	var za = x("<!-- -->");
	function Aa(a, b, c, d) {
		if ("" === b) return d;
		d && a.push(za);
		a.push(F(b));
		return !0;
	}
	var Ba = /* @__PURE__ */ new Map();
	var Ca = x(" style=\"");
	var Da = x(":");
	var Ea = x(";");
	function Fa(a, b, c) {
		if ("object" !== typeof c) throw Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
		b = !0;
		for (var d in c) if (y.call(c, d)) {
			var f = c[d];
			if (null != f && "boolean" !== typeof f && "" !== f) {
				if (0 === d.indexOf("--")) {
					var e = F(d);
					f = F(("" + f).trim());
				} else {
					e = d;
					var g = Ba.get(e);
					void 0 !== g ? e = g : (g = x(F(e.replace(ma, "-$1").toLowerCase().replace(pa, "-ms-"))), Ba.set(e, g), e = g);
					f = "number" === typeof f ? 0 === f || y.call(B, d) ? "" + f : f + "px" : F(("" + f).trim());
				}
				b ? (b = !1, a.push(Ca, e, Da, f)) : a.push(Ea, e, Da, f);
			}
		}
		b || a.push(H);
	}
	var I = x(" ");
	var J = x("=\"");
	var H = x("\"");
	var Ga = x("=\"\"");
	function K(a, b, c, d) {
		switch (c) {
			case "style":
				Fa(a, b, d);
				return;
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning": return;
		}
		if (!(2 < c.length) || "o" !== c[0] && "O" !== c[0] || "n" !== c[1] && "N" !== c[1]) {
			if (b = A.hasOwnProperty(c) ? A[c] : null, null !== b) {
				switch (typeof d) {
					case "function":
					case "symbol": return;
					case "boolean": if (!b.acceptsBooleans) return;
				}
				c = b.attributeName;
				switch (b.type) {
					case 3:
						d && a.push(I, c, Ga);
						break;
					case 4:
						!0 === d ? a.push(I, c, Ga) : !1 !== d && a.push(I, c, J, F(d), H);
						break;
					case 5:
						isNaN(d) || a.push(I, c, J, F(d), H);
						break;
					case 6:
						!isNaN(d) && 1 <= d && a.push(I, c, J, F(d), H);
						break;
					default: b.sanitizeURL && (d = "" + d), a.push(I, c, J, F(d), H);
				}
			} else if (ha(c)) {
				switch (typeof d) {
					case "function":
					case "symbol": return;
					case "boolean": if (b = c.toLowerCase().slice(0, 5), "data-" !== b && "aria-" !== b) return;
				}
				a.push(I, c, J, F(d), H);
			}
		}
	}
	var L = x(">");
	var Ha = x("/>");
	function M(a, b, c) {
		if (null != b) {
			if (null != c) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
			if ("object" !== typeof b || !("__html" in b)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
			b = b.__html;
			null !== b && void 0 !== b && a.push("" + b);
		}
	}
	function Ia(a) {
		var b = "";
		ba.Children.forEach(a, function(a) {
			null != a && (b += a);
		});
		return b;
	}
	var Ja = x(" selected=\"\"");
	function Ka(a, b, c, d) {
		a.push(N(c));
		var f = c = null, e;
		for (e in b) if (y.call(b, e)) {
			var g = b[e];
			if (null != g) switch (e) {
				case "children":
					c = g;
					break;
				case "dangerouslySetInnerHTML":
					f = g;
					break;
				default: K(a, d, e, g);
			}
		}
		a.push(L);
		M(a, f, c);
		return "string" === typeof c ? (a.push(F(c)), null) : c;
	}
	var La = x("\n");
	var Ma = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
	var Na = /* @__PURE__ */ new Map();
	function N(a) {
		var b = Na.get(a);
		if (void 0 === b) {
			if (!Ma.test(a)) throw Error("Invalid tag: " + a);
			b = x("<" + a);
			Na.set(a, b);
		}
		return b;
	}
	var Oa = x("<!DOCTYPE html>");
	function Pa(a, b, c, d, f) {
		switch (b) {
			case "select":
				a.push(N("select"));
				var e = null, g = null;
				for (p in c) if (y.call(c, p)) {
					var h = c[p];
					if (null != h) switch (p) {
						case "children":
							e = h;
							break;
						case "dangerouslySetInnerHTML":
							g = h;
							break;
						case "defaultValue":
						case "value": break;
						default: K(a, d, p, h);
					}
				}
				a.push(L);
				M(a, g, e);
				return e;
			case "option":
				g = f.selectedValue;
				a.push(N("option"));
				var m = h = null, n = null;
				var p = null;
				for (e in c) if (y.call(c, e)) {
					var v = c[e];
					if (null != v) switch (e) {
						case "children":
							h = v;
							break;
						case "selected":
							n = v;
							break;
						case "dangerouslySetInnerHTML":
							p = v;
							break;
						case "value": m = v;
						default: K(a, d, e, v);
					}
				}
				if (null != g) if (c = null !== m ? "" + m : Ia(h), qa(g)) {
					for (d = 0; d < g.length; d++) if ("" + g[d] === c) {
						a.push(Ja);
						break;
					}
				} else "" + g === c && a.push(Ja);
				else n && a.push(Ja);
				a.push(L);
				M(a, p, h);
				return h;
			case "textarea":
				a.push(N("textarea"));
				p = g = e = null;
				for (h in c) if (y.call(c, h) && (m = c[h], null != m)) switch (h) {
					case "children":
						p = m;
						break;
					case "value":
						e = m;
						break;
					case "defaultValue":
						g = m;
						break;
					case "dangerouslySetInnerHTML": throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
					default: K(a, d, h, m);
				}
				null === e && null !== g && (e = g);
				a.push(L);
				if (null != p) {
					if (null != e) throw Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
					if (qa(p) && 1 < p.length) throw Error("<textarea> can only have at most one child.");
					e = "" + p;
				}
				"string" === typeof e && "\n" === e[0] && a.push(La);
				null !== e && a.push(F("" + e));
				return null;
			case "input":
				a.push(N("input"));
				m = p = h = e = null;
				for (g in c) if (y.call(c, g) && (n = c[g], null != n)) switch (g) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error("input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
					case "defaultChecked":
						m = n;
						break;
					case "defaultValue":
						h = n;
						break;
					case "checked":
						p = n;
						break;
					case "value":
						e = n;
						break;
					default: K(a, d, g, n);
				}
				null !== p ? K(a, d, "checked", p) : null !== m && K(a, d, "checked", m);
				null !== e ? K(a, d, "value", e) : null !== h && K(a, d, "value", h);
				a.push(Ha);
				return null;
			case "menuitem":
				a.push(N("menuitem"));
				for (var C in c) if (y.call(c, C) && (e = c[C], null != e)) switch (C) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error("menuitems cannot have `children` nor `dangerouslySetInnerHTML`.");
					default: K(a, d, C, e);
				}
				a.push(L);
				return null;
			case "title":
				a.push(N("title"));
				e = null;
				for (v in c) if (y.call(c, v) && (g = c[v], null != g)) switch (v) {
					case "children":
						e = g;
						break;
					case "dangerouslySetInnerHTML": throw Error("`dangerouslySetInnerHTML` does not make sense on <title>.");
					default: K(a, d, v, g);
				}
				a.push(L);
				return e;
			case "listing":
			case "pre":
				a.push(N(b));
				g = e = null;
				for (m in c) if (y.call(c, m) && (h = c[m], null != h)) switch (m) {
					case "children":
						e = h;
						break;
					case "dangerouslySetInnerHTML":
						g = h;
						break;
					default: K(a, d, m, h);
				}
				a.push(L);
				if (null != g) {
					if (null != e) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
					if ("object" !== typeof g || !("__html" in g)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
					c = g.__html;
					null !== c && void 0 !== c && ("string" === typeof c && 0 < c.length && "\n" === c[0] ? a.push(La, c) : a.push("" + c));
				}
				"string" === typeof e && "\n" === e[0] && a.push(La);
				return e;
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "img":
			case "keygen":
			case "link":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
				a.push(N(b));
				for (var D in c) if (y.call(c, D) && (e = c[D], null != e)) switch (D) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(b + " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
					default: K(a, d, D, e);
				}
				a.push(Ha);
				return null;
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return Ka(a, c, b, d);
			case "html": return 0 === f.insertionMode && a.push(Oa), Ka(a, c, b, d);
			default:
				if (-1 === b.indexOf("-") && "string" !== typeof c.is) return Ka(a, c, b, d);
				a.push(N(b));
				g = e = null;
				for (n in c) if (y.call(c, n) && (h = c[n], null != h)) switch (n) {
					case "children":
						e = h;
						break;
					case "dangerouslySetInnerHTML":
						g = h;
						break;
					case "style":
						Fa(a, d, h);
						break;
					case "suppressContentEditableWarning":
					case "suppressHydrationWarning": break;
					default: ha(n) && "function" !== typeof h && "symbol" !== typeof h && a.push(I, n, J, F(h), H);
				}
				a.push(L);
				M(a, g, e);
				return e;
		}
	}
	var Qa = x("</");
	var Ra = x(">");
	var Sa = x("<template id=\"");
	var Ta = x("\"></template>");
	var Ua = x("<!--$-->");
	var Va = x("<!--$?--><template id=\"");
	var Wa = x("\"></template>");
	var Xa = x("<!--$!-->");
	var Ya = x("<!--/$-->");
	var Za = x("<template");
	var $a = x("\"");
	var ab = x(" data-dgst=\"");
	x(" data-msg=\"");
	x(" data-stck=\"");
	var bb = x("></template>");
	function cb(a, b, c) {
		r(a, Va);
		if (null === c) throw Error("An ID must have been assigned before we can complete the boundary.");
		r(a, c);
		return w(a, Wa);
	}
	var db = x("<div hidden id=\"");
	var eb = x("\">");
	var fb = x("</div>");
	var gb = x("<svg aria-hidden=\"true\" style=\"display:none\" id=\"");
	var hb = x("\">");
	var ib = x("</svg>");
	var jb = x("<math aria-hidden=\"true\" style=\"display:none\" id=\"");
	var kb = x("\">");
	var lb = x("</math>");
	var mb = x("<table hidden id=\"");
	var nb = x("\">");
	var ob = x("</table>");
	var pb = x("<table hidden><tbody id=\"");
	var qb = x("\">");
	var rb = x("</tbody></table>");
	var sb = x("<table hidden><tr id=\"");
	var tb = x("\">");
	var ub = x("</tr></table>");
	var vb = x("<table hidden><colgroup id=\"");
	var wb = x("\">");
	var xb = x("</colgroup></table>");
	function yb(a, b, c, d) {
		switch (c.insertionMode) {
			case 0:
			case 1: return r(a, db), r(a, b.segmentPrefix), r(a, d.toString(16)), w(a, eb);
			case 2: return r(a, gb), r(a, b.segmentPrefix), r(a, d.toString(16)), w(a, hb);
			case 3: return r(a, jb), r(a, b.segmentPrefix), r(a, d.toString(16)), w(a, kb);
			case 4: return r(a, mb), r(a, b.segmentPrefix), r(a, d.toString(16)), w(a, nb);
			case 5: return r(a, pb), r(a, b.segmentPrefix), r(a, d.toString(16)), w(a, qb);
			case 6: return r(a, sb), r(a, b.segmentPrefix), r(a, d.toString(16)), w(a, tb);
			case 7: return r(a, vb), r(a, b.segmentPrefix), r(a, d.toString(16)), w(a, wb);
			default: throw Error("Unknown insertion mode. This is a bug in React.");
		}
	}
	function zb(a, b) {
		switch (b.insertionMode) {
			case 0:
			case 1: return w(a, fb);
			case 2: return w(a, ib);
			case 3: return w(a, lb);
			case 4: return w(a, ob);
			case 5: return w(a, rb);
			case 6: return w(a, ub);
			case 7: return w(a, xb);
			default: throw Error("Unknown insertion mode. This is a bug in React.");
		}
	}
	var Ab = x("function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS(\"");
	var Bb = x("$RS(\"");
	var Cb = x("\",\"");
	var Db = x("\")<\/script>");
	var Fb = x("function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if(\"/$\"===d)if(0===e)break;else e--;else\"$\"!==d&&\"$?\"!==d&&\"$!\"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data=\"$\";a._reactRetry&&a._reactRetry()}};$RC(\"");
	var Gb = x("$RC(\"");
	var Hb = x("\",\"");
	var Ib = x("\")<\/script>");
	var Jb = x("function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data=\"$!\",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX(\"");
	var Kb = x("$RX(\"");
	var Lb = x("\"");
	var Mb = x(")<\/script>");
	var Nb = x(",");
	var Ob = /[<\u2028\u2029]/g;
	function Pb(a) {
		return JSON.stringify(a).replace(Ob, function(a) {
			switch (a) {
				case "<": return "\\u003c";
				case "\u2028": return "\\u2028";
				case "\u2029": return "\\u2029";
				default: throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
			}
		});
	}
	var O = Object.assign;
	var Qb = Symbol.for("react.element");
	var Rb = Symbol.for("react.portal");
	var Sb = Symbol.for("react.fragment");
	var Tb = Symbol.for("react.strict_mode");
	var Ub = Symbol.for("react.profiler");
	var Vb = Symbol.for("react.provider");
	var Wb = Symbol.for("react.context");
	var Xb = Symbol.for("react.forward_ref");
	var Yb = Symbol.for("react.suspense");
	var Zb = Symbol.for("react.suspense_list");
	var $b = Symbol.for("react.memo");
	var ac = Symbol.for("react.lazy");
	var bc = Symbol.for("react.scope");
	var cc = Symbol.for("react.debug_trace_mode");
	var dc = Symbol.for("react.legacy_hidden");
	var ec = Symbol.for("react.default_value");
	var fc = Symbol.iterator;
	function gc(a) {
		if (null == a) return null;
		if ("function" === typeof a) return a.displayName || a.name || null;
		if ("string" === typeof a) return a;
		switch (a) {
			case Sb: return "Fragment";
			case Rb: return "Portal";
			case Ub: return "Profiler";
			case Tb: return "StrictMode";
			case Yb: return "Suspense";
			case Zb: return "SuspenseList";
		}
		if ("object" === typeof a) switch (a.$$typeof) {
			case Wb: return (a.displayName || "Context") + ".Consumer";
			case Vb: return (a._context.displayName || "Context") + ".Provider";
			case Xb:
				var b = a.render;
				a = a.displayName;
				a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
				return a;
			case $b: return b = a.displayName || null, null !== b ? b : gc(a.type) || "Memo";
			case ac:
				b = a._payload;
				a = a._init;
				try {
					return gc(a(b));
				} catch (c) {}
		}
		return null;
	}
	var hc = {};
	function ic(a, b) {
		a = a.contextTypes;
		if (!a) return hc;
		var c = {}, d;
		for (d in a) c[d] = b[d];
		return c;
	}
	var P = null;
	function Q(a, b) {
		if (a !== b) {
			a.context._currentValue = a.parentValue;
			a = a.parent;
			var c = b.parent;
			if (null === a) {
				if (null !== c) throw Error("The stacks must reach the root at the same time. This is a bug in React.");
			} else {
				if (null === c) throw Error("The stacks must reach the root at the same time. This is a bug in React.");
				Q(a, c);
			}
			b.context._currentValue = b.value;
		}
	}
	function jc(a) {
		a.context._currentValue = a.parentValue;
		a = a.parent;
		null !== a && jc(a);
	}
	function kc(a) {
		var b = a.parent;
		null !== b && kc(b);
		a.context._currentValue = a.value;
	}
	function lc(a, b) {
		a.context._currentValue = a.parentValue;
		a = a.parent;
		if (null === a) throw Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
		a.depth === b.depth ? Q(a, b) : lc(a, b);
	}
	function mc(a, b) {
		var c = b.parent;
		if (null === c) throw Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
		a.depth === c.depth ? Q(a, c) : mc(a, c);
		b.context._currentValue = b.value;
	}
	function nc(a) {
		var b = P;
		b !== a && (null === b ? kc(a) : null === a ? jc(b) : b.depth === a.depth ? Q(b, a) : b.depth > a.depth ? lc(b, a) : mc(b, a), P = a);
	}
	var oc = {
		isMounted: function() {
			return !1;
		},
		enqueueSetState: function(a, b) {
			a = a._reactInternals;
			null !== a.queue && a.queue.push(b);
		},
		enqueueReplaceState: function(a, b) {
			a = a._reactInternals;
			a.replace = !0;
			a.queue = [b];
		},
		enqueueForceUpdate: function() {}
	};
	function pc(a, b, c, d) {
		var f = void 0 !== a.state ? a.state : null;
		a.updater = oc;
		a.props = c;
		a.state = f;
		var e = {
			queue: [],
			replace: !1
		};
		a._reactInternals = e;
		var g = b.contextType;
		a.context = "object" === typeof g && null !== g ? g._currentValue : d;
		g = b.getDerivedStateFromProps;
		"function" === typeof g && (g = g(c, f), f = null === g || void 0 === g ? f : O({}, f, g), a.state = f);
		if ("function" !== typeof b.getDerivedStateFromProps && "function" !== typeof a.getSnapshotBeforeUpdate && ("function" === typeof a.UNSAFE_componentWillMount || "function" === typeof a.componentWillMount)) if (b = a.state, "function" === typeof a.componentWillMount && a.componentWillMount(), "function" === typeof a.UNSAFE_componentWillMount && a.UNSAFE_componentWillMount(), b !== a.state && oc.enqueueReplaceState(a, a.state, null), null !== e.queue && 0 < e.queue.length) if (b = e.queue, g = e.replace, e.queue = null, e.replace = !1, g && 1 === b.length) a.state = b[0];
		else {
			e = g ? b[0] : a.state;
			f = !0;
			for (g = g ? 1 : 0; g < b.length; g++) {
				var h = b[g];
				h = "function" === typeof h ? h.call(a, e, c, d) : h;
				null != h && (f ? (f = !1, e = O({}, e, h)) : O(e, h));
			}
			a.state = e;
		}
		else e.queue = null;
	}
	var qc = {
		id: 1,
		overflow: ""
	};
	function rc(a, b, c) {
		var d = a.id;
		a = a.overflow;
		var f = 32 - sc(d) - 1;
		d &= ~(1 << f);
		c += 1;
		var e = 32 - sc(b) + f;
		if (30 < e) {
			var g = f - f % 5;
			e = (d & (1 << g) - 1).toString(32);
			d >>= g;
			f -= g;
			return {
				id: 1 << 32 - sc(b) + f | c << f | d,
				overflow: e + a
			};
		}
		return {
			id: 1 << e | c << f | d,
			overflow: a
		};
	}
	var sc = Math.clz32 ? Math.clz32 : tc;
	var uc = Math.log;
	var vc = Math.LN2;
	function tc(a) {
		a >>>= 0;
		return 0 === a ? 32 : 31 - (uc(a) / vc | 0) | 0;
	}
	function wc(a, b) {
		return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
	}
	var xc = "function" === typeof Object.is ? Object.is : wc;
	var R = null;
	var yc = null;
	var zc = null;
	var S = null;
	var T = !1;
	var Ac = !1;
	var U = 0;
	var V = null;
	var Bc = 0;
	function W() {
		if (null === R) throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
		return R;
	}
	function Cc() {
		if (0 < Bc) throw Error("Rendered more hooks than during the previous render");
		return {
			memoizedState: null,
			queue: null,
			next: null
		};
	}
	function Dc() {
		null === S ? null === zc ? (T = !1, zc = S = Cc()) : (T = !0, S = zc) : null === S.next ? (T = !1, S = S.next = Cc()) : (T = !0, S = S.next);
		return S;
	}
	function Ec() {
		yc = R = null;
		Ac = !1;
		zc = null;
		Bc = 0;
		S = V = null;
	}
	function Fc(a, b) {
		return "function" === typeof b ? b(a) : b;
	}
	function Gc(a, b, c) {
		R = W();
		S = Dc();
		if (T) {
			var d = S.queue;
			b = d.dispatch;
			if (null !== V && (c = V.get(d), void 0 !== c)) {
				V.delete(d);
				d = S.memoizedState;
				do
					d = a(d, c.action), c = c.next;
				while (null !== c);
				S.memoizedState = d;
				return [d, b];
			}
			return [S.memoizedState, b];
		}
		a = a === Fc ? "function" === typeof b ? b() : b : void 0 !== c ? c(b) : b;
		S.memoizedState = a;
		a = S.queue = {
			last: null,
			dispatch: null
		};
		a = a.dispatch = Hc.bind(null, R, a);
		return [S.memoizedState, a];
	}
	function Ic(a, b) {
		R = W();
		S = Dc();
		b = void 0 === b ? null : b;
		if (null !== S) {
			var c = S.memoizedState;
			if (null !== c && null !== b) {
				var d = c[1];
				a: if (null === d) d = !1;
				else {
					for (var f = 0; f < d.length && f < b.length; f++) if (!xc(b[f], d[f])) {
						d = !1;
						break a;
					}
					d = !0;
				}
				if (d) return c[0];
			}
		}
		a = a();
		S.memoizedState = [a, b];
		return a;
	}
	function Hc(a, b, c) {
		if (25 <= Bc) throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
		if (a === R) if (Ac = !0, a = {
			action: c,
			next: null
		}, null === V && (V = /* @__PURE__ */ new Map()), c = V.get(b), void 0 === c) V.set(b, a);
		else {
			for (b = c; null !== b.next;) b = b.next;
			b.next = a;
		}
	}
	function Jc() {
		throw Error("startTransition cannot be called during server rendering.");
	}
	function Kc() {}
	var Mc = {
		readContext: function(a) {
			return a._currentValue;
		},
		useContext: function(a) {
			W();
			return a._currentValue;
		},
		useMemo: Ic,
		useReducer: Gc,
		useRef: function(a) {
			R = W();
			S = Dc();
			var b = S.memoizedState;
			return null === b ? (a = { current: a }, S.memoizedState = a) : b;
		},
		useState: function(a) {
			return Gc(Fc, a);
		},
		useInsertionEffect: Kc,
		useLayoutEffect: function() {},
		useCallback: function(a, b) {
			return Ic(function() {
				return a;
			}, b);
		},
		useImperativeHandle: Kc,
		useEffect: Kc,
		useDebugValue: Kc,
		useDeferredValue: function(a) {
			W();
			return a;
		},
		useTransition: function() {
			W();
			return [!1, Jc];
		},
		useId: function() {
			var a = yc.treeContext;
			var b = a.overflow;
			a = a.id;
			a = (a & ~(1 << 32 - sc(a) - 1)).toString(32) + b;
			var c = Lc;
			if (null === c) throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component.");
			b = U++;
			a = ":" + c.idPrefix + "R" + a;
			0 < b && (a += "H" + b.toString(32));
			return a + ":";
		},
		useMutableSource: function(a, b) {
			W();
			return b(a._source);
		},
		useSyncExternalStore: function(a, b, c) {
			if (void 0 === c) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
			return c();
		}
	};
	var Lc = null;
	var Nc = ba.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
	function Oc(a) {
		console.error(a);
		return null;
	}
	function X() {}
	function Pc(a, b) {
		var c = a.pingedTasks;
		c.push(b);
		1 === c.length && setImmediate(function() {
			return Qc(a);
		});
	}
	function Rc(a, b, c, d, f, e, g, h) {
		a.allPendingTasks++;
		null === c ? a.pendingRootTasks++ : c.pendingTasks++;
		var m = {
			node: b,
			ping: function() {
				return Pc(a, m);
			},
			blockedBoundary: c,
			blockedSegment: d,
			abortSet: f,
			legacyContext: e,
			context: g,
			treeContext: h
		};
		f.add(m);
		return m;
	}
	function Sc(a, b, c, d, f, e) {
		return {
			status: 0,
			id: -1,
			index: b,
			parentFlushed: !1,
			chunks: [],
			children: [],
			formatContext: d,
			boundary: c,
			lastPushedText: f,
			textEmbedded: e
		};
	}
	function Y(a, b) {
		a = a.onError(b);
		if (null != a && "string" !== typeof a) throw Error("onError returned something with a type other than \"string\". onError should return a string and may return null or undefined but must not return anything else. It received something of type \"" + typeof a + "\" instead");
		return a;
	}
	function Tc(a, b) {
		var c = a.onShellError;
		c(b);
		c = a.onFatalError;
		c(b);
		null !== a.destination ? (a.status = 2, a.destination.destroy(b)) : (a.status = 1, a.fatalError = b);
	}
	function Uc(a, b, c, d, f) {
		R = {};
		yc = b;
		U = 0;
		for (a = c(d, f); Ac;) Ac = !1, U = 0, Bc += 1, S = null, a = c(d, f);
		Ec();
		return a;
	}
	function Vc(a, b, c, d) {
		var f = c.render(), e = d.childContextTypes;
		if (null !== e && void 0 !== e) {
			var g = b.legacyContext;
			if ("function" !== typeof c.getChildContext) d = g;
			else {
				c = c.getChildContext();
				for (var h in c) if (!(h in e)) throw Error((gc(d) || "Unknown") + ".getChildContext(): key \"" + h + "\" is not defined in childContextTypes.");
				d = O({}, g, c);
			}
			b.legacyContext = d;
			Z(a, b, f);
			b.legacyContext = g;
		} else Z(a, b, f);
	}
	function Wc(a, b) {
		if (a && a.defaultProps) {
			b = O({}, b);
			a = a.defaultProps;
			for (var c in a) void 0 === b[c] && (b[c] = a[c]);
			return b;
		}
		return b;
	}
	function Xc(a, b, c, d, f) {
		if ("function" === typeof c) if (c.prototype && c.prototype.isReactComponent) {
			f = ic(c, b.legacyContext);
			var e = c.contextType;
			e = new c(d, "object" === typeof e && null !== e ? e._currentValue : f);
			pc(e, c, d, f);
			Vc(a, b, e, c);
		} else {
			e = ic(c, b.legacyContext);
			f = Uc(a, b, c, d, e);
			var g = 0 !== U;
			if ("object" === typeof f && null !== f && "function" === typeof f.render && void 0 === f.$$typeof) pc(f, c, d, e), Vc(a, b, f, c);
			else if (g) {
				d = b.treeContext;
				b.treeContext = rc(d, 1, 0);
				try {
					Z(a, b, f);
				} finally {
					b.treeContext = d;
				}
			} else Z(a, b, f);
		}
		else if ("string" === typeof c) {
			f = b.blockedSegment;
			e = Pa(f.chunks, c, d, a.responseState, f.formatContext);
			f.lastPushedText = !1;
			g = f.formatContext;
			f.formatContext = ya(g, c, d);
			Yc(a, b, e);
			f.formatContext = g;
			switch (c) {
				case "area":
				case "base":
				case "br":
				case "col":
				case "embed":
				case "hr":
				case "img":
				case "input":
				case "keygen":
				case "link":
				case "meta":
				case "param":
				case "source":
				case "track":
				case "wbr": break;
				default: f.chunks.push(Qa, c, Ra);
			}
			f.lastPushedText = !1;
		} else {
			switch (c) {
				case dc:
				case cc:
				case Tb:
				case Ub:
				case Sb:
					Z(a, b, d.children);
					return;
				case Zb:
					Z(a, b, d.children);
					return;
				case bc: throw Error("ReactDOMServer does not yet support scope components.");
				case Yb:
					a: {
						c = b.blockedBoundary;
						f = b.blockedSegment;
						e = d.fallback;
						d = d.children;
						g = /* @__PURE__ */ new Set();
						var h = {
							id: null,
							rootSegmentID: -1,
							parentFlushed: !1,
							pendingTasks: 0,
							forceClientRender: !1,
							completedSegments: [],
							byteSize: 0,
							fallbackAbortableTasks: g,
							errorDigest: null
						}, m = Sc(a, f.chunks.length, h, f.formatContext, !1, !1);
						f.children.push(m);
						f.lastPushedText = !1;
						var n = Sc(a, 0, null, f.formatContext, !1, !1);
						n.parentFlushed = !0;
						b.blockedBoundary = h;
						b.blockedSegment = n;
						try {
							if (Yc(a, b, d), n.lastPushedText && n.textEmbedded && n.chunks.push(za), n.status = 1, Zc(h, n), 0 === h.pendingTasks) break a;
						} catch (p) {
							n.status = 4, h.forceClientRender = !0, h.errorDigest = Y(a, p);
						} finally {
							b.blockedBoundary = c, b.blockedSegment = f;
						}
						b = Rc(a, e, c, m, g, b.legacyContext, b.context, b.treeContext);
						a.pingedTasks.push(b);
					}
					return;
			}
			if ("object" === typeof c && null !== c) switch (c.$$typeof) {
				case Xb:
					d = Uc(a, b, c.render, d, f);
					if (0 !== U) {
						c = b.treeContext;
						b.treeContext = rc(c, 1, 0);
						try {
							Z(a, b, d);
						} finally {
							b.treeContext = c;
						}
					} else Z(a, b, d);
					return;
				case $b:
					c = c.type;
					d = Wc(c, d);
					Xc(a, b, c, d, f);
					return;
				case Vb:
					f = d.children;
					c = c._context;
					d = d.value;
					e = c._currentValue;
					c._currentValue = d;
					g = P;
					P = d = {
						parent: g,
						depth: null === g ? 0 : g.depth + 1,
						context: c,
						parentValue: e,
						value: d
					};
					b.context = d;
					Z(a, b, f);
					a = P;
					if (null === a) throw Error("Tried to pop a Context at the root of the app. This is a bug in React.");
					d = a.parentValue;
					a.context._currentValue = d === ec ? a.context._defaultValue : d;
					a = P = a.parent;
					b.context = a;
					return;
				case Wb:
					d = d.children;
					d = d(c._currentValue);
					Z(a, b, d);
					return;
				case ac:
					f = c._init;
					c = f(c._payload);
					d = Wc(c, d);
					Xc(a, b, c, d, void 0);
					return;
			}
			throw Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + ((null == c ? c : typeof c) + "."));
		}
	}
	function Z(a, b, c) {
		b.node = c;
		if ("object" === typeof c && null !== c) {
			switch (c.$$typeof) {
				case Qb:
					Xc(a, b, c.type, c.props, c.ref);
					return;
				case Rb: throw Error("Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.");
				case ac:
					var d = c._init;
					c = d(c._payload);
					Z(a, b, c);
					return;
			}
			if (qa(c)) {
				$c(a, b, c);
				return;
			}
			null === c || "object" !== typeof c ? d = null : (d = fc && c[fc] || c["@@iterator"], d = "function" === typeof d ? d : null);
			if (d && (d = d.call(c))) {
				c = d.next();
				if (!c.done) {
					var f = [];
					do
						f.push(c.value), c = d.next();
					while (!c.done);
					$c(a, b, f);
				}
				return;
			}
			a = Object.prototype.toString.call(c);
			throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === a ? "object with keys {" + Object.keys(c).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
		}
		"string" === typeof c ? (d = b.blockedSegment, d.lastPushedText = Aa(b.blockedSegment.chunks, c, a.responseState, d.lastPushedText)) : "number" === typeof c && (d = b.blockedSegment, d.lastPushedText = Aa(b.blockedSegment.chunks, "" + c, a.responseState, d.lastPushedText));
	}
	function $c(a, b, c) {
		for (var d = c.length, f = 0; f < d; f++) {
			var e = b.treeContext;
			b.treeContext = rc(e, d, f);
			try {
				Yc(a, b, c[f]);
			} finally {
				b.treeContext = e;
			}
		}
	}
	function Yc(a, b, c) {
		var d = b.blockedSegment.formatContext, f = b.legacyContext, e = b.context;
		try {
			return Z(a, b, c);
		} catch (m) {
			if (Ec(), "object" === typeof m && null !== m && "function" === typeof m.then) {
				c = m;
				var g = b.blockedSegment, h = Sc(a, g.chunks.length, null, g.formatContext, g.lastPushedText, !0);
				g.children.push(h);
				g.lastPushedText = !1;
				a = Rc(a, b.node, b.blockedBoundary, h, b.abortSet, b.legacyContext, b.context, b.treeContext).ping;
				c.then(a, a);
				b.blockedSegment.formatContext = d;
				b.legacyContext = f;
				b.context = e;
				nc(e);
			} else throw b.blockedSegment.formatContext = d, b.legacyContext = f, b.context = e, nc(e), m;
		}
	}
	function ad(a) {
		var b = a.blockedBoundary;
		a = a.blockedSegment;
		a.status = 3;
		bd(this, b, a);
	}
	function cd(a, b, c) {
		var d = a.blockedBoundary;
		a.blockedSegment.status = 3;
		null === d ? (b.allPendingTasks--, 2 !== b.status && (b.status = 2, null !== b.destination && b.destination.end())) : (d.pendingTasks--, d.forceClientRender || (d.forceClientRender = !0, d.errorDigest = b.onError(void 0 === c ? Error("The render was aborted by the server without a reason.") : c), d.parentFlushed && b.clientRenderedBoundaries.push(d)), d.fallbackAbortableTasks.forEach(function(a) {
			return cd(a, b, c);
		}), d.fallbackAbortableTasks.clear(), b.allPendingTasks--, 0 === b.allPendingTasks && (a = b.onAllReady, a()));
	}
	function Zc(a, b) {
		if (0 === b.chunks.length && 1 === b.children.length && null === b.children[0].boundary) {
			var c = b.children[0];
			c.id = b.id;
			c.parentFlushed = !0;
			1 === c.status && Zc(a, c);
		} else a.completedSegments.push(b);
	}
	function bd(a, b, c) {
		if (null === b) {
			if (c.parentFlushed) {
				if (null !== a.completedRootSegment) throw Error("There can only be one root segment. This is a bug in React.");
				a.completedRootSegment = c;
			}
			a.pendingRootTasks--;
			0 === a.pendingRootTasks && (a.onShellError = X, b = a.onShellReady, b());
		} else b.pendingTasks--, b.forceClientRender || (0 === b.pendingTasks ? (c.parentFlushed && 1 === c.status && Zc(b, c), b.parentFlushed && a.completedBoundaries.push(b), b.fallbackAbortableTasks.forEach(ad, a), b.fallbackAbortableTasks.clear()) : c.parentFlushed && 1 === c.status && (Zc(b, c), 1 === b.completedSegments.length && b.parentFlushed && a.partialBoundaries.push(b)));
		a.allPendingTasks--;
		0 === a.allPendingTasks && (a = a.onAllReady, a());
	}
	function Qc(a) {
		if (2 !== a.status) {
			var b = P, c = Nc.current;
			Nc.current = Mc;
			var d = Lc;
			Lc = a.responseState;
			try {
				var f = a.pingedTasks, e;
				for (e = 0; e < f.length; e++) {
					var g = f[e];
					var h = a, m = g.blockedSegment;
					if (0 === m.status) {
						nc(g.context);
						try {
							Z(h, g, g.node), m.lastPushedText && m.textEmbedded && m.chunks.push(za), g.abortSet.delete(g), m.status = 1, bd(h, g.blockedBoundary, m);
						} catch (E) {
							if (Ec(), "object" === typeof E && null !== E && "function" === typeof E.then) {
								var n = g.ping;
								E.then(n, n);
							} else {
								g.abortSet.delete(g);
								m.status = 4;
								var p = g.blockedBoundary, v = E, C = Y(h, v);
								null === p ? Tc(h, v) : (p.pendingTasks--, p.forceClientRender || (p.forceClientRender = !0, p.errorDigest = C, p.parentFlushed && h.clientRenderedBoundaries.push(p)));
								h.allPendingTasks--;
								if (0 === h.allPendingTasks) {
									var D = h.onAllReady;
									D();
								}
							}
						}
					}
				}
				f.splice(0, e);
				null !== a.destination && dd(a, a.destination);
			} catch (E) {
				Y(a, E), Tc(a, E);
			} finally {
				Lc = d, Nc.current = c, c === Mc && nc(b);
			}
		}
	}
	function ed(a, b, c) {
		c.parentFlushed = !0;
		switch (c.status) {
			case 0:
				var d = c.id = a.nextSegmentId++;
				c.lastPushedText = !1;
				c.textEmbedded = !1;
				a = a.responseState;
				r(b, Sa);
				r(b, a.placeholderPrefix);
				a = d.toString(16);
				r(b, a);
				return w(b, Ta);
			case 1:
				c.status = 2;
				var f = !0;
				d = c.chunks;
				var e = 0;
				c = c.children;
				for (var g = 0; g < c.length; g++) {
					for (f = c[g]; e < f.index; e++) r(b, d[e]);
					f = fd(a, b, f);
				}
				for (; e < d.length - 1; e++) r(b, d[e]);
				e < d.length && (f = w(b, d[e]));
				return f;
			default: throw Error("Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React.");
		}
	}
	function fd(a, b, c) {
		var d = c.boundary;
		if (null === d) return ed(a, b, c);
		d.parentFlushed = !0;
		if (d.forceClientRender) d = d.errorDigest, w(b, Xa), r(b, Za), d && (r(b, ab), r(b, F(d)), r(b, $a)), w(b, bb), ed(a, b, c);
		else if (0 < d.pendingTasks) {
			d.rootSegmentID = a.nextSegmentId++;
			0 < d.completedSegments.length && a.partialBoundaries.push(d);
			var f = a.responseState;
			var e = f.nextSuspenseID++;
			f = x(f.boundaryPrefix + e.toString(16));
			d = d.id = f;
			cb(b, a.responseState, d);
			ed(a, b, c);
		} else if (d.byteSize > a.progressiveChunkSize) d.rootSegmentID = a.nextSegmentId++, a.completedBoundaries.push(d), cb(b, a.responseState, d.id), ed(a, b, c);
		else {
			w(b, Ua);
			c = d.completedSegments;
			if (1 !== c.length) throw Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
			fd(a, b, c[0]);
		}
		return w(b, Ya);
	}
	function gd(a, b, c) {
		yb(b, a.responseState, c.formatContext, c.id);
		fd(a, b, c);
		return zb(b, c.formatContext);
	}
	function hd(a, b, c) {
		for (var d = c.completedSegments, f = 0; f < d.length; f++) id(a, b, c, d[f]);
		d.length = 0;
		a = a.responseState;
		d = c.id;
		c = c.rootSegmentID;
		r(b, a.startInlineScript);
		a.sentCompleteBoundaryFunction ? r(b, Gb) : (a.sentCompleteBoundaryFunction = !0, r(b, Fb));
		if (null === d) throw Error("An ID must have been assigned before we can complete the boundary.");
		c = c.toString(16);
		r(b, d);
		r(b, Hb);
		r(b, a.segmentPrefix);
		r(b, c);
		return w(b, Ib);
	}
	function id(a, b, c, d) {
		if (2 === d.status) return !0;
		var f = d.id;
		if (-1 === f) {
			if (-1 === (d.id = c.rootSegmentID)) throw Error("A root segment ID must have been assigned by now. This is a bug in React.");
			return gd(a, b, d);
		}
		gd(a, b, d);
		a = a.responseState;
		r(b, a.startInlineScript);
		a.sentCompleteSegmentFunction ? r(b, Bb) : (a.sentCompleteSegmentFunction = !0, r(b, Ab));
		r(b, a.segmentPrefix);
		f = f.toString(16);
		r(b, f);
		r(b, Cb);
		r(b, a.placeholderPrefix);
		r(b, f);
		return w(b, Db);
	}
	function dd(a, b) {
		k = /* @__PURE__ */ new Uint8Array(2048);
		l = 0;
		q = !0;
		try {
			var c = a.completedRootSegment;
			if (null !== c && 0 === a.pendingRootTasks) {
				fd(a, b, c);
				a.completedRootSegment = null;
				var d = a.responseState.bootstrapChunks;
				for (c = 0; c < d.length - 1; c++) r(b, d[c]);
				c < d.length && w(b, d[c]);
			}
			var f = a.clientRenderedBoundaries, e;
			for (e = 0; e < f.length; e++) {
				var g = f[e];
				d = b;
				var h = a.responseState, m = g.id, n = g.errorDigest, p = g.errorMessage, v = g.errorComponentStack;
				r(d, h.startInlineScript);
				h.sentClientRenderFunction ? r(d, Kb) : (h.sentClientRenderFunction = !0, r(d, Jb));
				if (null === m) throw Error("An ID must have been assigned before we can complete the boundary.");
				r(d, m);
				r(d, Lb);
				if (n || p || v) r(d, Nb), r(d, Pb(n || ""));
				if (p || v) r(d, Nb), r(d, Pb(p || ""));
				v && (r(d, Nb), r(d, Pb(v)));
				if (!w(d, Mb)) {
					a.destination = null;
					e++;
					f.splice(0, e);
					return;
				}
			}
			f.splice(0, e);
			var C = a.completedBoundaries;
			for (e = 0; e < C.length; e++) if (!hd(a, b, C[e])) {
				a.destination = null;
				e++;
				C.splice(0, e);
				return;
			}
			C.splice(0, e);
			ca(b);
			k = /* @__PURE__ */ new Uint8Array(2048);
			l = 0;
			q = !0;
			var D = a.partialBoundaries;
			for (e = 0; e < D.length; e++) {
				var E = D[e];
				a: {
					f = a;
					g = b;
					var na = E.completedSegments;
					for (h = 0; h < na.length; h++) if (!id(f, g, E, na[h])) {
						h++;
						na.splice(0, h);
						var Eb = !1;
						break a;
					}
					na.splice(0, h);
					Eb = !0;
				}
				if (!Eb) {
					a.destination = null;
					e++;
					D.splice(0, e);
					return;
				}
			}
			D.splice(0, e);
			var oa = a.completedBoundaries;
			for (e = 0; e < oa.length; e++) if (!hd(a, b, oa[e])) {
				a.destination = null;
				e++;
				oa.splice(0, e);
				return;
			}
			oa.splice(0, e);
		} finally {
			ca(b), "function" === typeof b.flush && b.flush(), 0 === a.allPendingTasks && 0 === a.pingedTasks.length && 0 === a.clientRenderedBoundaries.length && 0 === a.completedBoundaries.length && b.end();
		}
	}
	function jd(a) {
		setImmediate(function() {
			return Qc(a);
		});
	}
	function kd(a, b) {
		if (1 === a.status) a.status = 2, b.destroy(a.fatalError);
		else if (2 !== a.status && null === a.destination) {
			a.destination = b;
			try {
				dd(a, b);
			} catch (c) {
				Y(a, c), Tc(a, c);
			}
		}
	}
	function ld(a, b) {
		try {
			var c = a.abortableTasks;
			c.forEach(function(c) {
				return cd(c, a, b);
			});
			c.clear();
			null !== a.destination && dd(a, a.destination);
		} catch (d) {
			Y(a, d), Tc(a, d);
		}
	}
	function md(a, b) {
		return function() {
			return kd(b, a);
		};
	}
	function nd(a, b) {
		return function() {
			return ld(a, b);
		};
	}
	function od(a, b) {
		var c = b ? b.identifierPrefix : void 0, d = b ? b.nonce : void 0, f = b ? b.bootstrapScriptContent : void 0, e = b ? b.bootstrapScripts : void 0;
		var g = b ? b.bootstrapModules : void 0;
		c = void 0 === c ? "" : c;
		d = void 0 === d ? ra : x("<script nonce=\"" + F(d) + "\">");
		var h = [];
		void 0 !== f && h.push(d, ("" + f).replace(wa, xa), sa);
		if (void 0 !== e) for (f = 0; f < e.length; f++) h.push(ta, F(e[f]), va);
		if (void 0 !== g) for (e = 0; e < g.length; e++) h.push(ua, F(g[e]), va);
		g = {
			bootstrapChunks: h,
			startInlineScript: d,
			placeholderPrefix: x(c + "P:"),
			segmentPrefix: x(c + "S:"),
			boundaryPrefix: c + "B:",
			idPrefix: c,
			nextSuspenseID: 0,
			sentCompleteSegmentFunction: !1,
			sentCompleteBoundaryFunction: !1,
			sentClientRenderFunction: !1
		};
		e = b ? b.namespaceURI : void 0;
		e = G("http://www.w3.org/2000/svg" === e ? 2 : "http://www.w3.org/1998/Math/MathML" === e ? 3 : 0, null);
		f = b ? b.progressiveChunkSize : void 0;
		d = b ? b.onError : void 0;
		h = b ? b.onAllReady : void 0;
		var m = b ? b.onShellReady : void 0, n = b ? b.onShellError : void 0;
		b = [];
		c = /* @__PURE__ */ new Set();
		g = {
			destination: null,
			responseState: g,
			progressiveChunkSize: void 0 === f ? 12800 : f,
			status: 0,
			fatalError: null,
			nextSegmentId: 0,
			allPendingTasks: 0,
			pendingRootTasks: 0,
			completedRootSegment: null,
			abortableTasks: c,
			pingedTasks: b,
			clientRenderedBoundaries: [],
			completedBoundaries: [],
			partialBoundaries: [],
			onError: void 0 === d ? Oc : d,
			onAllReady: void 0 === h ? X : h,
			onShellReady: void 0 === m ? X : m,
			onShellError: void 0 === n ? X : n,
			onFatalError: X
		};
		e = Sc(g, 0, null, e, !1, !1);
		e.parentFlushed = !0;
		a = Rc(g, a, null, e, c, hc, null, qc);
		b.push(a);
		return g;
	}
	exports.renderToPipeableStream = function(a, b) {
		var c = od(a, b), d = !1;
		jd(c);
		return {
			pipe: function(a) {
				if (d) throw Error("React currently only supports piping to one writable stream.");
				d = !0;
				kd(c, a);
				a.on("drain", md(a, c));
				a.on("error", nd(c, Error("The destination stream errored while writing data.")));
				a.on("close", nd(c, Error("The destination stream closed early.")));
				return a;
			},
			abort: function(a) {
				ld(c, a);
			}
		};
	};
	exports.version = "18.3.1";
}));
//#endregion
//#region node_modules/react-dom/server.node.js
var require_server_node = /* @__PURE__ */ __commonJSMin(((exports) => {
	var l = require_react_dom_server_legacy_node_production_min();
	var s = require_react_dom_server_node_production_min();
	exports.version = l.version;
	exports.renderToString = l.renderToString;
	exports.renderToStaticMarkup = l.renderToStaticMarkup;
	exports.renderToNodeStream = l.renderToNodeStream;
	exports.renderToStaticNodeStream = l.renderToStaticNodeStream;
	exports.renderToPipeableStream = s.renderToPipeableStream;
}));
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/ssr/handlerCallback.js
function isSsrResponse(value) {
	return typeof value === "object" && value !== null && "response" in value && "serverSsrCleanup" in value;
}
function normalizeSsrResponse(result) {
	return isSsrResponse(result) ? result : {
		response: result,
		serverSsrCleanup: "none"
	};
}
function disposeSsrResponse(response, reason) {
	if (response.serverSsrCleanup !== "stream") return Promise.resolve();
	try {
		return Promise.resolve(response.dispose(reason));
	} catch (error) {
		return Promise.reject(error);
	}
}
function disposeSsrResponseDetached(result, reason, onError = console.error) {
	const ssrResponse = normalizeSsrResponse(result);
	if (ssrResponse.serverSsrCleanup === "stream") {
		disposeSsrResponse(ssrResponse, reason).catch(onError);
		return;
	}
	if (ssrResponse.response.body) try {
		ssrResponse.response.body.cancel(reason).catch(onError);
	} catch (error) {
		onError(error);
	}
}
function createSsrStreamResponse(router, response) {
	if (!response.body) throw new Error("Invariant failed: SSR stream response requires a body");
	let disposed = false;
	return {
		response,
		serverSsrCleanup: "stream",
		async dispose(reason) {
			if (disposed) return;
			disposed = true;
			router.serverSsr?.cleanup();
			try {
				await response.body.cancel(reason);
			} catch {}
		}
	};
}
function bindSsrResponseToRequest(router, result, signal) {
	const ssrResponse = normalizeSsrResponse(result);
	if (ssrResponse.serverSsrCleanup !== "stream") {
		if (signal.aborted) disposeSsrResponseDetached(result, signal.reason);
		return ssrResponse;
	}
	const failed = (error) => {
		router?.serverSsr?.cleanup();
		console.error(error);
	};
	const abort = () => {
		disposeSsrResponseDetached(ssrResponse, signal.reason, failed);
	};
	if (signal.aborted) {
		abort();
		return ssrResponse;
	}
	signal.addEventListener("abort", abort, { once: true });
	router?.serverSsr?.onCleanup(() => {
		signal.removeEventListener("abort", abort);
	});
	return ssrResponse;
}
async function replaceSsrResponse(result, response, reason) {
	await disposeSsrResponse(normalizeSsrResponse(result), reason);
	return {
		response,
		serverSsrCleanup: "none"
	};
}
async function stripSsrResponseBody(result, reason) {
	const ssrResponse = normalizeSsrResponse(result);
	await disposeSsrResponse(ssrResponse, reason);
	return {
		response: new Response(null, ssrResponse.response),
		serverSsrCleanup: "none"
	};
}
function defineHandlerCallback(handler) {
	return handler;
}
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/ssr/transformStreamWithRouter.js
function transformReadableStreamWithRouter(router, routerStream, opts) {
	return transformStreamWithRouter(router, routerStream, opts);
}
function transformPipeableStreamWithRouter(router, routerStream, opts) {
	return Readable.fromWeb(transformStreamWithRouter(router, Readable.toWeb(routerStream), opts));
}
var MIN_CLOSING_TAG_LENGTH = 4;
var DEFAULT_SERIALIZATION_TIMEOUT_MS = 6e4;
var DEFAULT_LIFETIME_TIMEOUT_MS = DEFAULT_SERIALIZATION_TIMEOUT_MS * 2;
var MAX_LEFTOVER_CHARS = 2048;
var MAX_TAIL_CHARS = 65536;
var MAX_ROUTER_HTML_CHARS = 16777216;
var MAX_PENDING_WRITE_CHARS = 16777216;
var MergeState = {
	ReadingBody: 0,
	HoldingTail: 1,
	AppDone: 2,
	Draining: 3,
	Done: 4
};
var textEncoder = new TextEncoder();
var noop$1 = () => {};
var resolvedPromise = Promise.resolve();
function findHtmlBoundary(str) {
	let lastClosingTagEnd = -1;
	let searchFrom = str.length - MIN_CLOSING_TAG_LENGTH;
	while (searchFrom >= 0) {
		const openSlash = str.lastIndexOf("</", searchFrom);
		if (openSlash === -1) break;
		if ((str.charCodeAt(openSlash + 2) | 32) === 98 && (str.charCodeAt(openSlash + 3) | 32) === 111 && (str.charCodeAt(openSlash + 4) | 32) === 100 && (str.charCodeAt(openSlash + 5) | 32) === 121 && str.charCodeAt(openSlash + 6) === 62) return -openSlash - 2;
		if (lastClosingTagEnd === -1) {
			let i = openSlash + 2;
			const startCode = str.charCodeAt(i);
			if (startCode >= 97 && startCode <= 122 || startCode >= 65 && startCode <= 90) {
				i++;
				while (i < str.length) {
					const code = str.charCodeAt(i);
					if (code >= 97 && code <= 122 || code >= 65 && code <= 90 || code >= 48 && code <= 57 || code === 95 || code === 58 || code === 46 || code === 45) i++;
					else break;
				}
				if (str.charCodeAt(i) === 62) lastClosingTagEnd = i + 1;
			}
		}
		searchFrom = openSlash - 1;
	}
	return lastClosingTagEnd;
}
function safeReleaseReader(reader) {
	try {
		reader.releaseLock();
		return true;
	} catch {
		return false;
	}
}
/**
* Cancel a reader without producing an unhandled rejection. `reader.cancel()`
* can reject (e.g. when the underlying source's cancel() throws), and
* downstream cancel() should still wait for upstream teardown when possible.
*/
function safeCancelReader(reader, reason) {
	let cancelPromise;
	try {
		cancelPromise = reader.cancel(reason);
	} catch {}
	if (!safeReleaseReader(reader) && cancelPromise) return cancelPromise.then(noop$1, noop$1).then(() => {
		safeReleaseReader(reader);
	});
	return cancelPromise ? cancelPromise.then(noop$1, noop$1) : resolvedPromise;
}
function createReaderState(appStream) {
	const reader = appStream.getReader();
	let released = false;
	return {
		reader,
		cancel: (reason) => {
			if (released) return resolvedPromise;
			released = true;
			return safeCancelReader(reader, reason);
		},
		release: () => {
			if (released) return;
			released = true;
			safeReleaseReader(reader);
		}
	};
}
function createAbortNotifier(opts) {
	let abortNotified = false;
	return (reason) => {
		if (abortNotified) return;
		abortNotified = true;
		try {
			opts?.onAbort?.(reason);
		} catch {}
	};
}
function listenToAbort(signal, onAbort) {
	if (!signal) return;
	if (signal.aborted) {
		onAbort(signal.reason);
		return;
	}
	const listener = () => onAbort(signal.reason);
	signal.addEventListener("abort", listener, { once: true });
	return () => signal.removeEventListener("abort", listener);
}
function transformStreamWithRouter(router, appStream, opts) {
	const serverSsr = router.serverSsr;
	if (!serverSsr) throw new Error("Invariant failed: router.serverSsr is required");
	if (serverSsr.reserveStreamFastPath()) return makeFastPathStream(appStream, opts, serverSsr);
	return makeMainStream(serverSsr, appStream, opts);
}
function makeFastPathStream(appStream, opts, serverSsr) {
	let cleanedUp = false;
	let controller;
	let state = MergeState.ReadingBody;
	let lifetimeTimeoutHandle;
	let stopListeningToAbort;
	let stopListeningToInjectedHtml;
	const readerState = createReaderState(appStream);
	const notifyAbort = createAbortNotifier(opts);
	const isDone = () => state === MergeState.Done;
	let renderFinished = false;
	const finishSsrRendering = () => {
		if (!serverSsr || renderFinished) return true;
		renderFinished = true;
		try {
			serverSsr.setRenderFinished();
			return true;
		} catch (error) {
			safeError(error);
			cleanup(error);
			return false;
		}
	};
	const cleanup = (reason, cancelReader = true) => {
		if (cleanedUp) return resolvedPromise;
		cleanedUp = true;
		if (lifetimeTimeoutHandle !== void 0) {
			clearTimeout(lifetimeTimeoutHandle);
			lifetimeTimeoutHandle = void 0;
		}
		stopListeningToAbort?.();
		stopListeningToAbort = void 0;
		try {
			stopListeningToInjectedHtml?.();
		} catch {}
		stopListeningToInjectedHtml = void 0;
		if (cancelReader) notifyAbort(reason);
		const readerDone = cancelReader ? readerState.cancel(reason) : (readerState.release(), resolvedPromise);
		if (serverSsr) try {
			serverSsr.cleanup();
		} catch (error) {
			console.error("Error in SSR cleanup:", error);
		}
		return readerDone;
	};
	const safeClose = () => {
		if (isDone()) return;
		state = MergeState.Done;
		try {
			controller?.close();
		} catch {}
	};
	const safeError = (error) => {
		if (isDone()) return;
		state = MergeState.Done;
		try {
			controller?.error(error);
		} catch {}
	};
	if (serverSsr) stopListeningToInjectedHtml = serverSsr.onInjectedHtml(() => {
		const err = /* @__PURE__ */ new Error("SSR router HTML injected during fast path");
		safeError(err);
		cleanup(err);
	});
	const lifetimeMs = opts?.lifetimeMs ?? DEFAULT_LIFETIME_TIMEOUT_MS;
	lifetimeTimeoutHandle = setTimeout(() => {
		if (!cleanedUp && !isDone()) {
			const err = /* @__PURE__ */ new Error("Stream lifetime exceeded");
			console.warn(`SSR stream transform exceeded maximum lifetime (${lifetimeMs}ms), forcing cleanup`);
			safeError(err);
			cleanup(err);
		}
	}, lifetimeMs);
	const stream = new ReadableStream({
		start(c) {
			controller = c;
		},
		async pull(c) {
			if (cleanedUp || isDone()) return;
			try {
				const { done, value } = await readerState.reader.read();
				if (!done) {
					if (!cleanedUp && !isDone()) c.enqueue(value);
					return;
				}
				if (cleanedUp || isDone()) return;
				if (!finishSsrRendering()) return;
				safeClose();
				return cleanup(void 0, false);
			} catch (error) {
				if (cleanedUp) return;
				console.error("Error reading appStream:", error);
				if (state < MergeState.AppDone) try {
					serverSsr?.setRenderFinished();
				} catch {}
				safeError(error);
				return cleanup(error);
			} finally {
				if (cleanedUp || isDone()) readerState.release();
			}
		},
		cancel(reason) {
			state = MergeState.Done;
			return cleanup(reason);
		}
	});
	stopListeningToAbort = listenToAbort(opts?.signal, (reason) => {
		safeError(reason);
		cleanup(reason);
	});
	return stream;
}
function makeMainStream(serverSsr, appStream, opts) {
	let stopListeningToInjectedHtml;
	let stopListeningToSerializationFinished;
	let serializationTimeoutHandle;
	let lifetimeTimeoutHandle;
	let stopListeningToAbort;
	let cleanedUp = false;
	let controller;
	let closeWhenDrained = false;
	let state = MergeState.ReadingBody;
	const readerState = createReaderState(appStream);
	const notifyAbort = createAbortNotifier(opts);
	const pendingWrites = [];
	let pendingWriteHead = 0;
	let pendingWriteChars = 0;
	function clearPending() {
		pendingWrites.length = 0;
		pendingWriteHead = 0;
		pendingWriteChars = 0;
	}
	let drainResolve = null;
	const waitForDrain = () => new Promise((r) => {
		drainResolve = r;
	});
	const signalDrain = () => {
		if (drainResolve) {
			const r = drainResolve;
			drainResolve = null;
			r();
		}
	};
	const isDone = () => state === MergeState.Done;
	function drainPending() {
		if (!controller || isDone()) return;
		while (pendingWriteHead < pendingWrites.length) {
			const ds = controller.desiredSize;
			if (ds !== null && ds <= 0) return;
			const next = pendingWrites[pendingWriteHead];
			pendingWrites[pendingWriteHead] = "";
			pendingWriteHead++;
			pendingWriteChars -= next.length;
			try {
				controller.enqueue(textEncoder.encode(next));
			} catch (error) {
				safeError(error);
				cleanup(error);
				return;
			}
		}
		if (pendingWriteHead >= pendingWrites.length) {
			pendingWrites.length = 0;
			pendingWriteHead = 0;
		}
		if (closeWhenDrained && pendingWriteHead >= pendingWrites.length) {
			closeWhenDrained = false;
			safeClose();
			cleanup(void 0, false);
		}
	}
	/**
	* Enqueue a string chunk through the backpressure queue. Stored as a
	* string and encoded only when the downstream actually accepts the chunk
	* — keeps native-memory pressure inside the controller's queue (which
	* honors desiredSize) rather than ours.
	*/
	function writeChunk(chunk) {
		if (cleanedUp || isDone()) return;
		if (!chunk.length) return;
		if (pendingWriteChars + chunk.length > MAX_PENDING_WRITE_CHARS) {
			const err = /* @__PURE__ */ new Error("SSR stream pending output exceeded maximum buffer");
			safeError(err);
			cleanup(err);
			return;
		}
		pendingWrites.push(chunk);
		pendingWriteChars += chunk.length;
		drainPending();
	}
	function safeClose() {
		if (isDone()) return;
		state = MergeState.Done;
		try {
			controller?.close();
		} catch {}
	}
	function safeError(error) {
		if (isDone()) return;
		state = MergeState.Done;
		try {
			controller?.error(error);
		} catch {}
	}
	/**
	* Cleanup with guards; must be idempotent.
	*/
	function cleanup(reason, cancelReader = true) {
		if (cleanedUp) return resolvedPromise;
		cleanedUp = true;
		try {
			stopListeningToInjectedHtml?.();
			stopListeningToSerializationFinished?.();
		} catch {}
		stopListeningToInjectedHtml = void 0;
		stopListeningToSerializationFinished = void 0;
		stopListeningToAbort?.();
		stopListeningToAbort = void 0;
		if (serializationTimeoutHandle !== void 0) {
			clearTimeout(serializationTimeoutHandle);
			serializationTimeoutHandle = void 0;
		}
		if (lifetimeTimeoutHandle !== void 0) {
			clearTimeout(lifetimeTimeoutHandle);
			lifetimeTimeoutHandle = void 0;
		}
		clearPendingRouterHtml();
		leftover = "";
		pendingTail = "";
		clearPending();
		if (cancelReader) notifyAbort(reason);
		const readerDone = cancelReader ? readerState.cancel(reason) : (readerState.release(), resolvedPromise);
		signalDrain();
		try {
			serverSsr.cleanup();
		} catch (error) {
			console.error("Error in SSR cleanup:", error);
		}
		return readerDone;
	}
	const textDecoder = new TextDecoder();
	const pendingRouterHtml = [];
	let pendingRouterHtmlChars = 0;
	let leftover = "";
	let pendingTail = "";
	let streamBarrierLifted = false;
	let streamBarrierMarkerSeen = false;
	let serializationFinished = false;
	function noteBarrierMarker(chunk) {
		if (streamBarrierMarkerSeen) return;
		if (chunk.includes("$tsr-stream-barrier")) streamBarrierMarkerSeen = true;
	}
	function liftBarrierAfterBoundary() {
		if (streamBarrierLifted) return;
		if (!streamBarrierMarkerSeen) return;
		streamBarrierLifted = true;
		serverSsr.liftScriptBarrier();
	}
	const stream = new ReadableStream({
		start(c) {
			controller = c;
			drainPending();
		},
		pull() {
			drainPending();
			signalDrain();
		},
		cancel(reason) {
			state = MergeState.Done;
			return cleanup(reason);
		}
	});
	function drainRouterHtml() {
		if (cleanedUp || isDone()) return;
		let html;
		try {
			html = serverSsr.takeBufferedHtml();
		} catch (error) {
			safeError(error);
			cleanup(error);
			return;
		}
		if (!html) return;
		if (state >= MergeState.Draining) {
			const err = /* @__PURE__ */ new Error("SSR router HTML injected after stream finalization");
			safeError(err);
			cleanup(err);
			return;
		}
		if (state === MergeState.HoldingTail) {
			flushPendingRouterHtml();
			writeChunk(html);
		} else {
			if (pendingRouterHtmlChars + html.length > MAX_ROUTER_HTML_CHARS) {
				const err = /* @__PURE__ */ new Error("SSR router HTML exceeded maximum buffer");
				safeError(err);
				cleanup(err);
				return;
			}
			pendingRouterHtml.push(html);
			pendingRouterHtmlChars += html.length;
		}
	}
	function flushPendingRouterHtml() {
		if (!pendingRouterHtml.length) return;
		for (const html of pendingRouterHtml) writeChunk(html);
		clearPendingRouterHtml();
	}
	function clearPendingRouterHtml() {
		pendingRouterHtml.length = 0;
		pendingRouterHtmlChars = 0;
	}
	function appendTail(chunk) {
		pendingTail += chunk;
		if (pendingTail.length > MAX_TAIL_CHARS) throw new Error("SSR stream tail exceeded maximum buffer");
	}
	function waitForBackpressure() {
		return !!(controller && controller.desiredSize !== null && controller.desiredSize <= 0);
	}
	function startSerializationTimeout() {
		if (cleanedUp || isDone()) return;
		if (serializationTimeoutHandle !== void 0) return;
		const timeoutMs = opts?.timeoutMs ?? DEFAULT_SERIALIZATION_TIMEOUT_MS;
		serializationTimeoutHandle = setTimeout(() => {
			if (!cleanedUp && !isDone()) {
				const err = /* @__PURE__ */ new Error("Serialization timeout after app render finished");
				console.error("Serialization timeout after app render finished");
				safeError(err);
				cleanup(err);
			}
		}, timeoutMs);
	}
	/**
	* Finish only when app done and serialization complete. Queues final
	* output and requests close-when-drained so we don't close ahead of
	* pending writes still waiting on downstream capacity.
	*/
	function tryFinish() {
		if (state !== MergeState.AppDone || !serializationFinished) return;
		if (cleanedUp || isDone()) return;
		if (serializationTimeoutHandle !== void 0) {
			clearTimeout(serializationTimeoutHandle);
			serializationTimeoutHandle = void 0;
		}
		drainRouterHtml();
		if (cleanedUp || isDone()) return;
		const decoderRemainder = textDecoder.decode();
		if (leftover) writeChunk(leftover);
		if (cleanedUp || isDone()) return;
		if (decoderRemainder) writeChunk(decoderRemainder);
		if (cleanedUp || isDone()) return;
		flushPendingRouterHtml();
		if (cleanedUp || isDone()) return;
		if (pendingTail) writeChunk(pendingTail);
		if (cleanedUp || isDone()) return;
		leftover = "";
		pendingTail = "";
		state = MergeState.Draining;
		closeWhenDrained = true;
		drainPending();
	}
	function finishAppRendering() {
		if (state >= MergeState.AppDone) return;
		state = MergeState.AppDone;
		try {
			serverSsr.setRenderFinished();
		} catch (error) {
			safeError(error);
			cleanup(error);
			return;
		}
		drainRouterHtml();
		if (cleanedUp || isDone()) return;
		serializationFinished = serializationFinished || serverSsr.isSerializationFinished();
		if (serializationFinished) tryFinish();
		else startSerializationTimeout();
	}
	const timeoutMs = opts?.timeoutMs ?? DEFAULT_SERIALIZATION_TIMEOUT_MS;
	const lifetimeMs = opts?.lifetimeMs ?? timeoutMs * 2;
	lifetimeTimeoutHandle = setTimeout(() => {
		if (!cleanedUp && !isDone()) {
			const err = /* @__PURE__ */ new Error("Stream lifetime exceeded");
			console.warn(`SSR stream transform exceeded maximum lifetime (${lifetimeMs}ms), forcing cleanup`);
			safeError(err);
			cleanup(err);
		}
	}, lifetimeMs);
	stopListeningToInjectedHtml = serverSsr.onInjectedHtml(() => {
		drainRouterHtml();
	});
	stopListeningToSerializationFinished = serverSsr.onSerializationFinished(() => {
		serializationFinished = true;
		drainRouterHtml();
		tryFinish();
	});
	drainRouterHtml();
	if (cleanedUp || isDone()) return stream;
	serializationFinished = serializationFinished || serverSsr.isSerializationFinished();
	if (serializationFinished) {
		drainRouterHtml();
		if (cleanedUp || isDone()) return stream;
	}
	stopListeningToAbort = listenToAbort(opts?.signal, (reason) => {
		safeError(reason);
		cleanup(reason);
	});
	if (cleanedUp || isDone()) return stream;
	(async () => {
		try {
			while (true) {
				if (waitForBackpressure()) {
					await waitForDrain();
					if (cleanedUp || isDone()) return;
				}
				const { done, value } = await readerState.reader.read();
				if (done) break;
				if (cleanedUp || isDone()) return;
				const text = typeof value === "string" ? value : textDecoder.decode(value, { stream: true });
				const chunkString = leftover ? leftover + text : text;
				if (state >= MergeState.HoldingTail) {
					appendTail(chunkString);
					leftover = "";
					continue;
				}
				const boundary = findHtmlBoundary(chunkString);
				if (boundary < -1) {
					const bodyEndIndex = -boundary - 2;
					state = MergeState.HoldingTail;
					appendTail(chunkString.slice(bodyEndIndex));
					const bodyChunk = chunkString.slice(0, bodyEndIndex);
					writeChunk(bodyChunk);
					if (cleanedUp || isDone()) return;
					noteBarrierMarker(bodyChunk);
					liftBarrierAfterBoundary();
					if (cleanedUp || isDone()) return;
					flushPendingRouterHtml();
					leftover = "";
					continue;
				}
				const lastClosingTagEnd = boundary;
				if (lastClosingTagEnd > 0) {
					const safeChunk = chunkString.slice(0, lastClosingTagEnd);
					writeChunk(safeChunk);
					if (cleanedUp || isDone()) return;
					noteBarrierMarker(safeChunk);
					liftBarrierAfterBoundary();
					if (cleanedUp || isDone()) return;
					flushPendingRouterHtml();
					leftover = chunkString.slice(lastClosingTagEnd);
					if (leftover.length > MAX_LEFTOVER_CHARS) {
						noteBarrierMarker(leftover);
						writeChunk(leftover.slice(0, leftover.length - MAX_LEFTOVER_CHARS));
						leftover = leftover.slice(-2048);
					}
				} else {
					const combined = chunkString;
					if (combined.length > MAX_LEFTOVER_CHARS) {
						noteBarrierMarker(combined);
						const flushUpto = combined.length - MAX_LEFTOVER_CHARS;
						writeChunk(combined.slice(0, flushUpto));
						leftover = combined.slice(flushUpto);
					} else leftover = combined;
				}
			}
			if (cleanedUp || isDone()) return;
			finishAppRendering();
		} catch (error) {
			if (cleanedUp) return;
			console.error("Error reading appStream:", error);
			if (state < MergeState.AppDone) try {
				serverSsr.setRenderFinished();
			} catch {}
			safeError(error);
			cleanup(error);
		} finally {
			readerState.release();
		}
	})().catch((error) => {
		if (cleanedUp) return;
		console.error("Error in stream transform:", error);
		safeError(error);
		cleanup(error);
	});
	return stream;
}
//#endregion
//#region node_modules/isbot/index.mjs
var import_server_node = /* @__PURE__ */ __toESM(require_server_node(), 1);
var fullPattern = " daum[ /]| deusu/|(?:^|[^g])news(?!sapphire)|(?<! channel/|google/)google(?!(?:wv|app|/google| pixel))|(?<! cu)bots?(?:\\b|_)|(?<!cam)scan|(?<!lib)http|24x7|;\\s\\w+;$|@[a-z][\\w-]+\\.|\\(\\)|\\.com\\b|\\b\\w+/1\\.0;|\\bbw/|\\bdlc\\b|\\bort/|\\bperl\\b|\\btime/|\\||^[<\\(;]|^[\\w \\.\\-\\(?:\\):%]+(?:/v?\\d+(?:\\.\\d+)?(?:\\.\\d{1,10})*?)?(?:,|$)|^[\\w\\-]+/[\\w]+$|^[^ ]{50,}$|^\\d+\\b|^\\w*search\\b|^\\w+/[\\w\\(\\)]*$|^\\w+/\\d\\.\\d\\s\\([\\w@]+\\)$|^active|^ad muncher|^amaya|^apache/|^avsdevicesdk/|^azure|^biglotron|^blackbox exporter|^bot|^clamav[ /]|^claude-code/|^client/|^cobweb/|^custom|^ddg[_-]android|^discourse|^dispatch/\\d|^downcast/|^duckduckgo|^email|^exodusmovement|^facebook|^getright/|^gozilla/|^hobbit|^hotzonu|^hwcdn/|^igetter/|^jeode/|^jetty/|^jigsaw|^microsoft bits|^movabletype|^mozilla/\\d\\.\\d\\s[\\w\\.-]+$|^mozilla/\\d\\.\\d\\s\\((?:compatible;)?(?:\\s?[\\w\\d-.]+\\/\\d+\\.\\d+)?\\)$|^navermailapp|^netsurf|^offline|^openai/|^owler|^php|^postman|^ps_daily/|^python|^rank|^read|^reed|^remove\\.bg/|^rest|^rss|^snapchat|^sora |^space bison|^stape/|^svn|^swcd |^taringa|^thumbor/|^track|^w3c|^webbandit/|^webcopier|^wget|^whatsapp|^wordpress|^xenu link sleuth|^yahoo|^yandex|^zdm/\\d|^zoom marketplace/|abuse|advisor|agent\\b|analyzer|archive|ask jeeves/teoma|attracta|audit|bluecoat drtr|browsex|burpcollaborator|capture|catch|check\\b|checker|chrome-lighthouse|chromeframe|classifier|cloudflare|collapsify\\b|convertify|cookiehubverify/|crawl|cursor/|cypress/|dareboost|datanyze|dejaclick|detect|discovery|dmbrowser|download|exaleadcloudview|feed|firephp|foregenix|functionize|grab|hardenize\\b|headless|hotjar|httrack|hubspot marketing grader|ibisbrowser|infrawatch|insight|inspect|iplabel|java(?!;)|library|linkcheck|linktiger|mail\\.ru/|manager|manus-user/|marketgoo/|measure|monitor\\b|neustar wpm|node\\b|nutch|offbyone|openvas|optimize|pageburst|pagespeed|parser|phantomjs|pingdom|playwright|powermarks|preview|productfinder|prospectingstudio|proxy|ptst[ /]\\d|radar|readable/|retriever|rexx;|rigor|rss\\b|scrape|securityheaders|selenium|server|silktide|sindup/|sogou|sparkler/|speedcurve|spider|splash|statuscake|supercleaner|synapse|synthetic|testlocally|tools|torrent|transcoder|url|validator|virtuoso|wappalyzer|watchtowr|webglance|webkit2png|whatcms/|xtate/";
var naivePattern = /bot|crawl|http|lighthouse|scan|search|spider/i;
var pattern;
function getPattern() {
	if (pattern instanceof RegExp) return pattern;
	try {
		pattern = new RegExp(fullPattern, "i");
	} catch (error) {
		pattern = naivePattern;
	}
	return pattern;
}
var isNonEmptyString = (value) => typeof value === "string" && value !== "";
function isBot(userAgent) {
	return isNonEmptyString(userAgent) && getPattern().test(userAgent);
}
var isbot = isBot;
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/ssr/renderRouterToStream.js
var noop = () => {};
async function waitForReadyOrAbort(ready, signal) {
	let cleanup = noop;
	try {
		await Promise.race([ready, new Promise((resolve) => {
			const onAbort = () => resolve();
			cleanup = () => signal.removeEventListener("abort", onAbort);
			signal.addEventListener("abort", onAbort, { once: true });
			if (signal.aborted) resolve();
		})]);
	} finally {
		cleanup();
	}
}
var isAbortError = (request, error) => request.signal.aborted && error === request.signal.reason || error instanceof Error && error.name === "AbortError";
var renderRouterToStream = async ({ request, router, responseHeaders, children }) => {
	if (typeof import_server_node.default.renderToReadableStream === "function") {
		const stream = await import_server_node.default.renderToReadableStream(children, {
			signal: request.signal,
			nonce: router.options.ssr?.nonce,
			progressiveChunkSize: Number.POSITIVE_INFINITY,
			onError: (error, info) => {
				if (!isAbortError(request, error)) console.error("Error in renderToReadableStream:", error, info);
			}
		});
		if (isbot(request.headers.get("User-Agent"))) await waitForReadyOrAbort(stream.allReady, request.signal);
		const responseStream = transformReadableStreamWithRouter(router, stream, {
			signal: request.signal,
			onAbort: () => stream.cancel().catch(() => {})
		});
		return createSsrStreamResponse(router, new Response(responseStream, {
			status: router._serverResult?.type === "render" ? router._serverResult.status : 200,
			headers: responseHeaders
		}));
	}
	if (typeof import_server_node.renderToPipeableStream === "function") {
		const reactAppPassthrough = new PassThrough();
		let pipeable;
		let responseAttached = false;
		let aborted = false;
		let endedBeforeAttach = false;
		let pendingAbortReason;
		const toError = (reason) => reason instanceof Error ? reason : new Error(String(reason ?? "SSR aborted"));
		const destroyError = (reason) => reason === void 0 ? void 0 : toError(reason);
		const pendingDestroyError = () => pendingAbortReason === void 0 ? toError(pendingAbortReason) : destroyError(pendingAbortReason);
		const finishPassThrough = (reason, opts) => {
			if (reactAppPassthrough.destroyed) return;
			if (responseAttached) reactAppPassthrough.destroy(opts?.defaultError ? toError(reason) : destroyError(reason));
			else endedBeforeAttach = true;
		};
		const abortPipeable = (reason, opts) => {
			if (aborted) return;
			aborted = true;
			pendingAbortReason = reason;
			const err = toError(reason);
			try {
				pipeable?.abort(err);
			} catch {}
			finishPassThrough(reason, opts);
		};
		if (request.signal.aborted) abortPipeable(request.signal.reason);
		else {
			const onRequestAbort = () => abortPipeable(request.signal.reason);
			request.signal.addEventListener("abort", onRequestAbort, { once: true });
			router.serverSsr?.onCleanup(() => {
				request.signal.removeEventListener("abort", onRequestAbort);
			});
		}
		try {
			pipeable = import_server_node.renderToPipeableStream(children, {
				nonce: router.options.ssr?.nonce,
				progressiveChunkSize: Number.POSITIVE_INFINITY,
				...isbot(request.headers.get("User-Agent")) ? { onAllReady() {
					pipeable.pipe(reactAppPassthrough);
				} } : { onShellReady() {
					pipeable.pipe(reactAppPassthrough);
				} },
				onError: (error, info) => {
					if (!isAbortError(request, error)) console.error("Error in renderToPipeableStream:", error, info);
					abortPipeable(error, { defaultError: true });
				}
			});
		} catch (e) {
			console.error("Error in renderToPipeableStream:", e);
			router.serverSsr?.cleanup();
			throw e;
		}
		const responseStream = transformPipeableStreamWithRouter(router, reactAppPassthrough, {
			signal: request.signal,
			onAbort: abortPipeable
		});
		responseAttached = true;
		if (endedBeforeAttach) reactAppPassthrough.destroy(pendingDestroyError());
		if (aborted && pipeable) try {
			pipeable.abort(toError(pendingAbortReason));
		} catch {}
		return createSsrStreamResponse(router, new Response(responseStream, {
			status: router._serverResult?.type === "render" ? router._serverResult.status : 200,
			headers: responseHeaders
		}));
	}
	throw new Error("No renderToReadableStream or renderToPipeableStream found in react-dom/server. Ensure you are using a version of react-dom that supports streaming.");
};
//#endregion
export { createLRUCache as A, getScriptPreloadAttrs as C, _getRenderedMatches as D, resolveManifestCssLink as E, rootRouteId as F, isNotFound as I, notFound as L, dehydrateSsrMatchId as M, isRedirect as N, executeRewriteInput as O, isResolvedRedirect as P, createInlineCssStyleAsset as S, resolveManifestAssetLink as T, Link as _, isSsrResponse as a, TSR_SCRIPT_BARRIER_ID as b, stripSsrResponseBody as c, RouterProvider as d, createRouter as f, createRootRouteWithContext as g, createFileRoute as h, disposeSsrResponseDetached as i, decodePath as j, invariant as k, Scripts as l, lazyRouteComponent as m, bindSsrResponseToRequest as n, normalizeSsrResponse as o, Outlet as p, defineHandlerCallback as r, replaceSsrResponse as s, renderRouterToStream as t, HeadContent as u, useNavigate as v, getStylesheetHref as w, createInlineCssPlaceholderAsset as x, GLOBAL_TSR as y };
