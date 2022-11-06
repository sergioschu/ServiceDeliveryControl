import { useRouter } from "next/router";
import { useEffect } from "react";

function ShowService() {
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    console.log("ROUTE", router)
  }, [])

  return (
    <p>Exibindo o Serviço: {id}</p>
  );
}

export default ShowService;