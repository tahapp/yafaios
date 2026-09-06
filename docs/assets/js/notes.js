(() => {
  const menu = document.querySelector('.sidebar details');
  const narrow = matchMedia('(max-width: 700px)');
  const resizeMenu = () => { if (menu) menu.open = !narrow.matches; };
  resizeMenu();
  narrow.addEventListener('change', resizeMenu);
  const toc = document.querySelector('.on-this-page');
  const headings = [...document.querySelectorAll('.note-content h2[id], .note-content h3[id]')];
  if (toc && headings.length) {
    toc.hidden = false;
    const label = document.createElement('strong'); label.textContent = 'On this page'; toc.append(label);
    headings.forEach(h => { const a = document.createElement('a'); a.href = '#' + encodeURIComponent(h.id); a.textContent = h.textContent; toc.append(a); });
  }
  document.querySelectorAll('pre').forEach(pre => {
    pre.tabIndex = 0; pre.setAttribute('aria-label', 'Code example');
    if (!navigator.clipboard) return;
    const button = document.createElement('button'); button.type = 'button'; button.className = 'copy-code'; button.textContent = 'Copy code';
    button.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(pre.textContent); button.textContent = 'Copied'; }
      catch { button.textContent = 'Select code to copy'; }
      setTimeout(() => { button.textContent = 'Copy code'; }, 2000);
    }); pre.after(button);
  });
  const list = document.querySelector('#search-results');
  if (!list) return;
  const input = document.querySelector('#query'), status = document.querySelector('#search-status');
  let index, pending;
  const load = () => {
    if (!pending) pending = fetch(list.dataset.index).then(r => { if (!r.ok) throw Error('Search unavailable'); return r.json(); }).then(data => index = data).catch(e => { pending = null; throw e; });
    return pending;
  };
  let revision = 0;
  async function search() {
    const current = ++revision, query = input.value.trim().toLowerCase(); list.replaceChildren();
    if (!query) { status.textContent = 'Enter a word or phrase to search the notebook.'; return; }
    status.textContent = 'Searching…';
    try {
      await load(); if (current !== revision) return;
      const words = query.split(/\s+/);
      const matches = index.filter(n => words.every(w => `${n.title} ${n.category} ${n.topic} ${n.text}`.toLowerCase().includes(w)));
      status.textContent = matches.length ? `${matches.length} matching ${matches.length === 1 ? 'note' : 'notes'}${matches.length > 50 ? ' · Showing the first 50. Refine your search for more specific results.' : '.'}` : 'No matching notes. Try another term or browse a category.';
      matches.slice(0, 50).forEach(n => {
        const li = document.createElement('li'), a = document.createElement('a'), p = document.createElement('p');
        a.href = n.url; a.textContent = n.title; p.textContent = `${n.category} / ${n.topic}`;
        li.append(a, p); list.append(li);
      });
    } catch { if (current === revision) status.textContent = 'Search could not load. Try again, or browse the categories.'; }
  }
  let timer; input.addEventListener('input', () => { ++revision; clearTimeout(timer); timer = setTimeout(search, 150); });
  input.closest('form').addEventListener('submit', e => { e.preventDefault(); clearTimeout(timer); search(); });
  input.value = new URLSearchParams(location.search).get('q') || ''; if (input.value) search();
})();
