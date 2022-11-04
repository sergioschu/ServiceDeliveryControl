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
import ServiceService from "../../src/services/ServiceService";
import { Container } from "@mui/system";

import useSWR from 'swr'

function ServiceList() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { data, error } = useSWR('services', ServiceService.getAll)

  const deleteService = (service) => {
    var accepted = confirm(`Você realmente gostaria de deletar o serviço: ${service.name}`);
    if (!accepted) return;

    setIsLoading(true);
    ServiceService.destroy(service.id)
      .then((data) => {
        getServices().then(() => {
          setIsLoading(false);
          toast.success("Service destroyed sucessfully!");
        });
      })
      .catch((e) => {
        setIsLoading(false);
        toast.error(`Erro when destroying Service: ${e.message}`);
      });
  };

  const getServices = async () => {
    console.log(data);
    
  };

  useEffect(() => {
    if (data === undefined) return

    setServices(data);
    setIsLoading(false);
  }, [data, error]);

  if (isLoading) return <p>Carregando....</p>;

  return (
    <Container>
      <Grid container mt={2}>
        <Grid item xs={6}>
            <Typography variant="h4">Lista de Serviços</Typography>
        </Grid>
        <Grid item xs={6}>
          <p>
            <Link
              href={{
                pathname: ROUTES.services.new,
              }}
            >
              <Button variant="contained" color="success" size="small" startIcon={<DeleteForeverIcon fontSize="small" />}>
                Novo Serviço
              </Button>
            </Link>
          </p>
        </Grid>
        <Grid item xs={12}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Created At</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => {
                return (
                  <tr key={service.id}>
                    <td>{service.id}</td>
                    <td>{service.name}</td>
                    <td>{service.created_at}</td>
                    <td>
                      <Link
                        href={{
                          pathname: ROUTES.services.show,
                          query: {
                            id: service.id,
                          },
                        }}
                      >
                        <Button variant="contained" size="small">
                          <VisibilityIcon fontSize="small" />
                        </Button>
                      </Link>
                      <Link
                        href={{
                          pathname: ROUTES.services.edit,
                          query: {
                            id: service.id,
                          },
                        }}
                      >
                        <Button variant="contained" color="warning" size="small">
                          <EditIcon fontSize="small" />
                        </Button>
                      </Link>
                      <Button variant="contained" color="error" size="small" onClick={() => deleteService(service)}>
                        <DeleteForeverIcon fontSize="small" />
                      </Button>
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

export default ServiceList;