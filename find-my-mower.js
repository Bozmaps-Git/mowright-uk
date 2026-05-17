(() => {
  const mowers = window.__MOWERS_FOR_QUIZ || [];
  const form = document.getElementById('fmm-form');
  const resultsEl = document.getElementById('fmm-results');
  const cardsEl = document.getElementById('fmm-cards');
  const summaryEl = document.getElementById('fmm-summary');
  const restartBtn = document.getElementById('fmm-restart');
  if (!form || !resultsEl || !cardsEl) return;

  const answers = {};

  const sizeBucket = {
    small: { label: 'small (under 300 m²)', lawnSizes: ['Small'] },
    medium: { label: 'medium (300–800 m²)', lawnSizes: ['Small', 'Medium'] },
    large: { label: 'large (800–1,500 m²)', lawnSizes: ['Medium', 'Large'] },
    xlarge: { label: 'very large (1,500 m²+)', lawnSizes: ['Large'] }
  };

  function priceFor(m, condition) {
    if (condition === 'used') return m.usedAvg || m.buyNow || m.rrp || 0;
    if (condition === 'new') return m.buyNow || m.rrp || 0;
    return Math.min(m.buyNow || Infinity, m.usedAvg || Infinity) || (m.rrp || 0);
  }

  function score(m, a) {
    let s = 0;

    const sizeCfg = sizeBucket[a.size];
    if (sizeCfg && sizeCfg.lawnSizes.includes(m.lawnSize)) s += 30;
    else if (a.size === 'xlarge' && m.lawnSize === 'Large') s += 25;
    else if (a.size === 'small' && m.lawnSize === 'Small') s += 30;

    if (a.terrain === 'sloped') {
      if (m.type === 'Robotic' || m.selfPropelled) s += 14;
      if (m.type === 'Ride-on') s += 5;
      if (m.weight && m.weight > 35) s -= 10;
    }
    if (a.terrain === 'rough') {
      if (m.type === 'Petrol' || m.type === 'Ride-on') s += 14;
      if (m.type === 'Electric' || m.type === 'Hover') s -= 6;
    }
    if (a.terrain === 'undulating' && (m.type === 'Cordless' || m.selfPropelled)) s += 6;
    if (a.terrain === 'flat' && m.type === 'Robotic') s += 6;

    const target = parseInt(a.budget, 10);
    const price = priceFor(m, a.condition);
    if (price <= 0) s -= 5;
    else if (price <= target) s += 14;
    else if (price <= target * 1.15) s += 6;
    else if (price <= target * 1.4) s += 0;
    else s -= 15;

    if (a.priority === 'quiet') {
      if (m.noiseDb <= 65) s += 16;
      else if (m.noiseDb <= 78) s += 6;
      else if (m.noiseDb >= 90) s -= 10;
    }
    if (a.priority === 'lowmaint') {
      if (m.type === 'Cordless' || m.type === 'Electric' || m.type === 'Robotic') s += 14;
      if (m.type === 'Petrol' || m.type === 'Ride-on') s -= 6;
    }
    if (a.priority === 'stripes') {
      if (m.roller) s += 18;
      else s -= 4;
    }
    if (a.priority === 'effort') {
      if (m.type === 'Robotic') s += 20;
      else if (m.selfPropelled) s += 10;
    }
    if (a.priority === 'power') {
      if (m.type === 'Petrol' || m.type === 'Ride-on') s += 14;
    }
    if (a.priority === 'value') {
      s += (m.valueScore || 0) * 1.8;
    }

    if (a.power && a.power !== 'any') {
      const powerMap = {
        petrol: 'Petrol', cordless: 'Cordless', electric: 'Electric',
        robotic: 'Robotic', rideon: 'Ride-on'
      };
      if (m.type === powerMap[a.power]) s += 14;
      else s -= 8;
    }

    s += (m.valueScore || 0) * 0.8;
    s += (m.rating || 0) * 1.2;

    return s;
  }

  function render() {
    const ranked = mowers
      .map(m => ({ m, s: score(m, answers) }))
      .sort((a, b) => b.s - a.s)
      .slice(0, 3);

    const sizeCfg = sizeBucket[answers.size];
    const sizeLabel = sizeCfg ? sizeCfg.label : 'your';
    const priorityLabel = {
      quiet: 'a quiet, neighbour-friendly mow',
      lowmaint: 'low maintenance',
      stripes: 'a striped lawn-show finish',
      effort: 'minimum effort on your part',
      power: 'raw power for rough or long grass',
      value: 'best value per pound'
    }[answers.priority] || 'your priorities';

    summaryEl.textContent =
      'Based on your ' + sizeLabel + ' lawn, ' + priorityLabel +
      ', and a £' + Number(answers.budget).toLocaleString('en-GB') + '-ish budget' +
      (answers.condition === 'used' ? ' (used only)' : answers.condition === 'new' ? ' (new only)' : '') +
      ', these are your top three matches from the MowRight catalogue.';

    cardsEl.innerHTML = ranked.map((r, i) => {
      const m = r.m;
      const usedTxt = m.usedAvg ? ('£' + m.usedAvg + ' used') : '';
      const newTxt = m.buyNow ? ('£' + m.buyNow + ' new') : '';
      const tags = ['#' + (i + 1) + ' match'];
      if (i === 0) tags.push('Best fit');
      const badgeClass = 't-' + (m.typeSlug || '').replace('-', '');
      return [
        '<a class="feat-card" href="/mower/' + m.id + '">',
          '<div class="feat-art" style="background:var(--accent-soft)">',
            '<span class="feat-badge ' + badgeClass + '">' + m.type + '</span>',
          '</div>',
          '<div class="feat-body">',
            '<div class="fmm-match-badge">' + tags.join(' · ') + '</div>',
            '<div class="feat-brand">' + m.brand + '</div>',
            '<h3>' + m.model + '</h3>',
            '<p>' + (m.tagline || '') + '</p>',
            '<div class="feat-stats">',
              (m.rating ? '<span>★ ' + m.rating + '</span>' : ''),
              (newTxt ? '<span class="dot">·</span><span>' + newTxt + '</span>' : ''),
              (usedTxt ? '<span class="dot">·</span><span class="accent">' + usedTxt + '</span>' : ''),
            '</div>',
          '</div>',
        '</a>'
      ].join('');
    }).join('');

    resultsEl.hidden = false;
    resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  form.addEventListener('click', e => {
    const btn = e.target.closest('button[data-v]');
    if (!btn) return;
    e.preventDefault();
    const group = btn.closest('.fmm-opts');
    if (!group) return;
    const name = group.dataset.name;
    answers[name] = btn.dataset.v;
    group.querySelectorAll('button[data-v]').forEach(b => {
      b.dataset.selected = b === btn ? 'true' : 'false';
    });

    if (answers.size && answers.terrain && answers.budget && answers.priority && answers.condition && answers.power) {
      render();
    }
  });

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      Object.keys(answers).forEach(k => delete answers[k]);
      form.querySelectorAll('button[data-v]').forEach(b => { b.dataset.selected = 'false'; });
      resultsEl.hidden = true;
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
})();
