/* NEBULA · lógica pura (sem DOM), compartilhada pela página e pelos testes.
   Carregada no navegador como window.NebulaCore e no Node via require(). */
(function (root, factory) {
  const m = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = m;
  else root.NebulaCore = m;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const LIMITS = { inhale: [1.5, 12], exhale: [1.5, 16] };
  const DURATIONS = [1, 3, 5, 10, 15];

  /* Valores iniciais sugeridos. Todos são ajustáveis; nenhum tem retenção do ar. */
  const PRACTICES = {
    diafragmatica: { inhale: 4, exhale: 5, minutes: 5 },
    prolongada:    { inhale: 4, exhale: 6, minutes: 5 },
    lenta:         { inhale: 5, exhale: 5, minutes: 5 },
    tensao:        { inhale: 3, exhale: 5, minutes: 1 },
    livre:         { inhale: 4, exhale: 6, minutes: 3 }
  };

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const round1 = v => Math.round(v * 10) / 10;

  function sanitizeRhythm(inhale, exhale) {
    const i = Number(inhale), e = Number(exhale);
    return {
      inhale: round1(clamp(isFinite(i) ? i : 4, LIMITS.inhale[0], LIMITS.inhale[1])),
      exhale: round1(clamp(isFinite(e) ? e : 6, LIMITS.exhale[0], LIMITS.exhale[1]))
    };
  }

  /* Fase do ciclo no tempo t (segundos de prática efetiva, sem pausas). */
  function phaseAt(t, inhale, exhale) {
    const c = inhale + exhale;
    const tt = Math.max(0, t);
    const cycle = Math.floor(tt / c);
    const r = tt - cycle * c;
    if (r < inhale) return { phase: 'in', p: r / inhale, cycle, remaining: inhale - r };
    return { phase: 'out', p: (r - inhale) / exhale, cycle, remaining: c - r };
  }

  /* Tamanho da nebulosa de 0 (contraída) a 1 (expandida), com suavização senoidal. */
  function breathLevel(ph) {
    const ease = (1 - Math.cos(Math.PI * clamp(ph.p, 0, 1))) / 2;
    return ph.phase === 'in' ? ease : 1 - ease;
  }

  /* A sessão termina sempre ao fim de uma expiração, no número de ciclos
     mais próximo da duração escolhida (nunca menos que 1 ciclo). */
  function plannedEnd(plannedSeconds, inhale, exhale) {
    const c = inhale + exhale;
    const n = Math.max(1, Math.round(plannedSeconds / c));
    return { cycles: n, seconds: n * c };
  }

  function completedCycles(t, inhale, exhale) {
    return Math.floor(Math.max(0, t) / (inhale + exhale) + 1e-9);
  }

  /* Cronômetro que desconta pausas. `now` é injetável para testes. */
  function Clock(now) {
    this.now = now || (() => (typeof performance !== 'undefined' ? performance.now() : Date.now()));
    this.started = null; this.pausedAt = null; this.pausedTotal = 0;
  }
  Clock.prototype.start = function () { this.started = this.now(); this.pausedAt = null; this.pausedTotal = 0; };
  Clock.prototype.pause = function () { if (this.started !== null && this.pausedAt === null) this.pausedAt = this.now(); };
  Clock.prototype.resume = function () {
    if (this.pausedAt !== null) { this.pausedTotal += this.now() - this.pausedAt; this.pausedAt = null; }
  };
  Clock.prototype.isPaused = function () { return this.pausedAt !== null; };
  Clock.prototype.elapsed = function () {
    if (this.started === null) return 0;
    const end = this.pausedAt !== null ? this.pausedAt : this.now();
    return Math.max(0, (end - this.started - this.pausedTotal) / 1000);
  };

  function validTension(v) {
    return Number.isInteger(v) && v >= 0 && v <= 10;
  }

  /* Mensagem de check-out. Descreve o relato; não afirma melhora clínica. */
  function tensionMessage(before, after) {
    if (!validTension(before) || !validTension(after)) return { kind: 'none', diff: null };
    const diff = before - after;
    if (diff > 0) return { kind: 'down', diff };
    if (diff === 0) return { kind: 'same', diff: 0 };
    return { kind: 'up', diff };
  }

  /* "Encontrar meu ritmo": recebe marcações de início de inspiração e expiração
     alternadas (em segundos) e devolve o ritmo médio, 10% mais lento. */
  function calibrate(taps) {
    const ins = [], outs = [];
    for (let k = 0; k + 1 < taps.length; k++) {
      const d = taps[k + 1].t - taps[k].t;
      if (d <= 0) continue;
      (taps[k].phase === 'in' ? ins : outs).push(d);
    }
    if (ins.length < 2 || outs.length < 2) return null;
    const med = a => { const s = a.slice().sort((x, y) => x - y); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
    return sanitizeRhythm(med(ins) * 1.1, med(outs) * 1.1);
  }

  function weekStart(d) {
    const x = new Date(d); x.setHours(0, 0, 0, 0);
    const day = (x.getDay() + 6) % 7; // segunda = 0
    x.setDate(x.getDate() - day);
    return x;
  }

  /* Indicadores de Meu Universo. Sem sequências, metas ou pontuação. */
  function stats(sessions, now) {
    now = now ? new Date(now) : new Date();
    const list = (sessions || []).slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    const totalSeconds = list.reduce((s, x) => s + (Number(x.duration_s) || 0), 0);
    const weekAgo = now.getTime() - 7 * 864e5;
    const last7 = list.filter(x => new Date(x.created_at).getTime() >= weekAgo).length;
    const practiceCounts = {};
    list.forEach(x => { practiceCounts[x.practice] = (practiceCounts[x.practice] || 0) + 1; });
    const top = Object.entries(practiceCounts).sort((a, b) => b[1] - a[1])[0];
    const w0 = weekStart(now);
    const weeks = [];
    for (let k = 7; k >= 0; k--) {
      const s = new Date(w0); s.setDate(s.getDate() - 7 * k);
      const e = new Date(s); e.setDate(e.getDate() + 7);
      const inW = list.filter(x => { const t = new Date(x.created_at); return t >= s && t < e; });
      weeks.push({ start: s, sessions: inW.length, minutes: inW.reduce((m, x) => m + (Number(x.duration_s) || 0), 0) / 60 });
    }
    const pairs = list.filter(x => validTension(x.tension_before) && validTension(x.tension_after));
    const avgDiff = pairs.length ? pairs.reduce((s, x) => s + (x.tension_before - x.tension_after), 0) / pairs.length : null;
    return { count: list.length, totalSeconds, last7, practiceCounts, topPractice: top ? top[0] : null, weeks, pairs, avgDiff };
  }

  const CSV_COLS = ['created_at', 'practice', 'visual', 'inhale_s', 'exhale_s', 'planned_s', 'duration_s', 'cycles', 'completed', 'stopped_discomfort', 'tension_before', 'tension_after'];
  function toCSV(sessions) {
    const cell = v => {
      if (v === null || v === undefined) return '';
      const s = String(v);
      return /[",\n;]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    };
    return [CSV_COLS.join(',')].concat((sessions || []).map(x => CSV_COLS.map(c => cell(x[c])).join(','))).join('\n');
  }

  /* Posição estável de cada estrela na constelação (mesmo id → mesmo lugar). */
  function starFor(seed, index) {
    let h = 2166136261;
    const s = String(seed) + ':' + index;
    for (let k = 0; k < s.length; k++) { h ^= s.charCodeAt(k); h = Math.imul(h, 16777619); }
    const r1 = ((h >>> 0) % 10000) / 10000;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    const r2 = ((h >>> 0) % 10000) / 10000;
    return { x: 0.06 + r1 * 0.88, y: 0.08 + r2 * 0.84 };
  }

  function fmtClock(sec) {
    sec = Math.max(0, Math.ceil(sec));
    const m = Math.floor(sec / 60), s = sec % 60;
    return m + ':' + String(s).padStart(2, '0');
  }

  return { LIMITS, DURATIONS, PRACTICES, clamp, sanitizeRhythm, phaseAt, breathLevel, plannedEnd, completedCycles, Clock, validTension, tensionMessage, calibrate, stats, toCSV, starFor, weekStart, fmtClock };
});
