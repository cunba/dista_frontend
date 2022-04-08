import React from "react";
import createStore from 'use-global-hook-ts';


export interface IGlobalHooksProps {

}

export const initialState : IGlobalHooksProps = {
  orders: []
}

export const { useGlobal, store } = createStore(React, initialState, {
  debug: false, //log in console every change
  persistTree: {
    orders: false,
  },
  persistExp: 600, //Seconds to expire
  undoable: false, //undo redo actions, disabled because of the api requests
  maxUndoable: 10,
})