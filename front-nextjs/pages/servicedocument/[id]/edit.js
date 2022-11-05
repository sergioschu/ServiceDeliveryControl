import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../../src/config/routes";
import ServiceDocumentsService from "../../../src/services/ServiceDocumentsService";
import UserService from "../../../src/services/UserService";

function EditServiceDocuments() {
  const router = useRouter();
  const { id } = router.query;
  const [serviceDocument, setServiceDocument] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    UserService.getAll().then((data) => setUsers(data))
  }, []);

  useEffect(() => {
    ServiceDocumentsService.getById(id).then((data) => {
      setServiceDocument(data)
    })
  }, [id])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updateServiceDocument = (serviceDocument) => {
    if (serviceDocument.user_id === serviceDocument.tomador_id) {
      toast.success(`Prestador e Tomador não pode se igual!`)
      return;
    }
    ServiceDocumentsService.update(id, serviceDocument).then((data) => {
      router.push(ROUTES.serviceDocuments.list)
      toast.success(`Documento criado com sucesso!`)
    }).catch((e) => {
      toast.error(`Erro ao criar o documento: ${e.message}`)
    })
  }

  if (!serviceDocument || !users.length) return `Carregando...`

  return (
    <>
      <p>Página de Edição do documento: {id}</p>
      <p>
        <Link
          href={{
            pathname: ROUTES.serviceDocuments.list,
          }}
        >
          Cancelar
        </Link>
      </p>

      <form onSubmit={handleSubmit((data) => updateServiceDocument(data))}>
        <div className="field">
          <label>Prestador</label>
          <select {...register("user_id", { pattern: /\d/ })} defaultValue={serviceDocument.prestador.id}>
            <option>Selecione o prestador</option>
            {
              users.map((user) => {
                return <option key={user.id} value={user.id}>{user.name}</option>
              })
            }
          </select>
          {errors.user_id && <p>Prestador é obrigatório.</p>}
        </div>

        <div className="field">
          <label>Tomador</label>
          <select {...register("tomador_id", { pattern: /\d/ })} defaultValue={serviceDocument.tomador.id}>
            <option>Selecione o Tomador</option>
            {
              users.map((user) => {
                return <option key={user.id} value={user.id}>{user.name}</option>
              })
            }
          </select>
          {errors.user_id && <p>Tomador é obrigatório.</p>}
        </div>

        <input type="submit" />
      </form>
    </>
  );
}

export default EditServiceDocuments;