import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToCreate, setColorToCreate] = useState(initialColor);

  const formatColors = (colorsArr, updatedColor, type) => {
    let newColorsArr = [];

    if(type === 'delete') {
      newColorsArr = colorsArr.filter(color => {
        if(color.id !== updatedColor.id) return color;
      })
    } else {
      newColorsArr = colorsArr.map(color => {
        if(color.id === updatedColor.id) {
          color = updatedColor
          return color;
        } else {
          return color;
        }
      });
    }

    updateColors(newColorsArr);
  };

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
    .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, JSON.stringify(colorToEdit))
    .then(response => formatColors(colors, response.data))
    .catch(err => console.log(err))
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(response => {
      formatColors(colors, color, true);
    })
    .catch(err => console.log(err))
  };

  const createColor = e => {
    e.preventDefault();

    axiosWithAuth()
    .post('http://localhost:5000/api/colors', JSON.stringify(colorToCreate))
    .then(response => {
      updateColors(response.data);
    })
    .catch(err => console.log(err))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={e => createColor(e)}>
        <label>
          Color Name:
          <input onChange={e =>
            setColorToCreate({ ...colorToCreate, color: e.target.value })
          }
          value={colorToCreate.color}
          />
        </label>
        <label>
          Hex Code:
          <input onChange={e =>
              setColorToCreate({
                ...colorToCreate,
                code: { hex: e.target.value }
              })
            }
            value={colorToCreate.code.hex}
            />
        </label>
        <button>Save New Color</button>
      </form>


    </div>
  );
};

export default ColorList;
