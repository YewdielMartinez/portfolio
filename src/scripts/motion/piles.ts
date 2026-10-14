/** Mark each archive pile once it scrolls into view; CSS runs Spencer's elastic scale-in. */
export function initPiles(root: ParentNode = document) {
  const piles = root.querySelectorAll<HTMLElement>('.pile');
  if (!piles.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.inview = '';
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.25 },
  );
  piles.forEach((pile) => io.observe(pile));
}
