import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function ColorEditForm() {
  let { index } = useParams();
  const navigate = useNavigate();

  const [color, setColor] = useState({
    name: "",
    isFavorite: false,
  });
  
  const [oldColor, setOldColor] = useState({
    name: "",
    is_favorite: false,
  })

  const handleTextChange = (event) => {
    setOldColor("")
    setColor({ ...color, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setOldColor("")
    setColor({ ...color, isFavorite: !color.isFavorite });
  };

  // Update a color. Redirect to show view
  const updateColor = () => {
    const updateData = { name: color.name, is_favorite: color.isFavorite }
    try {
      fetch(`${API}/colors/${index}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      })
        .then(res => res.json())
        .then(() => navigate(`/colors/${index}`))
    } catch (error) {
      throw error
    }
  };

  // On page load, fill in the form with the color data.
  const fetchedColor = () => {
    try {
      fetch(`${API}/colors/${index}`)
        .then(res => res.json())
        .then(resJson => {
          setOldColor(resJson)
        })
    } catch (error) {
      throw error
    }
  };

  useEffect(() => {
    fetchedColor()
  }, [index])


  const handleSubmit = (event) => {
    event.preventDefault();
    updateColor();
  };

  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={oldColor.name}
          type="text"
          onChange={handleTextChange}
          placeholder="Name of Color"
          required
        />

        <label htmlFor="isFavorite">Favorite:</label>
        <input
          id="isFavorite"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={color.isFavorite}
          value={oldColor.isFavorite}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
      <Link to={`/colors/${index}`}>
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}

export default ColorEditForm;
