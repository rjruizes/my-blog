const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight"),
      markdownIt = require('markdown-it'),
      dateFilter = require('nunjucks-date-filter');
module.exports = eleventyConfig => {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPassthroughCopy('favicon.ico');
  const options = {
    html: true,
    breaks: true,
    linkify: false
  };
  eleventyConfig.setLibrary("md", markdownIt(options));
  eleventyConfig.addNunjucksFilter('date', dateFilter);
  eleventyConfig.addShortcode('excerpt', article => extractExcerpt(article));

  return {
    // Use liquid in html templates
    htmlTemplateEngine: 'njk'
  };
};


function extractExcerpt(article) {
  if (!article.hasOwnProperty('templateContent') || article.templateContent == '') {
    console.warn('Failed to extract excerpt: Document has no property "templateContent".');
    return '';
  }
  let excerpt = null;
  const content = article.templateContent;

  // return content.split(/\r?\n/).slice(0, 5).join('\n')

  // The start and end separators to try and match to extract the excerpt
  const separatorsList = [
    { start: '<!-- Excerpt Start -->', end: '<!-- Excerpt End -->' },
    { start: '<p>', end: '</p>' }
  ];

  separatorsList.some(separators => {
    const startPosition = content.indexOf(separators.start);
    const endPosition = content.indexOf(separators.end, startPosition);

    if (startPosition !== -1 && endPosition !== -1) {
      excerpt = content.substring(startPosition + separators.start.length, endPosition).trim();
      return true; // Exit out of array loop on first match
    }
  });

  return excerpt;
} 
