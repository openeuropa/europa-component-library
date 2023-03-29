import { queryOne } from '@ecl/dom-utils';

/**
 * @param {HTMLElement} element DOM element for component instantiation and scope
 * @param {Object} options
 * @param {String} options.iframeSelector Selector for iframe element
 * @param {boolean} options.useAutomaticRatio Toggle automatic ratio calculus
 */
export class MediaContainer {
  /**
   * @static
   * Shorthand for instance creation and initialisation.
   *
   * @param {HTMLElement} root DOM element for component instantiation and scope
   *
   * @return {MediaContainer} An instance of MediaContainer.
   */
  static autoInit(root, { MEDIA_CONTAINER: defaultOptions = {} } = {}) {
    const mediaContainer = new MediaContainer(root, defaultOptions);
    mediaContainer.init();
    root.ECLMediaContainer = mediaContainer;
    return mediaContainer;
  }

  constructor(
    element,
    { iframeSelector = 'iframe', useAutomaticRatio = true } = {}
  ) {
    // Check element
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError(
        'DOM element should be given to initialize this widget.'
      );
    }

    this.element = element;

    // Options
    this.iframeSelector = iframeSelector;
    this.useAutomaticRatio = useAutomaticRatio;

    // Private variables
    this.iframe = null;

    // Bind `this` for use in callbacks
    this.calculateRatio = this.calculateRatio.bind(this);
    this.adjustPlayer = this.adjustPlayer.bind(this);
  }

  /**
   * Initialise component.
   */
  init() {
    // Check if a ratio has been set manually
    const media = queryOne('.ecl-media-container__media', this.element);
    if (media && !/ecl-media-container__media--ratio/.test(media.className)) {
      // Get the iframe
      this.iframe = queryOne(this.iframeSelector, this.element);

      // Check if there is an iframe to handle
      if (this.iframe && this.useAutomaticRatio) this.calculateRatio();
    }
    window.onscroll = this.adjustPlayer;
    // Set ecl initialized attribute
    this.element.setAttribute('data-ecl-auto-initialized', 'true');
  }

  /**
   * Destroy component.
   */
  destroy() {
    if (this.element) {
      this.element.removeAttribute('data-ecl-auto-initialized');
    }
  }

  /**
   * Calculate the ratio of the iframe video.
   */
  calculateRatio() {
    // Get dimension if they are provided
    let iframeWidth = this.iframe.width;
    let iframeHeight = this.iframe.height;

    // If at least one dimension in not provided, calculate them (less reliable)
    if (!iframeWidth || !iframeHeight) {
      iframeWidth = this.iframe.offsetWidth;
      iframeHeight = this.iframe.offsetHeight;
    }

    // Set aspect ratio
    this.iframe.style.aspectRatio = `${iframeWidth}/${iframeHeight}`;
  }

  adjustPlayer() {
    const currentHeight = this.element.offsetHeight;
    const lowerEdge = this.element.offsetTop + currentHeight;
    const switchToMinPlayerPos = lowerEdge - window.innerHeight / 3;
    const currentScrollPos =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (currentScrollPos > switchToMinPlayerPos) {
      this.element.style.height = `${currentHeight}px`;
      this.element.classList.add('fixed-player');
    } else {
      this.element.classList.remove('fixed-player');
    }
  }
}

export default MediaContainer;
