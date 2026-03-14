/**
 * 📋 Jugaad Form Validator - Indian Style!
 *
 * India mein form bharna ek art hai! College admission ka form validate
 * karna hai. Har field ke apne rules hain. Tujhe ek errors object return
 * karna hai jisme galat fields ke error messages hain. Agar sab sahi hai
 * toh empty errors object aur isValid = true.
 *
 * formData object:
 *   { name, email, phone, age, pincode, state, agreeTerms }
 *
 * Validation Rules:
 *   1. name: must be a non-empty trimmed string, min 2 chars, max 50 chars
 *      Error: "Name must be 2-50 characters"
 *
 *   2. email: must be a string containing exactly one "@" and at least one "."
 *      after the "@". Use indexOf(), lastIndexOf(), includes().
 *      Error: "Invalid email format"
 *
 *   3. phone: must be a string of exactly 10 digits, starting with 6, 7, 8, or 9
 *      (Indian mobile numbers). Check each char is a digit.
 *      Error: "Invalid Indian phone number"
 *
 *   4. age: must be a number between 16 and 100 inclusive, and an integer.
 *      JUGAAD: Agar string mein number diya hai (e.g., "22"), toh parseInt()
 *      se convert karo. Agar convert nahi ho paya (isNaN), toh error.
 *      Error: "Age must be an integer between 16 and 100"
 *
 *   5. pincode: must be a string of exactly 6 digits, NOT starting with "0"
 *      Error: "Invalid Indian pincode"
 *
 *   6. state: Use optional chaining (?.) and nullish coalescing (??) -
 *      if state is null/undefined, treat as "". Must be a non-empty string.
 *      Error: "State is required"
 *
 *   7. agreeTerms: must be truthy (Boolean(agreeTerms) === true).
 *      Falsy values: 0, "", null, undefined, NaN, false
 *      Error: "Must agree to terms"
 *
 * Return:
 *   { isValid: boolean, errors: { fieldName: "error message", ... } }
 *   - isValid is true ONLY when errors object has zero keys
 *
 * Hint: Use typeof, Boolean(), parseInt(), isNaN(), Number.isInteger(),
 *   ?. (optional chaining), ?? (nullish coalescing), Object.keys(),
 *   startsWith(), trim(), length
 *
 * @param {object} formData - Form fields to validate
 * @returns {{ isValid: boolean, errors: object }}
 *
 * @example
 *   validateForm({
 *     name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210",
 *     age: 20, pincode: "400001", state: "Maharashtra", agreeTerms: true
 *   })
 *   // => { isValid: true, errors: {} }
 *
 *   validateForm({
 *     name: "", email: "bad-email", phone: "12345", age: 10,
 *     pincode: "0123", state: null, agreeTerms: false
 *   })
 *   // => { isValid: false, errors: { name: "...", email: "...", ... } }
 */
export function validateForm(formData) {
  const errors = {};

  if (!formData || typeof formData !== "object") {
    return { isValid: false, errors };
  }

  // 1. Name: non-empty trimmed string, 2-50 chars
  const rawName = formData.name ?? "";
  const name = typeof rawName === "string" ? rawName.trim() : "";
  if (name.length < 2 || name.length > 50) {
    errors.name = "Name must be 2-50 characters";
  }

  // 2. Email: exactly one "@" and at least one "." after "@"
  const email = typeof formData.email === "string" ? formData.email : "";
  const atIndex = email.indexOf("@");
  const lastAtIndex = email.lastIndexOf("@");
  const afterAt = atIndex !== -1 ? email.slice(atIndex + 1) : "";
  const dotAfterAtIndex = afterAt.indexOf(".");
  const validEmail =
    atIndex > 0 &&
    atIndex === lastAtIndex &&
    dotAfterAtIndex > 0; // there is a '.' and not immediately after '@'
  if (!validEmail) {
    errors.email = "Invalid email format";
  }

  // 3. Phone: string of exactly 10 digits, starting with 6,7,8,9
  const phone = typeof formData.phone === "string" ? formData.phone : "";
  const phoneValid =
    phone.length === 10 &&
    /^[0-9]{10}$/.test(phone) &&
    ["6", "7", "8", "9"].includes(phone[0]);
  if (!phoneValid) {
    errors.phone = "Invalid Indian phone number";
  }

  // 4. Age: integer between 16 and 100, with jugaad for string numbers
  let age = formData.age;
  if (typeof age === "string") {
    age = parseInt(age, 10);
  }

  const ageNumber = typeof age === "number" ? age : NaN;
  const ageValid =
    !Number.isNaN(ageNumber) &&
    Number.isInteger(ageNumber) &&
    ageNumber >= 16 &&
    ageNumber <= 100;
  if (!ageValid) {
    errors.age = "Age must be an integer between 16 and 100";
  }

  // 5. Pincode: string of exactly 6 digits, not starting with "0"
  const pincode = typeof formData.pincode === "string" ? formData.pincode : "";
  const pincodeValid =
    pincode.length === 6 &&
    /^[0-9]{6}$/.test(pincode) &&
    !pincode.startsWith("0");
  if (!pincodeValid) {
    errors.pincode = "Invalid Indian pincode";
  }

  // 6. State: null/undefined treated as "", must be non-empty string
  const stateVal = formData.state ?? "";
  const stateStr =
    typeof stateVal === "string" ? stateVal : String(stateVal ?? "");
  if (stateStr.trim() === "") {
    errors.state = "State is required";
  }

  // 7. agreeTerms: must be truthy
  if (!Boolean(formData.agreeTerms)) {
    errors.agreeTerms = "Must agree to terms";
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}
