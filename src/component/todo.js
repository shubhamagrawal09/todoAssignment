import React, { useEffect, useState } from "react";
import todo from "../images/todoimage.jpg";
import axios from "axios";

const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((result) => {
      setItems(result.data);
    });
  }, []);
  const addItem = () => {
    if (!inputData) {
      alert("Please fill the input data");
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map((ele) => {
          if (ele.id === isEditItem) {
            return { ...ele, title: inputData };
          }
          return ele;
        })
      );
      setInputData("");
      setIsEditItem(null);
      setToggleSubmit(true);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        title: inputData,
      };
      setItems([...items, allInputData]);
      setInputData("");
    }
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((ele) => {
      return index !== ele.id;
    });
    setItems(updatedItems);
  };

  const removeAll = () => {
    setItems([]);
  };

  const editItem = (id) => {
    let newEditItem = items.find((ele) => {
      return ele.id === id;
    });
    setInputData(newEditItem.title);
    setToggleSubmit(false);
    setIsEditItem(id);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todo} alt="todoimage" />
            <figcaption>Add your List here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="Add Items..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {/* font-Awesome 3 party library */}
            {toggleSubmit ? (
              <i
                className="fa fa-plus add-btn"
                title="Add Item"
                onClick={addItem}
              ></i>
            ) : (
              <i
                className="far fa-edit add-btn"
                itle="Edit Item"
                onClick={addItem}
              ></i>
            )}
          </div>
          <div className="showItems">
            {items.map((ele) => {
              return (
                <div className="eachItem">
                  <h3 key={ele.id}>{ele.title}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      itle="Edit Item"
                      onClick={() => editItem(ele.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt delete-btn"
                      title="Delete Item"
                      onClick={() => deleteItem(ele.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
