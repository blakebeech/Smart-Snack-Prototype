/**
 * Smart Snack – app.js
 * Working prototype logic with state + persistence.
 */

'use strict';

const STORAGE_KEY = 'smartSnackStateV1';

const SEED_DATA = {
  recipes: [
    {
      id: 'r1',
      name: 'Avocado Toast',
      cookMinutes: 10,
      calories: 250,
      cost: 3.50,
      image: 'assets/recipes/recipe-1.jpg',
      favorite: false,
      description: 'Crisp toast layered with creamy avocado and bright citrus.',
      ingredients: ['2 slices whole-grain bread', '1 ripe avocado', '1 tsp lemon juice', 'Pinch of salt', 'Chili flakes'],
      steps: ['Toast bread until golden.', 'Mash avocado with lemon juice and salt.', 'Spread over toast and finish with chili flakes.'],
      tags: ['High Fiber', 'Low Sugar', 'Vegetarian'],
    },
    {
      id: 'r2',
      name: 'Greek Salad',
      cookMinutes: 15,
      calories: 180,
      cost: 4.00,
      image: 'assets/recipes/recipe-2.jpg',
      favorite: false,
      description: 'Fresh cucumbers, tomatoes, olives, and feta with a tangy dressing.',
      ingredients: ['Cucumber', 'Tomatoes', 'Red onion', 'Feta', 'Olives', 'Olive oil', 'Oregano'],
      steps: ['Chop vegetables.', 'Toss with olive oil and oregano.', 'Top with feta and olives.'],
      tags: ['Low Carb', 'Mediterranean', 'Vegetarian'],
    },
    {
      id: 'r3',
      name: 'Pasta Primavera',
      cookMinutes: 25,
      calories: 420,
      cost: 5.50,
      image: 'assets/recipes/recipe-3.jpg',
      favorite: false,
      description: 'Colorful vegetables folded into warm pasta with a light sauce.',
      ingredients: ['Pasta', 'Bell peppers', 'Zucchini', 'Cherry tomatoes', 'Garlic', 'Olive oil'],
      steps: ['Cook pasta al dente.', 'Saute vegetables with garlic.', 'Toss pasta with vegetables and olive oil.'],
      tags: ['Family Friendly', 'Vegetarian'],
    },
    {
      id: 'r4',
      name: 'Veggie Omelette',
      cookMinutes: 12,
      calories: 310,
      cost: 3.00,
      image: 'assets/recipes/recipe-4.jpg',
      favorite: false,
      description: 'Fluffy eggs packed with spinach, peppers, and herbs.',
      ingredients: ['2 eggs', 'Spinach', 'Bell pepper', 'Onion', 'Salt', 'Pepper'],
      steps: ['Saute vegetables briefly.', 'Whisk eggs and pour over.', 'Fold and cook until set.'],
      tags: ['High Protein', 'Low Sugar'],
    },
    {
      id: 'r5',
      name: 'Chicken Wrap',
      cookMinutes: 20,
      calories: 480,
      cost: 6.00,
      image: 'assets/recipes/recipe-5.jpg',
      favorite: false,
      description: 'Grilled chicken with crisp veggies in a warm wrap.',
      ingredients: ['Tortilla', 'Cooked chicken', 'Lettuce', 'Tomato', 'Yogurt sauce'],
      steps: ['Warm tortilla.', 'Layer chicken and veggies.', 'Drizzle sauce and roll.'],
      tags: ['High Protein', 'On-the-Go'],
    },
    {
      id: 'r6',
      name: 'Quinoa Bowl',
      cookMinutes: 18,
      calories: 360,
      cost: 4.75,
      image: 'assets/recipes/recipe-6.jpg',
      favorite: false,
      description: 'Fluffy quinoa topped with roasted veggies and lemon dressing.',
      ingredients: ['Quinoa', 'Roasted vegetables', 'Lemon juice', 'Olive oil', 'Parsley'],
      steps: ['Cook quinoa.', 'Roast vegetables.', 'Combine and dress with lemon oil.'],
      tags: ['Plant Based', 'Gluten Free'],
    },
  ],
  snacks: [
    {
      id: 's1',
      name: 'Trail Mix',
      prepMinutes: 2,
      calories: 160,
      cost: 1.50,
      image: 'assets/snacks/snack-1.jpg',
      favorite: false,
      description: 'A quick mix of nuts and fruit for steady energy.',
      whatYouNeed: ['Almonds', 'Pumpkin seeds', 'Dried cranberries', 'Dark chocolate chips'],
      prepSteps: ['Combine ingredients in a jar.', 'Shake to mix and portion.'],
      tags: ['High Protein', 'On-the-Go'],
    },
    {
      id: 's2',
      name: 'Hummus & Veggies',
      prepMinutes: 5,
      calories: 130,
      cost: 2.00,
      image: 'assets/snacks/snack-2.jpg',
      favorite: false,
      description: 'Crunchy veggies paired with creamy hummus.',
      whatYouNeed: ['Carrot sticks', 'Cucumber', 'Bell pepper', 'Hummus'],
      prepSteps: ['Slice veggies.', 'Plate with hummus.'],
      tags: ['Low Sugar', 'Vegetarian'],
    },
    {
      id: 's3',
      name: 'Apple Slices',
      prepMinutes: 3,
      calories: 80,
      cost: 0.75,
      image: 'assets/snacks/snack-3.jpg',
      favorite: false,
      description: 'Fresh apple slices with a bright crunch.',
      whatYouNeed: ['1 apple', 'Lemon juice'],
      prepSteps: ['Slice apple.', 'Toss with lemon juice to prevent browning.'],
      tags: ['Low Cal', 'Kid Friendly'],
    },
    {
      id: 's4',
      name: 'Cheese & Crackers',
      prepMinutes: 5,
      calories: 200,
      cost: 2.50,
      image: 'assets/snacks/snack-4.jpg',
      favorite: false,
      description: 'Savory cheese paired with crisp crackers.',
      whatYouNeed: ['Cheddar slices', 'Whole-grain crackers'],
      prepSteps: ['Arrange cheese and crackers on a plate.'],
      tags: ['High Protein', 'Quick Prep'],
    },
    {
      id: 's5',
      name: 'Yogurt Parfait',
      prepMinutes: 8,
      calories: 220,
      cost: 3.00,
      image: 'assets/snacks/snack-5.jpg',
      favorite: false,
      description: 'Creamy yogurt layered with fruit and granola.',
      whatYouNeed: ['Greek yogurt', 'Berries', 'Granola', 'Honey'],
      prepSteps: ['Layer yogurt, fruit, and granola.', 'Drizzle with honey.'],
      tags: ['High Protein', 'Sweet Tooth'],
    },
    {
      id: 's6',
      name: 'Peanut Butter Dip',
      prepMinutes: 4,
      calories: 190,
      cost: 1.20,
      image: 'assets/snacks/snack-6.jpg',
      favorite: false,
      description: 'Creamy peanut butter dip for fruit or crackers.',
      whatYouNeed: ['Peanut butter', 'Greek yogurt', 'Cinnamon'],
      prepSteps: ['Whisk ingredients until smooth.', 'Serve with fruit slices.'],
      tags: ['High Protein', 'No Bake'],
    },
  ],
  other: [
    { id: 'o1', name: 'Protein Shake',     timeMinutes: 3, calories: 200, cost: 2.00, image: '', favorite: false },
    { id: 'o2', name: 'Energy Bar',        timeMinutes: 1, calories: 250, cost: 1.80, image: '', favorite: false },
    { id: 'o3', name: 'Fruit Smoothie',    timeMinutes: 5, calories: 180, cost: 3.00, image: '', favorite: false },
  ],
};

