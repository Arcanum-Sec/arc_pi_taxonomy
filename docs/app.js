// Main Application JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    renderCards();
    updateStats();
    initFilters();
    initSearch();
    initModal();
}

// Render all cards
function renderCards() {
    renderCategoryCards('intents', taxonomyData.intents, 'intents-grid');
    renderCategoryCards('techniques', taxonomyData.techniques, 'techniques-grid');
    renderCategoryCards('evasions', taxonomyData.evasions, 'evasions-grid');
    renderCategoryCards('inputs', taxonomyData.inputs, 'inputs-grid');
}

function deliveryTitle(d) {
    return d === 'direct' ? 'Direct delivery (attacker interacts with the model)'
        : d === 'indirect' ? 'Indirect delivery (payload rides in ingested data)'
        : 'Either direct or indirect delivery';
}

function renderCategoryCards(category, items, gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    const categoryLabels = {
        techniques: 'Technique',
        evasions: 'Evasion',
        intents: 'Intent',
        inputs: 'Input'
    };

    // Display cards alphabetically by title, but keep each card's ORIGINAL array
    // index in data-index so the modal lookup (taxonomyData[category][index]) and
    // the reference codes stay correct. Codes are stable identifiers, not the
    // display order, so they will not run 01, 02, 03 sequentially down the page.
    const ordered = items
        .map((item, idx) => ({ item, idx }))
        .sort((a, b) => a.item.title.localeCompare(b.item.title, 'en', { sensitivity: 'base' }));

    grid.innerHTML = ordered.map(({ item, idx: index }) => `
        <div class="card ${category}" data-category="${category}" data-index="${index}" data-title="${item.title.toLowerCase()}" data-description="${item.description.toLowerCase()}" data-aliases="${item.aliases ? escapeHtml(item.aliases.join(' | ').toLowerCase()) : ''}" data-code="${(item.code || '').toLowerCase()}" data-delivery="${item.delivery || ''}" data-local="${item.local ? 'local' : ''}">
            <div class="card-header">
                <div class="card-title-wrap">
                    ${item.code ? `<span class="card-code">${item.code}</span>` : ''}
                    <h3 class="card-title">${item.title}</h3>
                </div>
                <div class="card-tags">
                    ${item.local ? `<span class="local-tag" title="Requires local model-weight access">LOCAL</span>` : ''}
                    ${item.delivery ? `<span class="delivery-dot delivery-${item.delivery}" title="${deliveryTitle(item.delivery)}"></span>` : ''}
                    <span class="card-badge">${categoryLabels[category]}</span>
                </div>
            </div>
            <p class="card-description">${item.description}</p>
            ${item.aliases && item.aliases.length ? `<p class="card-aka"><span class="card-aka-label">aka</span> ${escapeHtml(item.aliases.join(' · '))}</p>` : ''}
            <div class="card-footer">
                <span class="card-examples-count">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                    </svg>
                    ${item.ideas ? item.ideas.length : 0} ideas
                </span>
                ${category !== 'inputs' ? `
                <span class="card-examples-count">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <path d="M14 2v6h6"/>
                        <path d="M16 13H8"/>
                        <path d="M16 17H8"/>
                        <path d="M10 9H8"/>
                    </svg>
                    ${item.examples ? item.examples.length : 0} prompts
                </span>
                ` : ''}
                <span class="card-view-more">
                    View
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14"/>
                        <path d="M12 5l7 7-7 7"/>
                    </svg>
                </span>
            </div>
        </div>
    `).join('');

    // Add click handlers to cards
    grid.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            const index = parseInt(card.dataset.index);
            openModal(category, index);
        });
    });
}

// Update statistics
function updateStats() {
    const techniquesCount = taxonomyData.techniques.length;
    const evasionsCount = taxonomyData.evasions.length;
    const intentsCount = taxonomyData.intents.length;
    const inputsCount = taxonomyData.inputs.length;
    const totalCount = techniquesCount + evasionsCount + intentsCount + inputsCount;

    animateCounter('total-count', totalCount);
    animateCounter('techniques-count', techniquesCount);
    animateCounter('evasions-count', evasionsCount);
    animateCounter('intents-count', intentsCount);
    animateCounter('inputs-count', inputsCount);
}

function animateCounter(elementId, target) {
    const element = document.getElementById(elementId);
    if (!element) return;

    let current = 0;
    const increment = Math.ceil(target / 20);
    const duration = 500;
    const steps = 20;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = current;
    }, stepTime);
}

