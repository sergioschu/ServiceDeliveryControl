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

    if (serviceDocument.user_id === serviceDocument.tomador_id) {
      toast.success(`Prestador e Tomador não pode se igual!`)
      return;
    }

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
      <p align="center">Tela de Cadastro de Documento</p>


      <form onSubmit={handleSubmit((data) => insertServiceDocument(data))}>
        <table align="center" border={"1px"}>
          <tr>
            <td colSpan={2}>
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
            </td>
          </tr>

          <tr>
            <td colSpan={2}>
              <div className="field">
                <label>Tomador </label>
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
            </td>
          </tr>

          <tr>
            <td>
              <input type="submit" />
            </td>

            <td>
              <p>
                <Link
                  href={{
                    pathname: ROUTES.serviceDocuments.list,
                  }}
                >
                  Cancelar
                </Link>
              </p>
            </td>
          </tr>
        </table>
      </form>
    </>
  );
}

export default NewServiceDocument;