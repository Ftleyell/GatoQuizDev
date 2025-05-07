// src/game/components/ui/main-menu-screen.ts
import { LitElement, html, css, CSSResultGroup, svg } from 'lit';
import { customElement, state, property, query } from 'lit/decorators.js';

interface GameData {
  title: string;
  version: string;
  highScore: number;
  lastScore: number;
}

@customElement('main-menu-screen')
export class MainMenuScreen extends LitElement {

  @property({ type: Object }) gameData: GameData = {
    title: 'GatoQuiz Interactivo',
    version: '1.0.0',
    highScore: 0,
    lastScore: 0,
  };

  // Propiedad para recibir los mensajes de carga desde GameManager
  @property({ type: Array }) loadingMessages: string[] = [
    "Desenredando la diversión...", // Fallback por si no se pasan
    "Preparando las croquetas virtuales...",
    "Afilando las garras para el quiz..."
  ];

  @state() private _isLoading = false; // Aunque no se usa para clases en host, se mantiene para la lógica interna
  @state() private _contentFadingOut = false;
  @state() private _currentLoadingMessage: string = "Cargando..."; // Estado para el mensaje actual

  @query('#sparkle-container-internal') private _sparkleContainer!: HTMLElement;
  @query('#sparkle-svg-template-internal') private _sparkleSvgTemplate!: SVGElement;

  // Referencias a elementos internos para controlar su visibilidad
  @query('.paw-wrapper') private _pawWrapper!: HTMLElement;
  @query('.title-ampersand') private _titleAmpersand!: HTMLElement;
  @query('.loading-message-container') private _loadingMessageContainer!: HTMLElement;

  private sparkleIntervalId: number | null = null;
  private hasStarted: boolean = false;

