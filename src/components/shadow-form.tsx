"use client";

import React, { useRef, useEffect } from "react";
import { FormFields, handleFormSubmission } from "@/src/actions/register";

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
  { name: "%", type: "text", placeholder: "Name", autofocus: true },
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
    console.log(`Attempting to show error for ${id}: ${message}`);
    const errorElement = shadowRootRef.current?.getElementById(id);
    console.log("Error element found:", errorElement);
    if (errorElement) {
      errorElement.textContent = message;
      (errorElement as HTMLElement).style.display = "block";
      console.log("Error message set and displayed");
    } else {
      console.log(`Error element not found for id: ${id}`);
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
      style.textContent = `
        h2 {
          font-size: 2rem;
          text-align: center;
        }

        input, button {
          border-radius: 4px; margin: 10px 0; display: block;
          font-size: 1.25rem; outline: unset; color:
        }

        input {
          background: unset;
          color: #b7b7b7;
          border: 1px solid #2b2b2b;
          padding: 10px; 
        }

        input:focus,
        input:not(:placeholder-shown) {
          color: #ededed;
        }

        input:focus {
          outline: 1px solid #ededed;
        }

        button {
          background: #fefefe;
          font-weight: 500;
          padding: 16px 20px;
          margin: 2rem auto 0;
          
          cursor: pointer;
          transition: 0.2s ease-in-out;
        }

        button:focus,
        button:hover {
          filter: brightness(0.9);
        }
        
        .error { color: #ffb4b4; display: none; font-size: 1rem; }

        [aria-hidden] {
          position: absolute; z-index: -1; top: 0; left: 0; width: 0; height: 0;
          appearance: none; all: unset; border: none; outline: none; pointer-events: none;
          margin: 0; padding: 0; display: none;
        }
      `;
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
