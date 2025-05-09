// src/systems/AudioManager.ts

export class AudioManager {
  private audioCtx: AudioContext | null = null;
  private isInitialized: boolean = false;
  private masterGainNode: GainNode | null = null;
  private isCurrentlyMuted: boolean = false; // <<< AÑADE ESTA PROPIEDAD
  private volumeBeforeMute: number = 1;   // <<< AÑADE ESTA PROPIEDAD

  constructor() {
    console.log('AudioManager Creado (sin inicializar)');
  }

  public init(): void {
    // ... (tu código de init existente)
    if (this.isInitialized) {
      return;
    }
    try {
      this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGainNode = this.audioCtx.createGain();
      this.masterGainNode.connect(this.audioCtx.destination);
      // Restaurar el estado de mute y volumen si ya se había establecido
      this.setVolume(this.masterGainNode.gain.value); // Esto actualizará isCurrentlyMuted si es 0
      if (this.isCurrentlyMuted) {
        this.masterGainNode.gain.setValueAtTime(0.00001, this.audioCtx.currentTime);
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume()
          .then(() => {
            console.log('AudioManager: AudioContext reanudado exitosamente.');
            this.isInitialized = true;
          })
          .catch(e => console.error('AudioManager: Error al reanudar AudioContext:', e));
      } else {
         this.isInitialized = true;
      }
    } catch (e) {
      console.error('AudioManager: Error al crear AudioContext:', e);
      this.audioCtx = null;
      this.masterGainNode = null;
      this.isInitialized = false;
    }
  }

  public playSound(type: string): void {
    // ... (tu código de playSound existente)
    // No necesita cambios para esto
  }

  public setVolume(volume: number): void {
    if (!this.isInitialized || !this.audioCtx || !this.masterGainNode) {
      // Guardar el volumen deseado para aplicarlo después de init si es necesario
      this.volumeBeforeMute = Math.max(0, Math.min(1, volume));
      // Actualizar el estado de mute si el volumen es 0
      this.isCurrentlyMuted = this.volumeBeforeMute <= 0.00001;
      return;
    }
    const clampedVolume = Math.max(0, Math.min(1, volume));
    this.masterGainNode.gain.setValueAtTime(clampedVolume, this.audioCtx.currentTime);
    // Si se establece un volumen > 0 y estaba muteado, quitar el mute
    if (clampedVolume > 0.00001 && this.isCurrentlyMuted) {
        this.isCurrentlyMuted = false;
    } else if (clampedVolume <= 0.00001) { // Si se establece volumen a 0 (o casi), activar mute
        if (!this.isCurrentlyMuted) { // Solo guardar volumeBeforeMute si no estaba ya muteado
             this.volumeBeforeMute = this.getVolume(); // Guarda el volumen real antes de mutear
        }
        this.isCurrentlyMuted = true;
    }
  }

  public getVolume(): number {
    if (!this.isInitialized || !this.masterGainNode) {
      return this.volumeBeforeMute; // Devuelve el último volumen conocido o el inicial si no está listo
    }
    return this.masterGainNode.gain.value;
  }

  /**
   * Activa o desactiva el sonido.
   * @param forceMuteState (Opcional) Un booleano para forzar un estado específico de mute.
   * true para mutear, false para desmutear. Si no se provee, alterna el estado actual.
   */
  public toggleMute(forceMuteState?: boolean): void {
    if (!this.isInitialized || !this.audioCtx || !this.masterGainNode) {
        // Si no está inicializado, solo cambiamos el flag y el volumen se aplicará en init
        if (typeof forceMuteState === 'boolean') {
            this.isCurrentlyMuted = forceMuteState;
        } else {
            this.isCurrentlyMuted = !this.isCurrentlyMuted;
        }
        console.warn(`AudioManager: No inicializado. Estado de mute establecido a ${this.isCurrentlyMuted}. Se aplicará en init.`);
        return;
    }

    const MUTE_VOLUME = 0.00001; // Un valor muy pequeño en lugar de 0 absoluto

    const currentlyIsEffectivelyMuted = this.masterGainNode.gain.value <= MUTE_VOLUME;

    let newMuteState: boolean;
    if (typeof forceMuteState === 'boolean') {
        newMuteState = forceMuteState;
    } else {
        newMuteState = !currentlyIsEffectivelyMuted; // Si está muteado (o casi), el toggle lo desmuteará
    }

    if (newMuteState) { // Si queremos mutear
        if (!currentlyIsEffectivelyMuted) { // Solo guardar si no estaba ya muteado
            this.volumeBeforeMute = this.masterGainNode.gain.value;
        }
        this.masterGainNode.gain.setValueAtTime(MUTE_VOLUME, this.audioCtx.currentTime);
        this.isCurrentlyMuted = true;
    } else { // Si queremos desmutear
        // Restaurar a volumeBeforeMute, asegurando que sea audible si era 0
        const restoreVolume = (this.volumeBeforeMute <= MUTE_VOLUME) ? 0.5 : this.volumeBeforeMute;
        this.masterGainNode.gain.setValueAtTime(restoreVolume, this.audioCtx.currentTime);
        this.isCurrentlyMuted = false;
    }
    console.log(`AudioManager: Mute toggled. Is Muted: ${this.isCurrentlyMuted}, Volume: ${this.masterGainNode.gain.value}, volumeBeforeMute: ${this.volumeBeforeMute}`);
  }

  /**
   * Devuelve el estado actual de mute.
   * @returns {boolean} True si está muteado, false en caso contrario.
   */
  public isMuted(): boolean { // <<< AÑADE ESTE MÉTODO
    if (!this.isInitialized || !this.masterGainNode) {
        return this.isCurrentlyMuted; // Devuelve el estado del flag si no está inicializado
    }
    // Considera muteado si el volumen es muy bajo, además del flag.
    return this.isCurrentlyMuted || this.masterGainNode.gain.value <= 0.00001;
  }

  public isReady(): boolean {
    return this.isInitialized && this.audioCtx !== null && this.audioCtx.state === 'running';
  }
}