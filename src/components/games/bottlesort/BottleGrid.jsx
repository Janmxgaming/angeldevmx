import SortableBottle from './SortableBottle';

/**
 * Grid de botellas ordenables
 */
export default function BottleGrid({ 
  bottles, 
  selectedBottle, 
  onBottleClick 
}) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {bottles.map((bottle, idx) => (
        <SortableBottle
          key={idx}
          bottle={bottle}
          isSelected={selectedBottle === idx}
          onClick={() => onBottleClick(idx)}
        />
      ))}
    </div>
  );
}
