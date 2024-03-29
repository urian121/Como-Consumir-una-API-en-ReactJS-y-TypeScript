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
  // Se está definiendo un tipo de objeto donde las claves son de tipo number y los valores son de tipo number
  const [likes, setLikes] = useState<{ [key: number]: number }>({});
  const url_api: string = "https://dummyjson.com/users";

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

  /**
   * Utilizando el operador ternario para establecer el valor de prevLikes[id] en 0 si ya existe un like para la mascota, y en 1 si no existe un like
   */
  const handleLike = (id: number) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: prevLikes[id] ? 0 : 1,
    }));
  };

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
            <div key={cat.id} className="col-md-3 card-4 mx-2 cat">
              {/* Si likes[cat.id] es mayor que 0 (es decir, si hay likes para esta mascota), 
              entonces se aplica la clase bi-heart-fill, lo que mostrará un corazón lleno. De lo contrario,
               se aplica la clase bi-heart, lo que mostrará un corazón vacío.*/}
              <i
                className={`bi ${
                  likes[cat.id] ? "bi-heart-fill" : "bi-heart"
                } float-end`}
                onClick={() => handleLike(cat.id)}></i>

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
