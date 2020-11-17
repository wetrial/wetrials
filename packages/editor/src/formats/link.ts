import Quill from 'quill';

const Inline = Quill.import('blots/inline');

class Link extends Inline {
  static create(data) {
    this.formatCursor = false;
    const node = super.create(data);

    if (data) {
      node.setAttribute('target', '_blank');
      node.setAttribute('href', data.url);

      if (data.type != null) {
        node.setAttribute('data-ql-link-type', data.type);
        if (data.type === 'attachment') {
          node.setAttribute('download', data.name || '');
          node.setAttribute('contenteditable', 'false');
        }
      }
    }

    return node;
  }

  static formats(node) {
    // 修复在超链接后输入回车光标被异常添加超链接的问题
    const domChildren = node.children;
    // let containsCursor = /<\s*span\s*class\s*=\s*['"]\s*ql-cursor\s*['"]\s*>\s*\ufeff\s*<\s*\/\s*span\s*>/gi;
    if (
      !this.formatCursor &&
      domChildren &&
      domChildren.length === 1 &&
      domChildren[0].innerText === '\ufeff'
    ) {
      return {};
    }

    return {
      url: node.getAttribute('href'),
      type: node.getAttribute('data-ql-link-type'),
      name: node.getAttribute('download'),
    };
  }

  // static sanitize(url) {
  //   return sanitize(url, this.PROTOCOL_WHITELIST) ? url : this.SANITIZED_URL;
  // }

  format(name, data) {
    if (name !== this.statics.blotName || !data) {
      super.format(name, data);
    } else {
      // 在超链接内输入回车时需要为光标添加超链接
      this.statics.formatCursor = true;
      if (data) {
        this.domNode.setAttribute('href', data.url);

        if (data.type != null) {
          this.domNode.setAttribute('data-ql-link-type', data.type);
          if (data.type === 'attachment') {
            this.domNode.setAttribute('contenteditable', 'false');
            this.domNode.setAttribute('download', data.name || '');
          }
        }
      }
    }
  }
}
Link.blotName = 'link';
Link.tagName = 'A';
Link.formatCursor = false; // 是否为光标添加超链接
// Link.SANITIZED_URL = 'about:blank';
// Link.PROTOCOL_WHITELIST = ['http', 'https', 'mailto', 'tel'];

function sanitize(url, protocols) {
  const anchor = document.createElement('a');
  anchor.href = url;
  const protocol = anchor.href.slice(0, anchor.href.indexOf(':'));
  return protocols.indexOf(protocol) > -1;
}

export { Link as default, sanitize };
