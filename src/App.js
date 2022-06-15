import PageItem from "./components/PageItem";
import TableItem from "./components/TableItem";
import searchIcon from './assets/icons/search.svg'
import arrowIcon from './assets/icons/arrow.svg'
import debounce from 'lodash/debounce';
import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const perPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [sortBy, setSortBy] = useState('id')
  const [sortOrder, setSortOrder] = useState(true)
  const [search, setSearch] = useState('')

  const url = 'https://jsonplaceholder.typicode.com/posts'
  let params = new URLSearchParams()
  params.append('_page', currentPage)
  params.append('_limit', 10)
  params.append('_sort', sortBy)
  params.append('_order', sortOrder ? 'asc' : 'desc')
  params.append('q', search)

  let state = { 'page_id': currentPage }
  let title = ''
  let page = `?page=${params.get('_page')}&q=${params.get('q')}`

  useEffect(() => {
    setLoading(true)
    fetch(url + '?' + params.toString())
      .then(res => {
        Number(res.headers.get('x-total-count')) === perPage ? setPageCount(0) : setPageCount(Math.round(Number(res.headers.get('x-total-count')) / perPage))
        if(currentPage > Number(res.headers.get('x-total-count'))){
          setCurrentPage(1)
        }
        return res.json()
      })
      .then(data => setItems(data))
      .then(setLoading(false))

    window.history.pushState(state, title, page)
  }, [currentPage, sortBy, search, sortOrder])

  let setPrevPage = () => {
    setCurrentPage(prev => prev - 1)
  }

  let setNextPage = () => {
    setCurrentPage(prev => prev + 1)
  }

  let handleSubmit = (e) => {
    e.preventDefault()
    let input = e.target
    setSearch(input.value)
  }

  const onSearch = debounce(handleSubmit, 500)

  let changeSort = (column) => {
    setSortBy(column)
    setSortOrder(prev => !prev)
    sortBy !== column && setSortOrder(true)
  }

  return (
    <div className="App">
      <div className="search__panel">
        <form>
          <input type="search" name="search" placeholder="Поиск" className="search__input" autoComplete="off" onInput={onSearch} />
          <img src={searchIcon} alt="" />
        </form>
      </div>
      <div className="table">
        <table className="table_items">
          <thead className="table__header">
            <tr className="header__items">
              <th onClick={() => changeSort('id')}>
                <div>
                  <span>ID</span>
                  <img src={arrowIcon} alt=""
                    className={sortOrder ? '' : 'active'}
                    style={{ display: sortBy === 'id' ? 'block' : 'none' }}
                  />
                </div>
              </th>
              <th onClick={() => changeSort('title')}>
                <div>
                  <span>Заголовок</span>
                  <img src={arrowIcon} alt=""
                    className={sortOrder ? '' : 'active'}
                    style={{ display: sortBy === 'title' ? 'block' : 'none' }}
                  />
                </div>
              </th>
              <th onClick={() => changeSort('body')}>
                <div>
                  <span>Описание</span>
                  <img src={arrowIcon} alt=""
                    className={sortOrder ? '' : 'active'}
                    style={{ display: sortBy === 'body' ? 'block' : 'none' }}
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? items.map(item => <TableItem key={item.id} {...item} />) : null}
          </tbody>
        </table>
        {!items.length ? <div className="no-data">Нет данных</div> : (
          <div className={pageCount > 1 ? 'nav' : 'nav hidden'}>
            <button className="prev btn-reset" disabled={currentPage === 1} onClick={setPrevPage}><span>Назад</span></button>
            <ul className="page__list">
              {[...Array(pageCount)].map((item, index) => !loading ? <PageItem key={index} index={index + 1} currentPage={currentPage} setCurrentPage={setCurrentPage} /> : null)}
            </ul>
            <button className="next btn-reset" disabled={currentPage === pageCount} onClick={setNextPage}><span>Далее</span></button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
