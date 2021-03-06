import { useHistory, useLocation } from "react-router-dom";
import "./BackButton.css"
import { IoIosArrowBack } from 'react-icons/io'


function BackButton() {
    const location = useLocation();
    const history = useHistory();

    function back() {
        const { pathname } = location
        const lastSlashIndex = pathname.lastIndexOf("/");
        const newPath = pathname.slice(0, lastSlashIndex === 0 ? 1 : lastSlashIndex)
        history.push(newPath)
    }

    if (location.pathname === "/") {
        return null
    }

    return <button className="backbutton" onClick={back}><IoIosArrowBack/></button>
}

export default BackButton