const state = {
  view: 'recipes',
  query: '',
  sortKey: null,
  sortDir: 'asc',
  data: { recipes: [], snacks: [], other: [] },
  deleted: { recipes: [], snacks: [] },
  favorites: { recipes: {}, snacks: {} },
};

let currentRoute = { view: 'recipes', mode: 'list', id: null };

const NEW_ALLOWED = new Set(['recipes', 'snacks']);

/* ── Persistence ──────────────────────────────────────────── */
function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch (_) {
    return {};
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function mergeSeedData(saved) {
  const merged = {
    view: saved.view || state.view,
    query: saved.query || '',
    sortKey: saved.sortKey || null,
    sortDir: saved.sortDir || 'asc',
    data: {
      recipes: [],
      snacks: [],
      other: [],
    },
    deleted: {
      recipes: Array.isArray(saved.deleted && saved.deleted.recipes) ? saved.deleted.recipes : [],
      snacks: Array.isArray(saved.deleted && saved.deleted.snacks) ? saved.deleted.snacks : [],
    },
    favorites: {
      recipes: (saved.favorites && saved.favorites.recipes) || {},
      snacks: (saved.favorites && saved.favorites.snacks) || {},
    },
  };

  ['recipes', 'snacks', 'other'].forEach(view => {
    const existing = Array.isArray(saved.data && saved.data[view]) ? saved.data[view] : [];
    const byId = {};
    existing.forEach(item => { byId[item.id] = item; });
    SEED_DATA[view].forEach(seed => {
      if (!byId[seed.id]) {
        byId[seed.id] = seed;
      }
    });
    merged.data[view] = Object.values(byId);
  });

  return merged;
}

/* ── State updates ───────────────────────────────────────── */
function setView(viewName) {
  state.view = viewName;
  state.sortKey = null;
  state.sortDir = 'asc';
  updateTabButtons();
  updateSortButtons();
  setMenuOpen(false);
  saveState();
}

function setQuery(text) {
  state.query = text.trim();
  render();
  saveState();
}

function setSort(key) {
  if (state.sortKey === key) {
    state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
  } else {
    state.sortKey = key;
    state.sortDir = 'asc';
  }
  updateSortButtons();
  render();
  saveState();
}

function toggleFavorite(view, id) {
  if (!state.favorites[view]) return;
  if (state.favorites[view][id]) {
    delete state.favorites[view][id];
  } else {
    state.favorites[view][id] = true;
  }
  render();
  saveState();
}

function deleteItem(view, id) {
  if (state.deleted[view]) {
    if (!state.deleted[view].includes(id)) {
      state.deleted[view].push(id);
    }
  } else {
    state.data[view] = state.data[view].filter(item => item.id !== id);
  }
  render();
  saveState();
}

/* ── Data helpers ────────────────────────────────────────── */
function getActiveItems() {
  let items = state.data[state.view] || [];
  if (state.deleted[state.view]) {
    const blocked = new Set(state.deleted[state.view]);
    items = items.filter(item => !blocked.has(item.id));
  }
  return items;
}

function getItemById(view, id) {
  const items = state.data[view] || [];
  const blocked = new Set((state.deleted[view] || []));
  return items.find(item => item.id === id && !blocked.has(item.id)) || null;
}

function getTimeValue(item) {
  if (state.view === 'recipes') return item.cookMinutes || 0;
  if (state.view === 'snacks') return item.prepMinutes || 0;
  return item.timeMinutes || 0;
}

function applySearchAndSort(items) {
  let result = items;

  if (state.query) {
    const q = state.query.toLowerCase();
    result = result.filter(item => item.name.toLowerCase().includes(q));
  }

  if (state.sortKey) {
    const dir = state.sortDir === 'asc' ? 1 : -1;
    result = [...result].sort((a, b) => {
      let av = 0;
      let bv = 0;
      if (state.sortKey === 'time') {
        av = getTimeValue(a);
        bv = getTimeValue(b);
      } else {
        av = a[state.sortKey] || 0;
        bv = b[state.sortKey] || 0;
      }
      return (av - bv) * dir;
    });
  }

  return result;
}

/* ── Render ───────────────────────────────────────────────── */
function render() {
  if (currentRoute.mode === 'detail') {
    const item = getItemById(currentRoute.view, currentRoute.id);
    if (!item) {
      renderNotFound(currentRoute.view);
      return;
    }
    renderDetail(item);
    return;
  }

  if (currentRoute.mode === 'new') {
    renderNewItemForm(currentRoute.view);
    return;
  }

  const items = applySearchAndSort(getActiveItems());
  renderList(items);
}

function renderList(items) {
  const listEl = document.getElementById('itemList');

  if (!items.length) {
    listEl.innerHTML = '<p class="empty-msg">No items found.</p>';
    return;
  }

  listEl.innerHTML = items.map(item => {
    const isFav = !!(state.favorites[state.view] && state.favorites[state.view][item.id]);
    const timeValue = getTimeValue(item);
    const timeLabel = state.view === 'recipes' ? 'cook' : (state.view === 'snacks' ? 'prep' : 'time');
    const favClass = isFav ? 'favorited' : '';
    const cardClass = isFav ? 'card is-favorite' : 'card';
    const imageText = item.image ? '' : 'No image';
    const imageMarkup = item.image
      ? `<img src="${escHtml(item.image)}" alt="" onload="this.parentElement.classList.add('image-loaded')" onerror="this.parentElement.classList.add('image-fallback'); this.remove();" />
         <span class="image-placeholder">No image</span>`
      : `<span class="image-placeholder">${imageText}</span>`;
    const showView = state.view === 'recipes' || state.view === 'snacks';
    const viewButton = showView
      ? '<button class="action-btn" data-action="view" aria-label="View details">View</button>'
      : '';

    return `
      <article class="${cardClass}" data-id="${item.id}">
        <div class="card-info">
          <span class="card-name">${escHtml(item.name)}</span>
          <span class="card-meta"><span>&#128337; ${timeValue} min ${timeLabel}</span></span>
          <span class="card-meta"><span>&#128293; ${item.calories} cal</span></span>
          <span class="card-meta"><span>&#36;${item.cost.toFixed(2)}</span></span>
        </div>
        <div class="card-image">
          ${imageMarkup}
        </div>
        <div class="card-actions">
          <button class="action-btn fav-btn ${favClass}"
                  data-action="fav"
                  aria-label="${isFav ? 'Remove from favorites' : 'Add to favorites'}"
                  aria-pressed="${isFav}">
            ${isFav ? '&#9733;' : '&#9734;'}
          </button>
          ${viewButton}
          <button class="action-btn delete-btn" data-action="delete" aria-label="Delete item">&#128465;</button>
        </div>
      </article>`;
  }).join('');
}

function renderDetail(item) {
  const listEl = document.getElementById('itemList');
  const isRecipe = currentRoute.view === 'recipes';
  const isFav = !!(state.favorites[currentRoute.view] && state.favorites[currentRoute.view][item.id]);
  const timeValue = getTimeValue(item);
  const timeLabel = isRecipe ? 'cook' : 'prep';
  const imageText = item.image ? '' : 'No image';
  const imageMarkup = item.image
    ? `<img src="${escHtml(item.image)}" alt="" onload="this.parentElement.classList.add('image-loaded')" onerror="this.parentElement.classList.add('image-fallback'); this.remove();" />
       <span class="image-placeholder">No image</span>`
    : `<span class="image-placeholder">${imageText}</span>`;
  const favClass = isFav ? 'favorited' : '';
  const tags = (item.tags || []).map(tag => `<span class="tag-pill">${escHtml(tag)}</span>`).join('');
  const needTitle = isRecipe ? 'Ingredients' : 'What you need';
  const stepsTitle = isRecipe ? 'Steps' : 'How to prep';
  const needs = isRecipe ? (item.ingredients || []) : (item.whatYouNeed || []);
  const steps = isRecipe ? (item.steps || []) : (item.prepSteps || []);

  listEl.innerHTML = `
    <section class="detail-view" data-id="${item.id}">
      <div class="detail-header">
        <button class="action-btn detail-back" data-action="back" aria-label="Back to list">&#8592;</button>
        <h2 class="detail-title">${escHtml(item.name)}</h2>
      </div>
      <div class="card-image detail-image">
        ${imageMarkup}
      </div>
      <div class="detail-meta">
        <span class="detail-meta-item">&#128337; ${timeValue} min ${timeLabel}</span>
        <span class="detail-meta-item">&#128293; ${item.calories} cal</span>
        <span class="detail-meta-item">&#36;${item.cost.toFixed(2)}</span>
      </div>
      <div class="detail-tags">${tags || '<span class="detail-tag-empty">No tags</span>'}</div>
      <div class="detail-section">
        <h3>Description</h3>
        <p>${escHtml(item.description || 'No description yet.')}</p>
      </div>
      <div class="detail-section">
        <h3>${needTitle}</h3>
        <ul>
          ${needs.length ? needs.map(entry => `<li>${escHtml(entry)}</li>`).join('') : '<li>Not listed yet.</li>'}
        </ul>
      </div>
      <div class="detail-section">
        <h3>${stepsTitle}</h3>
        <ol>
          ${steps.length ? steps.map(entry => `<li>${escHtml(entry)}</li>`).join('') : '<li>Not listed yet.</li>'}
        </ol>
      </div>
      <div class="detail-actions">
        <button class="action-btn fav-btn ${favClass}"
                data-action="fav"
                aria-label="${isFav ? 'Remove from favorites' : 'Add to favorites'}"
                aria-pressed="${isFav}">
          ${isFav ? '&#9733;' : '&#9734;'}
        </button>
        <button class="action-btn" data-action="add" aria-label="Add to snack list">Add</button>
        <button class="action-btn delete-btn" data-action="delete" aria-label="Delete item">&#128465;</button>
      </div>
    </section>`;
}

function renderNotFound(view) {
  const listEl = document.getElementById('itemList');
  listEl.innerHTML = `
    <p class="empty-msg">Not found.</p>
    <p class="empty-msg"><a href="#/${escHtml(view)}">Back to list</a></p>`;
}

function renderNewItemForm(view) {
  if (!NEW_ALLOWED.has(view)) {
    renderNotFound(view);
    return;
  }

  const listEl = document.getElementById('itemList');
  const timeLabel = view === 'recipes' ? 'Cook minutes' : 'Prep minutes';
  const titleLabel = view === 'recipes' ? 'New Recipe' : 'New Snack';
  listEl.innerHTML = `
    <section class="detail-view" data-form-view="${view}">
      <div class="detail-header">
        <button class="action-btn detail-back" data-action="back" aria-label="Back to list">&#8592;</button>
        <h2 class="detail-title">${titleLabel}</h2>
      </div>
      <form class="detail-form" data-form="new-item">
        <label>
          Name
          <input name="name" type="text" required />
        </label>
        <div class="form-row">
          <label>
            ${timeLabel}
            <input name="minutes" type="number" min="1" required />
          </label>
          <label>
            Calories
            <input name="calories" type="number" min="0" required />
          </label>
          <label>
            Cost
            <input name="cost" type="number" min="0" step="0.01" required />
          </label>
        </div>
        <label>
          Description
          <textarea name="description" rows="3" required></textarea>
        </label>
        <label>
          Tags (comma-separated)
          <input name="tags" type="text" />
        </label>
        <label>
          Image path
          <input name="image" type="text" placeholder="assets/recipes/recipe-7.jpg" />
        </label>
        <label>
          ${view === 'recipes' ? 'Ingredients (one per line)' : 'What you need (one per line)'}
          <textarea name="ingredients" rows="4" required></textarea>
        </label>
        <label>
          ${view === 'recipes' ? 'Steps (one per line)' : 'How to prep (one per line)'}
          <textarea name="steps" rows="4" required></textarea>
        </label>
        <div class="detail-actions">
          <button class="action-btn" type="submit">Save</button>
          <button class="action-btn" type="button" data-action="back">Cancel</button>
        </div>
      </form>
    </section>`;
}

/* ── UI updates ──────────────────────────────────────────── */
function updateTabButtons() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === state.view);
  });
}

