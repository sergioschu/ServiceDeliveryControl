import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../src/config/routes";
import UserService from "../../src/services/UserService";

function NewUser() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const insertUser = (user) => {
    user.active = true;
    UserService.create(user).then((data) => {
      router.push(ROUTES.users.list)
      toast.success(`Usário criado com sucesso!`)
    }).catch((e) => console.error(e))
  }

  return (
    <>
      <p>Tela de Cadastro de Usuários</p>
      <p>
        <Link
          href={{
            pathname: ROUTES.users.list,
          }}
        >
          Cancelar
        </Link>
      </p>

      <form onSubmit={handleSubmit((data) => insertUser(data))}>
        <div className="field">
          <label>Nome</label>
          <input {...register("name", { required: true })} />
          {errors.name && <p>name is required.</p>}
        </div>

        <div className="field">
          <label>E-mail</label>
          <input {...register("email", { required: true })} />
          {errors.email && <p>email is required.</p>}
        </div>

        <div className="field">
          <label>Senha</label>
          <input {...register("password_digest", { required: true })} />
          {errors.password_digest && <p>Senha é obrigatória.</p>}
        </div>

        <input type="submit" />
      </form>
    </>
  );
}

export default NewUser;