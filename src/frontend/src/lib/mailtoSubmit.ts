const CONTACT_EMAIL = "contact@weareinovics.com";
const WEB3FORMS_ACCESS_KEY = "df498dde-23c4-4163-8da6-1f764a11e96f";

export async function sendFormEmail(
  subject: string,
  fields: Record<string, string>,
): Promise<boolean> {
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject,
        from_name: "INOVICS Website",
        to_email: CONTACT_EMAIL,
        ...fields,
      }),
    });
    const result = await response.json();
    return result.success === true;
  } catch {
    return false;
  }
}
