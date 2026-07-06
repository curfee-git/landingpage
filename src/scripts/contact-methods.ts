
const DESKTOP_QUERY = '(hover: hover) and (pointer: fine)';
const FEEDBACK_DURATION_MS = 2000;

async function handleClick(event: MouseEvent): Promise<void> {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const link = target.closest<HTMLAnchorElement>('a[data-copy-value]');
  if (!link) return;

  // On touch devices the native handler (tel:) is the right experience.
  if (!window.matchMedia(DESKTOP_QUERY).matches) return;
  if (!navigator.clipboard?.writeText) return;

  event.preventDefault();
  try {
    await navigator.clipboard.writeText(link.dataset.copyValue ?? '');
  } catch {
    window.location.href = link.href;
    return;
  }

  const meta = link.querySelector<HTMLElement>('[data-method-meta]');
  if (!meta) return;
  meta.dataset.originalText ??= meta.textContent ?? '';
  meta.textContent = link.dataset.copiedText ?? meta.dataset.originalText;
  link.classList.add('is-copied');
  window.clearTimeout(Number(link.dataset.copyTimer));
  link.dataset.copyTimer = String(
    window.setTimeout(() => {
      meta.textContent = meta.dataset.originalText ?? '';
      link.classList.remove('is-copied');
    }, FEEDBACK_DURATION_MS),
  );
}

export function initContactMethods(): void {
  document.addEventListener('click', handleClick);
}
