import logo from './logo.svg';
import './App.css';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

const items = [{
  id: "item-0",
  content: "item 0"
}, {
  id: "item-1",
  content: "item 1"
}, {
  id: "item-2",
  content: "item 2"
}, {
  id: "item-3",
  content: "item 3"
}, {
  id: "item-4",
  content: "item 4"
}]

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  width: 250,
})
const reroder = (list, startIndex, endIndex) => {
  const removed = list.splice(startIndex, 1);
  console.log(removed);
  list.splice(endIndex, 0, removed[0]);
};
function App() {
  return (
    <div>
      <DragDropContext onDragEnd={(result) => {
        // ドラッグ終了時の処理を追加
        if(!result.destination) {
          return;
        }
        reroder(items, result.source.index, result.destination.index);
      }}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div 
              {...provided.droppableProps} 
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default App;
