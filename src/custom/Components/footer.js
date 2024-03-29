import React from "react";
import "../../styles/footer.css";
import logo from "../../images/logo.png";
export default function PageFooter() {
  return (
    <footer className="footer">
      <img className="footer__image" src={logo} alt="55" />
      <a className="help-me" href="/" alt="55">Help</a>
      <h1 className="footer__copyright">Copyrigh © 2023 KPGI</h1>
    </footer>
  );
}
