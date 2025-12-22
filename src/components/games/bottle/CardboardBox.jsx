import PETBottle from './PETBottle';

const BOX_STYLES = {
  borderColor: '#8b7355',
  background: 'linear-gradient(135deg, #d4a574 0%, #a67c52 100%)',
  boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.3), 0 10px 30px rgba(0,0,0,0.5)',
  minHeight: '180px'
};

/**
 * Caja de cartón que oculta o muestra las botellas correctas
 */
export default function CardboardBox({ bottles, isOpen, title }) {
  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold text-center mb-4 text-gray-300">
        📦 {title} {!isOpen && '(Oculta)'}
      </h3>
      <div 
        className="relative p-8 rounded-2xl border-4 mx-auto max-w-2xl overflow-hidden"
        style={BOX_STYLES}
      >
        {!isOpen ? (
          // Caja cerrada
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-700 font-bold">???</p>
          </div>
        ) : (
          // Caja abierta - se ven las botellas
          <div className="flex justify-center gap-4">
            {bottles.map((bottle, index) => (
              <PETBottle
                key={index}
                color={bottle.color}
                capColor={bottle.capColor}
                name={bottle.name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
