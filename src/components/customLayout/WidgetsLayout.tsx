import * as React from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const { useState, memo } = React;

const TaskContainer = styled.div<{ isDragging: boolean }>`
  border: 1px solid lightgrey;
  padding: 8px;
  border-radius: 2px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? '#DADADA' : 'white')};
  transition: background 0.1s;
`;

interface Task {
  id: string;
  content: string;
}

interface TaskProps {
  task: Task;
  index: number;
}

const Task = memo(({ task, index }: TaskProps) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <TaskContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {task.content}
        </TaskContainer>
      )}
    </Draggable>
  );
});

const Container = styled.div<{ isDragging: boolean }>`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 200px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
`;
const Title = styled.h3`
  padding: 8px;
`;
const List = styled.div<{ isDraggingOver: boolean }>`
  padding: 8px;
  transition: background 0.1s;
  background-color: ${(props) => (props.isDraggingOver ? 'lightgrey' : 'inherit ')};
  flex-grow: 1;
`;

const Columns = styled.div`
  display: flex;
`;

interface Column {
  id: string;
  title: string;
}

interface ColumnProps {
  tasks: Task[];
  index: number;
  column: Column;
}

const Column = memo(({ column, tasks, index }: ColumnProps) => (
  <Draggable draggableId={column.id} index={index}>
    {(provided, snapshot) => (
      <Container
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        isDragging={snapshot.isDragging}
        ref={provided.innerRef}
      >
        <Title {...provided.dragHandleProps}>{column.title}</Title>
        <Droppable droppableId={column.id} type="task">
          {(provided, snapshot) => (
            <List
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {tasks.map((t, i) => (
                <Task key={t.id} task={t} index={i} />
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </Container>
    )}
  </Draggable>
));

interface layoutProps {
  data: any;
  callback: (data: any) => void;
}

export const WidgetsLayout = ({ data, callback }: layoutProps) => {
  const [state, setState] = useState(data);

  React.useEffect(() => {
    setState(data);
  }, [data]);

  const applyWidgets = () => {
    console.log(state);
    callback(state);
  };

  return (
    <DragDropContext
      onDragEnd={({ destination, source, draggableId, type }) => {
        if (!destination) {
          return;
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
          return;
        }

        if (type === 'column') {
          const newColOrd = Array.from(state.columnOrder);
          newColOrd.splice(source.index, 1);
          newColOrd.splice(destination.index, 0, draggableId);

          const newState = {
            ...state,
            columnOrder: newColOrd,
          };
          setState(newState);
        }

        // @ts-ignore
        const startcol = state.columns[source.droppableId];
        // @ts-ignore
        const endcol = state.columns[destination.droppableId];

        if (startcol === endcol) {
          const tasks = Array.from(startcol.taskIds);
          tasks.splice(source.index, 1);
          tasks.splice(destination.index, 0, draggableId);

          const newCol = {
            ...startcol,
            taskIds: tasks,
          };

          const newState = {
            ...state,
            columns: {
              ...state.columns,
              [newCol.id]: newCol,
            },
          };

          setState(newState);
          return;
        }
        const startTaskIds = Array.from(startcol.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
          ...startcol,
          taskIds: startTaskIds,
        };
        const endTaskIds = Array.from(endcol.taskIds);
        endTaskIds.splice(destination.index, 0, draggableId);
        const newEnd = {
          ...endcol,
          taskIds: endTaskIds,
        };
        const newState = {
          ...state,
          columns: {
            ...state.columns,
            [newStart.id]: newStart,
            [newEnd.id]: newEnd,
          },
        };
        setState(newState);
      }}
    >
      <Droppable droppableId="columns" direction="horizontal" type="column">
        {(provided) => (
          <Columns {...provided.droppableProps} ref={provided.innerRef}>
            {state.columnOrder.map((id, i) => {
              // @ts-ignore
              const col = state.columns[id];
              // @ts-ignore
              const tasks = col.taskIds.map((taskid) => state.tasks[taskid]);
              return <Column key={id} column={col} tasks={tasks} index={i} />;
            })}
            {provided.placeholder}
          </Columns>
        )}
      </Droppable>
      <button onClick={applyWidgets}>Apply</button>
    </DragDropContext>
  );
};