function updateSortButtons() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active', 'asc', 'desc');
    if (btn.dataset.sort === state.sortKey) {
      btn.classList.add('active', state.sortDir);
    }
  });
}

function setMenuOpen(isOpen) {
  document.body.classList.toggle('menu-open', isOpen);
  const toggleBtn = document.getElementById('menuToggle');
  if (toggleBtn) {
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }
}

function parseRoute(hash) {
  const cleaned = (hash || '').replace(/^#\/?/, '');
  const parts = cleaned.split('/').filter(Boolean);
  const view = parts[0] || 'recipes';
  const second = parts[1] || null;
  const isNew = second === 'new';
  const id = isNew ? null : second;
  const mode = isNew ? 'new' : (id ? 'detail' : 'list');

  if (!['recipes', 'snacks', 'other'].includes(view)) {
    return { view: 'recipes', mode: 'list', id: null };
  }

  if (mode === 'new' && !NEW_ALLOWED.has(view)) {
    return { view, mode: 'list', id: null };
  }

  if (id && !(view === 'recipes' || view === 'snacks')) {
    return { view, mode: 'list', id: null };
  }

  return { view, mode, id };
}

function navigateTo(view, id) {
  const next = id ? `#/${view}/${id}` : `#/${view}`;
  if (location.hash !== next) {
    location.hash = next;
  } else {
    handleRouteChange();
  }
}

function handleRouteChange() {
  currentRoute = parseRoute(location.hash);
  setView(currentRoute.view);
  render();
}

/* ── Events ──────────────────────────────────────────────── */
document.querySelector('.tab-nav').addEventListener('click', function (e) {
  const btn = e.target.closest('.tab-btn');
  if (!btn) return;
  navigateTo(btn.dataset.tab, null);
});

document.getElementById('searchInput').addEventListener('input', function () {
  setQuery(this.value);
});

document.querySelector('.filter-buttons').addEventListener('click', function (e) {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  setSort(btn.dataset.sort);
});

const menuToggle = document.getElementById('menuToggle');
if (menuToggle) {
  menuToggle.addEventListener('click', function () {
    const isOpen = document.body.classList.contains('menu-open');
    setMenuOpen(!isOpen);
  });
}

const addRecipeBtn = document.getElementById('addRecipeBtn');
if (addRecipeBtn) {
  addRecipeBtn.addEventListener('click', function () {
    navigateTo('recipes', 'new');
  });
}

const addSnackBtn = document.getElementById('addSnackBtn');
if (addSnackBtn) {
  addSnackBtn.addEventListener('click', function () {
    navigateTo('snacks', 'new');
  });
}

document.getElementById('itemList').addEventListener('click', function (e) {
  const btn = e.target.closest('[data-action]');
  const card = e.target.closest('.card');
  const targetWithId = e.target.closest('[data-id]');
  const id = targetWithId ? targetWithId.dataset.id : null;

  if (btn) {
    e.stopPropagation();
    if (!id) return;

    if (btn.dataset.action === 'fav') {
      toggleFavorite(currentRoute.view, id);
    }

    if (btn.dataset.action === 'delete') {
      if (currentRoute.mode === 'detail') {
        const ok = window.confirm('Delete this item?');
        if (!ok) return;
      }
      deleteItem(currentRoute.view, id);
      if (currentRoute.mode === 'detail') {
        navigateTo(currentRoute.view, null);
      }
    }

    if (btn.dataset.action === 'view') {
      if (currentRoute.view === 'recipes' || currentRoute.view === 'snacks') {
        navigateTo(currentRoute.view, id);
      }
    }

    if (btn.dataset.action === 'back') {
      navigateTo(currentRoute.view, null);
    }

    return;
  }

  if (!card || !card.dataset.id) return;

  if (currentRoute.mode === 'list' && (currentRoute.view === 'recipes' || currentRoute.view === 'snacks')) {
    navigateTo(currentRoute.view, card.dataset.id);
  }
});

document.getElementById('itemList').addEventListener('submit', function (e) {
  const form = e.target.closest('form[data-form="new-item"]');
  if (!form) return;
  e.preventDefault();

  const view = currentRoute.view;
  if (!NEW_ALLOWED.has(view)) return;

  const formData = new FormData(form);
  const name = String(formData.get('name') || '').trim();
  const minutes = Number(formData.get('minutes') || 0);
  const calories = Number(formData.get('calories') || 0);
  const cost = Number(formData.get('cost') || 0);
  const description = String(formData.get('description') || '').trim();
  const tags = String(formData.get('tags') || '')
    .split(',')
    .map(tag => tag.trim())
    .filter(Boolean);
  const image = String(formData.get('image') || '').trim();
  const ingredients = String(formData.get('ingredients') || '')
    .split('\n')
    .map(entry => entry.trim())
    .filter(Boolean);
  const steps = String(formData.get('steps') || '')
    .split('\n')
    .map(entry => entry.trim())
    .filter(Boolean);

  const id = `${view.slice(0, 1)}${Date.now()}`;
  const base = {
    id,
    name,
    calories,
    cost,
    image,
    favorite: false,
    description,
    tags,
  };

  const newItem = view === 'recipes'
    ? { ...base, cookMinutes: minutes, ingredients, steps }
    : { ...base, prepMinutes: minutes, whatYouNeed: ingredients, prepSteps: steps };

  state.data[view].push(newItem);
  saveState();
  navigateTo(view, id);
});

/* ── Utility ─────────────────────────────────────────────── */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ── Init ─────────────────────────────────────────────────── */
const loaded = mergeSeedData(loadState());
Object.assign(state, loaded);
updateTabButtons();
updateSortButtons();
setMenuOpen(false);
if (!location.hash) {
  location.hash = '#/recipes';
}
handleRouteChange();
window.addEventListener('hashchange', handleRouteChange);
saveState();
