import React, { useState, useEffect } from "react";
import axios from "axios";

/**
 * La interfaz Cat define la estructura de un objeto que representa a un gatito. Cada objeto de tipo Cat tiene propiedades específicas como id, name, breed, age, gender, y image, cada una con un tipo de dato específico. Esta interfaz facilita la definición y manipulación de objetos de gatitos en el código TypeScript.
 */
interface Cat {
  id: number;
  firstName: string;
  age: number;
  gender: string;
  image: string;
  eyeColor: string;
}

/**
 *
 * El React.FC indica que MyComponent es una función de componente de React. FC significa "Functional Component" en inglés, lo que indica que este componente es un componente funcional.
 */
const MyComponent: React.FC = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const url_api: string = "https://dummyjson.com/users"; // La URL sigue siendo la misma, pero la estructura de datos es de gatitos

  /**
   * useEffect se utiliza para manejar efectos secundarios en componentes funcionales que necesitan ejecutarse después de que el componente ha sido renderizado en el DOM.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url_api);

        setTimeout(() => {
          setCats(response.data.users);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url_api]); // Agregamos url_api como dependencia para que useEffect se ejecute cada vez que cambie

  return (
    <div className="row justify-content-md-center">
      {loading ? (
        <div className="contenedor-carga">
          <p className="text-center loading">Cargando...</p>
        </div>
      ) : (
        <>
          <h1 className="text-center">
            Lista de Gatitos <hr />
          </h1>
          {cats.map((cat) => (
            <div key={cat.id} className="col-md-3 card-4 mx-2">
              <div className="card-content mb-5">
                <img src={cat.image} className="gatito mb-3" />
              </div>
              <strong>{cat.firstName}</strong>

              <div>
                <p>Color de Ojo: {cat.eyeColor}</p>
                <p>Edad: {cat.age} meses</p>
                <p>Género: {cat.gender === "male" ? "macho" : "hembra"}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default MyComponent;
