import { useRecoilState, useRecoilValue } from 'recoil';
import ToDo from './ToDo';
import { categoriesState, categoryState, toDoSelector } from '../atoms';
import CreateToDo from './CreateToDo';
import styled from 'styled-components';
import { Icon } from './Icon';
import { useEffect } from 'react';

const Container = styled.div`
  max-width: 35rem;
  margin: 0 auto;
`;

const AddOnsContainer = styled.div`
  display: flex;
  justify-content: end;

  button {
    border: none;
    font-size: 2rem;
    cursor: pointer;
  }
`;

const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 3rem;
  gap: 0.5rem;
  margin-bottom: 1rem;

  button {
    background-color: ${(props) => props.theme.cardColor};
    color: ${(props) => props.theme.textColor};
    border: none;
    border-radius: 1rem;
    box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
    font-size: 1rem;
    cursor: pointer;
  }

  button[disabled] {
    border: 0.15rem solid ${(props) => props.theme.accentColor};
    background-color: ${(props) => props.theme.buttonColor};
    color: ${(props) => props.theme.accentColor};
    font-weight: 700;
  }
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState(categoriesState);

  const addCategory = () => {
    const newCategory = prompt('새로운 카테고리의 이름이 무엇인가요?');

    if (newCategory) {
      if (categories.includes(newCategory)) {
        alert('같은 이름의 카테고리가 이미 있어서 추가할 수 없습니다.');
        return;
      }

      setCategories([...categories, newCategory]);
      setCategory(newCategory);
    }
  };

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  return (
    <Container>
      <AddOnsContainer>
        <button onClick={addCategory}>
          <Icon name="playlist_add"></Icon>
        </button>
      </AddOnsContainer>
      <CategoryContainer>
        {categories.map((currentCategory) => (
          <button
            key={currentCategory}
            onClick={() => setCategory(currentCategory)}
            disabled={currentCategory === category}
          >
            {currentCategory}
          </button>
        ))}
      </CategoryContainer>
      <CreateToDo />
      {toDos.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </Container>
  );
}

export default ToDoList;
