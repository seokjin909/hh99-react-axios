// import axios from "axios";
import api from "./axios/api";
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState(null);
  const [inputValue, setInputValue] = useState({
    title: "",
  });
  const [targetId, setTargetId] = useState("");
  const [contents, setContents] = useState("");

  const onChangeHandler = (e) => {
    setInputValue({ title: e.target.value });
  };

  // 추가 함수
  const onSubmitHandler = async () => {
    await api.post("/todos", inputValue);
    fetchTodos();
  };

  // 삭제 함수
  const onDeleteButtonClickHandler = async (id) => {
    await api.delete(`/todos/${id}`);
    setTodos(
      todos.filter((item) => {
        return item.id !== id;
      })
    );
  };

  // 수정 함수
  const onUpdateButtonClickHandler = async () => {
    await api.patch(`/todos/${targetId}`, { title: contents });
    setTodos(
      todos.map((item) => {
        return item.id == targetId ? { ...item, title: contents } : item;
      })
    );
  };
  // 조회 함수
  const fetchTodos = async () => {
    const { data } = await api.get(`/todos`);
    setTodos(data);
  };
  useEffect(() => {
    // DB로부터 값을 가져올 것이다.
    fetchTodos();
  }, []);
  return (
    <>
      <div>
        {/* 수정 영역 */}
        <input
          type="text"
          placeholder="수정할 아이디"
          value={targetId}
          onChange={(e) => {
            setTargetId(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="수정할 내용"
          value={contents}
          onChange={(e) => {
            setContents(e.target.value);
          }}
        />
        <button onClick={onUpdateButtonClickHandler}>수정</button>
        <br />
        <br />
      </div>
      <div>
        {/* INPUT 영역 */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitHandler();
          }}
        >
          <input type="text" onChange={onChangeHandler} value={inputValue.title} />
          <button>추가</button>
        </form>
      </div>
      <div>
        {/* 데이터 영역 */}
        {todos?.map((item) => {
          return (
            <div key={item.id}>
              {item.id} : {item.title}
              &nbsp;<button onClick={() => onDeleteButtonClickHandler(item.id)}>삭제</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
