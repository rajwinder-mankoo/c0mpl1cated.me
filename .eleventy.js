const { createHash } = require("node:crypto");
const { readFileSync } = require("node:fs");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("assetVersion", (path) =>
    createHash("sha256").update(readFileSync(path)).digest("hex").slice(0, 10),
  );
  eleventyConfig.addFilter("readableDate", (date) =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(new Date(date)),
  );

  // style.css, fonts and script.js are copied verbatim from the portfolio
  // (see scripts/sync-theme.mjs). lab.css holds the few lab-only additions.
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/lab.css");
  eleventyConfig.addPassthroughCopy("src/script.js");
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  // Cloudflare Pages response headers (CSP etc.)
  eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
