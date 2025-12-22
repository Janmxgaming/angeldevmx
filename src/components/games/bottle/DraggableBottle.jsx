import PETBottle from './PETBottle';

/**
 * Botella arrastrable con eventos de drag & drop
 */
export default function DraggableBottle({ 
  bottle, 
  index, 
  onDragStart, 
  onDragOver, 
  onDrop 
}) {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={onDragOver}
      onDrop={() => onDrop(index)}
      className="cursor-move transition-transform hover:scale-110"
    >
      <PETBottle
        color={bottle.color}
        capColor={bottle.capColor}
        name={bottle.name}
      />
    </div>
  );
}
