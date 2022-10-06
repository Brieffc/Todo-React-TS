import * as React from "react";
//importo o modulo css
import styles from "./Header.module.css";

const Header: React.FunctionComponent = () => {
  return (
    //adiciono os estilo css a classe header
    <header className={styles.header}>
      <h1>React + TS Todo</h1>
    </header>
  );
};

//exporto o component para o app.tsx
export default Header;
