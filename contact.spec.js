const { test, expect } = require("@playwright/test");

test("should submit contact form and redirect to WhatsApp", async ({
  page,
}) => {
  // 1. כניסה לאתר
  await page.goto("https://avraham-ovadia.netlify.app/");

  // 2. מילוי הטופס
  await page.fill("#name", "Israel Israeli");
  await page.fill("#phone", "0501234567");
  await page.fill("#message", "שלום, אשמח להצעת מחיר");

  await page.pause();

  // 3. לחיצה על כפתור השליחה
  // כאן אנחנו עושים שני דברים במקביל:
  // מחכים שייפתח טאב חדש
  //  לוחצים על הכפתור
  const [newPage] = await Promise.all([
    page.waitForEvent("popup"),
    page.click('button[type="submit"]'),
  ]);

  await newPage.waitForLoadState("domcontentloaded");

  // נבדוק שהכתובת של הטאב החדש היא אכן וואטסאפ
  await expect(newPage).toHaveURL(/.*whatsapp\.com.*/);
});
