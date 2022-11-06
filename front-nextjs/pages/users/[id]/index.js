import { useRouter } from "next/router";
import { useEffect } from "react";

function ShowUser() {
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    console.log("ROUTE", router)
  }, [])

  return (
    <p>Exibindo o Usuário: {id}</p>
  );
}

export default ShowUser;