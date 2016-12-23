const iFrameResizer = require('iframe-resizer/js/iframeResizer.min.js'); // eslint-disable-line no-unused-vars

/**
 * This directive helps you implement a resizeable iframe
 * for any routes within the `crds-embed` repo. The src attribute
 * on the iframe will reflect the current environment (int, demo, etc.)
 * automatically.
 *
 * To use, simply drop the following element in your markup (or content-block)
 * and define the relative path for the route you want passed to the iframe.
 *
 * For example...
 *
 *    <crds-embed path="/?type=donation&theme=dark"></crds-embed>
 *
 */

export default class EmbedController {

  constructor($element, $sce, $attrs) {
    this.element = $element;
    this.sce = $sce;
    this.attrs = $attrs;

    switch (__CRDS_ENV__) { // eslint-disable-line no-undef
      case 'int':
        this.baseUrl = 'https://embedint.crossroads.net';
        break;
      case 'demo':
        this.baseUrl = 'https://embeddemo.crossroads.net';
        break;
      default:
        this.baseUrl = 'https://embed.crossroads.net';
        break;
    }

    this.makeResizeable();
  }

  buildUrl() {
    const path = this.attrs.href || '/?type=donation';
    return this.sce.trustAsResourceUrl(`${this.baseUrl}${path}`);
  }

  makeResizeable() {
    const el = angular.element(this.element).find('iframe')[0];
    iFrameResizer({
      heightCalculationMethod: 'taggedElement',
      minHeight: 350,
      checkOrigin: false,
      interval: 32
    }, el);
  }
}