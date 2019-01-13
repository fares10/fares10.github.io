'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

var TextScramble = function () {
  function TextScramble(el) {
    _classCallCheck(this, TextScramble);

    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }

  TextScramble.prototype.setText = function setText(newText) {
    var _this = this;

    var oldText = this.el.innerText;
    var length = Math.max(oldText.length, newText.length);
    var promise = new Promise(function (resolve) {
      return _this.resolve = resolve;
    });
    this.queue = [];
    for (var i = 0; i < length; i++) {
      var from = oldText[i] || '';
      var to = newText[i] || '';
      var start = Math.floor(Math.random() * 40);
      var end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from: from, to: to, start: start, end: end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  };

  TextScramble.prototype.update = function update() {
    var output = '';
    var complete = 0;
    for (var i = 0, n = this.queue.length; i < n; i++) {
      var _queue$i = this.queue[i];
      var from = _queue$i.from;
      var to = _queue$i.to;
      var start = _queue$i.start;
      var end = _queue$i.end;
      var char = _queue$i.char;

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += '<span class="dud">' + char + '</span>';
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  };

  TextScramble.prototype.randomChar = function randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  };

  return TextScramble;
}();

// —————————————————————————————————————————————————
// Example
// —————————————————————————————————————————————————


var el = document.querySelector('.scrambled');
var fx = new TextScramble(el);
var ot = el.title;
var nt = el.innerHTML;

var next = function next() {
  fx.setText(nt).then(function () {
    setTimeout(next, 18000);
  });
  el.p = nt;
  el.innerHTML = ot;
  nt = [ot, ot = nt][0]; // swap title and text
};

next();


// ——————————————————————————————————————————————————
// The Audio.
// ——————————————————————————————————————————————————

function pauseMusic(){

  var audioPlayer = document.getElementById('audio-player');
  var audioContainer = $('#music-container');

  audioPlayer.pause();
  audioContainer.addClass("music-player--disabled");

  console.log("pause music");
}

function playMusic(){

  var audioPlayer = document.getElementById('audio-player');
  var audioContainer = $('#music-container');

  audioPlayer.play();
  audioContainer.removeClass("music-player--disabled");

  console.log("play music");
}

// ——————————————————————————————————————————————————
// Secen Story Modal.
// ——————————————————————————————————————————————————

$(function () {
  
  $('.md-trigger').on('click', function() {
    $('.md-modal').addClass('md-show');
  });
  
  $('.md-close').on('click', function() {
    $('.md-modal').removeClass('md-show');
  });
  
});

