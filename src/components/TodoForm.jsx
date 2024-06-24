import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoApi } from "../api/todos";

export default function TodoForm({ refetch }) {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const queryClient = useQueryClient();

  const addTodoMutation = useMutation(
    (newTodo) => todoApi.post("/todos", newTodo),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
        refetch(); // refetch prop으로 전달된 함수 호출
      },
    }
  );

  const handleAddTodo = (e) => {
    e.preventDefault();
    addTodoMutation.mutate({
      id: Date.now().toString(),
      title,
      contents,
      isCompleted: false,
      createdAt: Date.now(),
    });
    setTitle("");
    setContents("");
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="title">제목:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor="contents">내용:</label>
      <input
        id="contents"
        name="contents"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        required
      />
      <button type="submit">추가하기</button>
    </form>
  );
}
