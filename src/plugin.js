import VJS from 'video.js';
import {version as VERSION} from '../package.json';

const Plugin = VJS.getPlugin('plugin');

const defaults = {
  airplay: {
    enabled: true,
    controlText: 'AirPlay',
    className: 'vjs-casting-airplay',
    icon: `
      <svg fill="#FFFFFF" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs><path d="M0 0h24v24H0V0z" id="a"/></defs>
        <defs><path d="M0 0h24v24H0V0z" id="c"/></defs>
        <clipPath id="b"><use overflow="visible" xlink:href="#a"/></clipPath>
        <clipPath clip-path="url(#b)" id="d"><use overflow="visible" xlink:href="#c"/></clipPath>
        <path clip-path="url(#d)" d="M6 22h12l-6-6zM21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v-2H3V5h18v12h-4v2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
      </svg>
    `,
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
    const airPlayButton = this.player.controlBar.addChild('button', this.options.airplay, position);
    airPlayButton.addClass(this.options.airplay.className);
    airPlayButton.on('click', () => { mediaElement?.webkitShowPlaybackTargetPicker(); });
    airPlayButton.el().querySelector('.vjs-icon-placeholder').innerHTML = this.options.airplay.icon;

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
