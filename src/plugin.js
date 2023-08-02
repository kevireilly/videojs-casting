import VJS from 'video.js';
import {version as VERSION} from '../package.json';

const Plugin = VJS.getPlugin('plugin');

const defaults = {
  airplay: {
    enabled: true,
    controlText: 'AirPlay',
    className: 'vjs-casting-airplay',
  }
};

class Casting extends Plugin {
  constructor(player, options) {
    super(player);

    this.options = VJS.obj?.merge(defaults, options) ?? VJS.mergeOptions(defaults, options);

    this.player.ready(() => {
      this.player.addClass('vjs-casting');

      const airPlaySupported = Boolean(window.WebKitPlaybackTargetAvailabilityEvent);
      if (airPlaySupported && this.options.airplay.enabled) {
        this.addAirPlayButton();
      }
    });
  }

  addAirPlayButton() {
    const playerElement = this.player.el();
    const airPlayElement = playerElement.querySelector('.vjs-casting');
    const mediaElement = playerElement.querySelector('video, audio');
    if (airPlayElement || !mediaElement) return;

    const position = this.options.airplay.position ?? this.player.controlBar.children().length;
    const airPlayButton = this.player.controlBar.addChild('button', {
      clickHandler: () => {
        mediaElement?.webkitShowPlaybackTargetPicker();
      },
      ...this.options.airplay
    }, position);

    const handleTargetAvailabilityChanged = ({ availability }) => {
      if (availability === 'available') {
        airPlayButton.show();
      } else {
        airPlayButton.hide();
      }
    }

    mediaElement.addEventListener('webkitplaybacktargetavailabilitychanged', handleTargetAvailabilityChanged);
    this.on('dispose', function() {
      mediaElement.removeEventListener('webkitplaybacktargetavailabilitychanged', handleTargetAvailabilityChanged);
    });
  }
}

Casting.defaultState = {};
Casting.VERSION = VERSION;
VJS.registerPlugin('casting', Casting);

export default Casting;
