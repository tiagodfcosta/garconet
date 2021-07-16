import { useHistory, useLocation } from "react-router-dom";

function backButton() {
    const location = useLocation();
    const history = useHistory();

    function back() {
        console.log(location)
        const { pathname } = location
        const lastSlashIndex = pathname.lastIndexOf("/");
        const newPath = pathname.slice(0, lastSlashIndex === 0 ? 1 : lastSlashIndex)
        console.log(`ir para ${newPath}`)
        history.push(newPath)
    }

    if (location.pathname === "/") {
        return null
    }

    return <button onClick={back}>Voltar</button>
}

export default backButton