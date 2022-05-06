import PageItem from "./components/PageItem";
import TableItem from "./components/TableItem";
import './reset-style.css'
import searchIcon from './assets/icons/search.svg'
import arrowIcon from './assets/icons/arrow.svg'
import debounce from 'lodash/debounce';
import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([])
  const [loadPageCount, setLoadPageCount] = useState()
  const pageDisplayCount = 10
  const [currentPage, setCurrentPage] = useState(1)
  const [loaded, setLoaded] = useState(false)
  const [sortBy, setSortBy] = useState('id')
  const [sortOrder, setSortOrder] = useState(true)
  const [search, setSearch] = useState('')

  const url = 'https://jsonplaceholder.typicode.com/posts'
  let params = new URLSearchParams()
  params.append('_page', currentPage)
  params.append('q', search)
  params.append('_limit', 10)
  params.append('_sort', sortBy)
  params.append('_order', sortOrder ? 'asc' : 'desc')
  console.log(loadPageCount)

  useEffect(() => {
    fetch(url + '?' + params.toString())
    .then(res => {
      loadPageCount || setLoadPageCount(Number(res.headers.get('x-total-count'))/pageDisplayCount)
      return res.json()
    })
    .then(data => setItems(data) )
    .then(setLoaded(true))
  }, [currentPage,sortBy,search,sortOrder])
  
  let setPrevPage = () =>{
    setCurrentPage(prev => prev-1)
  }
  let setNextPage = () =>{
    setCurrentPage(prev => prev+1)
  }

  let handleSubmit = (e) =>{
    e.preventDefault()
    let input = e.target
    setSearch(input.value)

  }

  const debouncedOnChange = debounce(handleSubmit, 1000)


  let changeSort = (column) => {
    setSortOrder(prev => !prev)
    switch (column) {
      case 'id':
        return setSortBy('id') 
    
      case 'title':
        return setSortBy('title') 

      case 'body':
        return setSortBy('body') 
    
      default:
        return null;
    }
  }

  return (
    <div className="App">
      <div className="search__panel">
        <form onChange={debouncedOnChange}>
        <input type="search" name="search" placeholder="Поиск" className="search__input" autoComplete="off"/>
        <img src={searchIcon} alt=""/>
        </form>
      </div>
      <div className="table">
        <table className="table_items"> 
          <thead className="table__header">             
              <tr className="header__items">
                <th onClick={() => changeSort('id')}>
                  <div> 
                    <span>ID</span><img src={arrowIcon} alt="" className={sortOrder && sortBy === 'id'  ? '':'active'}/>
                    </div>
                </th>
                <th onClick={() => changeSort('title')}>
                  <div>
                    <span>Заголовок</span><img src={arrowIcon} alt="" className={sortOrder && sortBy === 'title'  ? '':'active'}/>
                    </div>
                </th>
                <th onClick={() => changeSort('body')}>
                  <div>
                    <span>Описание</span><img src={arrowIcon} alt="" className={sortOrder && sortBy === 'body'  ? '':'active'}/>
                    </div>
                </th>
              </tr>
          </thead>
          <tbody>
            {loaded ? items.map(item => <TableItem key={item.id} {...item}/>) : null}
          </tbody>
        </table>
      <div className="nav">
        <button className="prev btn-reset" disabled={currentPage === 1 ? true : false} onClick={setPrevPage}><span>Назад</span></button>
        <ul className="page__list">
          {[...Array(loadPageCount)].map((item, index) => loaded ? <PageItem key={index} index={index+1} currentPage={currentPage} setCurrentPage={setCurrentPage}/> : null)}
        </ul>
        <button className="next btn-reset" disabled={currentPage === 10 ? true : false} onClick={setNextPage}><span>Далее</span></button>
      </div>
      </div>
    </div>
  );
}

export default App;
