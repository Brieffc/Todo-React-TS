import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
//useState serve para manusear o estado
//changeEvent para poder alterar quando algo acontecer na tela
//FormEvent para poder submeter o formulário
//useEffect
import styles from "./TaskForm.module.css";
import { ITask } from "../interfaces/Task";

interface ITaskFormProps {
  btnText: string;
  //recebo a lista como props
  taskList: ITask[];
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
  task?: ITask | null;
  handleUpdate?(id: number, title: string, difficulty: number): void;
}

const TaskForm: React.FunctionComponent<ITaskFormProps> = ({
  btnText,
  //recebo no component a taskList tbm
  taskList,
  setTaskList,
  task,
  handleUpdate,
}) => {
  //estados iniciais da tarefa
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [difficulty, setDifficulty] = useState<number>(0);

  useEffect(() => {
    if (task) {
      setId(task.id);
      setTitle(task.title);
      setDifficulty(task.difficulty);
    }
  }, [task]);

  //crio função para realizar a inclusão de tarefas no sistema
  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleUpdate) {
      handleUpdate(id, title, difficulty);
    } else {
      //crio um id aleatório para referenciar quando quiser deleter etc.
      const id = Math.floor(Math.random() * 1000);
      //crio a nova tarefa e adiciono o id, title e dificuldade
      const newTask: ITask = { id, title, difficulty };

      setTaskList!([...taskList, newTask]);

      setTitle("");
      setDifficulty(0);
    }
  };

  //crio função. HTML vem do input e pega o target e verifica se é o title
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else {
      //adiciono parseInt para converter a string para número inteiro
      setDifficulty(parseInt(e.target.value));
    }
  };

  return (
    //adiciono a função ao form, para chamar ela quando enviar o form
    <form onSubmit={addTaskHandler} className={styles.form}>
      <div className={styles.input_container}>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          name="title"
          placeholder="Título da tarefa"
          onChange={handleChange}
          value={title}
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="difficulty">Dificuldade:</label>
        <input
          type="text"
          name="difficulty"
          placeholder="Dificuldade da tarefa"
          onChange={handleChange}
          value={difficulty}
        />
      </div>
      <input type="submit" value={btnText} />
    </form>
  );
};

export default TaskForm;
