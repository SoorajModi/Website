const MarkdownIt = require("markdown-it");
const md = new MarkdownIt();

function renderBody(toRender) {
  toRender.forEach((obj) => {
    if (obj.body) obj.body = md.render(obj.body);
  });
  return toRender;
}

module.exports = renderBody;
