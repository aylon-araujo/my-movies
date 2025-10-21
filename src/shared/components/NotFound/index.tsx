import type { FC } from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { MainRoutes } from "@app/routes/Main/routes";

import { Button } from "../Button";
import styles from "./NotFound.module.scss";

const NotFound: FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.notFoundHead}>404</h1>

      <p className={styles.notFoundBody}>¯\_(ツ)_/¯</p>

      <Button
        variant="primary"
        size="large"
        onClick={() => navigate(MainRoutes.HOME)}
      >
        <FaHome /> Voltar para Home
      </Button>
    </div>
  );
};

export default NotFound;
