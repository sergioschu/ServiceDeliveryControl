import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../src/config/routes";
import ServiceService from "../../src/services/ServiceService";

function NewService() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const insertService = (service) => {
    service.active = true;
    ServiceService.create(service).then((data) => {
      router.push(ROUTES.services.list)
      toast.success(`Service successfully created!`)
    }).catch((e) => console.error(e))
  }

  return (
    <>
    
      <p align="center">Tela de Cadastro de Serviços</p>

      
      <form onSubmit={handleSubmit((data) => insertService(data))}>
        <table align="center" border={"1px"}>
          <tr>
            <td colSpan={2}>
              <div className="field">
                <label>Nome</label>
                <input {...register("name", { required: true })} />
                {errors.name && <p>name is required.</p>}
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <input type="submit"/>
            </td>

            <td>
              <p>
                <Link
                  href={{
                    pathname: ROUTES.services.list,
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

export default NewService;