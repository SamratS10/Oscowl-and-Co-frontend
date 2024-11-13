import { Grid } from "@mui/material";
import TodoCard from "./TodoCard";

const TodoList = ({ todos, onEdit }) => {
  return (
    <Grid 
      container 
      spacing={1} 
      sx={{
        flexDirection: { xs: "column", sm: "row" }, // Column on small screens, row on larger screens
        alignItems: "flex-start",marginTop:"20px"
      }}
    >
      {todos.map((todo) => (
        <Grid item xs={12} sm={6} md={4} key={todo.id}>
          <TodoCard todo={todo} onEdit={onEdit} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TodoList;
