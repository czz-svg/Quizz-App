import { useContext } from "react";
import { QuizContext } from "../QuizContext";
export default function SelectQuizzes() {
  const { quizFile, setQuizFile } = useContext(QuizContext);
  return (
    <div>
      <form action="">
        <label htmlFor="questions">Select Quizzes Set </label>
        <select
          name="questions"
          id="questions"
          value={quizFile}
          onChange={(e) => {
            setQuizFile(e.target.value);
          }}
        >
          <option value="questions2.vi.json">Đố vui</option>
          <option value="questions.vi.json">React JS</option>
          <option value="vu_tru.json">Vũ trụ</option>
          <option value="dong_vat.json">Động vật</option>
          <option value="tai_chinh.json">Tài Chính</option>
          <option value="hoa_hoc.json">Hóa học</option>
          <option value="toan_hoc.json">Toán học</option>
        </select>
      </form>
    </div>
  );
}
