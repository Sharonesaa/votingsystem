'use client';
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Boton from "../ui/Boton";
import Input from "../ui/Input";
import InputFile from "../ui/InputFile";
import Textarea from "../ui/Textarea";
import Select from "../ui/Select";
import { Tooltip } from 'react-tooltip';
import Spinner from "../ui/Spinner";



const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;


const CreateCandidate : React.FC<{ id: string }> = ({ id }) => {

 
  const userId =id
  const [postulation, setPostulation] = useState<string>("");
  const [list, setList] = useState<string>("");
  const [campaignDescription, setCampaignDescription] = useState<string>("");
  const [proposals, setProposals] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [campaigns, setCampaigns] = useState<{ id: string; name: string }[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchCampaigns = async () => {
      const localUser = localStorage.getItem("userSession")
      const localUserParsed = JSON.parse(localUser!);
      const actualUserId = localUserParsed.userData.id
      
      try {
        const response = await fetch(`${APIURL}/campaigns/user/${actualUserId}`);
        if (!response.ok) throw new Error("Error al obtener campañas");
        const data = await response.json();
        setCampaigns(data); // Asegúrate de que el formato de data sea el correcto
      } catch (error) {
        console.error("Error al cargar campañas:", error);
      }
    };

    fetchCampaigns();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleProposalsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setProposals(value.split("\n"));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("postulation", postulation);
    formData.append("list", list);
    formData.append("campaignDescription", campaignDescription);
    formData.append("proposals", JSON.stringify(proposals));
    formData.append("userId", userId!); // Usar el userId del contexto
    formData.append("campaignId", selectedCampaignId); // Usar el campaignId seleccionado
    if (file) {
      formData.append("file", file);
    }
    try {
      const response = await fetch(`${APIURL}/candidates`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        
        throw new Error( errorData.message || "Error en la creación del candidato");
      }
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Candidato creado exitosamente.',
      }).then(() => {
        window.location.href = `/campaigndesc?campaignId=${selectedCampaignId}`;
      });
    
    } catch (error) {
      if (error instanceof Error) {
        
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        }).then(() => {
          window.location.href = `/users`;
        });
      }
    } finally {
      setLoading(false); 
    }
  };
  return (
    <div className="flex w-[60%] justify-center items-center h-[80%] p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="w-11/12 space-y-4">
        <h1 className="text-lg font-bold text-center">Crear Candidato</h1>

        {/* Postulación */}
        <Input
          type="text"
          placeholder="Postulación"
          value={postulation}
          onChange={(e) => setPostulation(e.target.value)}
          required
          data-tooltip-id="postulation-tooltip"
          data-tooltip-content="Introduce el nombre de la postulación"
        />
        <Tooltip id="postulation-tooltip" />

        {/* Lista */}
        <Input
          type="text"
          placeholder="Lista"
          value={list}
          onChange={(e) => setList(e.target.value)}
          required
          data-tooltip-id="list-tooltip"
          data-tooltip-content="Indica el nombre de la lista"
        />
        <Tooltip id="list-tooltip" />

        {/* Propuestas */}
        <div className="rounded-md">
          <label className="block text-sm font-medium text-gray-700">Propuestas</label>
          <Textarea
            value={proposals.join("\n")}
            onChange={handleProposalsChange}
            placeholder="Escribe cada propuesta en una nueva línea"
            data-tooltip-id="proposals-tooltip"
            data-tooltip-content="Separa cada propuesta con un salto de línea"
          />
          <Tooltip id="proposals-tooltip" />
        </div>

        {/* Campaña */}
        <div className="rounded-md">
          <label className="block text-sm font-medium text-gray-700">Campaña</label>
          <Select
            value={selectedCampaignId}
            onChange={(e) => setSelectedCampaignId(e.target.value)}
            required
            data-tooltip-id="campaign-tooltip"
            data-tooltip-content="Selecciona una campaña relacionada"
          >
            <option value="">Seleccione una campaña</option>
            {campaigns.map(campaign => (
              <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
            ))}
          </Select>
          <Tooltip id="campaign-tooltip" />
        </div>

        {/* Imagen del candidato */}
        <div className="rounded-md">
          <label className="block text-sm font-medium text-gray-700">Imagen del candidato (JPG)</label>
          <InputFile
            type="file"
            accept="image/jpeg"
            onChange={handleFileChange}
            data-tooltip-id="image-tooltip"
            data-tooltip-content="Sube una imagen en formato JPG"
          />
          <Tooltip id="image-tooltip" />
        </div>

        {/* Botón de Crear */}
        <div className="flex justify-center">
          <div className="w-[20%]">
            <Boton disabled={loading}>
               {loading ? <Spinner /> : 'Crear Candidato'} {/* Mostrar el spinner o el texto */}
            </Boton>
          </div>
        </div>
      </form>
    </div>
  );
};
export default CreateCandidate;