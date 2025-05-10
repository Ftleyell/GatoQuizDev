// src/systems/AudioManager.ts

export class AudioManager {
  private audioCtx: AudioContext | null = null;
  private isInitialized: boolean = false;
  private masterGainNode: GainNode | null = null;
  private isCurrentlyMuted: boolean = false;
  private volumeBeforeMute: number = 1; // Valor por defecto si no se ha modificado antes de init

  constructor() {
    console.log('AudioManager Creado (sin inicializar)');
  }

  // Método helper para sincronizar isCurrentlyMuted con el estado real de la ganancia
  private _updateMuteStateBasedOnCurrentGain(): void {
    if (this.masterGainNode) {
        const MUTE_THRESHOLD = 0.00001; // Un valor muy pequeño se considera mudo
        this.isCurrentlyMuted = this.masterGainNode.gain.value <= MUTE_THRESHOLD;
    }
  }

  public init(): void {
    if (this.isInitialized) {
      return;
    }
    try {
      this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGainNode = this.audioCtx.createGain();
      this.masterGainNode.connect(this.audioCtx.destination);

      // --- INICIO DE LA CORRECCIÓN ---
      // Aplicar el estado de volumen y silencio que se haya podido establecer ANTES de init.
      // `this.volumeBeforeMute` guarda la última intención de volumen (por defecto 1).
      // `this.isCurrentlyMuted` guarda la última intención de silencio (por defecto false).

      if (this.isCurrentlyMuted) {
        // Si se marcó como silenciado, aplicar un volumen muy bajo.
        this.masterGainNode.gain.setValueAtTime(0.00001, this.audioCtx.currentTime);
        // `volumeBeforeMute` conserva el valor que tenía antes de silenciar,
        // para poder restaurarlo si se desactiva el silencio.
      } else {
        // Si no estaba marcado como silenciado, aplicar el `volumeBeforeMute`.
        // Si `volumeBeforeMute` era 0 (o cercano), `isCurrentlyMuted` ya debería ser true
        // por la lógica en `setVolume` o `toggleMute` si fueron llamados pre-init.
        this.masterGainNode.gain.setValueAtTime(this.volumeBeforeMute, this.audioCtx.currentTime);
      }
      // Sincronizar el flag `isCurrentlyMuted` con el estado real de la ganancia del nodo
      // después de aplicar los valores almacenados.
      this._updateMuteStateBasedOnCurrentGain();
      // --- FIN DE LA CORRECCIÓN ---

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume()
          .then(() => {
            console.log('AudioManager: AudioContext reanudado exitosamente.');
            this.isInitialized = true;
            this._updateMuteStateBasedOnCurrentGain(); // Re-verificar estado de mute tras reanudar
          })
          .catch(e => {
              console.error('AudioManager: Error al reanudar AudioContext:', e);
              this.isInitialized = false; // Asegurar que isInitialized sea false en caso de error
          });
      } else if (this.audioCtx.state === 'running') {
         this.isInitialized = true;
      } else {
          console.warn('AudioManager: AudioContext state no es "suspended" ni "running", es:', this.audioCtx.state);
          this.isInitialized = false; // Estado potencialmente problemático
      }
    } catch (e) {
      console.error('AudioManager: Error al crear AudioContext:', e);
      this.audioCtx = null;
      this.masterGainNode = null;
      this.isInitialized = false;
    }
  }

  public playSound(type: string): void {
    if (!this.isReady()) {
      console.warn(`AudioManager: Not ready to play sound '${type}'. State: ${this.audioCtx?.state}, Initialized: ${this.isInitialized}`);
      return;
    }
    if (!this.audioCtx || !this.masterGainNode) return;

    // Aquí iría tu lógica actual para crear y reproducir sonidos (osciladores, buffers, etc.)
    // Por ejemplo, un simple beep para demostración:
    try {
        const oscillator = this.audioCtx.createOscillator();
        const gainNode = this.audioCtx.createGain(); // Control de volumen individual para este sonido

        oscillator.connect(gainNode);
        gainNode.connect(this.masterGainNode); // Conectar al masterGainNode para el volumen global

        // Configuración básica del sonido (esto debería venir de assets o configuraciones)
        switch (type) {
            case 'correct':
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(660, this.audioCtx.currentTime); // A5
                gainNode.gain.setValueAtTime(0.3, this.audioCtx.currentTime); // Volumen del beep
                gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.3);
                oscillator.start(this.audioCtx.currentTime);
                oscillator.stop(this.audioCtx.currentTime + 0.3);
                break;
            case 'incorrect':
                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(220, this.audioCtx.currentTime); // A3
                gainNode.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.4);
                oscillator.start(this.audioCtx.currentTime);
                oscillator.stop(this.audioCtx.currentTime + 0.4);
                break;
            case 'ui_confirm':
            case 'purchase':
                oscillator.type = 'triangle';
                oscillator.frequency.setValueAtTime(880, this.audioCtx.currentTime); // A5
                gainNode.gain.setValueAtTime(0.25, this.audioCtx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.2);
                oscillator.start(this.audioCtx.currentTime);
                oscillator.stop(this.audioCtx.currentTime + 0.2);
                break;
            // Añade más casos para 'ui_cancel', 'draw_start', 'eat', etc.
            default:
                // console.warn(`AudioManager: Tipo de sonido '${type}' no reconocido.`);
                return; // No reproducir si el tipo no es conocido
        }
         oscillator.onended = () => {
            gainNode.disconnect();
            oscillator.disconnect();
        };
    } catch (error) {
        console.error(`AudioManager: Error al intentar reproducir sonido '${type}':`, error);
    }
  }

  public setVolume(volume: number): void {
    const clampedVolume = Math.max(0, Math.min(1, volume));

    if (!this.isInitialized || !this.audioCtx || !this.masterGainNode) {
      // Si no está inicializado, solo almacenamos la intención.
      this.volumeBeforeMute = clampedVolume;
      this.isCurrentlyMuted = clampedVolume <= 0.00001;
      // console.log(`AudioManager (pre-init): Volume set to ${clampedVolume}. Muted: ${this.isCurrentlyMuted}. volumeBeforeMute now: ${this.volumeBeforeMute}`);
      return;
    }

    this.masterGainNode.gain.setValueAtTime(clampedVolume, this.audioCtx.currentTime);

    // Si se establece un volumen > 0 y estaba explícitamente muteado por el flag,
    // se considera que el usuario quiere oír sonido, así que se desmutea.
    if (clampedVolume > 0.00001 && this.isCurrentlyMuted) {
        this.isCurrentlyMuted = false;
        // `volumeBeforeMute` ya debería tener el valor correcto de antes de mutear.
    } else if (clampedVolume <= 0.00001) {
        // Si se establece volumen a 0 (o casi), activar mute.
        // Solo actualizar volumeBeforeMute si no estábamos ya en un estado de mute "activo".
        if (!this.isCurrentlyMuted) {
             // Esto es un poco problemático: getVolume() devolvería el nuevo valor (0).
             // Lo ideal es que volumeBeforeMute se establezca ANTES de que el gain llegue a 0
             // si el mute se hace explícitamente con toggleMute().
             // Si se llega a 0 DESDE el slider, volumeBeforeMute no debería ser 0.
             // Esta parte es manejada mejor por toggleMute().
        }
        this.isCurrentlyMuted = true;
    }
    // console.log(`AudioManager: Volume set to ${this.masterGainNode.gain.value}. Muted flag: ${this.isCurrentlyMuted}`);
  }

  public getVolume(): number {
    if (!this.isInitialized || !this.masterGainNode) {
      return this.volumeBeforeMute;
    }
    return this.masterGainNode.gain.value;
  }

  public toggleMute(forceMuteState?: boolean): void {
    if (!this.isInitialized || !this.audioCtx || !this.masterGainNode) {
        if (typeof forceMuteState === 'boolean') {
            this.isCurrentlyMuted = forceMuteState;
            if (this.isCurrentlyMuted && this.volumeBeforeMute <= 0.00001) {
                // Si forzamos mute y el volumen pre-mute era 0, establecemos un volumen de restauración por defecto
                 this.volumeBeforeMute = 0.5; 
            } else if (!this.isCurrentlyMuted && this.volumeBeforeMute <= 0.00001) {
                // Si forzamos desmutear y el volumen era 0, lo restauramos a un valor por defecto
                this.volumeBeforeMute = 0.5; 
            }

        } else {
            this.isCurrentlyMuted = !this.isCurrentlyMuted;
            if (this.isCurrentlyMuted && this.volumeBeforeMute <= 0.00001) this.volumeBeforeMute = 0.5;
        }
        // console.warn(`AudioManager (pre-init): Mute toggled. Muted: ${this.isCurrentlyMuted}. volumeBeforeMute: ${this.volumeBeforeMute}`);
        return;
    }

    const MUTE_VOLUME_THRESHOLD = 0.00001;
    const currentActualVolume = this.masterGainNode.gain.value;
    const isEffectivelyMutedNow = currentActualVolume <= MUTE_VOLUME_THRESHOLD;

    let setNewMuteState: boolean;
    if (typeof forceMuteState === 'boolean') {
        setNewMuteState = forceMuteState;
    } else {
        setNewMuteState = !isEffectivelyMutedNow; // Si está sonando, el toggle lo muteará. Si está mudo, lo desmuteará.
    }

    if (setNewMuteState) { // Queremos mutear
        if (!isEffectivelyMutedNow) { // Solo guardar si no estaba ya muteado/volumen muy bajo
            this.volumeBeforeMute = currentActualVolume;
        } else if (this.volumeBeforeMute <= MUTE_VOLUME_THRESHOLD) {
            // Si ya estaba en volumen cero y se vuelve a mutear, asegurar que volumeBeforeMute tenga un valor audible para restaurar
            this.volumeBeforeMute = 0.5; // O un valor por defecto guardado
        }
        this.masterGainNode.gain.setValueAtTime(MUTE_VOLUME_THRESHOLD, this.audioCtx.currentTime);
        this.isCurrentlyMuted = true;
    } else { // Queremos desmutear
        // Restaurar a volumeBeforeMute, asegurando que sea audible si era 0 o muy bajo
        const restoreVolume = (this.volumeBeforeMute <= MUTE_VOLUME_THRESHOLD) ? 0.5 : this.volumeBeforeMute;
        this.masterGainNode.gain.setValueAtTime(restoreVolume, this.audioCtx.currentTime);
        this.isCurrentlyMuted = false;
    }
    // console.log(`AudioManager: Mute toggled. Is Muted: ${this.isCurrentlyMuted}, Actual Gain: ${this.masterGainNode.gain.value.toFixed(5)}, volumeBeforeMute: ${this.volumeBeforeMute.toFixed(2)}`);
  }

  public async tryResumeContext(): Promise<void> {
        const audioContext = this.audioCtx; // Access the property directly
        if (audioContext && audioContext.state === 'suspended') {
            try {
                await audioContext.resume();
                console.log('AudioManager: AudioContext resumed successfully.');
            } catch (error) {
                console.error('AudioManager: Failed to resume AudioContext:', error);
            }
        }
    }

  public isMuted(): boolean {
    if (!this.isInitialized || !this.masterGainNode) {
        return this.isCurrentlyMuted;
    }
    // Considera muteado si el flag está activo O si el volumen es efectivamente cero.
    return this.isCurrentlyMuted || this.masterGainNode.gain.value <= 0.00001;
  }

  public isReady(): boolean {
    return this.isInitialized && this.audioCtx !== null && this.audioCtx.state === 'running';
  }
}


