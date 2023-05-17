import styled from 'styled-components';
import { ToDoInterface, categoriesState, toDoState } from '../atoms';
import { Icon } from './Icon';
import { useRecoilValue, useSetRecoilState } from 'recoil';

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

    :last-child {
      display: flex;
      font-size: 1.5rem;
    }

    :disabled {
      opacity: 0.5;
    }

    :not(:disabled):hover {
      background-color: ${(props) => props.theme.hoverButtonColor};
      cursor: pointer;
    }
  }
`;

function ToDo({ id, text, category }: ToDoInterface) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesState);

  const changeCategory = (selectedCategory: string) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((oldToDo) => oldToDo.id === id);
      const newToDo = { text, category: selectedCategory, id };

      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  const deleteToDo = () => {
    setToDos((oldToDos) => oldToDos.filter((oldToDo) => oldToDo.id !== id));
  };

  return (
    <ToDoItem>
      <span>{text}</span>
      <ButtonContainer>
        {categories.map((currentCategory, index) => (
          <button
            key={index}
            onClick={() => changeCategory(currentCategory)}
            disabled={currentCategory === category}
          >
            {currentCategory}
          </button>
        ))}
        <button onClick={deleteToDo}>
          <Icon name="delete" />
        </button>
      </ButtonContainer>
    </ToDoItem>
  );
}

export default ToDo;
