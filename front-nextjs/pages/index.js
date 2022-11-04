import styles from "../styles/Home.module.css";

import { Button } from "@mui/material";

export default function Home() {

  return (
    <>
      <h1 className={styles["title-red"]}>Primeiro Projeto em Next.js</h1>

      <Button
        variant="contained"
        color="success"
        size="small"
        onClick={(e) => {
          e.preventDefault();
          signIn();
        }}
      >
        Usuários
      </Button>
      <br></br>
      <br></br>
      <Button
        variant="contained"
        color="success"
        size="small"
        onClick={(e) => {
          e.preventDefault();
          newUser();
        }}
      >
        Serviços
      </Button>
      <br></br>
      <br></br>
      <Button
        variant="contained"
        color="success"
        size="small"
        onClick={(e) => {
          e.preventDefault();
          newUser();
        }}
      >
        Lançar serviços
      </Button>      
    </>
  );
}