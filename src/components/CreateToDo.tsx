import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { categoryState, toDoState } from '../atoms';
import { Icon } from './Icon';

const CreateToDoForm = styled.form`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  height: 3rem;
  margin: 0 auto;
  margin-bottom: 5rem;
  border-radius: 1rem;
  box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
  background-color: ${(props) => props.theme.cardColor};

  input {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 1rem;
    background-color: transparent;
    padding-left: 1rem;
    font-size: 1rem;
    color: ${(props) => props.theme.textColor};
  }

  input:focus {
    outline: 0.15rem solid ${(props) => props.theme.accentColor};
  }

  button {
    position: absolute;
    right: 0;
    border: none;
    background-color: transparent;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.accentColor};

    div {
      cursor: pointer;
    }
  }
`;

interface toDoFormInterface {
  toDo: string;
}

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<toDoFormInterface>();
  const [toDos, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  const onValid = ({ toDo }: toDoFormInterface) => {
    setValue('toDo', '');
    setToDos((current) => [
      { id: Date.now(), text: toDo, category },
      ...current,
    ]);
  };

  useEffect(() => {
    localStorage.setItem('toDos', JSON.stringify(toDos));
  }, [toDos]);

  return (
    <CreateToDoForm onSubmit={handleSubmit(onValid)}>
      <input
        {...register('toDo', { required: '내용을 꼭 작성해주세요!' })}
        placeholder="새로운 내용을 작성해주세요!"
      />
      <button>
        <Icon name="add_circle" />
      </button>
    </CreateToDoForm>
  );
}

export default CreateToDo;
