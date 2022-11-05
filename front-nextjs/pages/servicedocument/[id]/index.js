import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ROUTES from "../../../src/config/routes";
import ServiceDocumentsService from "../../../src/services/ServiceDocumentsService";
import useSWR from 'swr'

function ShowServiceDocument() {
  const router = useRouter()
  const { id } = router.query

  const { data, error } = useSWR(id, ServiceDocumentsService.getById)

  const [serviceDocument, setServiceDocument] = useState(null);

  useEffect(() => {
    setServiceDocument(data)
  }, [data, error]);

  if (!serviceDocument) return `Carregando...`

  return (
    <>
      <p>Exibindo o Serviço: {id}</p>

      <p>
        <Link
          href={{
            pathname: ROUTES.serviceDocuments.list,
          }}
        >
          Voltar
        </Link>
      </p>

      <dl>
        <dt>ID</dt>
        <dd>{serviceDocument.id}</dd>

        <dt>Prestador</dt>
        <dd>{serviceDocument.prestador.name}</dd>

        <dt>Tomador</dt>
        <dd>{serviceDocument.tomador.name}</dd>

        <dt>Created At</dt>
        <dd>{serviceDocument.created_at}</dd>
      </dl>
    </>
  );
}

export default ShowServiceDocument;