  static styles: CSSResultGroup = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      overflow: hidden;
      cursor: pointer;
      font-family: "Geist", sans-serif;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      pointer-events: auto;
      z-index: 10;
      --hue1: 0deg;
      --hue2: 300deg;
      background-image:
        linear-gradient(
          in oklch longer hue to right,
          oklch(0.93 0.08 var(--hue1) / 50%),
          oklch(0.93 0.08 var(--hue2) / 50%)
        ),
        linear-gradient(
          in oklch longer hue to bottom,
          oklch(0.93 0.08 var(--hue1) / 50%),
          oklch(0.93 0.08 var(--hue2) / 50%)
        );
      background-size: 100% 100%;
      animation-name: anim_bg_host;
      animation-duration: 5s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      text-align: center;
      padding: 0.5rem;
      box-sizing: border-box;
    }

    :host::before {
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M64.6 15.4c-1.1-1.1-2.9-1.1-4 0L50 26.1 39.4 15.4c-1.1-1.1-2.9-1.1-4 0-1.1 1.1-1.1 2.9 0 4L46.1 30 35.4 40.6c-1.1 1.1-1.1 2.9 0 4 0.5 0.5 1.2 0.8 2 0.8s1.5-0.3 2-0.8L50 33.9l10.6 10.6c0.5 0.5 1.2 0.8 2 0.8s1.5-0.3 2-0.8c1.1-1.1 1.1-2.9 0-4L53.9 30 64.6 19.4C65.7 18.3 65.7 16.5 64.6 15.4z M24 40c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8S28.4 40 24 40z M40 56c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8S44.4 56 40 56z M56 40c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8S60.4 40 56 40z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
      background-size: 120px 120px;
      animation: fallingPaws_host 20s linear infinite;
      z-index: -2;
      opacity: 0.5;
      pointer-events: none;
    }
    :host::after {
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cdefs%3E%3Cmask id='pawMaskHost'%3E%3Crect width='100%25' height='100%25' fill='white'/%3E%3Cg fill='black' transform='translate(75 75) scale(0.15)'%3E%3Cpath d='M205.116,153.078c31.534,11.546,69.397-12.726,84.58-54.209c15.174-41.484,1.915-84.462-29.614-96.001 c-31.541-11.53-69.4,12.735-84.582,54.218C160.325,98.57,173.584,141.548,205.116,153.078z'/%3E%3Cpath d='M85.296,219.239c32.987-2.86,56.678-40.344,52.929-83.75c-3.757-43.391-33.545-76.253-66.532-73.409 c-32.984,2.869-56.674,40.36-52.921,83.759C22.53,189.23,52.313,222.091,85.296,219.239z'/%3E%3Cpath d='M342.196,217.768c28.952,17.017,70.552-0.073,92.926-38.154c22.374-38.106,17.041-82.758-11.915-99.774 c-28.951-17.001-70.56,0.097-92.93,38.178C307.905,156.117,313.245,200.768,342.196,217.768z'/%3E%3Cpath d='M497.259,262.912c-18.771-27.271-63.07-29.379-98.954-4.694c-35.892,24.701-49.762,66.822-30.996,94.101 c18.766,27.27,63.069,29.38,98.954,4.686C502.143,332.312,516.021,290.191,497.259,262.912z'/%3E%3Cpath d='M304.511,268.059c-3.58-24.773-18.766-47.366-43.039-58.824c-24.268-11.45-51.365-8.807-72.758,4.169 c-23.646,14.35-38.772,33.096-59.138,41.29c-20.363,8.193-77.4-16.209-112.912,48.278c-25.081,45.548-2.057,103.128,44.962,125.315 c35.738,16.864,64.023,14.981,84.788,24.774c20.762,9.793,37.29,32.83,73.025,49.692c47.018,22.188,106.1,3.362,125.315-44.957 c27.206-68.407-27.897-96.922-34.522-117.85C303.613,319.021,308.47,295.426,304.511,268.059z'/%3E%3C/g%3E%3Cg fill='black' transform='translate(25 30) scale(0.09) rotate(-20)'%3E%3Cpath d='M205.116,153.078c31.534,11.546,69.397-12.726,84.58-54.209c15.174-41.484,1.915-84.462-29.614-96.001 c-31.541-11.53-69.4,12.735-84.582,54.218C160.325,98.57,173.584,141.548,205.116,153.078z'/%3E%3Cpath d='M85.296,219.239c32.987-2.86,56.678-40.344,52.929-83.75c-3.757-43.391-33.545-76.253-66.532-73.409 c-32.984,2.869-56.674,40.36-52.921,83.759C22.53,189.23,52.313,222.091,85.296,219.239z'/%3E%3Cpath d='M342.196,217.768c28.952,17.017,70.552-0.073,92.926-38.154c22.374-38.106,17.041-82.758-11.915-99.774 c-28.951-17.001-70.56,0.097-92.93,38.178C307.905,156.117,313.245,200.768,342.196,217.768z'/%3E%3Cpath d='M497.259,262.912c-18.771-27.271-63.07-29.379-98.954-4.694c-35.892,24.701-49.762,66.822-30.996,94.101 c18.766,27.27,63.069,29.38,98.954,4.686C502.143,332.312,516.021,290.191,497.259,262.912z'/%3E%3Cpath d='M304.511,268.059c-3.58-24.773-18.766-47.366-43.039-58.824c-24.268-11.45-51.365-8.807-72.758,4.169 c-23.646,14.35-38.772,33.096-59.138,41.29c-20.363,8.193-77.4-16.209-112.912,48.278c-25.081,45.548-2.057,103.128,44.962,125.315 c35.738,16.864,64.023,14.981,84.788,24.774c20.762,9.793,37.29,32.83,73.025,49.692c47.018,22.188,106.1,3.362,125.315-44.957 c27.206-68.407-27.897-96.922-34.522-117.85C303.613,319.021,308.47,295.426,304.511,268.059z'/%3E%3C/g%3E%3C/mask%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='white' mask='url(%23pawMaskHost)'/%3E%3C/svg%3E");
      background-size: 150px 150px;
      animation: scrollPawTemplate_host 15s linear infinite;
      z-index: -1;
      pointer-events: none;
    }

    @keyframes anim_bg_host {
      0% { --hue1: 0deg; --hue2: 300deg; }
      100% { --hue1: 360deg; --hue2: 660deg; }
    }
    @keyframes fallingPaws_host {
        0% { background-position: 0px 0px; }
        100% { background-position: 0px 600px; }
    }
    @keyframes scrollPawTemplate_host {
        0% { background-position: 0px 0px; }
        100% { background-position: 300px 300px; }
    }
    @keyframes rainbowRotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes pawWiggleAbsolute {
      0%, 100% { transform: translate(-50%, -50%) rotate(-5deg) scale(1); }
      50% { transform: translate(-50%, -50%) rotate(5deg) scale(1.05); }
    }
    @keyframes fadeInOut {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; }
    }
    @keyframes spin-yarn {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes clickSparkle {
      0% { opacity: 0; transform: scale(0); }
      50% { opacity: 1; transform: scale(1.2); }
      100% { opacity: 0; transform: scale(0.8); }
    }

    .paw-wrapper {
      position: relative;
      width: 100%;
      max-width: 45rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      z-index: 1;
      box-sizing: border-box;
      transition: opacity 0.5s ease-out, visibility 0s linear 0.5s;
      opacity: 1;
      visibility: visible;
    }
    .paw-wrapper.content-hidden {
      opacity: 0;
      visibility: hidden;
    }

    .rainbow-circle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80vmin;
      height: 80vmin;
      max-width: 90vw;
      max-height: 90vh;
      z-index: -1;
      border-radius: 50%;
      padding: 6px;
      overflow: hidden;
    }
    .rainbow-circle::before {
      content: '';
      display: block;
      position: absolute;
      width: 200%;
      height: 200%;
      top: -50%;
      left: -50%;
      background-image: conic-gradient(from 0deg at 50% 50%, transparent 50%, #fff845, #1cc98c, #24cbde, #57a9f7, #bd52f9, #ebb347);
      animation: rainbowRotate 4s linear infinite;
      z-index: -1;
    }
    .circle-content {
      width: 100%;
      height: 100%;
      background: #fffefa;
      border-radius: 50%;
      position: relative;
      z-index: 1;
      box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.1);
    }

    .container-invisible {
      background: transparent;
      position: relative;
      z-index: 1;
      width: 100%;
      padding: 1rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: auto;
      box-sizing: border-box;
    }

    .title-container {
      position: relative;
      display: block;
      width: 100%;
      z-index: 1;
      margin-bottom: 0;
      text-align: center;
      line-height: 0.9;
    }
    .title-shadow {
      font-family: 'Pacifico', cursive;
      text-shadow: 2px 2px 0px rgba(255, 255, 255, 0.8), 4px 4px 6px rgba(0, 0, 0, 0.1);
      font-size: clamp(3rem, 16vmin, 11rem);
      position: relative;
      z-index: 1;
      margin: 0;
      color: #ea580c;
      display: block;
      word-break: break-word;
      overflow-wrap: break-word;
      hyphens: auto;
    }

    .title-ampersand {
      font-family: 'Pacifico', cursive;
      font-size: clamp(1.8rem, 11vmin, 5.4rem);
      color: #000000;
      position: fixed;
      top: 50%;
      left: 50%;
      transform-origin: center center;
      animation: pawWiggleAbsolute 1.5s ease-in-out infinite;
      z-index: 3;
      pointer-events: none;
      transition: opacity 0.5s ease-out, visibility 0s linear 0.5s;
      opacity: 1;
      visibility: visible;
    }
    .title-ampersand.content-hidden {
      opacity: 0;
      visibility: hidden;
    }

    .animate-paw-wiggle {
      animation: pawWiggleAbsolute 1.5s ease-in-out infinite;
      position: absolute;
      top: 50%;
      left: 50%;
      transform-origin: center center;
      font-size: clamp(15rem, 60vmin, 30rem);
      line-height: 1;
      z-index: 0;
      pointer-events: none;
    }
    .animate-paw-wiggle.paw-1 {
      color: #ffffff;
      text-shadow: 0 0 15px #fb7185, 0 0 25px #fb7185, 0 0 40px #f472b6;
      transform: translate(-50%, -50%) rotate(-10deg) scale(1);
    }
    .animate-paw-wiggle.paw-2 {
      color: #fb7185;
      opacity: 0.5;
      text-shadow: none;
      transform: translate(-50%, -50%) rotate(15deg) scale(0.95);
      animation-delay: 0.3s;
    }

    .fading-click-text {
      font-family: 'Poppins', sans-serif;
      font-size: clamp(1rem, 4vmin, 1.8rem);
      font-weight: 700;
      color: #000000;
      text-transform: uppercase;
      margin-top: 1.5rem;
      animation: fadeInOut 2.5s infinite ease-in-out;
      position: relative;
      z-index: 1;
    }

    .loading-message-container {
      display: none;
      opacity: 0;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 5;
      transition: opacity 0.3s ease-in;
    }
    .loading-message-container.visible {
      display: flex;
      opacity: 1;
    }

    .yarn-spinner {
      width: clamp(25px, 8vmin, 40px);
      height: clamp(25px, 8vmin, 40px);
      border: clamp(3px, 1.5vmin, 6px) dotted #f97316;
      border-radius: 50%;
      display: inline-block;
      animation: spin-yarn 1.3s linear infinite;
      margin-bottom: 0.5rem;
    }
    .loading-text {
      font-family: "Geist", sans-serif;
      font-size: clamp(1rem, 4vmin, 1.5rem);
      font-weight: 600;
      color: #c2410c;
    }

    #sparkle-container-internal {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 2;
      overflow: hidden;
    }
    .sparkle-instance {
      position: absolute;
      width: clamp(25px, 10vmin, 50px);
      height: clamp(25px, 10vmin, 50px);
      opacity: 0;
      transform: scale(0);
      pointer-events: none;
      z-index: inherit;
      transition: none;
      animation: clickSparkle 0.5s ease-out forwards;
    }

    @media (max-width: 480px) {
      .animate-paw-wiggle.paw-2 {
        display: none;
      }
      :host::before {
        background-size: 90px 90px;
        opacity: 0.3;
      }
      :host::after {
        background-size: 100px 100px;
      }
    }
  `;

  protected firstUpdated(changedProperties: Map<string | number | symbol, unknown>): void {
    super.firstUpdated(changedProperties);
    if (this.shadowRoot) {
        this.startSparkleEffect();
    }
    this.ensureFontsLoaded();
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (typeof CSS !== 'undefined' && CSS.registerProperty) {
        try {
            CSS.registerProperty({ name: '--hue1', syntax: '<angle>', initialValue: '0deg', inherits: false });
            CSS.registerProperty({ name: '--hue2', syntax: '<angle>', initialValue: '300deg', inherits: false });
        } catch (e) {
            console.warn(" mainMenuScreen: Error registrando @property CSS:", e);
        }
    }
    this._selectRandomLoadingMessage(); // Seleccionar un mensaje de carga inicial
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.sparkleIntervalId) {
      clearTimeout(this.sparkleIntervalId);
      this.sparkleIntervalId = null;
    }
  }

  private _selectRandomLoadingMessage(): void {
    if (this.loadingMessages && this.loadingMessages.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.loadingMessages.length);
      this._currentLoadingMessage = this.loadingMessages[randomIndex];
    } else {
      this._currentLoadingMessage = "Cargando..."; // Fallback
    }
  }

  private async _handleScreenClick(event: MouseEvent | TouchEvent) {
    if (this.hasStarted) return;
    this.hasStarted = true;

    if (event.type === 'touchstart') {
        event.preventDefault();
    }
    console.log("MainMenuScreen: Click/Tap detectado. Iniciando secuencia de carga...");

    this._selectRandomLoadingMessage(); // Seleccionar nuevo mensaje

    if (this.sparkleIntervalId) {
      clearTimeout(this.sparkleIntervalId);
      this.sparkleIntervalId = null;
    }
    if (this._sparkleContainer) {
        this._sparkleContainer.innerHTML = '';
    }

    if (this._pawWrapper) this._pawWrapper.classList.add('content-hidden');
    if (this._titleAmpersand) this._titleAmpersand.classList.add('content-hidden');

    const contentFadeOutDuration = 500;
    await new Promise(resolve => setTimeout(resolve, contentFadeOutDuration));

    if (this._loadingMessageContainer) {
        this._loadingMessageContainer.classList.add('visible');
    }
    console.log("MainMenuScreen: Contenido principal oculto, mostrando spinner.");

    const artificialLoadDuration = 2500;
    await new Promise(resolve => setTimeout(resolve, artificialLoadDuration));

    console.log("MainMenuScreen: Duración de carga artificial completada. Solicitando inicio del juego.");
    this.dispatchEvent(new CustomEvent('start-game-requested', { bubbles: true, composed: true }));
  }


  private startSparkleEffect(): void {
      const showSparkle = () => {
          if (!this._sparkleContainer || !this._sparkleSvgTemplate) return;
          const sparkleClone = this._sparkleSvgTemplate.cloneNode(true) as SVGElement;
          sparkleClone.removeAttribute('id');
          sparkleClone.style.display = 'block';
          sparkleClone.classList.add('sparkle-instance');
          const hostRect = this.getBoundingClientRect();
          const vw = hostRect.width;
          const vh = hostRect.height;
          const tempSparkle = this._sparkleContainer.appendChild(sparkleClone.cloneNode(true) as SVGElement);
          const sparkleStyle = getComputedStyle(tempSparkle);
          const sparkleWidth = parseFloat(sparkleStyle.width);
          const sparkleHeight = parseFloat(sparkleStyle.height);
          this._sparkleContainer.removeChild(tempSparkle);
          const randomTop = Math.random() * (vh - sparkleHeight);
          const randomLeft = Math.random() * (vw - sparkleWidth);
          sparkleClone.style.position = 'absolute';
          sparkleClone.style.top = `${randomTop}px`;
          sparkleClone.style.left = `${randomLeft}px`;
          this._sparkleContainer.appendChild(sparkleClone);
          setTimeout(() => {
              if (sparkleClone.parentNode === this._sparkleContainer) {
                   this._sparkleContainer.removeChild(sparkleClone);
              }
          }, 500);
      };
      const randomSparkleInterval = () => {
          if (!this.isConnected) return;
          showSparkle();
          const randomDelay = Math.random() * 150 + 50;
          this.sparkleIntervalId = window.setTimeout(randomSparkleInterval, randomDelay);
      };
      if (this.sparkleIntervalId) { clearTimeout(this.sparkleIntervalId); }
      randomSparkleInterval();
  }

  private ensureFontsLoaded() {
    if (document.fonts) {
        Promise.all([
            document.fonts.load('1em Pacifico'),
            document.fonts.load('1em Geist'),
            document.fonts.load('1em Poppins')
        ]).then(() => {}).catch(err => {
            console.warn('MainMenuScreen: Error esperando fuentes:', err);
        });
    }
  }

  render() {
    const sparkleSvgTemplate = svg`
      <svg id="sparkle-svg-template-internal" style="display: none;" width="50px" height="50px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs><style>.cls-sparkle-internal{fill:none;stroke-miterlimit:10; stroke: #fff845; stroke-width: 2px;}</style></defs>
        <line class="cls-sparkle-internal" x1="12" y1="0.5" x2="12" y2="5.29"></line>
        <line class="cls-sparkle-internal" x1="12" y1="18.71" x2="12" y2="23.5"></line>
        <line class="cls-sparkle-internal" x1="23.5" y1="12" x2="18.71" y2="12"></line>
        <line class="cls-sparkle-internal" x1="5.29" y1="12" x2="0.5" y2="12"></line>
        <line class="cls-sparkle-internal" x1="20.13" y1="3.87" x2="16.74" y2="7.26"></line>
        <line class="cls-sparkle-internal" x1="7.26" y1="16.74" x2="3.87" y2="20.13"></line>
        <line class="cls-sparkle-internal" x1="20.13" y1="20.13" x2="16.74" y2="16.74"></line>
        <line class="cls-sparkle-internal" x1="7.26" y1="7.26" x2="3.87" y2="3.87"></line>
      </svg>
    `;

    return html`
      <div class="paw-wrapper" @click=${this._handleScreenClick} @touchstart=${this._handleScreenClick}>
        <div class="rainbow-circle">
          <div class="circle-content"></div>
        </div>
        <div class="container-invisible">
          <div class="title-container">
            <h1 class="title-shadow">Whiskers</h1>
            <h1 class="title-shadow">Wisdom</h1>
            <span class="animate-paw-wiggle paw-1">🐾</span>
            <span class="animate-paw-wiggle paw-2">🐾</span>
          </div>
          <div class="fading-click-text"> &lt;HAZ CLICK O TOCA&gt;</div>
        </div>
        <div id="sparkle-container-internal"></div>
        ${sparkleSvgTemplate}
      </div>

      <div class="loading-message-container">
          <div class="yarn-spinner"></div>
          <span class="loading-text">${this._currentLoadingMessage}</span>
      </div>

      <span class="title-ampersand">&</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'main-menu-screen': MainMenuScreen;
  }
}
