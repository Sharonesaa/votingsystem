'use client';
import React, { useEffect, useState } from 'react';
import ICampaign from '@/interfaces/ICampaign';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/Authontext';
import Spinner from '../ui/Spinner';


const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

const CampaignsTable = () => {
    const { userData } = useAuth();
    const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [roles, setRoles] = useState<string[]>([]);
    const [groups, setGroups] = useState<string[]>([]);
    const pathname = usePathname();
    const router = useRouter();
    const [selectedCampaigns, setSelectedCampaigns] = useState<ICampaign[]>([]);

    useEffect(() => {
        if (userData) {
            setRoles(userData.userData.roles.map(role => role.name));
            setGroups(userData.userData.groups.map(group => group.id).filter((group): group is string => group !== undefined));
        }
    }, [userData]);

    useEffect(() => {
        if (userData?.userData.id) {
            fetchCampaigns();
        }
    }, [roles, groups, userData, pathname]);

    const fetchCampaigns = async () => {
        if (!userData?.userData.id) {
            setLoading(false);
            return;
        }

        const actualUser = String(userData?.userData.id);
       
        try {                
            let response;
        
            if (roles.includes('candidate') || roles.includes('voter')) {
                response = await fetch(`${APIURL}/campaigns/groups`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ groupIds: groups })
                });
            } else {
                response = await fetch(`${APIURL}/campaigns/user/${actualUser}`);
            }
        
            if (!response || !response.ok) {
                throw new Error('Error al obtener las campañas');
            }
        
            const data: ICampaign[] = await response.json();
            setCampaigns(data);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error desconocido');
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <Spinner />; // Aquí usas el spinner

    if (error) return <p>{error}</p>;

    const handleAction = (id: string | undefined) => {
        if (roles.includes('candidate') || roles.includes('voter')) {
            router.push(`/voting?campaignId=${id}`);
        } else {
            router.push(`/campaigndesc?campaignId=${id}`);
        }
    }

    const handleSelect = (checked: boolean, campaign: ICampaign) => {
        if (checked) {
            setSelectedCampaigns([...selectedCampaigns, campaign]);
        } else {
            setSelectedCampaigns(selectedCampaigns.filter((c) => c.id !== campaign.id));
        }
    };

    const handleUpdate = (id: string | undefined) => {
        router.push(`/updateCampaign?id=${id}`);
    };

    return (
        <div className="mt-4 overflow-x-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">Mis Campañas</h1>
            <div className="mb-4">
                <button className='bg-primaryColor text-cuartiaryColor py-2 px-4 flex justify-center rounded-lg hover:scale-105 hover:bg-primaryColor duration-300'>
                    Eliminar seleccionados
                </button>
            </div>
            {campaigns.length > 0 ? (   
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-primaryColor text-left text-white">
                            <th className="border p-2">Seleccionar</th>
                            <th className="border p-2">Nombre</th>
                            <th className="border p-2">Descripción</th>
                            <th className="border p-2">Ubicación</th>
                            <th className="border p-2">Fecha</th>
                            <th className="border p-2">Ver</th>
                            <th className="border p-1">Actualizar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.map((campaign, index) => (
                            <tr key={index} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-t border-gray-200`}>
                                <td className="border p-2"><input type="checkbox" onChange={(e) => handleSelect(e.target.checked, campaign)} /></td>
                                <td className="border p-2">{campaign.name}</td>
                                <td className="border p-2">{campaign.description}</td>
                                <td className="border p-2">{campaign.location}</td>
                                <td className="border p-2">{new Date(campaign.date).toLocaleDateString()}</td>
                                <td className="border p-2 text-blue-500 hover:text-primaryColor cursor-pointer" onClick={() => handleAction(campaign.id)}>
                                    {roles.includes('candidate') || roles.includes('voter') ? 'votar' : 'ver'}
                                </td>
                                <td className="border p-1 text-blue-500 hover:text-primaryColor cursor-pointer" onClick={() => handleUpdate(campaign.id)}>Actualizar </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay campañas disponibles</p>
            )}
        </div>
    );
}

export default CampaignsTable;
