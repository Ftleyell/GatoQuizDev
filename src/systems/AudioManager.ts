// src/systems/AudioManager.ts

/**
 * AudioManager: Gestiona la inicialización y reproducción de efectos de sonido
 * utilizando la Web Audio API de forma procedural.
 */
export class AudioManager {
  private audioCtx: AudioContext | null = null;
  private isInitialized: boolean = false;
  private masterGainNode: GainNode | null = null;

  constructor() {
    console.log('AudioManager Creado (sin inicializar)');
  }

  /**
   * Inicializa el AudioContext. Debe ser llamado después de una interacción del usuario.
   */
  public init(): void {
    if (this.isInitialized) {
      // console.log('AudioManager: Ya inicializado.'); // Menos verboso
      return;
    }

    try {
      // console.log('AudioManager: Intentando inicializar AudioContext...'); // Menos verboso
      this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

      this.masterGainNode = this.audioCtx.createGain();
      this.masterGainNode.connect(this.audioCtx.destination);
      // console.log('AudioManager: Master Gain Node creado y conectado.'); // Menos verboso

      if (this.audioCtx.state === 'suspended') {
        // console.log('AudioManager: AudioContext suspendido, intentando reanudar...'); // Menos verboso
        this.audioCtx.resume()
          .then(() => {
            console.log('AudioManager: AudioContext reanudado exitosamente.');
            this.isInitialized = true;
          })
          .catch(e => console.error('AudioManager: Error al reanudar AudioContext:', e));
      } else {
         // console.log(`AudioManager: AudioContext inicializado en estado: ${this.audioCtx.state}`); // Menos verboso
         this.isInitialized = true;
      }

    } catch (e) {
      console.error('AudioManager: Error al crear AudioContext:', e);
      this.audioCtx = null;
      this.masterGainNode = null;
      this.isInitialized = false;
    }
  }

  /**
   * Reproduce un sonido procedural basado en su tipo.
   * @param type - El identificador del tipo de sonido (ej: 'correct', 'incorrect').
   */
  public playSound(type: string): void {
    if (!this.isInitialized || !this.audioCtx || !this.masterGainNode) {
       // console.warn(`AudioManager: No inicializado o sin contexto/gain. No se puede reproducir sonido '${type}'. Llama a init() primero tras interacción del usuario.`);
       // Intentar inicializar si no lo está (puede fallar si no es por interacción directa)
       if (!this.isInitialized) this.init();
       // Volver a verificar después del intento de init
       if (!this.isInitialized || !this.audioCtx || !this.masterGainNode) return;
    }

    if (this.audioCtx.state !== 'running') {
        // console.warn(`AudioManager: AudioContext no está corriendo (estado: ${this.audioCtx.state}). No se puede reproducir sonido '${type}'.`);
        // Intentar reanudar si está suspendido
        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume().catch(e => console.error("Error reanudando AudioContext en playSound:", e));
        }
        return; // Salir si no está corriendo (o suspendido y falló el resume)
    }

