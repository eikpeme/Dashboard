import { createContext } from 'react';

/**
 * Default state for Context.
 */
export const defaultState = {
  isAuthenticated: true,
};

/**
 * Creation of a new Context.
 */
const UserContext = createContext(defaultState);

export default UserContext; 
  