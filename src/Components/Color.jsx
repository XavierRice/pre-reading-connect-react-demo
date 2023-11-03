import { Link } from "react-router-dom"; // wont refresh our page like an a tab

function Color({ color }) {
  return (
    <tr>
      <td>
        {color.isFavorite ? (
          <span>⭐️</span>
        ) : (
          <span>&nbsp; &nbsp; &nbsp;</span>
        )}
      </td>
      <td>
        <Link to={`/colors/${color.id}`}> {color.name}</Link>
      </td>
      <td>
        {" "}
        <span style={{ backgroundColor: color.name }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
      </td>
    </tr>
  );
}

export default Color;
