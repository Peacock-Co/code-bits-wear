const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/leonardosilvapavao/Desktop/e-commerce-project/frontend/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/leonardosilvapavao/Desktop/e-commerce-project/frontend/src/pages/404.js"))),
  "component---src-pages-account-js": hot(preferDefault(require("/Users/leonardosilvapavao/Desktop/e-commerce-project/frontend/src/pages/account.js"))),
  "component---src-pages-contact-js": hot(preferDefault(require("/Users/leonardosilvapavao/Desktop/e-commerce-project/frontend/src/pages/contact.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/leonardosilvapavao/Desktop/e-commerce-project/frontend/src/pages/index.js"))),
  "component---src-templates-product-detail-js": hot(preferDefault(require("/Users/leonardosilvapavao/Desktop/e-commerce-project/frontend/src/templates/ProductDetail.js"))),
  "component---src-templates-product-list-js": hot(preferDefault(require("/Users/leonardosilvapavao/Desktop/e-commerce-project/frontend/src/templates/ProductList.js")))
}

