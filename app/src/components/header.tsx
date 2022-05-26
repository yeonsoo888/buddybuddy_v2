import { useHistory } from "react-router";
import { Cookies } from "react-cookie";

type props = {
    authLogout: () => void
}

export default function Header({authLogout}:props):JSX.Element {
    const path = process.env.PUBLIC_URL;

    return (
        <header className="header">
            <h1 className="logo">
                <a href="/"><img src={`${path}/images/logo.png`} alt="" /></a>
            </h1>
            <button className="btnLogou" onClick={authLogout}>로그아웃</button>
        </header>
    )
}
