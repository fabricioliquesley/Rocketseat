import { Plus, List } from "@phosphor-icons/react";

import { Button } from "../Button";

import { Container, Menu } from "./styles";

export function Header({ onOpenMenu }) {
  return (
    <Container>
      <div>
        <Menu onClick={onOpenMenu}>
          <List />
        </Menu>
        <h1>Tarefas</h1>
      </div>
      <Button icon={Plus} title="Nova tarefa" />
    </Container>
  );
}