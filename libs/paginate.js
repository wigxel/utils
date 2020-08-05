import { log } from "./debuggers"
import { compose, path, equals, pick, set, merge, view, lensPath } from "ramda"

const metaLen = lensPath(["meta"])
const itemsLen = lensPath(["items"])

const isLastPage = pager => pager.meta.currentPage === pager.meta.totalPages
const isBeforeLastPage = ({ meta }) => meta.currentPage < meta.totalPages

const isFirstFetch = compose(equals(0), path(["meta", "currentPage"]))
const setCurrentPage = set(lensPath(["meta", "currentPage"]))
const setTotals = obj => pager => {
    if (isFirstFetch(pager)) {
        const pickTotals = pick(["totalPages", "totalItems"])
        const value = merge(pickTotals(obj), view(metaLen, pager))
        return set(metaLen, value, pager)
    }
    return pager
}
const setChunk = (page, items, pager) => {
    const chunkMap = view(itemsLen, pager)
    return set(itemsLen, chunkMap.set(page, items))
}

const handlerFns = {
    onFail: err => console.error(err),
    onSuccess: x => x,
    extractMeta: x => x,
    getCurrentItems() {
        return this.items.get(this.meta.currentPage)
    },
    isLastPage() {
        return isLastPage(this)
    },
}

const meta = {
    limit: 30,
    totalPages: 1,
    totalItems: 1,
    currentPage: 0,
}

export const Pager = obj => ({
    __proto__: handlerFns,
    endpoint: Promise.resolve(),
    items: new Map([]),
    name: "Pager",
    ...obj,
    meta: {
        __proto__: meta,
        ...obj.meta,
    },
})

//  page
const guessPage = (context, action) => {
    const page = context.meta.currentPage

    if (action === "INCREMENT") {
        if (isFirstFetch(context) || isBeforeLastPage(context)) {
            return page + 1
        }
    }

    if (action === "DECREMENT" && page > 1) {
        return page - 1
    }

    return page
}

export const fetchData = async (pager, page) => {
    const {
        endpoint,
        meta: { limit },
    } = pager

    try {
        const data = await endpoint({ page, limit })

        const newPager = compose(
            Pager,
            setChunk(page, pager.onSuccess(data), pager),
            setCurrentPage(page),
            compose(setTotals, pager.extractMeta)(data)
        )

        return newPager(pager)
    } catch (err) {
        pager.onError(err)
    }
}

// executes an action
const commit = action => async pager => {
    const page = guessPage(pager, action)

    if (action === "UPDATE") {
        const _pager = set(itemsLen, new Map([]), pager)

        return fetchData(_pager, 1)
    }

    if (pager.items.has(page) && action !== "REFRESH") {
        return setCurrentPage(page, pager)
    }

    return await fetchData(pager, page)
}

export const refresh = commit("UPDATE")
export const next = commit("INCREMENT")
export const prev = commit("DECREMENT")

// Vuex Helpers
const setItems = commit => paginator => {
    const itemGroup = log(
        paginator.getCurrentItems(),
        "Fetched " + paginator.name
    )
    commit("set_paginator", paginator)
    commit("set_items", itemGroup)
    return itemGroup
}

export const mapPaginationActions = () => ({
    async fetch({ state, commit }) {
        return next(state.paginator).then(setItems(commit))
    },
    async next({ state, commit }) {
        return next(state.paginator).then(setItems(commit))
    },
    async prev({ state, commit }) {
        return prev(state.paginator).then(setItems(commit))
    },
    async update({ state, commit }) {
        return refresh(state.paginator).then(setItems(commit))
    },
})

/**
 * Polls the paginator by interval
 * @param  {Function} paginator   The paginator
 * @param  {Function} setter   Update callback
 * @param  {Integer} duration Poll interval
 * @return {Function}  to stop the poll
 */
export const poll = (paginator, setter, duration = 15000) => {
  const handle = setInterval(() => paginator.update().then(setter), duration)
  return () => {
    clearInterval(handle)
  }
}
