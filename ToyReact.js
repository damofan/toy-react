class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type)
  }
  setAttribute(name, value) {
    if (name.match(/^on([\s\S]+)$/)) {
      this.root.addEventListener(RegExp.$1.replace(/^[\s\S]/, s => s.toLocaleLowerCase()), value)
    }
    let newName = name === 'className' ? 'class' : name
    this.root.setAttribute(newName, value)
  }
  appendChild(vchild) {
    vchild.mountTo(this.root)
  }
  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content)
  }
  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

export class Component {
  constructor() {
    this.children = []
    this.props = Object.create(null)
  }
  setAttribute(name, value) {
    if (name.match(/^on([\s\S]+)$/)) {
      console.log(RegExp.$1)
    }
    this.props[name] = value
    this[name] = value
  }
  mountTo(parent) {
    let vdom = this.render()
    vdom.mountTo(parent)
  }
  appendChild(vchildren) {
    this.children.push(vchildren)
  }
}

export let ToyReact = {
  createElement(type, attributes, ...children) {
    let element

    if (typeof type === 'string')
      element = new ElementWrapper(type)
    else
      element = new type

    for(let name in attributes) {
      element.setAttribute(name, attributes[name])
    }

    let innerChildren = (children) => {
      for(let child of children) {
        if (typeof child === 'object' && child instanceof Array) {
          innerChildren(child)
        } else {
          if (!(child instanceof Component)
            && !(child instanceof ElementWrapper)
            && !(child instanceof TextWrapper)
          )
            child = String(child)
          if (typeof child === 'string')
            child = new TextWrapper(child)
          element.appendChild(child)
        }
      }
    }

    innerChildren(children)

    return element
  },
  render(vdom, element) {
    vdom.mountTo(element)
  }
}