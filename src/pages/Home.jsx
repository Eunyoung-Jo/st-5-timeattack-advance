import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { todoApi } from "../api/todos";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

const queryClient = new QueryClient();

const fetchTodos = async () => {
  const response = await todoApi.get("/todos");
  return response.data;
};

export default function Home() {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos
  });

  if (isLoading) {
    return <div style={{ fontSize: 36 }}>로딩중...</div>;
  }

  if (error) {
    console.error(error);
    return (
      <div style={{ fontSize: 24 }}>에러가 발생했습니다: {error.message}</div>
    );
  }

  return (
    <>
      <h2>서버통신 투두리스트 by useQuery</h2>
      <TodoForm refetch={refetch} />
      <TodoList todos={data} />
    </>
  );
}