"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/use-sync-external-store";
exports.ids = ["vendor-chunks/use-sync-external-store"];
exports.modules = {

/***/ "(ssr)/./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("/**\n * @license React\n * use-sync-external-store-shim.development.js\n *\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */ \nif (true) {\n    (function() {\n        \"use strict\";\n        /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */ if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== \"undefined\" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === \"function\") {\n            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());\n        }\n        var React = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n        var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;\n        function error(format) {\n            {\n                {\n                    for(var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++){\n                        args[_key2 - 1] = arguments[_key2];\n                    }\n                    printWarning(\"error\", format, args);\n                }\n            }\n        }\n        function printWarning(level, format, args) {\n            // When changing this logic, you might want to also\n            // update consoleWithStackDev.www.js as well.\n            {\n                var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;\n                var stack = ReactDebugCurrentFrame.getStackAddendum();\n                if (stack !== \"\") {\n                    format += \"%s\";\n                    args = args.concat([\n                        stack\n                    ]);\n                } // eslint-disable-next-line react-internal/safe-string-coercion\n                var argsWithFormat = args.map(function(item) {\n                    return String(item);\n                }); // Careful: RN currently depends on this prefix\n                argsWithFormat.unshift(\"Warning: \" + format); // We intentionally don't use spread (or .apply) directly because it\n                // breaks IE9: https://github.com/facebook/react/issues/13610\n                // eslint-disable-next-line react-internal/no-production-logging\n                Function.prototype.apply.call(console[level], console, argsWithFormat);\n            }\n        }\n        /**\n * inlined Object.is polyfill to avoid requiring consumers ship their own\n * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is\n */ function is(x, y) {\n            return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare\n            ;\n        }\n        var objectIs = typeof Object.is === \"function\" ? Object.is : is;\n        // dispatch for CommonJS interop named imports.\n        var useState = React.useState, useEffect = React.useEffect, useLayoutEffect = React.useLayoutEffect, useDebugValue = React.useDebugValue;\n        var didWarnOld18Alpha = false;\n        var didWarnUncachedGetSnapshot = false; // Disclaimer: This shim breaks many of the rules of React, and only works\n        // because of a very particular set of implementation details and assumptions\n        // -- change any one of them and it will break. The most important assumption\n        // is that updates are always synchronous, because concurrent rendering is\n        // only available in versions of React that also have a built-in\n        // useSyncExternalStore API. And we only use this shim when the built-in API\n        // does not exist.\n        //\n        // Do not assume that the clever hacks used by this hook also work in general.\n        // The point of this shim is to replace the need for hacks by other libraries.\n        function useSyncExternalStore(subscribe, getSnapshot, // React do not expose a way to check if we're hydrating. So users of the shim\n        // will need to track that themselves and return the correct value\n        // from `getSnapshot`.\n        getServerSnapshot) {\n            {\n                if (!didWarnOld18Alpha) {\n                    if (React.startTransition !== undefined) {\n                        didWarnOld18Alpha = true;\n                        error(\"You are using an outdated, pre-release alpha of React 18 that \" + \"does not support useSyncExternalStore. The \" + \"use-sync-external-store shim will not work correctly. Upgrade \" + \"to a newer pre-release.\");\n                    }\n                }\n            }\n            // breaks the rules of React, and only works here because of specific\n            // implementation details, most importantly that updates are\n            // always synchronous.\n            var value = getSnapshot();\n            {\n                if (!didWarnUncachedGetSnapshot) {\n                    var cachedValue = getSnapshot();\n                    if (!objectIs(value, cachedValue)) {\n                        error(\"The result of getSnapshot should be cached to avoid an infinite loop\");\n                        didWarnUncachedGetSnapshot = true;\n                    }\n                }\n            }\n            // re-render whenever the subscribed state changes by updating an some\n            // arbitrary useState hook. Then, during render, we call getSnapshot to read\n            // the current value.\n            //\n            // Because we don't actually use the state returned by the useState hook, we\n            // can save a bit of memory by storing other stuff in that slot.\n            //\n            // To implement the early bailout, we need to track some things on a mutable\n            // object. Usually, we would put that in a useRef hook, but we can stash it in\n            // our useState hook instead.\n            //\n            // To force a re-render, we call forceUpdate({inst}). That works because the\n            // new object always fails an equality check.\n            var _useState = useState({\n                inst: {\n                    value: value,\n                    getSnapshot: getSnapshot\n                }\n            }), inst = _useState[0].inst, forceUpdate = _useState[1]; // Track the latest getSnapshot function with a ref. This needs to be updated\n            // in the layout phase so we can access it during the tearing check that\n            // happens on subscribe.\n            useLayoutEffect(function() {\n                inst.value = value;\n                inst.getSnapshot = getSnapshot; // Whenever getSnapshot or subscribe changes, we need to check in the\n                // commit phase if there was an interleaved mutation. In concurrent mode\n                // this can happen all the time, but even in synchronous mode, an earlier\n                // effect may have mutated the store.\n                if (checkIfSnapshotChanged(inst)) {\n                    // Force a re-render.\n                    forceUpdate({\n                        inst: inst\n                    });\n                }\n            }, [\n                subscribe,\n                value,\n                getSnapshot\n            ]);\n            useEffect(function() {\n                // Check for changes right before subscribing. Subsequent changes will be\n                // detected in the subscription handler.\n                if (checkIfSnapshotChanged(inst)) {\n                    // Force a re-render.\n                    forceUpdate({\n                        inst: inst\n                    });\n                }\n                var handleStoreChange = function() {\n                    // TODO: Because there is no cross-renderer API for batching updates, it's\n                    // up to the consumer of this library to wrap their subscription event\n                    // with unstable_batchedUpdates. Should we try to detect when this isn't\n                    // the case and print a warning in development?\n                    // The store changed. Check if the snapshot changed since the last time we\n                    // read from the store.\n                    if (checkIfSnapshotChanged(inst)) {\n                        // Force a re-render.\n                        forceUpdate({\n                            inst: inst\n                        });\n                    }\n                }; // Subscribe to the store and return a clean-up function.\n                return subscribe(handleStoreChange);\n            }, [\n                subscribe\n            ]);\n            useDebugValue(value);\n            return value;\n        }\n        function checkIfSnapshotChanged(inst) {\n            var latestGetSnapshot = inst.getSnapshot;\n            var prevValue = inst.value;\n            try {\n                var nextValue = latestGetSnapshot();\n                return !objectIs(prevValue, nextValue);\n            } catch (error) {\n                return true;\n            }\n        }\n        function useSyncExternalStore$1(subscribe, getSnapshot, getServerSnapshot) {\n            // Note: The shim does not use getServerSnapshot, because pre-18 versions of\n            // React do not expose a way to check if we're hydrating. So users of the shim\n            // will need to track that themselves and return the correct value\n            // from `getSnapshot`.\n            return getSnapshot();\n        }\n        var canUseDOM = !!( false && 0);\n        var isServerEnvironment = !canUseDOM;\n        var shim = isServerEnvironment ? useSyncExternalStore$1 : useSyncExternalStore;\n        var useSyncExternalStore$2 = React.useSyncExternalStore !== undefined ? React.useSyncExternalStore : shim;\n        exports.useSyncExternalStore = useSyncExternalStore$2;\n        /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */ if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== \"undefined\" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === \"function\") {\n            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());\n        }\n    })();\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdXNlLXN5bmMtZXh0ZXJuYWwtc3RvcmUvY2pzL3VzZS1zeW5jLWV4dGVybmFsLXN0b3JlLXNoaW0uZGV2ZWxvcG1lbnQuanMiLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0NBUUMsR0FFRDtBQUVBLElBQUlBLElBQXFDLEVBQUU7SUFDeEM7UUFFTztRQUVWLHlDQUF5QyxHQUN6QyxJQUNFLE9BQU9DLG1DQUFtQyxlQUMxQyxPQUFPQSwrQkFBK0JDLDJCQUEyQixLQUMvRCxZQUNGO1lBQ0FELCtCQUErQkMsMkJBQTJCLENBQUMsSUFBSUM7UUFDakU7UUFDVSxJQUFJQyxRQUFRQyxtQkFBT0EsQ0FBQztRQUU5QixJQUFJQyx1QkFBdUJGLE1BQU1HLGtEQUFrRDtRQUVuRixTQUFTQyxNQUFNQyxNQUFNO1lBQ25CO2dCQUNFO29CQUNFLElBQUssSUFBSUMsUUFBUUMsVUFBVUMsTUFBTSxFQUFFQyxPQUFPLElBQUlDLE1BQU1KLFFBQVEsSUFBSUEsUUFBUSxJQUFJLElBQUlLLFFBQVEsR0FBR0EsUUFBUUwsT0FBT0ssUUFBUzt3QkFDakhGLElBQUksQ0FBQ0UsUUFBUSxFQUFFLEdBQUdKLFNBQVMsQ0FBQ0ksTUFBTTtvQkFDcEM7b0JBRUFDLGFBQWEsU0FBU1AsUUFBUUk7Z0JBQ2hDO1lBQ0Y7UUFDRjtRQUVBLFNBQVNHLGFBQWFDLEtBQUssRUFBRVIsTUFBTSxFQUFFSSxJQUFJO1lBQ3ZDLG1EQUFtRDtZQUNuRCw2Q0FBNkM7WUFDN0M7Z0JBQ0UsSUFBSUsseUJBQXlCWixxQkFBcUJZLHNCQUFzQjtnQkFDeEUsSUFBSUMsUUFBUUQsdUJBQXVCRSxnQkFBZ0I7Z0JBRW5ELElBQUlELFVBQVUsSUFBSTtvQkFDaEJWLFVBQVU7b0JBQ1ZJLE9BQU9BLEtBQUtRLE1BQU0sQ0FBQzt3QkFBQ0Y7cUJBQU07Z0JBQzVCLEVBQUUsK0RBQStEO2dCQUdqRSxJQUFJRyxpQkFBaUJULEtBQUtVLEdBQUcsQ0FBQyxTQUFVQyxJQUFJO29CQUMxQyxPQUFPQyxPQUFPRDtnQkFDaEIsSUFBSSwrQ0FBK0M7Z0JBRW5ERixlQUFlSSxPQUFPLENBQUMsY0FBY2pCLFNBQVMsb0VBQW9FO2dCQUNsSCw2REFBNkQ7Z0JBQzdELGdFQUFnRTtnQkFFaEVrQixTQUFTQyxTQUFTLENBQUNDLEtBQUssQ0FBQ0MsSUFBSSxDQUFDQyxPQUFPLENBQUNkLE1BQU0sRUFBRWMsU0FBU1Q7WUFDekQ7UUFDRjtRQUVBOzs7Q0FHQyxHQUNELFNBQVNVLEdBQUdDLENBQUMsRUFBRUMsQ0FBQztZQUNkLE9BQU9ELE1BQU1DLEtBQU1ELENBQUFBLE1BQU0sS0FBSyxJQUFJQSxNQUFNLElBQUlDLENBQUFBLEtBQU1ELE1BQU1BLEtBQUtDLE1BQU1BLEVBQUUsc0NBQXNDOztRQUU3RztRQUVBLElBQUlDLFdBQVcsT0FBT0MsT0FBT0osRUFBRSxLQUFLLGFBQWFJLE9BQU9KLEVBQUUsR0FBR0E7UUFFN0QsK0NBQStDO1FBRS9DLElBQUlLLFdBQVdqQyxNQUFNaUMsUUFBUSxFQUN6QkMsWUFBWWxDLE1BQU1rQyxTQUFTLEVBQzNCQyxrQkFBa0JuQyxNQUFNbUMsZUFBZSxFQUN2Q0MsZ0JBQWdCcEMsTUFBTW9DLGFBQWE7UUFDdkMsSUFBSUMsb0JBQW9CO1FBQ3hCLElBQUlDLDZCQUE2QixPQUFPLDBFQUEwRTtRQUNsSCw2RUFBNkU7UUFDN0UsNkVBQTZFO1FBQzdFLDBFQUEwRTtRQUMxRSxnRUFBZ0U7UUFDaEUsNEVBQTRFO1FBQzVFLGtCQUFrQjtRQUNsQixFQUFFO1FBQ0YsOEVBQThFO1FBQzlFLDhFQUE4RTtRQUU5RSxTQUFTQyxxQkFBcUJDLFNBQVMsRUFBRUMsV0FBVyxFQUNwRCw4RUFBOEU7UUFDOUUsa0VBQWtFO1FBQ2xFLHNCQUFzQjtRQUN0QkMsaUJBQWlCO1lBQ2Y7Z0JBQ0UsSUFBSSxDQUFDTCxtQkFBbUI7b0JBQ3RCLElBQUlyQyxNQUFNMkMsZUFBZSxLQUFLQyxXQUFXO3dCQUN2Q1Asb0JBQW9CO3dCQUVwQmpDLE1BQU0sbUVBQW1FLGdEQUFnRCxtRUFBbUU7b0JBQzlMO2dCQUNGO1lBQ0Y7WUFDQSxxRUFBcUU7WUFDckUsNERBQTREO1lBQzVELHNCQUFzQjtZQUd0QixJQUFJeUMsUUFBUUo7WUFFWjtnQkFDRSxJQUFJLENBQUNILDRCQUE0QjtvQkFDL0IsSUFBSVEsY0FBY0w7b0JBRWxCLElBQUksQ0FBQ1YsU0FBU2MsT0FBT0MsY0FBYzt3QkFDakMxQyxNQUFNO3dCQUVOa0MsNkJBQTZCO29CQUMvQjtnQkFDRjtZQUNGO1lBQ0Esc0VBQXNFO1lBQ3RFLDRFQUE0RTtZQUM1RSxxQkFBcUI7WUFDckIsRUFBRTtZQUNGLDRFQUE0RTtZQUM1RSxnRUFBZ0U7WUFDaEUsRUFBRTtZQUNGLDRFQUE0RTtZQUM1RSw4RUFBOEU7WUFDOUUsNkJBQTZCO1lBQzdCLEVBQUU7WUFDRiw0RUFBNEU7WUFDNUUsNkNBQTZDO1lBRzdDLElBQUlTLFlBQVlkLFNBQVM7Z0JBQ3ZCZSxNQUFNO29CQUNKSCxPQUFPQTtvQkFDUEosYUFBYUE7Z0JBQ2Y7WUFDRixJQUNJTyxPQUFPRCxTQUFTLENBQUMsRUFBRSxDQUFDQyxJQUFJLEVBQ3hCQyxjQUFjRixTQUFTLENBQUMsRUFBRSxFQUFFLDZFQUE2RTtZQUM3Ryx3RUFBd0U7WUFDeEUsd0JBQXdCO1lBR3hCWixnQkFBZ0I7Z0JBQ2RhLEtBQUtILEtBQUssR0FBR0E7Z0JBQ2JHLEtBQUtQLFdBQVcsR0FBR0EsYUFBYSxxRUFBcUU7Z0JBQ3JHLHdFQUF3RTtnQkFDeEUseUVBQXlFO2dCQUN6RSxxQ0FBcUM7Z0JBRXJDLElBQUlTLHVCQUF1QkYsT0FBTztvQkFDaEMscUJBQXFCO29CQUNyQkMsWUFBWTt3QkFDVkQsTUFBTUE7b0JBQ1I7Z0JBQ0Y7WUFDRixHQUFHO2dCQUFDUjtnQkFBV0s7Z0JBQU9KO2FBQVk7WUFDbENQLFVBQVU7Z0JBQ1IseUVBQXlFO2dCQUN6RSx3Q0FBd0M7Z0JBQ3hDLElBQUlnQix1QkFBdUJGLE9BQU87b0JBQ2hDLHFCQUFxQjtvQkFDckJDLFlBQVk7d0JBQ1ZELE1BQU1BO29CQUNSO2dCQUNGO2dCQUVBLElBQUlHLG9CQUFvQjtvQkFDdEIsMEVBQTBFO29CQUMxRSxzRUFBc0U7b0JBQ3RFLHdFQUF3RTtvQkFDeEUsK0NBQStDO29CQUMvQywwRUFBMEU7b0JBQzFFLHVCQUF1QjtvQkFDdkIsSUFBSUQsdUJBQXVCRixPQUFPO3dCQUNoQyxxQkFBcUI7d0JBQ3JCQyxZQUFZOzRCQUNWRCxNQUFNQTt3QkFDUjtvQkFDRjtnQkFDRixHQUFHLHlEQUF5RDtnQkFHNUQsT0FBT1IsVUFBVVc7WUFDbkIsR0FBRztnQkFBQ1g7YUFBVTtZQUNkSixjQUFjUztZQUNkLE9BQU9BO1FBQ1Q7UUFFQSxTQUFTSyx1QkFBdUJGLElBQUk7WUFDbEMsSUFBSUksb0JBQW9CSixLQUFLUCxXQUFXO1lBQ3hDLElBQUlZLFlBQVlMLEtBQUtILEtBQUs7WUFFMUIsSUFBSTtnQkFDRixJQUFJUyxZQUFZRjtnQkFDaEIsT0FBTyxDQUFDckIsU0FBU3NCLFdBQVdDO1lBQzlCLEVBQUUsT0FBT2xELE9BQU87Z0JBQ2QsT0FBTztZQUNUO1FBQ0Y7UUFFQSxTQUFTbUQsdUJBQXVCZixTQUFTLEVBQUVDLFdBQVcsRUFBRUMsaUJBQWlCO1lBQ3ZFLDRFQUE0RTtZQUM1RSw4RUFBOEU7WUFDOUUsa0VBQWtFO1lBQ2xFLHNCQUFzQjtZQUN0QixPQUFPRDtRQUNUO1FBRUEsSUFBSWUsWUFBWSxDQUFDLENBQUUsT0FBNEQsSUFBZSxDQUFtRDtRQUVqSixJQUFJSSxzQkFBc0IsQ0FBQ0o7UUFFM0IsSUFBSUssT0FBT0Qsc0JBQXNCTCx5QkFBeUJoQjtRQUMxRCxJQUFJdUIseUJBQXlCOUQsTUFBTXVDLG9CQUFvQixLQUFLSyxZQUFZNUMsTUFBTXVDLG9CQUFvQixHQUFHc0I7UUFFckdFLDRCQUE0QixHQUFHRDtRQUNyQix5Q0FBeUMsR0FDbkQsSUFDRSxPQUFPakUsbUNBQW1DLGVBQzFDLE9BQU9BLCtCQUErQm1FLDBCQUEwQixLQUM5RCxZQUNGO1lBQ0FuRSwrQkFBK0JtRSwwQkFBMEIsQ0FBQyxJQUFJakU7UUFDaEU7SUFFRTtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3VzZS1zeW5jLWV4dGVybmFsLXN0b3JlL2Nqcy91c2Utc3luYy1leHRlcm5hbC1zdG9yZS1zaGltLmRldmVsb3BtZW50LmpzPzNlOWEiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZSBSZWFjdFxuICogdXNlLXN5bmMtZXh0ZXJuYWwtc3RvcmUtc2hpbS5kZXZlbG9wbWVudC5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgRmFjZWJvb2ssIEluYy4gYW5kIGl0cyBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAndXNlIHN0cmljdCc7XG5cbi8qIGdsb2JhbCBfX1JFQUNUX0RFVlRPT0xTX0dMT0JBTF9IT09LX18gKi9cbmlmIChcbiAgdHlwZW9mIF9fUkVBQ1RfREVWVE9PTFNfR0xPQkFMX0hPT0tfXyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgdHlwZW9mIF9fUkVBQ1RfREVWVE9PTFNfR0xPQkFMX0hPT0tfXy5yZWdpc3RlckludGVybmFsTW9kdWxlU3RhcnQgPT09XG4gICAgJ2Z1bmN0aW9uJ1xuKSB7XG4gIF9fUkVBQ1RfREVWVE9PTFNfR0xPQkFMX0hPT0tfXy5yZWdpc3RlckludGVybmFsTW9kdWxlU3RhcnQobmV3IEVycm9yKCkpO1xufVxuICAgICAgICAgIHZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBSZWFjdFNoYXJlZEludGVybmFscyA9IFJlYWN0Ll9fU0VDUkVUX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVEO1xuXG5mdW5jdGlvbiBlcnJvcihmb3JtYXQpIHtcbiAge1xuICAgIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMiA+IDEgPyBfbGVuMiAtIDEgOiAwKSwgX2tleTIgPSAxOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTIgLSAxXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHByaW50V2FybmluZygnZXJyb3InLCBmb3JtYXQsIGFyZ3MpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBwcmludFdhcm5pbmcobGV2ZWwsIGZvcm1hdCwgYXJncykge1xuICAvLyBXaGVuIGNoYW5naW5nIHRoaXMgbG9naWMsIHlvdSBtaWdodCB3YW50IHRvIGFsc29cbiAgLy8gdXBkYXRlIGNvbnNvbGVXaXRoU3RhY2tEZXYud3d3LmpzIGFzIHdlbGwuXG4gIHtcbiAgICB2YXIgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSA9IFJlYWN0U2hhcmVkSW50ZXJuYWxzLlJlYWN0RGVidWdDdXJyZW50RnJhbWU7XG4gICAgdmFyIHN0YWNrID0gUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRTdGFja0FkZGVuZHVtKCk7XG5cbiAgICBpZiAoc3RhY2sgIT09ICcnKSB7XG4gICAgICBmb3JtYXQgKz0gJyVzJztcbiAgICAgIGFyZ3MgPSBhcmdzLmNvbmNhdChbc3RhY2tdKTtcbiAgICB9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1pbnRlcm5hbC9zYWZlLXN0cmluZy1jb2VyY2lvblxuXG5cbiAgICB2YXIgYXJnc1dpdGhGb3JtYXQgPSBhcmdzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuIFN0cmluZyhpdGVtKTtcbiAgICB9KTsgLy8gQ2FyZWZ1bDogUk4gY3VycmVudGx5IGRlcGVuZHMgb24gdGhpcyBwcmVmaXhcblxuICAgIGFyZ3NXaXRoRm9ybWF0LnVuc2hpZnQoJ1dhcm5pbmc6ICcgKyBmb3JtYXQpOyAvLyBXZSBpbnRlbnRpb25hbGx5IGRvbid0IHVzZSBzcHJlYWQgKG9yIC5hcHBseSkgZGlyZWN0bHkgYmVjYXVzZSBpdFxuICAgIC8vIGJyZWFrcyBJRTk6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvMTM2MTBcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaW50ZXJuYWwvbm8tcHJvZHVjdGlvbi1sb2dnaW5nXG5cbiAgICBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlW2xldmVsXSwgY29uc29sZSwgYXJnc1dpdGhGb3JtYXQpO1xuICB9XG59XG5cbi8qKlxuICogaW5saW5lZCBPYmplY3QuaXMgcG9seWZpbGwgdG8gYXZvaWQgcmVxdWlyaW5nIGNvbnN1bWVycyBzaGlwIHRoZWlyIG93blxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2lzXG4gKi9cbmZ1bmN0aW9uIGlzKHgsIHkpIHtcbiAgcmV0dXJuIHggPT09IHkgJiYgKHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5KSB8fCB4ICE9PSB4ICYmIHkgIT09IHkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgO1xufVxuXG52YXIgb2JqZWN0SXMgPSB0eXBlb2YgT2JqZWN0LmlzID09PSAnZnVuY3Rpb24nID8gT2JqZWN0LmlzIDogaXM7XG5cbi8vIGRpc3BhdGNoIGZvciBDb21tb25KUyBpbnRlcm9wIG5hbWVkIGltcG9ydHMuXG5cbnZhciB1c2VTdGF0ZSA9IFJlYWN0LnVzZVN0YXRlLFxuICAgIHVzZUVmZmVjdCA9IFJlYWN0LnVzZUVmZmVjdCxcbiAgICB1c2VMYXlvdXRFZmZlY3QgPSBSZWFjdC51c2VMYXlvdXRFZmZlY3QsXG4gICAgdXNlRGVidWdWYWx1ZSA9IFJlYWN0LnVzZURlYnVnVmFsdWU7XG52YXIgZGlkV2Fybk9sZDE4QWxwaGEgPSBmYWxzZTtcbnZhciBkaWRXYXJuVW5jYWNoZWRHZXRTbmFwc2hvdCA9IGZhbHNlOyAvLyBEaXNjbGFpbWVyOiBUaGlzIHNoaW0gYnJlYWtzIG1hbnkgb2YgdGhlIHJ1bGVzIG9mIFJlYWN0LCBhbmQgb25seSB3b3Jrc1xuLy8gYmVjYXVzZSBvZiBhIHZlcnkgcGFydGljdWxhciBzZXQgb2YgaW1wbGVtZW50YXRpb24gZGV0YWlscyBhbmQgYXNzdW1wdGlvbnNcbi8vIC0tIGNoYW5nZSBhbnkgb25lIG9mIHRoZW0gYW5kIGl0IHdpbGwgYnJlYWsuIFRoZSBtb3N0IGltcG9ydGFudCBhc3N1bXB0aW9uXG4vLyBpcyB0aGF0IHVwZGF0ZXMgYXJlIGFsd2F5cyBzeW5jaHJvbm91cywgYmVjYXVzZSBjb25jdXJyZW50IHJlbmRlcmluZyBpc1xuLy8gb25seSBhdmFpbGFibGUgaW4gdmVyc2lvbnMgb2YgUmVhY3QgdGhhdCBhbHNvIGhhdmUgYSBidWlsdC1pblxuLy8gdXNlU3luY0V4dGVybmFsU3RvcmUgQVBJLiBBbmQgd2Ugb25seSB1c2UgdGhpcyBzaGltIHdoZW4gdGhlIGJ1aWx0LWluIEFQSVxuLy8gZG9lcyBub3QgZXhpc3QuXG4vL1xuLy8gRG8gbm90IGFzc3VtZSB0aGF0IHRoZSBjbGV2ZXIgaGFja3MgdXNlZCBieSB0aGlzIGhvb2sgYWxzbyB3b3JrIGluIGdlbmVyYWwuXG4vLyBUaGUgcG9pbnQgb2YgdGhpcyBzaGltIGlzIHRvIHJlcGxhY2UgdGhlIG5lZWQgZm9yIGhhY2tzIGJ5IG90aGVyIGxpYnJhcmllcy5cblxuZnVuY3Rpb24gdXNlU3luY0V4dGVybmFsU3RvcmUoc3Vic2NyaWJlLCBnZXRTbmFwc2hvdCwgLy8gTm90ZTogVGhlIHNoaW0gZG9lcyBub3QgdXNlIGdldFNlcnZlclNuYXBzaG90LCBiZWNhdXNlIHByZS0xOCB2ZXJzaW9ucyBvZlxuLy8gUmVhY3QgZG8gbm90IGV4cG9zZSBhIHdheSB0byBjaGVjayBpZiB3ZSdyZSBoeWRyYXRpbmcuIFNvIHVzZXJzIG9mIHRoZSBzaGltXG4vLyB3aWxsIG5lZWQgdG8gdHJhY2sgdGhhdCB0aGVtc2VsdmVzIGFuZCByZXR1cm4gdGhlIGNvcnJlY3QgdmFsdWVcbi8vIGZyb20gYGdldFNuYXBzaG90YC5cbmdldFNlcnZlclNuYXBzaG90KSB7XG4gIHtcbiAgICBpZiAoIWRpZFdhcm5PbGQxOEFscGhhKSB7XG4gICAgICBpZiAoUmVhY3Quc3RhcnRUcmFuc2l0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZGlkV2Fybk9sZDE4QWxwaGEgPSB0cnVlO1xuXG4gICAgICAgIGVycm9yKCdZb3UgYXJlIHVzaW5nIGFuIG91dGRhdGVkLCBwcmUtcmVsZWFzZSBhbHBoYSBvZiBSZWFjdCAxOCB0aGF0ICcgKyAnZG9lcyBub3Qgc3VwcG9ydCB1c2VTeW5jRXh0ZXJuYWxTdG9yZS4gVGhlICcgKyAndXNlLXN5bmMtZXh0ZXJuYWwtc3RvcmUgc2hpbSB3aWxsIG5vdCB3b3JrIGNvcnJlY3RseS4gVXBncmFkZSAnICsgJ3RvIGEgbmV3ZXIgcHJlLXJlbGVhc2UuJyk7XG4gICAgICB9XG4gICAgfVxuICB9IC8vIFJlYWQgdGhlIGN1cnJlbnQgc25hcHNob3QgZnJvbSB0aGUgc3RvcmUgb24gZXZlcnkgcmVuZGVyLiBBZ2FpbiwgdGhpc1xuICAvLyBicmVha3MgdGhlIHJ1bGVzIG9mIFJlYWN0LCBhbmQgb25seSB3b3JrcyBoZXJlIGJlY2F1c2Ugb2Ygc3BlY2lmaWNcbiAgLy8gaW1wbGVtZW50YXRpb24gZGV0YWlscywgbW9zdCBpbXBvcnRhbnRseSB0aGF0IHVwZGF0ZXMgYXJlXG4gIC8vIGFsd2F5cyBzeW5jaHJvbm91cy5cblxuXG4gIHZhciB2YWx1ZSA9IGdldFNuYXBzaG90KCk7XG5cbiAge1xuICAgIGlmICghZGlkV2FyblVuY2FjaGVkR2V0U25hcHNob3QpIHtcbiAgICAgIHZhciBjYWNoZWRWYWx1ZSA9IGdldFNuYXBzaG90KCk7XG5cbiAgICAgIGlmICghb2JqZWN0SXModmFsdWUsIGNhY2hlZFZhbHVlKSkge1xuICAgICAgICBlcnJvcignVGhlIHJlc3VsdCBvZiBnZXRTbmFwc2hvdCBzaG91bGQgYmUgY2FjaGVkIHRvIGF2b2lkIGFuIGluZmluaXRlIGxvb3AnKTtcblxuICAgICAgICBkaWRXYXJuVW5jYWNoZWRHZXRTbmFwc2hvdCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9IC8vIEJlY2F1c2UgdXBkYXRlcyBhcmUgc3luY2hyb25vdXMsIHdlIGRvbid0IHF1ZXVlIHRoZW0uIEluc3RlYWQgd2UgZm9yY2UgYVxuICAvLyByZS1yZW5kZXIgd2hlbmV2ZXIgdGhlIHN1YnNjcmliZWQgc3RhdGUgY2hhbmdlcyBieSB1cGRhdGluZyBhbiBzb21lXG4gIC8vIGFyYml0cmFyeSB1c2VTdGF0ZSBob29rLiBUaGVuLCBkdXJpbmcgcmVuZGVyLCB3ZSBjYWxsIGdldFNuYXBzaG90IHRvIHJlYWRcbiAgLy8gdGhlIGN1cnJlbnQgdmFsdWUuXG4gIC8vXG4gIC8vIEJlY2F1c2Ugd2UgZG9uJ3QgYWN0dWFsbHkgdXNlIHRoZSBzdGF0ZSByZXR1cm5lZCBieSB0aGUgdXNlU3RhdGUgaG9vaywgd2VcbiAgLy8gY2FuIHNhdmUgYSBiaXQgb2YgbWVtb3J5IGJ5IHN0b3Jpbmcgb3RoZXIgc3R1ZmYgaW4gdGhhdCBzbG90LlxuICAvL1xuICAvLyBUbyBpbXBsZW1lbnQgdGhlIGVhcmx5IGJhaWxvdXQsIHdlIG5lZWQgdG8gdHJhY2sgc29tZSB0aGluZ3Mgb24gYSBtdXRhYmxlXG4gIC8vIG9iamVjdC4gVXN1YWxseSwgd2Ugd291bGQgcHV0IHRoYXQgaW4gYSB1c2VSZWYgaG9vaywgYnV0IHdlIGNhbiBzdGFzaCBpdCBpblxuICAvLyBvdXIgdXNlU3RhdGUgaG9vayBpbnN0ZWFkLlxuICAvL1xuICAvLyBUbyBmb3JjZSBhIHJlLXJlbmRlciwgd2UgY2FsbCBmb3JjZVVwZGF0ZSh7aW5zdH0pLiBUaGF0IHdvcmtzIGJlY2F1c2UgdGhlXG4gIC8vIG5ldyBvYmplY3QgYWx3YXlzIGZhaWxzIGFuIGVxdWFsaXR5IGNoZWNrLlxuXG5cbiAgdmFyIF91c2VTdGF0ZSA9IHVzZVN0YXRlKHtcbiAgICBpbnN0OiB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBnZXRTbmFwc2hvdDogZ2V0U25hcHNob3RcbiAgICB9XG4gIH0pLFxuICAgICAgaW5zdCA9IF91c2VTdGF0ZVswXS5pbnN0LFxuICAgICAgZm9yY2VVcGRhdGUgPSBfdXNlU3RhdGVbMV07IC8vIFRyYWNrIHRoZSBsYXRlc3QgZ2V0U25hcHNob3QgZnVuY3Rpb24gd2l0aCBhIHJlZi4gVGhpcyBuZWVkcyB0byBiZSB1cGRhdGVkXG4gIC8vIGluIHRoZSBsYXlvdXQgcGhhc2Ugc28gd2UgY2FuIGFjY2VzcyBpdCBkdXJpbmcgdGhlIHRlYXJpbmcgY2hlY2sgdGhhdFxuICAvLyBoYXBwZW5zIG9uIHN1YnNjcmliZS5cblxuXG4gIHVzZUxheW91dEVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgaW5zdC52YWx1ZSA9IHZhbHVlO1xuICAgIGluc3QuZ2V0U25hcHNob3QgPSBnZXRTbmFwc2hvdDsgLy8gV2hlbmV2ZXIgZ2V0U25hcHNob3Qgb3Igc3Vic2NyaWJlIGNoYW5nZXMsIHdlIG5lZWQgdG8gY2hlY2sgaW4gdGhlXG4gICAgLy8gY29tbWl0IHBoYXNlIGlmIHRoZXJlIHdhcyBhbiBpbnRlcmxlYXZlZCBtdXRhdGlvbi4gSW4gY29uY3VycmVudCBtb2RlXG4gICAgLy8gdGhpcyBjYW4gaGFwcGVuIGFsbCB0aGUgdGltZSwgYnV0IGV2ZW4gaW4gc3luY2hyb25vdXMgbW9kZSwgYW4gZWFybGllclxuICAgIC8vIGVmZmVjdCBtYXkgaGF2ZSBtdXRhdGVkIHRoZSBzdG9yZS5cblxuICAgIGlmIChjaGVja0lmU25hcHNob3RDaGFuZ2VkKGluc3QpKSB7XG4gICAgICAvLyBGb3JjZSBhIHJlLXJlbmRlci5cbiAgICAgIGZvcmNlVXBkYXRlKHtcbiAgICAgICAgaW5zdDogaW5zdFxuICAgICAgfSk7XG4gICAgfVxuICB9LCBbc3Vic2NyaWJlLCB2YWx1ZSwgZ2V0U25hcHNob3RdKTtcbiAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAvLyBDaGVjayBmb3IgY2hhbmdlcyByaWdodCBiZWZvcmUgc3Vic2NyaWJpbmcuIFN1YnNlcXVlbnQgY2hhbmdlcyB3aWxsIGJlXG4gICAgLy8gZGV0ZWN0ZWQgaW4gdGhlIHN1YnNjcmlwdGlvbiBoYW5kbGVyLlxuICAgIGlmIChjaGVja0lmU25hcHNob3RDaGFuZ2VkKGluc3QpKSB7XG4gICAgICAvLyBGb3JjZSBhIHJlLXJlbmRlci5cbiAgICAgIGZvcmNlVXBkYXRlKHtcbiAgICAgICAgaW5zdDogaW5zdFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIGhhbmRsZVN0b3JlQ2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gVE9ETzogQmVjYXVzZSB0aGVyZSBpcyBubyBjcm9zcy1yZW5kZXJlciBBUEkgZm9yIGJhdGNoaW5nIHVwZGF0ZXMsIGl0J3NcbiAgICAgIC8vIHVwIHRvIHRoZSBjb25zdW1lciBvZiB0aGlzIGxpYnJhcnkgdG8gd3JhcCB0aGVpciBzdWJzY3JpcHRpb24gZXZlbnRcbiAgICAgIC8vIHdpdGggdW5zdGFibGVfYmF0Y2hlZFVwZGF0ZXMuIFNob3VsZCB3ZSB0cnkgdG8gZGV0ZWN0IHdoZW4gdGhpcyBpc24ndFxuICAgICAgLy8gdGhlIGNhc2UgYW5kIHByaW50IGEgd2FybmluZyBpbiBkZXZlbG9wbWVudD9cbiAgICAgIC8vIFRoZSBzdG9yZSBjaGFuZ2VkLiBDaGVjayBpZiB0aGUgc25hcHNob3QgY2hhbmdlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIHdlXG4gICAgICAvLyByZWFkIGZyb20gdGhlIHN0b3JlLlxuICAgICAgaWYgKGNoZWNrSWZTbmFwc2hvdENoYW5nZWQoaW5zdCkpIHtcbiAgICAgICAgLy8gRm9yY2UgYSByZS1yZW5kZXIuXG4gICAgICAgIGZvcmNlVXBkYXRlKHtcbiAgICAgICAgICBpbnN0OiBpbnN0XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07IC8vIFN1YnNjcmliZSB0byB0aGUgc3RvcmUgYW5kIHJldHVybiBhIGNsZWFuLXVwIGZ1bmN0aW9uLlxuXG5cbiAgICByZXR1cm4gc3Vic2NyaWJlKGhhbmRsZVN0b3JlQ2hhbmdlKTtcbiAgfSwgW3N1YnNjcmliZV0pO1xuICB1c2VEZWJ1Z1ZhbHVlKHZhbHVlKTtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBjaGVja0lmU25hcHNob3RDaGFuZ2VkKGluc3QpIHtcbiAgdmFyIGxhdGVzdEdldFNuYXBzaG90ID0gaW5zdC5nZXRTbmFwc2hvdDtcbiAgdmFyIHByZXZWYWx1ZSA9IGluc3QudmFsdWU7XG5cbiAgdHJ5IHtcbiAgICB2YXIgbmV4dFZhbHVlID0gbGF0ZXN0R2V0U25hcHNob3QoKTtcbiAgICByZXR1cm4gIW9iamVjdElzKHByZXZWYWx1ZSwgbmV4dFZhbHVlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1c2VTeW5jRXh0ZXJuYWxTdG9yZSQxKHN1YnNjcmliZSwgZ2V0U25hcHNob3QsIGdldFNlcnZlclNuYXBzaG90KSB7XG4gIC8vIE5vdGU6IFRoZSBzaGltIGRvZXMgbm90IHVzZSBnZXRTZXJ2ZXJTbmFwc2hvdCwgYmVjYXVzZSBwcmUtMTggdmVyc2lvbnMgb2ZcbiAgLy8gUmVhY3QgZG8gbm90IGV4cG9zZSBhIHdheSB0byBjaGVjayBpZiB3ZSdyZSBoeWRyYXRpbmcuIFNvIHVzZXJzIG9mIHRoZSBzaGltXG4gIC8vIHdpbGwgbmVlZCB0byB0cmFjayB0aGF0IHRoZW1zZWx2ZXMgYW5kIHJldHVybiB0aGUgY29ycmVjdCB2YWx1ZVxuICAvLyBmcm9tIGBnZXRTbmFwc2hvdGAuXG4gIHJldHVybiBnZXRTbmFwc2hvdCgpO1xufVxuXG52YXIgY2FuVXNlRE9NID0gISEodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy5kb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50ICE9PSAndW5kZWZpbmVkJyk7XG5cbnZhciBpc1NlcnZlckVudmlyb25tZW50ID0gIWNhblVzZURPTTtcblxudmFyIHNoaW0gPSBpc1NlcnZlckVudmlyb25tZW50ID8gdXNlU3luY0V4dGVybmFsU3RvcmUkMSA6IHVzZVN5bmNFeHRlcm5hbFN0b3JlO1xudmFyIHVzZVN5bmNFeHRlcm5hbFN0b3JlJDIgPSBSZWFjdC51c2VTeW5jRXh0ZXJuYWxTdG9yZSAhPT0gdW5kZWZpbmVkID8gUmVhY3QudXNlU3luY0V4dGVybmFsU3RvcmUgOiBzaGltO1xuXG5leHBvcnRzLnVzZVN5bmNFeHRlcm5hbFN0b3JlID0gdXNlU3luY0V4dGVybmFsU3RvcmUkMjtcbiAgICAgICAgICAvKiBnbG9iYWwgX19SRUFDVF9ERVZUT09MU19HTE9CQUxfSE9PS19fICovXG5pZiAoXG4gIHR5cGVvZiBfX1JFQUNUX0RFVlRPT0xTX0dMT0JBTF9IT09LX18gIT09ICd1bmRlZmluZWQnICYmXG4gIHR5cGVvZiBfX1JFQUNUX0RFVlRPT0xTX0dMT0JBTF9IT09LX18ucmVnaXN0ZXJJbnRlcm5hbE1vZHVsZVN0b3AgPT09XG4gICAgJ2Z1bmN0aW9uJ1xuKSB7XG4gIF9fUkVBQ1RfREVWVE9PTFNfR0xPQkFMX0hPT0tfXy5yZWdpc3RlckludGVybmFsTW9kdWxlU3RvcChuZXcgRXJyb3IoKSk7XG59XG4gICAgICAgIFxuICB9KSgpO1xufVxuIl0sIm5hbWVzIjpbInByb2Nlc3MiLCJfX1JFQUNUX0RFVlRPT0xTX0dMT0JBTF9IT09LX18iLCJyZWdpc3RlckludGVybmFsTW9kdWxlU3RhcnQiLCJFcnJvciIsIlJlYWN0IiwicmVxdWlyZSIsIlJlYWN0U2hhcmVkSW50ZXJuYWxzIiwiX19TRUNSRVRfSU5URVJOQUxTX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQiLCJlcnJvciIsImZvcm1hdCIsIl9sZW4yIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiYXJncyIsIkFycmF5IiwiX2tleTIiLCJwcmludFdhcm5pbmciLCJsZXZlbCIsIlJlYWN0RGVidWdDdXJyZW50RnJhbWUiLCJzdGFjayIsImdldFN0YWNrQWRkZW5kdW0iLCJjb25jYXQiLCJhcmdzV2l0aEZvcm1hdCIsIm1hcCIsIml0ZW0iLCJTdHJpbmciLCJ1bnNoaWZ0IiwiRnVuY3Rpb24iLCJwcm90b3R5cGUiLCJhcHBseSIsImNhbGwiLCJjb25zb2xlIiwiaXMiLCJ4IiwieSIsIm9iamVjdElzIiwiT2JqZWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VMYXlvdXRFZmZlY3QiLCJ1c2VEZWJ1Z1ZhbHVlIiwiZGlkV2Fybk9sZDE4QWxwaGEiLCJkaWRXYXJuVW5jYWNoZWRHZXRTbmFwc2hvdCIsInVzZVN5bmNFeHRlcm5hbFN0b3JlIiwic3Vic2NyaWJlIiwiZ2V0U25hcHNob3QiLCJnZXRTZXJ2ZXJTbmFwc2hvdCIsInN0YXJ0VHJhbnNpdGlvbiIsInVuZGVmaW5lZCIsInZhbHVlIiwiY2FjaGVkVmFsdWUiLCJfdXNlU3RhdGUiLCJpbnN0IiwiZm9yY2VVcGRhdGUiLCJjaGVja0lmU25hcHNob3RDaGFuZ2VkIiwiaGFuZGxlU3RvcmVDaGFuZ2UiLCJsYXRlc3RHZXRTbmFwc2hvdCIsInByZXZWYWx1ZSIsIm5leHRWYWx1ZSIsInVzZVN5bmNFeHRlcm5hbFN0b3JlJDEiLCJjYW5Vc2VET00iLCJ3aW5kb3ciLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpc1NlcnZlckVudmlyb25tZW50Iiwic2hpbSIsInVzZVN5bmNFeHRlcm5hbFN0b3JlJDIiLCJleHBvcnRzIiwicmVnaXN0ZXJJbnRlcm5hbE1vZHVsZVN0b3AiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/use-sync-external-store/shim/index.js":
/*!************************************************************!*\
  !*** ./node_modules/use-sync-external-store/shim/index.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nif (false) {} else {\n    module.exports = __webpack_require__(/*! ../cjs/use-sync-external-store-shim.development.js */ \"(ssr)/./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js\");\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdXNlLXN5bmMtZXh0ZXJuYWwtc3RvcmUvc2hpbS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUVBLElBQUlBLEtBQXlCLEVBQWMsRUFFMUMsTUFBTTtJQUNMQyw4TEFBeUI7QUFDM0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXNlLXN5bmMtZXh0ZXJuYWwtc3RvcmUvc2hpbS9pbmRleC5qcz8yZTg3Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9janMvdXNlLXN5bmMtZXh0ZXJuYWwtc3RvcmUtc2hpbS5wcm9kdWN0aW9uLm1pbi5qcycpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9janMvdXNlLXN5bmMtZXh0ZXJuYWwtc3RvcmUtc2hpbS5kZXZlbG9wbWVudC5qcycpO1xufVxuIl0sIm5hbWVzIjpbInByb2Nlc3MiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxdWlyZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/use-sync-external-store/shim/index.js\n");

/***/ })

};
;