// Filter functionality
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            // Update button states
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show/hide sections
            applyFilter(filter);
        });
    });
}

function applyFilter(filter) {
    const sections = {
        techniques: document.getElementById('techniques-section'),
        evasions: document.getElementById('evasions-section'),
        intents: document.getElementById('intents-section'),
        inputs: document.getElementById('inputs-section')
    };

    if (filter === 'all') {
        Object.values(sections).forEach(section => {
            if (section) section.classList.remove('hidden');
        });
    } else {
        Object.entries(sections).forEach(([key, section]) => {
            if (section) {
                if (key === filter) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            }
        });
    }
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    let debounceTimer;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            performSearch(e.target.value.toLowerCase().trim());
        }, 200);
    });
}

function performSearch(query) {
    const allCards = document.querySelectorAll('.card');

    if (!query) {
        allCards.forEach(card => card.classList.remove('hidden'));
        return;
    }

    allCards.forEach(card => {
        const title = card.dataset.title || '';
        const description = card.dataset.description || '';
        const aliases = card.dataset.aliases || '';
        const code = card.dataset.code || '';
        const meta = `${card.dataset.local || ''} ${card.dataset.delivery || ''}`;

        if (title.includes(query) || description.includes(query) || aliases.includes(query) || code.includes(query) || meta.includes(query)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Modal functionality
function initModal() {
    const overlay = document.getElementById('modal-overlay');
    const closeBtn = document.getElementById('modal-close');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        });
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function openModal(category, index) {
    const data = taxonomyData[category][index];
    if (!data) return;

    const overlay = document.getElementById('modal-overlay');
    const categoryEl = document.getElementById('modal-category');
    const titleEl = document.getElementById('modal-title');
    const descriptionEl = document.getElementById('modal-description');
    const ideasSection = document.getElementById('modal-ideas-section');
    const ideasEl = document.getElementById('modal-ideas');
    const examplesSection = document.getElementById('modal-examples-section');
    const examplesEl = document.getElementById('modal-examples');
    const examplesHeading = document.getElementById('modal-examples-heading');

    const categoryLabels = {
        techniques: 'Technique',
        evasions: 'Evasion',
        intents: 'Intent',
        inputs: 'Input'
    };

    // Update modal content
    categoryEl.textContent = categoryLabels[category];
    categoryEl.className = `modal-category ${category}`;
    const codeEl = document.getElementById('modal-code');
    if (codeEl) codeEl.textContent = data.code || '';
    const deliveryEl = document.getElementById('modal-delivery');
    if (deliveryEl) {
        if (data.delivery) {
            deliveryEl.style.display = '';
            const label = data.delivery === 'direct' ? 'Direct' : (data.delivery === 'indirect' ? 'Indirect' : 'Either');
            deliveryEl.innerHTML = `<span class="delivery-dot delivery-${data.delivery}"></span> ${label}`;
        } else {
            deliveryEl.style.display = 'none';
        }
    }
    const localCallout = document.getElementById('modal-local-callout');
    if (localCallout) localCallout.style.display = data.local ? 'flex' : 'none';
    titleEl.textContent = data.title;
    descriptionEl.textContent = data.description;

    // Update aliases ("Also Known As")
    const aliasesSection = document.getElementById('modal-aliases-section');
    const aliasesEl = document.getElementById('modal-aliases');
    if (data.aliases && data.aliases.length > 0 && aliasesSection && aliasesEl) {
        aliasesSection.style.display = 'block';
        aliasesEl.innerHTML = data.aliases.map(alias =>
            `<li class="alias-chip">${escapeHtml(alias)}</li>`
        ).join('');
    } else if (aliasesSection) {
        aliasesSection.style.display = 'none';
    }

    // Update ideas
    if (data.ideas && data.ideas.length > 0 && ideasSection && ideasEl) {
        ideasSection.style.display = 'block';
        ideasEl.innerHTML = data.ideas.map(idea =>
            `<li>${escapeHtml(idea)}</li>`
        ).join('');
    } else if (ideasSection) {
        ideasSection.style.display = 'none';
    }

    // Update examples
    if (data.examples && data.examples.length > 0) {
        examplesSection.style.display = 'block';
        examplesHeading.textContent = category === 'inputs' ? 'Examples' : 'Example Prompts';
        examplesEl.innerHTML = data.examples.map(example =>
            `<li>${escapeHtml(example)}</li>`
        ).join('');
    } else {
        examplesSection.style.display = 'none';
    }

    // Show modal
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
