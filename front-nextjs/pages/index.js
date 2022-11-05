import styles from "../styles/Home.module.css";

import { Button } from "@mui/material";

// Material Icons
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PageviewIcon from '@mui/icons-material/Pageview';

import ROUTES from "../src/config/routes";

// Next
import Link from "next/link";

export default function Home() {

  return (
    <>
      <h1 className={styles["title-red"]}>Primeiro Projeto em Next.js</h1>

      <p>
        <Link
          href={{
            pathname: ROUTES.services.list,
          }}
        >
          <Button variant="contained" color="success" size="small" startIcon={<PageviewIcon fontSize="small" />}>
            Serviços
          </Button>
        </Link>
      </p>
      <p>
        <Link
          href={{
            pathname: ROUTES.users.list,
          }}
        >
          <Button variant="contained" color="success" size="small" startIcon={<PageviewIcon fontSize="small" />}>
            Usuários
          </Button>
        </Link>
      </p>
      <p>
        <Link
          href={{
            pathname: ROUTES.serviceDocuments.list,
          }}
        >
          <Button variant="contained" color="success" size="small" startIcon={<PageviewIcon fontSize="small" />}>
            Lançar serviços
          </Button>
        </Link>
      </p>
    </>
  );
}