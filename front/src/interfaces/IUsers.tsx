import ICandidate from "./ICandidate"

interface IUsers {

    id: number,
    name: string,
    dni: number,
    email: string,
    password?: string,
    address?: string,
    city?: string,
    country?: string,
    rol?: string,
    suffrage?: boolean,
    candidate?: ICandidate
}


export default IUsers;

