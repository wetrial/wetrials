import Quill from 'quill';

const Inline = Quill.import('blots/inline');

const setAttr = (node, value) => {
  const tmpNode = node;
  if (typeof value === 'string' || typeof value === 'number') {
    tmpNode.style.fontSize = value;
  } else if (Object.prototype.toString.call(value) === '[object Object]') {
    if (value.editable != null) {
      node.setAttribute('contenteditable', value.editable);
    }

    if (value.fontSize != null) {
      tmpNode.style.fontSize = value.fontSize;
    }
  }

  return tmpNode;
};

// 自定义span标签的字体大小和contenteditable属性
class CustomAttrBlot extends Inline {
  static create(value) {
    const node = super.create();

    return setAttr(node, value);
  }

  static formats(node) {
    // 返回值不能为 null（Fix bug: Cannot read property 'mutations' of undefined）
    return {
      fontSize: node.style.fontSize,
      editable: node.getAttribute('contenteditable'),
    };
  }

  format(name, value) {
    if (name !== this.statics.blotName || !value) {
      super.format(name, value);
    } else {
      setAttr(this.domNode, value);
    }
  }
}

CustomAttrBlot.blotName = 'customAttr';
CustomAttrBlot.tagName = 'span';

export default CustomAttrBlot;
