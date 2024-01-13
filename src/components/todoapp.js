import React, { useState } from "react";
import "./todoform.css";
import {
  Grid,
  Paper,
  Typography,
  Fab,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  Autocomplete,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import Add from "@mui/icons-material/Add"; //

function Todoapp() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDeadLine, setTaskDeadLine] = useState("");
  const [taskPriority, setTaskPriority] = useState(null);
  const [task, setTask] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const priority = ["Low Priority", "Mid Priority", "High Prioriry", "Urgent"];

  const abrirDialogo = () => {
    setIsDialogOpen(true);
  };
  const cerrarDialogo = () => {
    setIsDialogOpen(false);
  };
  const saveTask = () => {
    const newTask = {
      name: taskName,
      description: taskDescription,
      deadline: taskDeadLine,
      task_Priority: taskPriority,
    };
    setTask([...task, newTask]);
    setTaskName("");
    setTaskDescription("");
    setTaskDeadLine("");
    setTaskPriority(null);
  };
  const daysFor = (deadline) => {
    const actualDate = new Date();
    const deadLineDate = new Date(deadline);
    const timeDiference = deadLineDate - actualDate;
    const restDays = Math.ceil(timeDiference / (1000 * 60 * 60 * 24));
    return restDays;
  };

  const deleteTask = (index) => {
    const newTasks = task.filter((_, taskIndex) => taskIndex !== index);
    setTask(newTasks);
  };

  const markAsCompleted = (index) => {
    const completedTask = task[index];

    setCompletedTasks([...completedTasks, completedTask]);

    deleteTask(index);
    console.log("Completada con exito");
  };

  return (
    <div style={{ flexGrow: 1, padding: "20px" }}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper style={{ padding: "20px", height: "60vh", overflow: "auto" }}>
            {task.map((task, index) => (
              <Card key={index} style={{ margin: "10px" }}>
                <CardContent>
                  <Typography variant="h5">{task.name}</Typography>
                  <Typography color="textSecondary">
                    {task.description}
                  </Typography>
                  <Typography variant="h5">{task.task_Priority}</Typography>
                  <Typography variant="h5">
                    {daysFor(task.deadline)} Dias restantes
                  </Typography>
                </CardContent>
                <CardActions style={{}}>
                  <Button onClick={() => deleteTask(index)}>Borrar</Button>
                  <Button onClick={() => markAsCompleted(index)}>
                    Marcar como completada
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper style={{ padding: "20px", height: "60vh", overflow: "auto" }}>
            {completedTasks.map((task, index) => (
              <Card key={index} style={{ margin: "10px" }}>
                <CardContent>
                  <Typography variant="h5">{task.name}</Typography>
                  <Typography color="textSecondary">
                    {task.description}
                  </Typography>
                  <Typography variant="h5">{task.task_Priority}</Typography>
                </CardContent>
                <CardActions></CardActions>
              </Card>
            ))}
          </Paper>
        </Grid>
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        onClick={abrirDialogo}
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: "green",
        }}
      >
        <Add /> {/* Usando Add en lugar de AddIcon */}
      </Fab>

      <Dialog open={isDialogOpen} onClose={cerrarDialogo}>
        <DialogTitle>Ingresa Una nueva Tarea</DialogTitle>
        <DialogContent>
          <TextField
            label="Task Title"
            fullWidth
            className="dialogForm"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          ></TextField>
          <TextField
            label="Task Description"
            fullWidth
            className="dialogForm"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          ></TextField>
          <TextField
            label="Task Deadline"
            fullWidth
            className="dialogForm"
            type="date"
            value={taskDeadLine}
            onChange={(e) => setTaskDeadLine(e.target.value)}
          ></TextField>
          <Autocomplete
            disablePortal
            options={priority}
            value={taskPriority}
            onChange={(event, newValue) => {
              setTaskPriority(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Priority" />}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={saveTask}>Guardar</Button>
          <Button onClick={cerrarDialogo}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Todoapp;
