(() => {
  const root = document.getElementById("product-root");
  const missing = document.getElementById("product-missing");
  if (!root) return;

  const esc = (s) =>
    String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const p = id && window.PRODUCTS ? window.PRODUCTS[id] : null;

  if (!p) {
    root.classList.add("hidden");
    if (missing) missing.classList.remove("hidden");
    document.title = "Product not found • Beautiful Coffee Academy";
    return;
  }

  document.title = `${p.title} • Shop • Beautiful Coffee Academy`;

  const soldBadge = ""; // Disabled sold out badge for now
  // const soldBadge = p.sold ? `<span class="product-badge product-badge--sold">Sold out</span>` : "";
  const detailsHtml = Array.isArray(p.details)
    ? p.details
        .map(
          (detail) =>
            `<div class="rounded-3xl border border-emerald-300/20 bg-emerald-950/95 p-5 shadow-[0_24px_60px_-22px_rgba(0,0,0,0.5)]"><div class="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">${esc(
              detail.label
            )}</div><div class="mt-3 text-sm font-semibold text-slate-100">${esc(detail.value)}</div></div>`
        )
        .join("")
    : "";

  root.innerHTML = `
    <div class="grid gap-10 lg:grid-cols-12 lg:items-start">
      <div class="lg:col-span-6">
        <div class="surface-card relative rounded-xl p-6 sm:p-8">
          ${soldBadge}
          <div class="shop-thumb-frame mx-auto mt-10 max-w-md overflow-hidden rounded-xl">
            <div class="aspect-square w-full">
              <img class="h-full w-full object-cover" src="${esc(p.image)}" alt="" loading="eager" />
            </div>
          </div>
        </div>
      </div>
      <div class="lg:col-span-6">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="text-xs font-extrabold uppercase tracking-widest text-stone-500">${esc(p.metaLine)}</div>
        </div>
        <h1 class="font-serif-display mt-5 text-4xl font-bold uppercase tracking-tight text-emerald-900 sm:text-5xl">
          ${esc(p.title)}
        </h1>
        <p class="mt-2 text-sm font-extrabold uppercase tracking-[0.2em] text-emerald-800">${esc(p.subtitle)}</p>
        <p class="mt-6 max-w-xl text-base leading-relaxed text-stone-700">${esc(p.description)}</p>
        ${detailsHtml ? `<div class="mt-10 grid gap-4 sm:grid-cols-2">${detailsHtml}</div>` : ""}
        <p class="mt-10 text-lg font-bold text-stone-900">Rs. ${esc(String(p.price))} / ${esc(p.weight)}</p>
        <div class="mt-10 border-t border-stone-200 pt-8">
          <div class="text-xs font-extrabold uppercase tracking-widest text-stone-500">Flavor notes</div>
          <p class="font-serif-display mt-3 text-2xl font-semibold text-emerald-900 sm:text-3xl">${esc(p.flavors)}</p>
        </div>
        <div class="mt-10 flex flex-wrap gap-3">
          <a class="btn-primary inline-flex rounded-full px-6 py-3 text-sm font-extrabold" href="./shop.html">Back to shop</a>
          <a class="btn-outline inline-flex rounded-full px-6 py-3 text-sm font-extrabold" href="index.html#contact">Contact to order</a>
        </div>
      </div>
    </div>
  `;

  if (window.AOS) window.AOS.refresh();
})();
