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
import ServiceDocumentsService from "../../src/services/ServiceDocumentsService";
import { Container } from "@mui/system";

import useSWR from 'swr'

function ServiceDocumentsList() {
  const [serviceDocuments, setServiceDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { data, error } = useSWR('servicedocuments', ServiceDocumentsService.getAll)

  const deleteServiceDocuments = (serviceDocument) => {
    var accepted = confirm(`Você realmente gostaria de deletar o documento: ${serviceDocument.id}`);
    if (!accepted) return;

    setIsLoading(true);
    ServiceDocumentsService.destroy(serviceDocument.id)
      .then((data) => {
        getServiceDocuments().then(() => {
          setIsLoading(false);
          toast.success("Documento excluído com sucesso!");
        });
      })
      .catch((e) => {
        setIsLoading(false);
        toast.error(`Erro ao excluir o documento: ${e.message}`);
      });
  };

  useEffect(() => {
    if (data === undefined) return

    setServiceDocuments(data);
    setIsLoading(false);
  }, [data, error]);

  if (isLoading) return <p>Carregando....</p>;

  return (
    <Container>
      <Grid container mt={2}>
        <Grid item xs={6}>
            <Typography variant="h4">Lista de Documentos</Typography>
        </Grid>
        <Grid item xs={6}>
          <p>
            <Link
              href={{
                pathname: ROUTES.serviceDocuments.new,
              }}
            >
              <Button variant="contained" color="success" size="small" startIcon={<DeleteForeverIcon fontSize="small" />}>
                Novo Documento
              </Button>
            </Link>
          </p>
        </Grid>
        <Grid item xs={12}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Prestador</th>
                <th>Tomador</th>
                <th>Created At</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {serviceDocuments.map((serviceDocuments) => {
                return (
                  <tr key={serviceDocuments.id}>
                    <td>{serviceDocuments.id}</td>
                    <td>{serviceDocuments.prestador.name}</td>
                    <td>{serviceDocuments.tomador.name}</td>
                    <td>{serviceDocuments.created_at}</td>
                    <td>
                      <Link
                        href={{
                          pathname: ROUTES.serviceDocuments.show,
                          query: {
                            id: serviceDocuments.id,
                          },
                        }}
                      >
                        <Button variant="contained" size="small">
                          <VisibilityIcon fontSize="small" />
                        </Button>
                      </Link>
                      <Link
                        href={{
                          pathname: ROUTES.serviceDocuments.edit,
                          query: {
                            id: serviceDocuments.id,
                          },
                        }}
                      >
                        <Button variant="contained" color="warning" size="small">
                          <EditIcon fontSize="small" />
                        </Button>
                      </Link>
                      <Button variant="contained" color="error" size="small" onClick={() => deleteServiceDocuments(serviceDocuments)}>
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

export default ServiceDocumentsList;