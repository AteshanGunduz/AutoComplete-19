import savedData from '../savedData'
import { useState, useEffect } from 'react'
export default function ToDoList() {
  const [listData, setListData] = useState(savedData)
  const [newItemInput, setNewItemInput] = useState('')
  const [autoCompleteRequested, setAutoCompleteRequested] = useState(false)
  const [myclass, setMyClass] = useState(false)

  function handleCheckBoxChange(event) {
    setListData((prevList) => {
      return prevList.map((item) => {
        return item.id === event.target.name
          ? { ...item, complete: !item.complete }
          : item
      })
    })
  }

  function handleNewItemInputChange(event) {
    setNewItemInput(event.target.value)
  }

  
  // const div = document.querySelector('.to-do-list-container')
     


  // useEffect(() => {
  //   if (div) {
  //     div.scrollTop = div.scrollHeight
  //   }
  // }, [listData])

  function handleEnter(event) {
    if (newItemInput.trim()) {
      if (event.key === 'Enter') {
        setListData((prevList) => {
          const newListItem = {
            text: event.target.value,
            complete: false,
            id: crypto.randomUUID(),
          }
          return [...prevList, newListItem]
         
        })
        setNewItemInput('')
      }
    }
  }

  function autoComplete() {
    setAutoCompleteRequested(true)
  }

  useEffect(() => {
    if (autoCompleteRequested) {
      let timeOut = setTimeout(() => {
        setAutoCompleteRequested(false)
        setListData((prevData) => {
          return prevData.map((item) => {
            return !item.complete ? { ...item, complete: true } : item
          })
        })
      }, 2000)
    }
  }, [autoCompleteRequested])


  const currentList = listData.map((item) => {
    return (
      <div className='to-do-list-item-container' key={item.id}>
        <label className='checkbox-label'>

        {autoCompleteRequested ? (<input
            type='checkbox'
            name={item.id}
            onChange={handleCheckBoxChange}
            checked
          />):(<input
            type='checkbox'
            name={item.id}
            onChange={handleCheckBoxChange}
          />)}
          
          <span className='checkmark'></span>
          <p
            className={`to-do-list-item-text ${item.complete && 'crossed-out'}`}
          >
            {item.text}
          </p>
        </label>
        <div className='all-progress-bars-container'>
          {!item.complete && autoCompleteRequested && (
            <div className='progress-bar-container'>
              <div className='progress-bar-content'></div>
            </div>
          )}
        </div>
      </div>
    )
  })

  const handleFocus =  ()=>{
    setMyClass(true)
  }

  return (
    <div>
      <div className='to-do-list-container'>
        {currentList}
        <label className='new-item-label'>
          <img src='./images/add-item.svg' className={myclass ? "add-item-icon faded" : "add-item-icon"} />


          <input
            className='new-item-input '
            type='text'
            onKeyDown={handleEnter}
            onChange={handleNewItemInputChange}
            onFocus={handleFocus}
            value={newItemInput}
          />


        </label>
      </div>
      <div className='do-it-button-container'>
        <button onClick={autoComplete}>Otomatik Tamamlama</button>
      </div>
    </div>
  )
}
