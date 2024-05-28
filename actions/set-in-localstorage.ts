'use client'

export const setInLocalStrorage = ( key: string, value:any ) => {
    return localStorage.setItem(key, JSON.stringify(value))

}