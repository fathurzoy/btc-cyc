'use client';
"use strict";
exports.__esModule = true;
var script_1 = require("next/script");
function GoogleAnalytics(_a) {
    var measurementId = _a.measurementId;
    console.log('Google Analytics Measurement ID:', measurementId);
    return (React.createElement(React.Fragment, null,
        React.createElement(script_1["default"], { strategy: "afterInteractive", src: "https://www.googletagmanager.com/gtag/js?id=" + measurementId }),
        React.createElement(script_1["default"], { id: "google-analytics", strategy: "afterInteractive", dangerouslySetInnerHTML: {
                __html: "\n            window.dataLayer = window.dataLayer || [];\n            function gtag(){dataLayer.push(arguments);}\n            gtag('js', new Date());\n            gtag('config', '" + measurementId + "', {\n              page_path: window.location.pathname,\n            });\n          "
            } })));
}
exports["default"] = GoogleAnalytics;
