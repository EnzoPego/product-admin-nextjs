'use client'

export const getFromLocalStrorage = ( key: string ) => {
    return JSON.parse(localStorage.getItem(key) as string)

}