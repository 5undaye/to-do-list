import { atom, selector } from 'recoil';

export interface ToDoInterface {
  id: number;
  text: string;
  category: string;
}

export interface IconProps {
  name: string;
}

export const themeAtom = atom({
  key: 'isLight',
  default: true,
});

export let defaultCategories = ['해야 할 일', '하고 있는 일', '끝낸 일'];

export const categoryState = atom({
  key: 'category',
  default: defaultCategories[0],
});

export const categoriesState = atom<string[]>({
  key: 'categories',
  default: JSON.parse(
    localStorage.getItem('categories') ?? JSON.stringify(defaultCategories)
  ),
});

export const toDoState = atom<ToDoInterface[]>({
  key: 'toDos',
  default: JSON.parse(localStorage.getItem('toDos') ?? '[]'),
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);

    return toDos.filter((toDo) => toDo.category === category);
  },
});
