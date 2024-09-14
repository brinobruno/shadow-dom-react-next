export interface FormFields {
  name?: string;
  ["%"]: string;
  ["@"]: string;
  ["$"]: string;
  ["C"]: string;
}

const FIELD = {
  HONEYPOT: "name",
  NAME: "%",
  EMAIL: "@",
  PASSWORD: "$",
  CONFIRM_PASSWORD: "C",
} as const;

export function handleFormSubmission(
  formData: FormData,
  showError: (id: string, message: string) => void
) {
  // Check honeypot
  if (formData.get(FIELD.HONEYPOT)) {
    console.log("Potential crawler detected. Form submission prevented.");
    return;
  }

  // Validate form
  let isValid = true;

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.get(FIELD.EMAIL) as string)) {
    showError("email-error", "Email address is invalid");
    isValid = false;
  }

  // Password validation
  const password = formData.get(FIELD.PASSWORD) as string;
  if (password.length < 8) {
    showError("password-error", "Password is not strong enough");
    isValid = false;
  }

  // Confirm password validation
  if (password !== formData.get(FIELD.CONFIRM_PASSWORD)) {
    showError("confirm-error", "Passwords do not match");
    isValid = false;
  }

  if (isValid) {
    const data: FormFields = {
      [FIELD.EMAIL]: formData.get(FIELD.EMAIL) as string,
      [FIELD.NAME]: formData.get(FIELD.NAME) as string,
      [FIELD.PASSWORD]: password,
      [FIELD.CONFIRM_PASSWORD]: formData.get(FIELD.CONFIRM_PASSWORD) as string,
    };

    // Here you would typically send the data to your server
    console.log("Form submitted:", data);
  }
}