import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../src/config/routes";
import ServiceDocumentsService from "../../src/services/ServiceDocumentsService";
import UserService from "../../src/services/UserService";

function NewServiceDocument() {
  const router = useRouter()
  const [users, setUsers] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const insertServiceDocument = (serviceDocument) => {
    ServiceDocumentsService.create(serviceDocument).then((data) => {
      router.push(ROUTES.serviceDocuments.list)
      toast.success(`Documento criado com sucesso!`)
    }).catch((e) => console.error(e))
  }

  useEffect(() => {
    UserService.getAll().then((data) => setUsers(data))
  }, []);

  return (
    <>
      <p>Tela de Cadastro de Documento</p>
      <p>
        <Link
          href={{
            pathname: ROUTES.serviceDocuments.list,
          }}
        >
          Cancelar
        </Link>
      </p>

      <form onSubmit={handleSubmit((data) => insertServiceDocument(data))}>
        
        <div className="field">
          <label>Prestador</label>
          <select {...register("user_id", { pattern: /\d/ })}>
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
          <select {...register("tomador_id", { pattern: /\d/ })}>
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

export default NewServiceDocument;