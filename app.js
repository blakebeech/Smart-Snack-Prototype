/**
 * Smart Snack – app.js
 * Handles: tab switching, live search, sort toggles,
 *          favorite toggle (localStorage), delete (localStorage)
 */

'use strict';

/* ── Default data ─────────────────────────────────────────── */
const DEFAULT_DATA = {
  recipes: [
    { id: 'r1', name: 'Avocado Toast',    time: 10, calories: 250, cost: 3.50 },
    { id: 'r2', name: 'Greek Salad',      time: 15, calories: 180, cost: 4.00 },
    { id: 'r3', name: 'Pasta Primavera',  time: 25, calories: 420, cost: 5.50 },
    { id: 'r4', name: 'Veggie Omelette',  time: 12, calories: 310, cost: 3.00 },
    { id: 'r5', name: 'Chicken Wrap',     time: 20, calories: 480, cost: 6.00 },
  ],
  snacks: [
    { id: 's1', name: 'Trail Mix',         time: 2,  calories: 160, cost: 1.50 },
    { id: 's2', name: 'Hummus & Veggies',  time: 5,  calories: 130, cost: 2.00 },
    { id: 's3', name: 'Apple Slices',      time: 3,  calories: 80,  cost: 0.75 },
    { id: 's4', name: 'Cheese & Crackers', time: 5,  calories: 200, cost: 2.50 },
    { id: 's5', name: 'Yogurt Parfait',    time: 8,  calories: 220, cost: 3.00 },
  ],
  other: [
    { id: 'o1', name: 'Protein Shake',    time: 3,  calories: 200, cost: 2.00 },
    { id: 'o2', name: 'Energy Bar',       time: 1,  calories: 250, cost: 1.80 },
    { id: 'o3', name: 'Fruit Smoothie',   time: 5,  calories: 180, cost: 3.00 },
  ],
};

/* ── State ────────────────────────────────────────────────── */
let activeTab    = 'recipes';
let sortField    = null;   // 'time' | 'calories' | 'cost' | null
let sortDir      = 'asc';  // 'asc' | 'desc'
let searchQuery  = '';

/* ── localStorage helpers ─────────────────────────────────── */
function loadState() {
  try {
    return JSON.parse(localStorage.getItem('smartSnack') || '{}');
  } catch (_) {
    return {};
  }
}

function saveState(state) {
  localStorage.setItem('smartSnack', JSON.stringify(state));
}

function getStoredItems(tab) {
  const state = loadState();
  // If we have a saved list for this tab, use it; otherwise use defaults
  return state[tab] ? state[tab] : DEFAULT_DATA[tab].map(item => ({ ...item }));
}

function saveItems(tab, items) {
  const state = loadState();
  state[tab] = items;
  saveState(state);
}

function getFavorites() {
  const state = loadState();
  return state.favorites || [];
}

function saveFavorites(favs) {
  const state = loadState();
  state.favorites = favs;
  saveState(state);
}

/* ── Render ───────────────────────────────────────────────── */
function render() {
  const listEl = document.getElementById('itemList');
  let items = getStoredItems(activeTab);
  const favs = getFavorites();

  // Filter by search
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    items = items.filter(item => item.name.toLowerCase().includes(q));
  }

  // Sort
  if (sortField) {
    items = [...items].sort((a, b) => {
      const diff = a[sortField] - b[sortField];
      return sortDir === 'asc' ? diff : -diff;
    });
  }

  if (items.length === 0) {
    listEl.innerHTML = '<p class="empty-msg">No items found.</p>';
    return;
  }

  listEl.innerHTML = items.map(item => {
    const isFav = favs.includes(item.id);
    return `
      <article class="card" data-id="${item.id}">
        <div class="card-info">
          <span class="card-name">${escHtml(item.name)}</span>
          <span class="card-meta"><span>&#128337; ${item.time} min</span></span>
          <span class="card-meta"><span>&#128293; ${item.calories} cal</span></span>
          <span class="card-meta"><span>&#36;${item.cost.toFixed(2)}</span></span>
        </div>
        <div class="card-image">
          <span>No image</span>
        </div>
        <div class="card-actions">
          <button class="action-btn fav-btn ${isFav ? 'favorited' : ''}"
                  data-action="fav"
                  aria-label="${isFav ? 'Remove from favorites' : 'Add to favorites'}"
                  aria-pressed="${isFav}">
            ${isFav ? '&#9733;' : '&#9734;'}
          </button>
          <button class="action-btn" data-action="quick" aria-label="Quick view">&#128064;</button>
          <button class="action-btn delete-btn" data-action="delete" aria-label="Delete item">&#128465;</button>
        </div>
      </article>`;
  }).join('');
}

/* ── Event delegation on the list ────────────────────────── */
document.getElementById('itemList').addEventListener('click', function (e) {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;

  const card = btn.closest('.card');
  const id   = card ? card.dataset.id : null;
  if (!id) return;

  const action = btn.dataset.action;

  if (action === 'fav') {
    let favs = getFavorites();
    if (favs.includes(id)) {
      favs = favs.filter(f => f !== id);
    } else {
      favs.push(id);
    }
    saveFavorites(favs);
    render();
  }

  if (action === 'delete') {
    let items = getStoredItems(activeTab);
    items = items.filter(item => item.id !== id);
    saveItems(activeTab, items);
    render();
  }
});

/* ── Tab switching ────────────────────────────────────────── */
document.querySelector('.tab-nav').addEventListener('click', function (e) {
  const btn = e.target.closest('.tab-btn');
  if (!btn) return;
  activeTab = btn.dataset.tab;

  // Update active class
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Reset sort when switching tabs
  sortField = null;
  sortDir   = 'asc';
  updateSortButtons();

  render();
});

/* ── Live search ──────────────────────────────────────────── */
document.getElementById('searchInput').addEventListener('input', function () {
  searchQuery = this.value.trim();
  render();
});

/* ── Sort buttons ─────────────────────────────────────────── */
function updateSortButtons() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active', 'asc', 'desc');
    if (btn.dataset.sort === sortField) {
      btn.classList.add('active', sortDir);
    }
  });
}

document.querySelector('.filter-buttons').addEventListener('click', function (e) {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  const field = btn.dataset.sort;

  if (sortField === field) {
    // Toggle direction
    sortDir = sortDir === 'asc' ? 'desc' : 'asc';
  } else {
    sortField = field;
    sortDir   = 'asc';
  }

  updateSortButtons();
  render();
});

/* ── Utility ──────────────────────────────────────────────── */
function escHtml(str) {
  return str
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#39;');
}

/* ── Init ─────────────────────────────────────────────────── */
render();
