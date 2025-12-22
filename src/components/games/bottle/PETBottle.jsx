/**
 * Componente de botella PET realista
 * Representa una botella de plástico con tapa, cuello, cuerpo y líquido de color
 */
export default function PETBottle({ color, capColor, name, className = '' }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Botella de plástico estilo PET */}
      <div className="relative">
        {/* Tapa de rosca */}
        <div 
          className="w-8 h-6 rounded-t-md mx-auto relative"
          style={{ 
            backgroundColor: capColor,
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          <div className="absolute top-1 left-0 right-0 h-px bg-black opacity-20" />
          <div className="absolute top-2.5 left-0 right-0 h-px bg-black opacity-20" />
          <div className="absolute top-4 left-0 right-0 h-px bg-black opacity-20" />
        </div>
        
        {/* Anillo del cuello */}
        <div 
          className="w-9 h-2 mx-auto"
          style={{ 
            backgroundColor: 'rgba(255,255,255,0.1)',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2)'
          }}
        />
        
        {/* Cuello */}
        <div 
          className="w-7 h-10 mx-auto relative overflow-hidden"
          style={{ 
            background: 'linear-gradient(to right, rgba(255,255,255,0.05), rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          <div 
            className="absolute left-1 top-0 bottom-0 w-1"
            style={{
              background: 'linear-gradient(to right, rgba(255,255,255,0.4), transparent)'
            }}
          />
        </div>
        
        {/* Hombros de la botella */}
        <div 
          className="w-12 h-6 mx-auto relative overflow-hidden"
          style={{ 
            background: 'linear-gradient(to right, rgba(255,255,255,0.05), rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
            clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderTop: 'none'
          }}
        />
        
        {/* Cuerpo principal */}
        <div 
          className="w-12 h-28 mx-auto relative overflow-hidden"
          style={{ 
            background: 'linear-gradient(to right, rgba(255,255,255,0.05), rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
            borderLeft: '1px solid rgba(255,255,255,0.3)',
            borderRight: '1px solid rgba(255,255,255,0.3)',
            boxShadow: 'inset 2px 0 4px rgba(255,255,255,0.3), inset -2px 0 4px rgba(0,0,0,0.1)'
          }}
        >
          {/* Líquido */}
          <div 
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: '90%',
              backgroundColor: color,
              opacity: 0.85
            }}
          />
          
          {/* Anillos del cuerpo (típicos de botellas PET) */}
          <div className="absolute top-2 left-0 right-0 h-1.5 bg-white opacity-5" />
          <div className="absolute top-6 left-0 right-0 h-1.5 bg-white opacity-5" />
          <div className="absolute top-10 left-0 right-0 h-1.5 bg-white opacity-5" />
          <div className="absolute top-14 left-0 right-0 h-1.5 bg-white opacity-5" />
          <div className="absolute top-18 left-0 right-0 h-1.5 bg-white opacity-5" />
          <div className="absolute top-22 left-0 right-0 h-1.5 bg-white opacity-5" />
          
          {/* Reflejo vertical */}
          <div 
            className="absolute left-2 top-0 bottom-0 w-2"
            style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.2) 100%)',
              filter: 'blur(1px)'
            }}
          />
        </div>
        
        {/* Base redondeada */}
        <div 
          className="w-12 h-4 mx-auto rounded-b-xl relative overflow-hidden"
          style={{ 
            background: 'linear-gradient(to right, rgba(255,255,255,0.05), rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
            border: '1px solid rgba(255,255,255,0.2)',
            borderTop: 'none'
          }}
        >
          <div 
            className="absolute bottom-0 left-0 right-0 h-3 rounded-b-xl"
            style={{
              backgroundColor: color,
              opacity: 0.85
            }}
          />
        </div>
      </div>
      
      {/* Nombre de la botella */}
      {name && (
        <p className="text-xs text-gray-400 mt-2 font-semibold">{name}</p>
      )}
    </div>
  );
}
