import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    border: 0;
    box-sizing: border-box;
    cursor: default;
    font-variant-numeric: tabular-nums;
    margin: 0;
    outline: 0;
    padding: 0;
    -webkit-touch-callout: none;
    user-select: none;
  }

  body {
    font-family: ${({ theme }) => theme.formats.systemFont};
    height: 100%;
    overflow: hidden;
  }

  input::selection,
  textarea::selection {
    background-color: rgb(0, 120, 215);
    color: #fff;
  }

  input, textarea {
    cursor: text;
    user-select: text;
  }

  ol,
  ul {
    list-style: none;
  }
`;

export default GlobalStyle;
