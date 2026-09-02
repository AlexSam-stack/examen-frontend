import { useParams } from "react-router-dom";
import Riegos from "../components/Riegos";


export default function RiegosPage() {

    const { cultivoId } = useParams();

    if (!cultivoId) {
        return <p>Cultivo no encontrado</p>;
    }

    return (
        <Riegos
            cultivoId={Number(cultivoId)}
        />
    );
}