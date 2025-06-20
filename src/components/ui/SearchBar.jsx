import { Search } from 'lucide-react';

/**
 * Componente de barra de búsqueda reutilizable
 * @param {Object} props - Propiedades del componente
 * @param {string} props.placeholder - Texto de placeholder para el input
 * @param {string} props.value - Valor actual del input
 * @param {function} props.onChange - Función que se ejecuta al cambiar el valor del input
 * @param {string} props.className - Clases adicionales para el contenedor
 * @param {number} props.iconSize - Tamaño del icono de búsqueda
 * @returns {JSX.Element} Componente SearchBar
 */
const SearchBar = ({
  placeholder = "Buscar...",
  value = "",
  onChange,
  className = "",
  iconSize = 20
}) => {
  return (
    <div className={`relative ${className}`}>
      <Search 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" 
        size={iconSize} 
      />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
