// import { compose } from 'lodash/fp'

// const addHandler = (paginate, method, fn) => {
//   paginate[method] = fn
//   return paginate
// }
const INCREMENT = Symbol('increment')
const DECREMENT = Symbol('decrement')

const guessAction = (context, action) => {
  const { pager } = context
  const page = pager.getCurrentPage()

  if (action === INCREMENT) {
    if (pager.isFirstFetch() || pager.isBeforeLastPage()) {
      return page + 1
    }
  } else if (action === DECREMENT && (page > 1)) {
    return page - 1
  }
  return page
}

// handles the page movement
const pageMeta = ({ currentPage, totalPages }) => ({
  totalPages,
  currentPage,
  totalItems: 1,
  getCurrentPage: () => currentPage || 0,
  setCurrentPage(value) {
    this.currentPage = value
  },
  isBeforeLastPage() {
    return this.currentPage < this.totalPages
  },
  isFirstFetch() {
    return this.currentPage === 0
  },
  isLastPage() {
    return this.currentPage === this.totalPages
  },
})

const fetchData = async (context, page) => {
  // eslint-disable-next-line
  if (context.isFetching) return Promise.resolve(makePaginate(context))

  context.isFetching = true
  return context.endpoint({ page, ...context.getParams() })
    .then((data) => { // set the pagination meta
      if (context.pager.isFirstFetch()) {
        const { totalPages, totalItems } = context.metaHandler(data)
        context.setMeta({ totalPages, totalItems })
      }

      return data
    })
    .then((data) => { // update page
      context.pager.setCurrentPage(page)
      return data
    })
    .then(context.onSuccess) // handle success
    .then(chunk => context.items.set((page), chunk)) // map data
    .then(() => { context.isFetching = false })
    // eslint-disable-next-line
    .then(() => makePaginate(context)) // create new instance
    .catch(context.onFail) // catch if error
}

const commit = async (context, action) => {
  const page = guessAction(context, action)

  if (!context.items.has(page)) {
    // await (new Promise(res => setTimeout(() => res(), 10000)))
    return fetchData(context, page)
  }

  context.pager.setCurrentPage(page)
  // eslint-disable-next-line
  return Promise.resolve(makePaginate(context))
}

const defaultProps = {
  limit: 30,
  items: new Map([]),
  urlParams: { },
  prefetch: false,
  isFetching: false,
  pager: pageMeta({ currentPage: 0, totalPages: 1 }),
  getParams() {
    return {
      limit: this.limit,
    }
  },
  setMeta({ totalPages: tp, totalItems }) {
    this.pager.totalPages = tp
    this.pager.totalItems = totalItems
  },
  onFail: x => x,
  onSuccess: x => x,
  metaHandler: x => x,
}

function makePaginate(props) {
  const context = { ...defaultProps, ...props }
  const { items, pager } = context
  const { currentPage, totalPages } = pager

  return {
    get pager() { return context.pager },
    getCurrentPage(a) { return this.context.pager.getCurrentPage(a) },
    context: {
      ...context,
      pager: pageMeta({ currentPage, totalPages }),
    },
    allItems: () => items,
    getConfig: () => context,
    getItems: () => items.get(currentPage) || [],
    // fetches to the next page if last
    async next() { return commit(this.context, INCREMENT) },
    async prev() { return commit(this.context, DECREMENT) },
    async update() { return fetchData(this.context, this.pager.currentPage) },
  }
}

export default makePaginate

export const poll = (getter, setter, duration) => {
  const handle = setInterval(() => getter().update().then(setter), duration)
  return () => {
    clearInterval(handle)
  }
}
