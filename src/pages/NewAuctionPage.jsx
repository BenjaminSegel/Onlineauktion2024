// TO DO
// add image
// post data to dn on submit
// go to homepage on submit
// check that submitted auction-item exists on homepage (among other items)
// navbar-footer problem



// TEKNISKA SKULDER
// data fetch


import React, { useState, useEffect, useContext } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const NewAuctionPage = () => {

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [data, setData] = useState(null)

  const existingCategories = []

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/api/auctions')
      const result = await response.json()
      setData(result)

    }
    getData()

  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])

  let filtered = data ? data.map((item) => item.category.map(i => existingCategories.includes(i) ? null : existingCategories.push(i)
  )) : null

  const handleStartDateChange = date => {
    setStartDate(date);
  };

  const handleEndDateChange = date => {
    setEndDate(date);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setTitle(customCategory);
      setDropdownOpen(false);
      setCustomCategory('');
    }
  };

  return (
    <form className='w-100 d-flex justify-content-center align-items-center m-3'>
      <div className='d-flex flex-column' style={{width:"30%"}}>
        <div className='d-flex flex-column'>
          <input
            type="text"
            // value={searchValue} 
            // onChange={handleChange} 
            className="form-control mb-2"
            placeholder="Title"
            aria-label="Title" />
          <input
            type="text"
            // value={searchValue} 
            // onChange={handleChange} 
            className="form-control mb-2"
            placeholder="Description"
            aria-label="Description" />
        </div>
        <div className='row'>
          <div className="col">
            <div className='d-flex flex-column'>
              <label>Start Date:</label>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                // startDate={startDate}
                // endDate={endDate}
                minDate={new Date()}
                maxDate={endDate}
                className="form-control custom-date-picker "
              />
            </div>
          </div>
          <div className="col">
            <div className='d-flex flex-column'>
              <label>End Date:</label>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                // startDate={startDate}
                // endDate={endDate}
                minDate={startDate}
                disabled={!startDate}
                className="form-control custom-date-picker "
              />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className="col">
            <div className='input-group mt-2'>
              <span className="input-group-text" >€</span>
              <input
                type="text"
                // value={searchValue} 
                // onChange={handleChange} 
                className="form-control"
                placeholder="Start Price"
                aria-label="Start Price" />
            </div>
          </div>
          <div className="col">
            <div className='input-group mt-2'>
              <span className="input-group-text" >€</span>
              <input
                type="text"
                // value={searchValue} 
                // onChange={handleChange} 
                className="form-control"
                placeholder="Reserved Price"
                aria-label="Reserved Price" />
            </div>
          </div>
        </div>
        {/* <div className="container d-flex flex-row justify-content-between border border-secondary rounded p-2 "> */}
        <div className="dropdown mt-2 w-100 d-flex justify-content-center">
          {/* {category ? <h3 className='px-3'>{category}</h3> : <h3 className='px-3'>Select category</h3>} */}
          <button  className="btn btn-secondary dropdown-toggle w-75" type="button" id="dropdownMenuButton1" 
            data-bs-toggle="dropdown" aria-expanded="false"
           onClick={() => { setDropdownOpen(prev => !prev), filtered }}>{title == '' ? 'Categories' : title}</button>
        </div>
        {dropdownOpen ? <div className='list-group w-75 align-self-center'>
          {existingCategories.map((cat, index) => 
        <a key={index} className='list-group-item list-group-item-action text-center' href="#" onClick={() => {setDropdownOpen(false), setTitle(cat)}}>{cat}</a>
        )}<input type='text' placeholder='Add custom category' value={customCategory}
        onChange={(e) => setCustomCategory(e.target.value)} onKeyDown={handleKeyPress}/></div> : null}
        <button className="btn btn-primary mt-3 w-75 align-self-center">Submit</button>
      </div>
    </form>
  )
}

export default NewAuctionPage