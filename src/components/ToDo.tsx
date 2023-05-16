import styled from 'styled-components';
import { ToDoInterface, toDoState } from '../atoms';
import { Icon } from './Icon';
import { useRecoilState } from 'recoil';

const ToDoItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  margin: 0 auto;
  margin-bottom: 1rem;
  border-radius: 1rem;
  box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
  background-color: ${(props) => props.theme.cardColor};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  button {
    background-color: ${(props) => props.theme.buttonColor};
    padding: 0.5rem;
    border-radius: 0.5rem;
    color: ${(props) => props.theme.textColor};
    font-weight: 700;
    border: none;
    cursor: pointer;

    :hover {
      background-color: ${(props) => props.theme.hoverButtonColor};
    }

    :last-child {
      display: flex;
      font-size: 1.5rem;
    }
  }
`;

function ToDo({ id, text, category }: ToDoInterface) {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const deleteToDo = () => {
    setToDos((oldToDos) => oldToDos.filter((oldToDo) => oldToDo.id !== id));
  };

  return (
    <ToDoItem>
      <span>{text}</span>
      <ButtonContainer>
        <button>해야 할 일</button>
        <button>하고 있는 일</button>
        <button>끝낸 일</button>
        <button onClick={deleteToDo}>
          <Icon name="delete" />
        </button>
      </ButtonContainer>
    </ToDoItem>
  );
}

export default ToDo;
