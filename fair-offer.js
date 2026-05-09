// Fair-offer calculator — runs on every mower detail page.
// Reads base prices from data-* attributes on the #fair-offer section,
// reads form inputs, computes a walk-away/fair/premium range, updates
// the result panel and verdict banner.
(function () {
  'use strict';
  var sec = document.getElementById('fair-offer');
  if (!sec) return;

  var base = parseFloat(sec.dataset.baseUsed) || 0;
  var rrp = parseFloat(sec.dataset.rrp) || base * 2;

  var $ = function (id) { return document.getElementById(id); };
  var inputs = ['fo-condition', 'fo-age', 'fo-hours', 'fo-service', 'fo-asking'].map($);

  function gbp(n) { return '£' + Math.round(n).toLocaleString('en-GB'); }

  function calc() {
    var cond = parseFloat($('fo-condition').value);
    var age = parseFloat($('fo-age').value);
    var hours = $('fo-hours').value;
    var service = $('fo-service').value;
    var asking = parseFloat($('fo-asking').value) || 0;

    var condMul = ({1: 0.70, 2: 0.85, 3: 1.0, 4: 1.12, 5: 1.22})[cond];
    var ageMul = age <= 5 ? (1.0 + (5 - age) * 0.02) : Math.max(0.6, 1 - (age - 5) * 0.03);
    var hoursMul = ({low: 1.12, med: 1.0, high: 0.82})[hours];
    var serviceMul = ({full: 1.10, partial: 1.0, none: 0.85})[service];

    var center = base * condMul * ageMul * hoursMul * serviceMul;
    var low = center * 0.85;
    var high = center * 1.15;
    var premium = Math.min(center * 1.18, rrp * 0.85);

    $('fo-low').textContent = gbp(low);
    $('fo-fair').textContent = gbp(low) + ' – ' + gbp(high);
    $('fo-high').textContent = gbp(premium);

    var verdict = $('fo-verdict');
    if (asking > 0) {
      var msg, cls;
      if (asking < low) {
        msg = 'Asking ' + gbp(asking) + ' is below our walk-away floor — either a bargain or something is wrong. Inspect carefully.';
        cls = 'fo-v-bargain';
      } else if (asking <= high) {
        msg = 'Asking ' + gbp(asking) + ' falls inside the fair range. Reasonable starting point — knock 10% off as an opening offer.';
        cls = 'fo-v-fair';
      } else if (asking <= premium) {
        msg = 'Asking ' + gbp(asking) + ' is in premium territory — only worth it if condition is genuinely mint and history is documented.';
        cls = 'fo-v-premium';
      } else {
        msg = 'Asking ' + gbp(asking) + ' is above what this mower can fairly fetch given the inputs. Either the seller is optimistic, or you need to ask why.';
        cls = 'fo-v-overpriced';
      }
      verdict.textContent = msg;
      verdict.className = 'fo-verdict ' + cls;
    } else {
      verdict.textContent = 'Add an asking price above to compare it to the fair range.';
      verdict.className = 'fo-verdict';
    }
  }

  inputs.forEach(function (el) {
    if (!el) return;
    el.addEventListener('input', calc);
    el.addEventListener('change', calc);
  });
  calc();
})();
