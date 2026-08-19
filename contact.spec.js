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

  //  לחיצה על כפתור השליחה
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



// בדיקת ולידציה בטופס אם נכניס מספר לא תקין מה יקרה
test("should show validation error on invalid phone number", async ({
  page,
}) => {
  await page.goto("https://avraham-ovadia.netlify.app/");

  // מילוי מספר לא תקין
  await page.fill("#name", "Israel Israeli");
  await page.fill("#phone", "abc"); // מספר לא תקין
  await page.click('button[type="submit"]');

  // בדיקה שהטופס לא נשלח (נשארים באותו עמוד או מופיעה אזהרה)
  await expect(page).toHaveURL("https://avraham-ovadia.netlify.app/");
});



// בדיקת תקינות של כותרת האתר או אלמנט מרכזי
test("should display the correct main heading on the page", async ({
  page,
}) => {
  await page.goto("https://avraham-ovadia.netlify.app/");

  // בדיקה שהכותרת הראשית (למשל h1) קיימת ורואים אותה
  const mainHeading = page.locator("h1");
  await expect(mainHeading).toBeVisible();
});



// Responsive Test - בדיקת נראות הכפתור במסך מובייל (עם גלילה)
test("submit button should be visible on mobile viewport", async ({ page }) => {
  // הדמיית גודל מסך של טלפון נייד (אייפון)
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("https://avraham-ovadia.netlify.app/");

  // הגדרת משתנה לכפתור
  const submitButton = page.locator('button[type="submit"]');

  // גלילה אל הכפתור כדי לוודא שהוא נכנס לשדה הראייה של המסך
  await submitButton.scrollIntoViewIfNeeded();

  // בדיקה שהוא מוצג ונגיש
  await expect(submitButton).toBeVisible();
});

