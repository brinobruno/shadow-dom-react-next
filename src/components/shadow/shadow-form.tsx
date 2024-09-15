"use client";

import React, { useRef, useEffect } from "react";
import { FormFields, handleFormSubmission } from "@/src/actions/register";
import { shadowStyles } from "./styles";

interface InputConfig {
  name: keyof FormFields;
  type: string;
  errorId?: string;
  placeholder: string;
  autoComplete?: string;
  autofocus?: boolean;
  hidden?: boolean;
}

const inputConfigs: InputConfig[] = [
  {
    name: "%",
    type: "text",
    errorId: "name-error",
    placeholder: "Name",
    autofocus: true,
  },
  { name: "@", type: "email", errorId: "email-error", placeholder: "Email" },
  {
    name: "$",
    type: "password",
    errorId: "password-error",
    placeholder: "Password",
  },
  {
    name: "C",
    type: "password",
    errorId: "confirm-error",
    placeholder: "Confirm Password",
  },
];

const ShadowForm: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const shadowRootRef = useRef<ShadowRoot | null>(null);

  const showError = (id: string, message: string) => {
    const errorElement = shadowRootRef.current?.getElementById(id);

    if (errorElement) {
      errorElement.textContent = message;
      (errorElement as HTMLElement).style.display = "block";
    }
  };

  useEffect(() => {
    if (formRef.current && !shadowRootRef.current) {
      shadowRootRef.current = formRef.current.attachShadow({ mode: "closed" });

      const form = document.createElement("form");
      form.noValidate = true;

      form.innerHTML = `
        <h2>Register</h2>

        <div class="fields">
          <input type="text" name="name" aria-hidden>
          
          ${inputConfigs
            .map((config) => {
              return `
              <div class="field">
                <input
                  required
                  name="${String(config.name)}"
                  type="${config.type}"
                  placeholder="${config.placeholder}"
                  autoComplete="${config.autoComplete || "off"}"
                  ${config.autofocus ? "autofocus" : ""}
                />
                <div id="${config.errorId}" class="error"></div>
              </div>
            `;
            })
            .join("")}
        </div>

        <button type="submit">Sign up</button>
      `;

      const style = document.createElement("style");
      style.textContent = shadowStyles;
      form.appendChild(style);

      form.onsubmit = (e: Event) => {
        e.preventDefault();
        const formElement = e.target as HTMLFormElement;
        const formData = new FormData(formElement);

        // Reset error messages
        shadowRootRef.current
          ?.querySelectorAll(".error")
          .forEach((el) => ((el as HTMLElement).style.display = "none"));

        handleFormSubmission(formData, showError);
      };

      shadowRootRef.current.appendChild(form);
    }
  }, []);

  return <div ref={formRef}></div>;
};

export default ShadowForm;
