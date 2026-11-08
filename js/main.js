// ===== Конструктор персонажа «Суперкрошки» =====
// Базовые обработчики для кнопок выбора

(function () {
  'use strict';

  // Цвета для опций
  const COLORS = {
    dress: {
      green:  { fill: '#4CAF50', belt: '#388E3C', skirt: '#388E3C' },
      pink:   { fill: '#FF6B9D', belt: '#E91E8C', skirt: '#E91E8C' },
      blue:   { fill: '#42A5F5', belt: '#1976D2', skirt: '#1976D2' },
      purple: { fill: '#AB47BC', belt: '#8E24AA', skirt: '#8E24AA' }
    },
    hair: {
      black:  '#2D2D2D',
      brown:  '#5D4037',
      blonde: '#F9A825',
      red:    '#C62828'
    },
    eyes: {
      green:  '#4CAF50',
      blue:   '#42A5F5',
      brown:  '#5D4037',
      violet: '#7E57C2'
    }
  };

  // ===== Выбор цвета =====
  document.querySelectorAll('.swatch').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var option = this.getAttribute('data-option');
      var value  = this.getAttribute('data-value');

      // Активный класс
      var siblings = this.parentElement.querySelectorAll('.swatch');
      for (var i = 0; i < siblings.length; i++) {
        siblings[i].classList.remove('active');
      }
      this.classList.add('active');

      // Применяем
      applyColor(option, value);
    });
  });

  // ===== Выбор стиля =====
  document.querySelectorAll('.style-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var value = this.getAttribute('data-value');

      // Активный класс
      var siblings = this.parentElement.querySelectorAll('.style-btn');
      for (var i = 0; i < siblings.length; i++) {
        siblings[i].classList.remove('active');
      }
      this.classList.add('active');

      // Переключаем группу причёски
      var hairBacks = document.querySelectorAll('.hair-back');
      for (var j = 0; j < hairBacks.length; j++) {
        hairBacks[j].style.display = 'none';
      }
      var target = document.querySelector('.hair-back[data-style="' + value + '"]');
      if (target) {
        target.style.display = '';
      }
    });
  });

  // ===== Применение цвета к элементу =====
  function applyColor(option, value) {
    if (option === 'dress') {
      var c = COLORS.dress[value];
      var dress = document.querySelector('.dress path:first-child');
      var belt  = document.querySelector('.dress rect');
      var skirt = document.querySelector('.dress path:last-child');
      if (dress) dress.setAttribute('fill', c.fill);
      if (belt)  belt.setAttribute('fill', c.belt);
      if (skirt) skirt.setAttribute('stroke', c.skirt);
    }

    if (option === 'hair') {
      var hairColor = COLORS.hair[value];
      var hairFront = document.querySelector('.hair-front');
      var hairBacks = document.querySelectorAll('.hair-back');
      if (hairFront) hairFront.setAttribute('data-color', hairColor);
      for (var i = 0; i < hairBacks.length; i++) {
        hairBacks[i].setAttribute('data-color', hairColor);
      }
      // Перекрашиваем SVG-элементы
      recolorHair(hairColor);
    }

    if (option === 'eyes') {
      var eyeColor = COLORS.eyes[value];
      var eyeFill = document.querySelectorAll('.eyes circle:nth-child(2), .eyes circle:nth-child(5)');
      for (var j = 0; j < eyeFill.length; j++) {
        eyeFill[j].setAttribute('fill', eyeColor);
      }
    }
  }

  // Перекраска волос (заполняет circle и path с fill/stroke)
  function recolorHair(color) {
    var hairBacks = document.querySelectorAll('.hair-back');
    for (var i = 0; i < hairBacks.length; i++) {
      var circles = hairBacks[i].querySelectorAll('circle');
      var paths   = hairBacks[i].querySelectorAll('path');
      for (var j = 0; j < circles.length; j++) {
        circles[j].setAttribute('fill', color);
      }
      for (var k = 0; k < paths.length; k++) {
        if (paths[k].getAttribute('stroke-linecap') === 'round') {
          paths[k].setAttribute('stroke', color);
        }
      }
    }
    var hairFront = document.querySelector('.hair-front');
    if (hairFront) {
      var paths = hairFront.querySelectorAll('path');
      for (var m = 0; m < paths.length; m++) {
        paths[m].setAttribute('fill', color);
      }
    }
  }

})();
