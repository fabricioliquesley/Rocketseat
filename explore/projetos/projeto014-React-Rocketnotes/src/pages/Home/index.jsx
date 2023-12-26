import { Container, Menu, Main } from "./style";
import { Header } from "../../components/Header"
import { HiPlusSmall } from "react-icons/hi2";
import { Input } from "../../components/Input";

export function Home() {
    return (
        <Container>
            <Header
                name="Fabricio Liquesley"
                src="https://github.com/diego3g.png"
            />
            <Menu>
                <div>
                    <h1>Rocketnotes</h1>
                    <nav>
                            <a href="#">Todos</a>
                            <a href="#">Frontend</a>
                            <a href="#">Node</a>
                            <a href="#">React</a>
                    </nav>
                </div>
                <button>
                    <HiPlusSmall />
                    Criar nota
                </button>
            </Menu>
            <Main>
                <Input placeholder="Pesquisar pelo titulo"/>
            </Main>
        </Container>
    );
}