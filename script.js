// Tab switching
document.querySelectorAll(".tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".section").forEach((s) => s.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// Build tier list
function buildTierList() {
  const container = document.getElementById("tier-container");
  tiers.forEach((tier) => {
    const chars = characters.filter((c) => c.tier === tier);
    if (!chars.length) return;

    const row = document.createElement("div");
    row.className = "tier-row";

    const label = document.createElement("div");
    label.className = `tier-label ${tier}`;
    label.textContent = tier;

    const charsDiv = document.createElement("div");
    charsDiv.className = "tier-chars";

    chars.forEach((char) => {
      const card = document.createElement("div");
      card.className = "tier-card";
      card.innerHTML = `
        <div class="char-name">${char.name}</div>
        <div class="char-role">${char.role}</div>
      `;
      card.addEventListener("click", () => openModal(char));
      charsDiv.appendChild(card);
    });

    row.appendChild(label);
    row.appendChild(charsDiv);
    container.appendChild(row);
  });
}

// Build character grid
function buildCharGrid(filter = "") {
  const grid = document.getElementById("char-grid");
  grid.innerHTML = "";
  const filtered = characters.filter((c) =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach((char) => {
    const card = document.createElement("div");
    card.className = "char-card";
    card.innerHTML = `
      <div class="char-card-header">
        <h3>${char.name}</h3>
        <span class="tier-badge ${char.tier}">${char.tier}</span>
      </div>
      <span class="role-tag">${char.role}</span>
      <div class="best-costume"><span>Best Costume: </span>${char.bestCostume}</div>
    `;
    card.addEventListener("click", () => openModal(char));
    grid.appendChild(card);
  });
}

// Build video grid
function buildVideoGrid() {
  const grid = document.getElementById("video-grid");
  characters.forEach((char) => {
    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = `
      <div class="video-thumb">
        <a href="${char.video.url}" target="_blank" rel="noopener">Watch on YouTube &rarr;</a>
      </div>
      <h3>${char.name}</h3>
      <p>${char.video.label}</p>
    `;
    grid.appendChild(card);
  });
}

// Open modal
function openModal(char) {
  const content = document.getElementById("modal-content");

  const costumeItems = char.costumes
    .map(
      (c) => `<li>${c.name}${c.best ? ' <span class="best-tag">BEST</span>' : ""}</li>`
    )
    .join("");

  const tuningItems = char.tuning.map((t) => `<li>${t}</li>`).join("");

  content.innerHTML = `
    <div class="modal-name">${char.name}</div>
    <div class="modal-meta">
      <span class="tier-badge ${char.tier}">${char.tier} Tier</span>
      <span class="role-tag">${char.role}</span>
    </div>

    <div class="modal-section">
      <h4>Costumes</h4>
      <ul class="costume-list">${costumeItems}</ul>
    </div>

    <div class="modal-section">
      <h4>Recommended Tuning</h4>
      <ul class="tuning-list">${tuningItems}</ul>
    </div>

    <div class="modal-section">
      <h4>Tips</h4>
      <div class="tips-box">${char.tips}</div>
    </div>

    <div class="modal-section">
      <h4>Combo Video</h4>
      <p><a href="${char.video.url}" target="_blank" rel="noopener" style="color:var(--accent)">${char.video.label} &rarr;</a></p>
    </div>
  `;

  document.getElementById("modal").classList.remove("hidden");
}

// Close modal
document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("modal").classList.add("hidden");
});

document.getElementById("modal").addEventListener("click", (e) => {
  if (e.target === document.getElementById("modal")) {
    document.getElementById("modal").classList.add("hidden");
  }
});

// Search
document.getElementById("search").addEventListener("input", (e) => {
  buildCharGrid(e.target.value);
});

// Init
buildTierList();
buildCharGrid();
buildVideoGrid();
