/**
 * EmailJS REST send — supports accessToken when strict mode (private key) is enabled.
 * The browser SDK does not pass private keys; this matches the REST API docs.
 */
export async function sendEmailJS({
  serviceId,
  templateId,
  publicKey,
  privateKey,
  templateParams,
}) {
  const body = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    template_params: templateParams,
  };

  if (privateKey) {
    body.accessToken = privateKey;
  }

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const text = await response.text();

  if (!response.ok) {
    const error = new Error(text || 'EmailJS request failed');
    error.status = response.status;
    throw error;
  }

  return { status: response.status, text };
}
