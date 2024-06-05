import { HistoryContainer, HistoryList, TaskStatus } from "./styles";

export function History() {
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tarefa 1</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 meses</td>
              <td>
                <TaskStatus status="ready">Concluído</TaskStatus>
              </td>
            </tr>
            <tr>
              <td>Tarefa 2</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 meses</td>
              <td>
                <TaskStatus status="interrupted">Interrompido</TaskStatus>
              </td>
            </tr>
            <tr>
              <td>Tarefa 3</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 meses</td>
              <td>
                <TaskStatus status="inProgress">Em andamento</TaskStatus>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
