function getPasswordStrength(password) { // rename
  const lengthRule = password.length >= 8;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*()_\-+=]/.test(password);

  const score = [hasLower, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;

  if (!lengthRule) return "Terlalu Pendek";
  if (score <= 1) return "Lemah";
  if (score === 2 || score === 3) return "Sedang";
  if (score === 4) return "Kuat";
}

function getPasswordStrengthLevel(password) {
  const lengthRule = password.length >= 8;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*()_\-+=]/.test(password);

  const score = [hasLower, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;

  if (!lengthRule) return { level: "Terlalu Pendek", score: 0 };
  if (score <= 1) return { level: "Lemah", score: 1 };
  if (score === 2 || score === 3) return { level: "Sedang", score: 2 };
  if (score === 4) return { level: "Kuat", score: 3 };
}




export { getPasswordStrength, getPasswordStrengthLevel }
