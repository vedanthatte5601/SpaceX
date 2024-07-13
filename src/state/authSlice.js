import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const saveUserToLocalStorage = (user) => {
  let users = JSON.parse(localStorage.getItem('users')) || []
  users.push(user)
  localStorage.setItem('users', JSON.stringify(users))
}

const getUsersFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('users')) || []
}

const findUserByEmail = (email) => {
  const users = getUsersFromLocalStorage()
  return users.find((user) => user.email === email)
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  (userData, { rejectWithValue }) => {
    try {
      const existingUser = findUserByEmail(userData.email)
      if (existingUser) {
        throw new Error('User already exists')
      }
      saveUserToLocalStorage(userData)
      return userData
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  (userData, { rejectWithValue }) => {
    try {
      const user = findUserByEmail(userData.email)
      if (user && user.password === userData.password) {
        return user
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
  success: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      const users = getUsersFromLocalStorage()
      const updatedUsers = users.filter(
        (user) => user.email !== state.userInfo.email
      )
      state.userInfo = null
      state.success = false
      
      localStorage.setItem('users', JSON.stringify(updatedUsers))
      localStorage.removeItem('userInfo')
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.userInfo = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.userInfo = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
