import Pages from "./components/Pages";
import Table from "./components/Table";
import './reset-style.css'
import search from './assets/icons/search.svg'
import arrow from './assets/icons/arrow.svg'
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function App() {
  const [items, setItems] = useState([])
  const [pages, setPages] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loaded, setLoaded] = useState(false)
  const [sortBy, setSortBy] = useState({sort:'id',order:true})
  const [searching, setSearching] = useState('')
  const loadPageCount = 10
  const url = 'https://jsonplaceholder.typicode.com/posts'
  let params = new URLSearchParams()
  params.append('_page', currentPage)
  params.append('_sort', sortBy.sort)
  params.append('_order', sortBy.order ? 'asc' : 'desc')
  console.log(params.toString())

  useEffect(() => {
    fetch(url + '?' + params.toString())
    .then(res => res.json())
    .then(data => setItems(data))
    .then(() => {
      for (let i = 1; i <= loadPageCount; i++){
        setPages(prev => [...prev, i])
      }
    })
    .then(setLoaded(true))
  }, [])

  useEffect(() => {
    // fetch(url + '?' + `_page=${currentPage}` + '&' + `_sort=${sortBy.sort}` + '&' + `_order=${sortBy.order ? 'asc' : 'desc'}` + '&' + `q=${searching}`)
    fetch(url + '?' + params.toString())
    .then(res => res.json())
    .then(data => setItems(data))
  }, [currentPage,sortBy,searching])
  
  let getPrevPage = () =>{
    setCurrentPage(prev => prev-1)
  }
  let getNextPage = () =>{
    setCurrentPage(prev => prev+1)
  }


  let changeSort = (atn) => {
    switch (atn) {
      case 'id':
        return(setSortBy({sort:'id', order:!sortBy.order}))
    
      case 'title':
        return(setSortBy({sort:'title', order:!sortBy.order}))

      case 'body':
        return(setSortBy({sort:'body', order:!sortBy.order}))
    
      default:
        return null;
    }
  }

  return (
    <div className="App">
      <div className="search__panel">
        <input type="text" name="" placeholder="Поиск" className="search__input"/>
        <img src={search} alt="" />
      </div>
      <div className="table">
        <table className="table_items"> 
          <thead className="table__header">             
              <tr className="header__items">
                <th onClick={() => changeSort('id')}>ID<img src={arrow} alt="" /></th>
                <th onClick={() => changeSort('title')}>Заголовок<img src={arrow} alt="" /></th>
                <th onClick={() => changeSort('body')}>Описание<img src={arrow} alt="" /></th>
              </tr>
          </thead>
          <tbody>
            {loaded ? items.map(item => <Table key={item.id} {...item}/>) : null}
          </tbody>
        </table>
      <div className="nav">
        <button className="prev btn-reset" disabled={currentPage === 1 ? true : false} onClick={getPrevPage}><span>Назад</span></button>
        <ul className="page__list">
          {pages.map(item => loaded ? <Pages item={item} currentPage={currentPage} setCurrentPage={setCurrentPage}/> : null)}
        </ul>
        <button className="next btn-reset" disabled={currentPage === 10 ? true : false} onClick={getNextPage}><span>Далее</span></button>
      </div>
      </div>
    </div>
  );
}

export default App;
