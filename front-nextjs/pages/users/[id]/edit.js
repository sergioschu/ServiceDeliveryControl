import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../../src/config/routes";
import UserService from "../../../src/services/UserService";

function EditUser() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    UserService.getById(id).then((data) => {
      setUser(data)
    })
  }, [id])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updateUser = (user) => {
    UserService.update(id, user).then((data) => {
      router.push(ROUTES.users.list)
      toast.success(`Usuário atualizado com sucesso!`)
    }).catch((e) => {
      toast.error(`Erro ao atualizar o usuário: ${e.message}`)
    })
  }

  if (!user) return `Carregando...`

  return (
    <>
      <p>Página de Edição do usuário: {id}</p>
      <p>
        <Link
          href={{
            pathname: ROUTES.users.list,
          }}
        >
          Cancelar
        </Link>
      </p>

      <form onSubmit={handleSubmit((data) => updateUser(data))}>
        <div className="field">
          <label>Nome</label>
          <input {...register("name", { required: true })} defaultValue={user.name} />
          {errors.name && <p>Nome é obrigatório.</p>}
        </div>

        <div className="field">
          <label>E-mail</label>
          <input {...register("email", { required: true })} defaultValue={user.email} />
          {errors.email && <p>E-mail é obrigatório.</p>}
        </div>

        <div className="field">
          <label>Senha</label>
          <input {...register("password_digest", { required: true })} defaultValue={user.password_digest}/>
          {errors.password_digest && <p>Senha é obrigatória.</p>}
        </div>

        <input type="submit" />
      </form>
    </>
  );
}

export default EditUser;