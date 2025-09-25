// src/components/ArticleCombobox.tsx
import React, { useState, useEffect, useRef } from 'react';
import type { Article } from '../App'; // Importamos el tipo desde App.tsx

interface ArticleComboboxProps {
  articles: Article[];
  onSelect: (article: Article | null) => void;
  selectedArticle: Article | null;
}

const ArticleCombobox: React.FC<ArticleComboboxProps> = ({ articles, onSelect, selectedArticle }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Article[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sincroniza el input si el artículo seleccionado cambia desde fuera
  useEffect(() => {
    setInputValue(selectedArticle?.descripcion || '');
  }, [selectedArticle]);

  // Hook para cerrar el dropdown si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Maneja los cambios en el input de texto
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputValue(text);

    if (text) {
      const filtered = articles.filter(article =>
        article.descripcion.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      setIsOpen(false);
      onSelect(null); // Si el input está vacío, deseleccionamos
    }
  };

  // Maneja la selección de un artículo del dropdown
  const handleSelectArticle = (article: Article) => {
    setInputValue(article.descripcion);
    onSelect(article);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full h-full" ref={containerRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)} // Muestra sugerencias al hacer foco
        placeholder="Escriba para buscar..."
        className="w-full h-full p-1 border-0 focus:ring-0 appearance-none bg-transparent"
      />
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-20 w-full max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg mt-1">
          {suggestions.map(article => (
            <li
              key={article.id}
              onClick={() => handleSelectArticle(article)}
              className="px-3 py-2 cursor-pointer hover:bg-indigo-100"
            >
              {article.descripcion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArticleCombobox;
