(() => {
  const root = document.getElementById("shop-grid");
  if (!root || !window.PRODUCT_LIST) return;

  const esc = (s) =>
    String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");

  root.innerHTML = window.PRODUCT_LIST.map((p) => {
    return `
      <a
        href="./product.html?id=${esc(p.id)}"
        class="surface-card group block rounded-xl p-4 transition hover:-translate-y-0.5 hover:border-emerald-800/25 hover:shadow-md relative"
        data-aos="fade-up"
      >
        ${""}<!-- Disabled sold out badge for now: ${p.sold ? `<span class="product-badge product-badge--sold">Sold out</span>` : ""} -->
        <div class="shop-thumb-frame relative overflow-hidden rounded-lg">
          <div class="aspect-square w-full">
            <img
              src="${esc(p.image)}"
              alt=""
              class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>
        </div>
        <div class="mt-4 px-0">
          <h2 class="text-sm font-extrabold uppercase tracking-wide text-emerald-900 sm:text-base">
            ${esc(p.title)}
          </h2>
          <p class="mt-2 text-sm text-stone-500">${esc(p.subtitle)}</p>
          <p class="mt-3 text-sm font-semibold text-stone-600">
            Rs. ${esc(String(p.price))} / ${esc(p.weight)}
          </p>
          <p class="mt-2 text-xs uppercase tracking-[0.2em] text-stone-400">${esc(p.metaLine)}</p>
        </div>
      </a>
    `;
  }).join("");

  if (window.AOS) window.AOS.refresh();
})();