    try {
      const oscillator = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(this.masterGainNode);
      const now = this.audioCtx.currentTime;

      // Función interna para la limpieza común
      const setupCleanup = (osc: OscillatorNode, gain: GainNode, filter?: BiquadFilterNode) => {
          osc.onended = () => {
              try {
                  if (osc.numberOfOutputs > 0) osc.disconnect();
                  if (filter && filter.numberOfOutputs > 0) filter.disconnect();
                  if (gain.numberOfOutputs > 0) gain.disconnect();
              } catch (e) { /* Ignore cleanup errors */ }
          };
      };

      switch (type) {
        case 'correct':
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(440, now);
          gainNode.gain.setValueAtTime(0.001, now);
          gainNode.gain.exponentialRampToValueAtTime(0.4, now + 0.05);
          oscillator.frequency.exponentialRampToValueAtTime(880, now + 0.15);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
          setupCleanup(oscillator, gainNode);
          oscillator.start(now);
          oscillator.stop(now + 0.35);
          break;

        case 'incorrect':
          oscillator.type = 'square';
          oscillator.frequency.setValueAtTime(110, now);
          gainNode.gain.setValueAtTime(0.001, now);
          gainNode.gain.exponentialRampToValueAtTime(0.3, now + 0.02);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
          setupCleanup(oscillator, gainNode);
          oscillator.start(now);
          oscillator.stop(now + 0.25);
          break;

        case 'eat':
          oscillator.type = 'sawtooth';
          oscillator.frequency.setValueAtTime(150, now);
          gainNode.gain.setValueAtTime(0.001, now);
          gainNode.gain.exponentialRampToValueAtTime(0.15, now + 0.03);
          oscillator.frequency.exponentialRampToValueAtTime(50, now + 0.1);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
          setupCleanup(oscillator, gainNode);
          oscillator.start(now);
          oscillator.stop(now + 0.2);
          break;

        case 'draw_start':
          oscillator.type = 'triangle';
          oscillator.frequency.setValueAtTime(330, now);
          gainNode.gain.setValueAtTime(0.001, now);
          gainNode.gain.exponentialRampToValueAtTime(0.1, now + 0.02);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
          setupCleanup(oscillator, gainNode);
          oscillator.start(now);
          oscillator.stop(now + 0.15);
          break;

        case 'draw_end':
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(220, now);
          gainNode.gain.setValueAtTime(0.001, now);
          gainNode.gain.exponentialRampToValueAtTime(0.15, now + 0.03);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
          setupCleanup(oscillator, gainNode);
          oscillator.start(now);
          oscillator.stop(now + 0.2);
          break;

        case 'clear_ink':
          oscillator.type = 'sawtooth';
          oscillator.frequency.setValueAtTime(800, now);
          gainNode.gain.setValueAtTime(0.001, now);
          gainNode.gain.exponentialRampToValueAtTime(0.2, now + 0.05);
          oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.2);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
          setupCleanup(oscillator, gainNode);
          oscillator.start(now);
          oscillator.stop(now + 0.35);
          break;

        case 'game_over':
          oscillator.type = 'square';
          oscillator.frequency.setValueAtTime(220, now);
          gainNode.gain.setValueAtTime(0.001, now);
          gainNode.gain.exponentialRampToValueAtTime(0.3, now + 0.05);
          oscillator.frequency.exponentialRampToValueAtTime(110, now + 0.15);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
          setupCleanup(oscillator, gainNode);
          oscillator.start(now);
          oscillator.stop(now + 0.45);
          break;

        case 'purchase':
          oscillator.type = 'triangle';
          oscillator.frequency.setValueAtTime(660, now);
          gainNode.gain.setValueAtTime(0.001, now);
          gainNode.gain.exponentialRampToValueAtTime(0.3, now + 0.03);
          oscillator.frequency.exponentialRampToValueAtTime(1320, now + 0.1);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
          setupCleanup(oscillator, gainNode);
          oscillator.start(now);
          oscillator.stop(now + 0.25);
          break;

        case 'shield_break':
            oscillator.type = "sawtooth"; // O 'noise'
            const bandpass = this.audioCtx.createBiquadFilter();
            bandpass.type = 'bandpass';
            bandpass.frequency.setValueAtTime(1500, now);
            bandpass.Q.setValueAtTime(15, now);
            oscillator.connect(bandpass);
            bandpass.connect(gainNode);
            gainNode.gain.setValueAtTime(0.001, now);
            gainNode.gain.exponentialRampToValueAtTime(0.5, now + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
            setupCleanup(oscillator, gainNode, bandpass);
            oscillator.start(now);
            oscillator.stop(now + 0.3);
            break;

        case 'hint_used':
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(900, now);
            gainNode.gain.setValueAtTime(0.001, now);
            gainNode.gain.exponentialRampToValueAtTime(0.1, now + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
            setupCleanup(oscillator, gainNode);
            oscillator.start(now);
            oscillator.stop(now + 0.15);
            break;

        // *** NUEVO CASO PARA EL CLIC DEL MENÚ ***
        case 'ui_confirm': // O 'start_game', 'menu_click', etc.
          oscillator.type = 'sine'; // Sonido suave
          oscillator.frequency.setValueAtTime(523.25, now); // Nota C5
          gainNode.gain.setValueAtTime(0.001, now);
          gainNode.gain.exponentialRampToValueAtTime(0.25, now + 0.02); // Ataque rápido
          oscillator.frequency.linearRampToValueAtTime(659.25, now + 0.05); // Subida a E5
          gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.15); // Caída rápida
          setupCleanup(oscillator, gainNode);
          oscillator.start(now);
          oscillator.stop(now + 0.2); // Duración corta
          break;
        // *** FIN NUEVO CASO ***

        default:
          console.warn(`AudioManager: Tipo de sonido desconocido: '${type}'`);
          return; // Salir temprano si el tipo no es conocido
      }

    } catch (error) {
      console.error(`AudioManager: Error al reproducir sonido '${type}':`, error);
    }
  }

  /**
   * Establece el volumen maestro.
   * @param volume - Nivel de volumen entre 0 (silencio) y 1 (máximo).
   */
  public setVolume(volume: number): void {
    if (!this.isInitialized || !this.audioCtx || !this.masterGainNode) {
      // console.warn('AudioManager: No inicializado. No se puede establecer volumen.');
      return;
    }
    const clampedVolume = Math.max(0, Math.min(1, volume));
    this.masterGainNode.gain.setValueAtTime(clampedVolume, this.audioCtx.currentTime);
    // console.log(`AudioManager: Volumen maestro establecido a ${clampedVolume}`); // Menos verboso
  }

  /**
   * Obtiene el volumen maestro actual.
   * @returns El nivel de volumen actual (0-1) o 0 si no está inicializado.
   */
  public getVolume(): number {
    if (!this.isInitialized || !this.masterGainNode) {
      return 0;
    }
    return this.masterGainNode.gain.value;
  }

   /**
   * Devuelve si el AudioManager ha sido inicializado por el usuario y está listo.
   */
   public isReady(): boolean {
    return this.isInitialized && this.audioCtx !== null && this.audioCtx.state === 'running';
  }
}
