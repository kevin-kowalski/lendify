import { FormEvent, useContext, useEffect, useState } from "react";
import { HeaderContext, HeaderContextProps } from "../../contexts/HeaderContext";
import { useNavigate } from "react-router-dom";
import { getAllItems, postNewCollection } from "../../service/apiService";
import { Item } from "../../types/types";
import CheckList from "./CheckList";

export default function CollectionAdd () {

  /* State Variables */

  const [inputValue, setInputValue] = useState('')
  const [items, setItems] = useState<Item[] | null>(null)
  const [selectedItems, setSelectedItems] = useState<string[] | null>(null)


  /* Hooks */

  const { setActionButtonGroupData } = useContext<HeaderContextProps>(HeaderContext);
  const navigate = useNavigate();


  /* Handler Functions */

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setInputValue(event.target.value);
    console.log(inputValue, selectedItems)
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(inputValue, selectedItems)
    let newCollection = await postNewCollection(inputValue, selectedItems!)
    console.log(newCollection)
    navigate(`/collection/${newCollection._id}`)
  }

  /* Use Effect */

  // Populate the Header component’s action button group
  useEffect(() => {
    setActionButtonGroupData([]);
  }, []);

  useEffect(() => {
    getAllItems()
      .then((items) => setItems(items))
      .catch((error) => console.log(error))
  })

  /* Render Component */

  return (<>
  <div className="collection-add appear">
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="collectionName"
        placeholder="Name"
        value={inputValue}
        onChange={handleChange}
        autoComplete="off"
      />
      <div>
        <CheckList items={items!} setSelectedItems={setSelectedItems}/>
      </div>
      <div>
        <button type="submit" className="button styled full large">Create Collection</button>
      </div>
    </form>
  </div>
  </>)
}