import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../../src/config/routes";
import ServiceService from "../../../src/services/ServiceService";

function EditService() {
  const router = useRouter();
  const { id } = router.query;
  const [service, setService] = useState(null);

  useEffect(() => {
    ServiceService.getById(id).then((data) => {
      setService(data)
    })
  }, [id])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updateService = (service) => {
    ServiceService.update(id, service).then((data) => {
      router.push(ROUTES.services.list)
      toast.success(`Service successfully updated!`)
    }).catch((e) => {
      toast.error(`Erro when updating service: ${e.message}`)
    })
  }

  if (!service) return `Carregando...`

  return (
    <>
      <p>Página de Edição do serviço: {id}</p>
      <p>
        <Link
          href={{
            pathname: ROUTES.services.list,
          }}
        >
          Cancelar
        </Link>
      </p>

      <form onSubmit={handleSubmit((data) => updateService(data))}>
        <div className="field">
          <label>Nome</label>
          <input {...register("name", { required: true })} defaultValue={service.name} />
          {errors.name && <p>name is required.</p>}
        </div>

        <input type="submit" />
      </form>
    </>
  );
}

export default EditService;