import React from 'react';
import { Button, Card, CardContent, Typography, IconButton, Grid } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Star as StarIcon, StarBorder as StarBorderIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { updateTodoCompletion, deleteTodo } from '../slices/todoSlice'; // Import deleteTodo action

const TodoCard = ({ todo, onEdit }) => {
  const dispatch = useDispatch();
  const [isCompleted, setIsCompleted] = React.useState(todo.completed);

  const handleStarClick = () => {
    const updatedCompletionStatus = !isCompleted;
    setIsCompleted(updatedCompletionStatus);

    // Dispatch the action to update the completion status in the Redux store
    dispatch(updateTodoCompletion({ id: todo.id, completed: updatedCompletionStatus }));
  };

  const handleDeleteClick = () => {
    // Dispatch the deleteTodo action when the delete icon is clicked
    dispatch(deleteTodo(todo.id));
  };
  let priorityColor
  if(todo.priority==="Low"){
    priorityColor = "green"
  }
  else if(todo.priority==="Medium"){
    priorityColor = "grey"
  }
  else{
    priorityColor = "red"
  }

  return (
    <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
      <CardContent>
        {/* Title */}
        <Typography variant="h5" gutterBottom>
          {todo.title}
        </Typography>

        {/* Description */}
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {todo.description}
        </Typography>

        {/* Due Date, Priority, Star Icon (Completion) */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              Due Date: {todo.dueDate}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary" >
              Priority: <Typography sx={{color:priorityColor}}>{todo.priority}</Typography>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <IconButton onClick={handleStarClick} color={isCompleted ? 'primary' : 'default'}>
              {isCompleted ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
          </Grid>
        </Grid>

        {/* Edit and Delete Icons */}
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <IconButton onClick={() => onEdit(todo)} color="primary">
              <EditIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={handleDeleteClick} color="error">
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TodoCard;

// import React from 'react';
// import { Button, Card, CardContent, Typography } from '@mui/material';

// const TodoCard = ({ todo, onEdit }) => {
//   return (
//     <Card>
//       <CardContent>
//         <Typography variant="h5">{todo.title}</Typography>
//         <Typography>{todo.description}</Typography>
//         <Typography>Priority: {todo.priority}</Typography>
//         <Typography>Due Date: {todo.dueDate}</Typography>
//         <Button onClick={() => onEdit(todo)}>Edit</Button> {/* Trigger edit when clicked */}
//       </CardContent>
//     </Card>
//   );
// };

// export default TodoCard;
