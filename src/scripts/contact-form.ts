/**
 * Submit the contact form via fetch so we can show inline success/error states
 * without a full page reload. Falls back gracefully — without JS the form
 * does a regular POST and Web3Forms shows its default thank-you page.
 */
async function handleSubmit(event: SubmitEvent): Promise<void> {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  if (!form.matches('[data-contact-form]')) return;
  event.preventDefault();

  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const success = form.querySelector<HTMLElement>('[data-status="success"]');
  const error = form.querySelector<HTMLElement>('[data-status="error"]');

  if (success) success.hidden = true;
  if (error) error.hidden = true;
  if (submit) submit.disabled = true;

  try {
    const formData = new FormData(form);
    const res = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    });
    const data = await res.json().catch(() => ({} as Record<string, unknown>));
    const ok = res.ok && (data.success === true || data.success === undefined);
    if (!ok) throw new Error(typeof data.message === 'string' ? data.message : 'submission failed');
    if (success) success.hidden = false;
    form.reset();
  } catch {
    if (error) error.hidden = false;
  } finally {
    if (submit) submit.disabled = false;
  }
}

export function initContactForm(): void {
  document.addEventListener('submit', handleSubmit);
}
