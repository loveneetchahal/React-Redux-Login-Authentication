
import { configureStore } from '@reduxjs/toolkit'
import SaveChatMessages from '../reducers/SaveChatMessages'

export const ReduxStore = configureStore({
  reducer: {
    Messages :  SaveChatMessages,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
 }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof ReduxStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof ReduxStore.dispatch


