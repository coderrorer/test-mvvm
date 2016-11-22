import $ from 'jquery';
import {doubleQuoteVM,propertyVM,modelVM} from '../directive/index';
import {extendDeep} from '../util';
export default function compiler(mvvm, node) {
    let util = Util.getInstance();
    util.doms = util.parseHTML(node);
    util.walk($(util.doms)[0], mvvm);
    return util.doms;
}
let _util = null;
class Util {
    constructor() {
        this.doms = null;
    }

    walk(node, mvvm) {
        let childNodes = node.childNodes;
        if (childNodes && childNodes.length) {
            childNodes.forEach((child)=> {
                if (child.nodeName == '#text') {
                    //text
                    if (child.textContent) {
                        if (child.textContent.indexOf('{{') != -1 && child.textContent.indexOf('}}') != -1) {
                            let bindName = child.textContent.substring(child.textContent.indexOf('{{') + 2, child.textContent.indexOf('}}'));
                            doubleQuoteVM(bindName, child, mvvm);
                            child.textContent = "";
                        }
                    }
                } else {

                }
                if (child.attributes && child.attributes.length) {
                    console.log(child.attributes.length);
                    for (let i = 0; i < child.attributes.length; i++) {
                        let attribute = child.attributes[i];
                        if (attribute.nodeName.indexOf('@') == 0) {
                            let eventName = new String(attribute.nodeName);
                            eventName = eventName.substr(1);
                            child.addEventListener(eventName, mvvm.options.methods[attribute.nodeValue].bind(mvvm));
                        }else if(attribute.nodeName.indexOf(':') == 0) {
                            let propName = new String(attribute.nodeName);
                            propName = propName.substr(1);
                            propertyVM(attribute.nodeValue,child,mvvm,propName);
                        }else if(attribute.nodeName == 'm-model') {
                            //double-side binding
                            modelVM(attribute.nodeValue,child,mvvm);
                            child.addEventListener('input', (e)=>{
                                mvvm.data[attribute.nodeValue] = e.target.value;
                            });
                        }
                        //todo add if/else for-loop
                    }
                }
                if (child.childNodes && child.childNodes.length) {
                    this.walk(child, mvvm);
                }
            })
        }
    }

    parseHTML(str) {
        // Elements that require special handling when
        // not encapsulated in their standard containers:
        var specials = {
            td: {
                container: 'table',
                html: '<tbody><tr class="x_root"></tr></tbody>'
            },
            tr: {
                container: 'table',
                html: '<tbody class="x_root"></tbody>'
            },
            thead: {
                container: 'table',
                html: '<tbody class="x_root"></tbody>'
            },
            caption: {
                container: 'table',
                html: '<tbody class="x_root"></tbody>'
            },
            li: {
                container: 'ul',
            },
            dd: {
                container: 'dl',
            },
            dt: {
                container: 'dl',
            },
            optgroup: {
                container: 'select',
            },
            option: {
                container: 'select',
            }
        };
        var container, docfrag, output, root, special, tags;
        // Use native templating where available:
        container = document.createElement('TEMPLATE');
        if (container.content) {
            container.innerHTML = str;
            output = container.content;
        }
        // Fallback for Internet Explorer, early editions of Edge,
        // and Android < 4.4:
        else {

            // See if the template string starts with a "<tag",
            // and check if that tag is one of our specials:

            tags = str.match(/^\s*<([^>\s]+)/);
            if (tags) {
                special = specials[tags[1].toLowerCase()];
                if (special) {

                    // We have a match! Inject the template into an appropriate
                    // container, encapsulated in additional markup if necessary:

                    container = document.createElement(special.container);
                    if (special.html) {
                        container.innerHTML = special.html;
                        root = container.querySelector('.x_root');
                        root.innerHTML = str;
                    } else {
                        container.innerHTML = str;
                        root = container;
                    }
                }
            }

            // Templates that don't require special handling just
            // get injected into a DIV:

            if (!root) {
                container = document.createElement('DIV');
                container.innerHTML = str;
                root = container;
            }

            // The "root" is the element that contains the DOM
            // represented by the original template string. The "root"
            // element may not be the same as the outer "container".
            // Iterate through the root's child elements, moving them
            // to an empty DocumentFragment instance:

            docfrag = document.createDocumentFragment();
            while (root.firstChild) {
                docfrag.appendChild(root.firstChild);
            }
            output = docfrag;
        }
        return output;
    }

    static getInstance() {
        if (_util) return _util;
        else return new Util();
    }
}
