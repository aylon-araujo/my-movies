import React, { useEffect,useState } from "react";
import { FaArrowUp } from "react-icons/fa";

import styles from "./FloatingButton.module.scss";

const FloatingButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      className={`${styles.floatingButton} ${
        isVisible ? styles.visible : styles.hidden
      }`}
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
    >
      <FaArrowUp className={styles.icon} />
    </button>
  );
};

export default FloatingButton;
