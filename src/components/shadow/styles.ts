export const shadowStyles = `
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
