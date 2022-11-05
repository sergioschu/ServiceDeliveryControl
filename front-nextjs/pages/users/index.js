import { useEffect, useState } from "react";

// Next
import Link from "next/link";

// Libs
import { Button, Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";

// Material Icons
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Internals
import ROUTES from "../../src/config/routes";
import UserService from "../../src/services/UserService";
import { Container } from "@mui/system";

import useSWR from 'swr'

function UserList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data, error } = useSWR('users', UserService.getAll)

  const deleteUser = (user) => {
    var accepted = confirm(`Você realmente gostaria de deletar o usuário: ${user.name}`);
    if (!accepted) return;

    setIsLoading(true);
    UserService.destroy(user.id)
      .then((data) => {
        getUsers().then(() => {
          setIsLoading(false);
          toast.success("Usuário excluido com sucesso!");
        });
      })
      .catch((e) => {
        setIsLoading(false);
        toast.error(`Erro ao excluir um usuário: ${e.message}`);
      });
  };

  useEffect(() => {
    if (data === undefined) return

    setUsers(data);
    setIsLoading(false);
  }, [data, error]);

  if (isLoading) return <p>Carregando....</p>;

  return (
    <Container>
      <Grid container mt={2}>
        <Grid item xs={6}>
          <Typography variant="h4">Lista de Usuários</Typography>

          <p>
            <Link
              href={{
                pathname: ROUTES.users.new,
              }}
            >
              <Button variant="contained" color="success" size="small" startIcon={<DeleteForeverIcon fontSize="small" />}>
                Novo Usuário
              </Button>
            </Link>
          </p>
        </Grid>
        <Grid item xs={12}>
        <table border={"2px"}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>E-mail</th>
                <th>Created At</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.created_at}</td>
                    <td>
                      <tr>
                        <td>
                          <Link
                            href={{
                              pathname: ROUTES.users.show,
                              query: {
                                id: user.id,
                              },
                            }}
                          >
                            <Button variant="contained" size="small">
                              <VisibilityIcon fontSize="small" />
                            </Button>
                          </Link>
                        </td>

                        <td>
                          <Link
                            href={{
                              pathname: ROUTES.users.edit,
                              query: {
                                id: user.id,
                              },
                            }}
                          >
                            <Button variant="contained" color="warning" size="small">
                              <EditIcon fontSize="small" />
                            </Button>
                          </Link>
                        </td>

                        <td>
                          <Button variant="contained" color="error" size="small" onClick={() => deleteUser(user)}>
                            <DeleteForeverIcon fontSize="small" />
                          </Button>
                        </td>
                      </tr>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserList;